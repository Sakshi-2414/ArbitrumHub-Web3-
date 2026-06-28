import { useState, useCallback } from 'react';
import { sha256 } from '../utils/hash';
import Footer from '../components/Footer';

const GENESIS_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

const INITIAL_BLOCK1 = { data: '', nonce: 0, hash: '', prevHash: GENESIS_HASH, mined: false, mining: false };
const INITIAL_BLOCK2 = { data: '', nonce: 0, hash: '', prevHash: '',           mined: false, mining: false };

// ── Glossary terms ────────────────────────────────────────
const glossary = [
  {
    icon: '📦',
    term: 'Block',
    color: 'text-arb-blue',
    border: 'border-arb-blue/20',
    bg: 'bg-arb-blue/6',
    desc: 'A container for transaction data. Every block stores: who sent what to whom, when, and at what fee. Blocks are linked together sequentially to form the chain.',
  },
  {
    icon: '🎲',
    term: 'Nonce',
    color: 'text-arb-purple',
    border: 'border-arb-purple/20',
    bg: 'bg-arb-purple/6',
    desc: 'A "number used once." Miners increment it repeatedly — 0, 1, 2, 3… — until the resulting hash meets the difficulty target. It\'s the only variable miners control.',
  },
  {
    icon: '🔢',
    term: 'Hash',
    color: 'text-yellow-400',
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/6',
    desc: 'A fixed-length fingerprint of any data. SHA-256 always outputs 64 hex characters. Change even one letter in the input and the entire hash changes — unpredictably.',
  },
  {
    icon: '⛏️',
    term: 'Mining',
    color: 'text-arb-green',
    border: 'border-green-500/20',
    bg: 'bg-green-500/6',
    desc: 'The process of finding a nonce that makes the block\'s hash start with enough zeros (difficulty). On real Bitcoin, miners need ~18 leading zeros — our sim requires just 2.',
  },
];

const steps = [
  { n: '01', label: 'You enter block data',       detail: 'Any text — a transaction, a message, a number. This becomes the block\'s payload.' },
  { n: '02', label: 'Nonce starts at 0',           detail: 'The miner sets the nonce to zero before beginning the search.' },
  { n: '03', label: 'SHA-256 hash is computed',   detail: 'We hash: prevHash + data + nonce → one deterministic 64-char hex string.' },
  { n: '04', label: 'Does hash start with "00"?', detail: 'If yes → block is mined! If no → increment nonce by 1 and try again.' },
  { n: '05', label: 'Block is added to the chain', detail: 'The mined hash becomes Block 2\'s "Previous Hash" — linking the two blocks.' },
  { n: '06', label: 'Edit Block 1 → chain breaks', detail: 'Block 1\'s hash changes, Block 2\'s prevHash no longer matches → Block 2 turns invalid.' },
];

// ── Block Card ────────────────────────────────────────────
function BlockCard({ block, index, onChange, onMine, isInvalid, locked }) {
  const isValid   = block.mined && block.hash.startsWith('00') && !isInvalid;
  const hashColor = isInvalid ? 'text-red-400' : block.mined ? 'text-arb-green' : 'text-arb-muted';
  const borderCls = isInvalid
    ? 'border-red-500/40'
    : isValid
      ? 'border-green-500/30'
      : 'border-arb-border';

  return (
    <div className={`glass rounded-2xl border ${borderCls} overflow-hidden transition-all duration-500 relative`}>
      {/* Top accent bar */}
      <div className={`h-0.5 w-full transition-all duration-500 ${
        isInvalid ? 'bg-red-500' : isValid ? 'bg-green-500' : 'bg-arb-border'
      }`} />

      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 bg-arb-navy/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-arb-muted text-sm font-medium">Mine Block 1 first</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-5 py-3.5 border-b border-arb-border bg-arb-cardHi flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm ${
            isInvalid ? 'bg-red-500/15 text-red-400' : isValid ? 'bg-green-500/15 text-green-400' : 'bg-arb-blue/10 text-arb-blue'
          }`}>
            #{index + 1}
          </div>
          <div>
            <div className="font-display font-bold text-arb-text text-sm">Block {index + 1}</div>
            <div className="text-arb-dim text-xs">{index === 0 ? 'Genesis block' : 'Linked to Block 1'}</div>
          </div>
        </div>
        <span className={`badge text-xs ${
          isInvalid ? 'badge-red' : isValid ? 'badge-green' : 'badge-blue'
        }`}>
          {isInvalid ? '⛔ Invalid' : isValid ? '✅ Valid' : block.mining ? '⚙️ Mining…' : '⏳ Unmined'}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Prev Hash */}
        <div>
          <label className="block text-arb-dim text-[10px] font-bold uppercase tracking-widest mb-1.5">
            🔗 Previous Hash
          </label>
          <div className="bg-arb-dark rounded-xl px-3 py-2.5 font-mono text-[11px] text-arb-muted break-all border border-arb-border leading-relaxed">
            {block.prevHash || <span className="text-arb-dim italic">Will link after Block 1 is mined</span>}
          </div>
        </div>

        {/* Data */}
        <div>
          <label className="block text-arb-dim text-[10px] font-bold uppercase tracking-widest mb-1.5">
            📝 Block Data <span className="text-arb-dim normal-case tracking-normal font-normal">(transaction / message)</span>
          </label>
          {onChange ? (
            <textarea
              value={block.data}
              onChange={(e) => onChange('data', e.target.value)}
              placeholder="e.g. Alice sends 1 ETH to Bob"
              rows={2}
              className="input-field"
            />
          ) : (
            <div className="bg-arb-dark rounded-xl px-3 py-2.5 font-mono text-[11px] text-arb-muted border border-arb-border min-h-[44px] break-all leading-relaxed">
              {block.data || <span className="italic">No data entered</span>}
            </div>
          )}
        </div>

        {/* Nonce */}
        <div>
          <label className="block text-arb-dim text-[10px] font-bold uppercase tracking-widest mb-1.5">
            🎲 Nonce <span className="text-arb-dim normal-case tracking-normal font-normal">(incremented during mining)</span>
          </label>
          <div className={`bg-arb-dark rounded-xl px-3 py-2.5 font-mono text-sm border border-arb-border font-bold transition-colors ${
            block.mined && !isInvalid ? 'text-arb-green border-green-500/20' : 'text-arb-text'
          }`}>
            {block.nonce.toLocaleString()}
            {block.mined && !isInvalid && <span className="text-arb-dim font-normal text-xs ml-2">(winning nonce)</span>}
          </div>
        </div>

        {/* Hash output */}
        <div>
          <label className="block text-arb-dim text-[10px] font-bold uppercase tracking-widest mb-1.5">
            🔢 SHA-256 Hash Output
          </label>
          <div className={`bg-arb-dark rounded-xl px-3 py-2.5 font-mono text-[11px] break-all border transition-colors leading-relaxed ${
            isInvalid ? 'border-red-500/30 text-red-400' : block.mined ? 'border-green-500/25 text-arb-green' : 'border-arb-border text-arb-muted'
          }`}>
            {block.hash || <span className="text-arb-dim italic">Not computed yet</span>}
          </div>
          {block.mined && !isInvalid && (
            <p className="text-arb-green text-xs mt-1.5 flex items-center gap-1">
              <span>✓</span> Hash starts with "00" — Proof-of-Work satisfied
            </p>
          )}
          {isInvalid && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <span>✗</span> prevHash mismatch — Block 1 was modified after mining
            </p>
          )}
        </div>

        {/* Mine button */}
        {onMine && (
          <button
            onClick={onMine}
            disabled={block.mining}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              block.mining
                ? 'bg-arb-cardHi text-arb-muted border border-arb-border cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {block.mining ? (
              <>
                <span className="animate-spin text-base">⚙️</span>
                Mining… nonce = {block.nonce.toLocaleString()}
              </>
            ) : (
              <span>⛏️ Mine Block {index + 1}</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────
export default function Simulator() {
  const [block1, setBlock1] = useState({ ...INITIAL_BLOCK1 });
  const [block2, setBlock2] = useState({ ...INITIAL_BLOCK2 });
  const [log, setLog]       = useState([]);

  const block2Invalid = block2.mined && block2.prevHash !== block1.hash;

  const addLog = (msg) => setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 12));

  const mineBlock = useCallback(async (blockState, setBlock, onSuccess) => {
    setBlock((prev) => ({ ...prev, mining: true, nonce: 0, hash: '' }));
    addLog(`⛏️ Mining Block ${blockState.index + 1}…`);

    let nonce = 0;
    const tryMine = async () => {
      const batchSize = 250;
      for (let i = 0; i < batchSize; i++) {
        const raw  = `${blockState.prevHash}${blockState.data}${nonce}`;
        const hash = await sha256(raw);
        if (hash.startsWith('00')) {
          addLog(`✅ Block mined! Nonce = ${nonce.toLocaleString()} · Hash: ${hash.slice(0, 12)}…`);
          const minedBlock = { ...blockState, nonce, hash, mined: true, mining: false };
          setBlock(minedBlock);
          if (onSuccess) onSuccess(hash);
          return;
        }
        nonce++;
        if (nonce > 200000) {
          addLog('❌ Gave up after 200k tries. Add more data and retry.');
          setBlock((prev) => ({ ...prev, mining: false }));
          return;
        }
      }
      setBlock((prev) => ({ ...prev, nonce, mining: true }));
      setTimeout(tryMine, 0);
    };
    await tryMine();
  }, []);

  const handleMineBlock1 = () => {
    if (block1.mining) return;
    mineBlock({ ...block1, index: 0 }, setBlock1, (hash) => {
      setBlock2((prev) => ({ ...prev, prevHash: hash, mined: false, hash: '', nonce: 0 }));
      addLog('🔗 Block 2 linked to Block 1');
    });
  };

  const handleMineBlock2 = () => {
    if (block2.mining || !block1.mined) return;
    mineBlock({ ...block2, prevHash: block1.hash, index: 1 }, setBlock2, () => {
      addLog('✅ Chain complete — both blocks valid!');
    });
  };

  const handleBlock1Change = (field, value) => {
    setBlock1((prev) => ({ ...prev, [field]: value, mined: false, hash: '', nonce: 0 }));
    if (block2.mined) addLog('⚠️ Block 1 changed → Block 2 is now INVALID!');
  };

  const handleBlock2Change = (field, value) => {
    setBlock2((prev) => ({ ...prev, [field]: value, mined: false, hash: '', nonce: 0 }));
  };

  const resetAll = () => {
    setBlock1({ ...INITIAL_BLOCK1 });
    setBlock2({ ...INITIAL_BLOCK2 });
    setLog([]);
  };

  return (
    <div className="min-h-screen bg-arb-navy relative">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-arb-purple/6 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="badge badge-purple mb-6 fade-up-1">⛏️ Interactive Simulator</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-arb-text mb-4 fade-up-2">
            Block <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-arb-muted text-lg max-w-2xl mx-auto fade-up-3">
            Mine real SHA-256 blocks using Proof-of-Work. Change Block 1's data after mining and watch Block 2 break — this is blockchain <span className="text-arb-text font-semibold">immutability</span> in action.
          </p>
        </div>
      </section>

      {/* Glossary */}
      <section className="px-4 sm:px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-arb-text text-xl mb-5 flex items-center gap-2">
            <span>📖</span> Key Concepts — Before You Mine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {glossary.map(({ icon, term, color, border, bg, desc }) => (
              <div key={term} className={`glass rounded-2xl p-5 border ${border} ${bg} card-hover`}>
                <div className="text-2xl mb-3">{icon}</div>
                <div className={`font-display font-bold ${color} text-base mb-2`}>{term}</div>
                <p className="text-arb-muted text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="px-4 sm:px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl border border-arb-border p-6 sm:p-8">
            <h2 className="font-display font-bold text-arb-text text-xl mb-6 flex items-center gap-2">
              <span>🗺️</span> What Happens When You Click "Mine"?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map(({ n, label, detail }) => (
                <div key={n} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-arb-blue/10 border border-arb-blue/20 flex items-center justify-center text-arb-blue text-xs font-bold shrink-0">
                    {n}
                  </div>
                  <div>
                    <div className="text-arb-text text-sm font-semibold">{label}</div>
                    <div className="text-arb-muted text-xs mt-0.5 leading-relaxed">{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-arb-text text-xl flex items-center gap-2">
              <span>⛓️</span> The Blockchain
              {block1.mined && block2.mined && !block2Invalid && (
                <span className="badge badge-green ml-2">Chain Valid ✅</span>
              )}
              {block2Invalid && (
                <span className="badge badge-red ml-2">Chain Broken ⛔</span>
              )}
            </h2>
            <button onClick={resetAll} className="btn-secondary text-xs px-4 py-2">↺ Reset All</button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <BlockCard
              block={block1}
              index={0}
              onChange={handleBlock1Change}
              onMine={handleMineBlock1}
            />
            <BlockCard
              block={block2}
              index={1}
              onChange={block1.mined ? handleBlock2Change : null}
              onMine={block1.mined ? handleMineBlock2 : null}
              isInvalid={block2Invalid}
              locked={!block1.mined}
            />
          </div>

          {/* Chain immutability callout */}
          {block2Invalid && (
            <div className="glass rounded-2xl border border-red-500/30 bg-red-500/5 p-6 mb-6 animate-fade-up">
              <div className="flex gap-4">
                <div className="text-3xl shrink-0">🔗</div>
                <div>
                  <h3 className="font-display font-bold text-red-400 text-lg mb-1">Chain Immutability Demonstrated!</h3>
                  <p className="text-arb-muted text-sm leading-relaxed">
                    You changed Block 1's data, which changed its hash. Block 2's "Previous Hash" field now points to an old, non-existent hash — so Block 2 is considered invalid. In a real blockchain, every node in the network would reject this tampered chain. <span className="text-red-400 font-medium">This is exactly why blockchain data cannot be secretly altered.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Activity log */}
          <div className="glass rounded-2xl border border-arb-border p-5">
            <h3 className="font-display font-bold text-arb-text mb-4 flex items-center gap-2 text-base">
              <span className="w-2 h-2 rounded-full bg-arb-green animate-pulse" />
              Mining Activity Log
            </h3>
            {log.length === 0 ? (
              <p className="text-arb-dim text-sm font-mono">Waiting for mining activity…</p>
            ) : (
              <div className="space-y-1.5">
                {log.map((entry, i) => (
                  <div key={i} className={`font-mono text-xs flex gap-3 ${i === 0 ? 'text-arb-text' : 'text-arb-dim'}`}>
                    <span className="text-arb-blue/50 shrink-0 w-5 text-right">{log.length - i}</span>
                    <span className="break-all">{entry}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
