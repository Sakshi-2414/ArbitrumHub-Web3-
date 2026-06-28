import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const features = [
  {
    icon: '⚡',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconColor: 'text-yellow-400',
    border: 'hover:border-yellow-500/30',
    title: 'Lightning Fast',
    desc: 'Transactions settle in under 2 seconds. Arbitrum batches thousands of off-chain transactions and submits a single compressed proof to Ethereum — giving you mainnet speed without mainnet congestion.',
  },
  {
    icon: '💸',
    color: 'from-green-500/20 to-green-600/10',
    iconColor: 'text-green-400',
    border: 'hover:border-green-500/30',
    title: 'Ultra Low Fees',
    desc: 'Gas fees as low as $0.01 vs $5–$50 on Ethereum L1. You save 99% on every swap, mint, and transfer. Arbitrum compresses transaction data, so you pay for far fewer bytes.',
  },
  {
    icon: '🔒',
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-arb-blue',
    border: 'hover:border-arb-blue/30',
    title: 'Ethereum Security',
    desc: "Inherits Ethereum's full security via fraud proofs. Validators watch the chain — if anyone tries to cheat, they submit a fraud proof and the bad actor is slashed. Your assets are always safe.",
  },
  {
    icon: '🌐',
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-arb-purple',
    border: 'hover:border-purple-500/30',
    title: 'EVM Compatible',
    desc: 'Deploy any Solidity contract without changing a single line of code. Same tools (Hardhat, Foundry, Remix), same RPC calls, same wallet. If it works on Ethereum, it works on Arbitrum.',
  },
];

const stats = [
  { val: '~$0.01',  label: 'Avg Gas Fee',    sub: 'vs $15 on mainnet' },
  { val: '>40k',    label: 'TPS Capacity',   sub: '~15 on Ethereum L1' },
  { val: '$18B+',   label: 'TVL Secured',    sub: 'locked in Arbitrum' },
  { val: '600+',    label: 'dApps Live',     sub: 'deployed & running' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-arb-navy relative">
      {/* Background layers */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-arb-purple/15 via-arb-blue/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">

          <div className="badge badge-blue mb-8 fade-up-1">
            <span className="w-1.5 h-1.5 rounded-full bg-arb-blue animate-pulse" />
            Arbitrum Builder Labs · LamprosDAO · Batch 2025
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-arb-text leading-[1.08] tracking-tight mb-6 fade-up-2">
            Ethereum,{' '}
            <span className="gradient-text">Supercharged</span>
            <br />
            <span className="text-arb-muted text-4xl sm:text-5xl lg:text-6xl font-semibold">with Layer 2</span>
          </h1>

          <p className="text-arb-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed fade-up-3">
            Arbitrum makes Ethereum <span className="text-arb-text font-medium">faster</span>,{' '}
            <span className="text-arb-text font-medium">cheaper</span>, and{' '}
            <span className="text-arb-text font-medium">more scalable</span> —
            without sacrificing the decentralized security that makes it the world's most trusted blockchain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up-4">
            <Link to="/concepts" className="btn-primary text-sm px-7 py-3 w-full sm:w-auto text-center">
              <span>Explore Concepts →</span>
            </Link>
            <Link to="/simulator" className="btn-secondary text-sm px-7 py-3 w-full sm:w-auto text-center">
              ⛏ Try Block Simulator
            </Link>
            <Link to="/prices" className="btn-secondary text-sm px-7 py-3 w-full sm:w-auto text-center">
              📈 Live Prices
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up-5">
            {stats.map(({ val, label, sub }) => (
              <div key={label} className="glass rounded-2xl p-5 text-center card-hover gradient-border">
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{val}</div>
                <div className="text-arb-text text-sm font-semibold mt-1">{label}</div>
                <div className="text-arb-dim text-xs mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-purple mb-4">Why Build on Arbitrum</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-arb-text mb-4">
              The Developer's <span className="gradient-text-purple">Superpower</span>
            </h2>
            <p className="text-arb-muted text-lg max-w-xl mx-auto">
              Everything you love about Ethereum — with 99% lower costs and dramatically higher throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon, color, iconColor, border, title, desc }, i) => (
              <div
                key={title}
                className={`glass rounded-2xl p-6 card-hover border border-arb-border ${border} group`}
                style={{ opacity: 0, animation: `fadeUp 0.7s ease-out ${0.1 + i * 0.1}s forwards` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </div>
                <h3 className={`font-display font-bold text-arb-text text-lg mb-3 ${iconColor} group-hover:${iconColor} transition-colors`}>{title}</h3>
                <p className="text-arb-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── LAYER 2 EXPLAINER ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-blue mb-4">Layer 2 Deep Dive</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-arb-text mb-4">
              The Layer 2 <span className="gradient-text">Story</span>
            </h2>
            <p className="text-arb-muted text-lg max-w-xl mx-auto">
              Why Ethereum needed help, what Arbitrum does, and why it matters for everyday users.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            {/* Problem */}
            <div className="glass rounded-2xl p-7 border border-arb-border card-hover group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">😤</div>
              <div className="badge badge-red mb-3">The Problem</div>
              <h3 className="font-display font-bold text-arb-text text-xl mb-3">Ethereum Hit Its Limit</h3>
              <p className="text-arb-muted text-sm leading-relaxed mb-4">
                Imagine a single-lane highway trying to carry rush-hour traffic for the entire planet. That's Ethereum L1 at peak demand.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  '~15 transactions per second limit',
                  'Gas fees hit $200+ during NFT mints',
                  'DeFi became unusable for small users',
                  'Blocks fill up → your txn waits hours',
                ].map((p) => (
                  <li key={p} className="flex gap-2 text-arb-muted">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Arbitrum */}
            <div className="glass rounded-2xl p-7 border border-arb-blue/30 bg-gradient-to-b from-arb-blue/5 to-transparent card-hover group">
              <div className="w-12 h-12 rounded-xl bg-arb-blue/10 border border-arb-blue/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">🔵</div>
              <div className="badge badge-blue mb-3">The Solution</div>
              <h3 className="font-display font-bold text-arb-text text-xl mb-3">What is Arbitrum?</h3>
              <p className="text-arb-muted text-sm leading-relaxed mb-4">
                Arbitrum is an <span className="text-arb-text font-medium">Optimistic Rollup</span> — a Layer 2 network that runs on top of Ethereum, taking most of the heavy lifting off-chain.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  'Bundles 1000s of txns into one batch',
                  'Posts compressed proof to Ethereum',
                  'Assumes txns are valid (optimistic)',
                  '7-day challenge window for fraud proofs',
                ].map((p) => (
                  <li key={p} className="flex gap-2 text-arb-muted">
                    <span className="text-arb-blue mt-0.5 shrink-0">◆</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="glass rounded-2xl p-7 border border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent card-hover group">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">✅</div>
              <div className="badge badge-green mb-3">Real-World Win</div>
              <h3 className="font-display font-bold text-arb-text text-xl mb-3">Why It Matters</h3>
              <p className="text-arb-muted text-sm leading-relaxed mb-4">
                A DEX swap on Arbitrum costs <span className="text-green-400 font-semibold">~$0.01</span> vs $15+ on mainnet. This unlocks DeFi for everyday users, not just crypto whales.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  'GMX, Uniswap, Aave all live on Arbitrum',
                  '$18B+ TVL shows real trust',
                  'No code changes to deploy from L1',
                  'Same MetaMask, same wallets, same tools',
                ].map((p) => (
                  <li key={p} className="flex gap-2 text-arb-muted">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rollup flow diagram */}
          <div className="glass rounded-2xl p-8 border border-arb-border">
            <h3 className="font-display font-bold text-arb-text text-xl mb-2 text-center">
              How Optimistic Rollups Work
            </h3>
            <p className="text-arb-muted text-sm text-center mb-8 max-w-lg mx-auto">
              The magic happens in 4 steps — most computation is off-chain, final settlement is on Ethereum.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              {[
                { icon: '📝', step: '01', label: 'Submit Txns', sub: 'Users send to Arbitrum sequencer' },
                { icon: '📦', step: '02', label: 'Batch & Execute', sub: 'Off-chain computation in EVM' },
                { icon: '🔗', step: '03', label: 'Post to Ethereum', sub: 'Compressed calldata → L1 block' },
                { icon: '🛡️', step: '04', label: 'Fraud Window', sub: '7 days to challenge invalid state' },
              ].map(({ icon, step, label, sub }) => (
                <div key={step} className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-0 flex-1 min-w-0">
                  <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-arb-blue/20 border border-arb-blue/40 flex items-center justify-center text-arb-blue text-[10px] font-bold sm:mb-1">
                      {step}
                    </span>
                    <div className="w-14 h-14 rounded-2xl glass-bright border border-arb-borderHi flex items-center justify-center text-2xl">
                      {icon}
                    </div>
                  </div>
                  <div className="sm:mt-3 text-left sm:text-center flex-1 sm:flex-none">
                    <div className="text-arb-text text-sm font-semibold">{label}</div>
                    <div className="text-arb-muted text-xs mt-0.5 leading-snug">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-10 sm:p-14 text-center border border-arb-border relative overflow-hidden gradient-border">
            <div className="absolute inset-0 bg-gradient-to-br from-arb-blue/5 via-transparent to-arb-purple/5 pointer-events-none" />
            <div className="relative">
              <div className="font-display text-3xl sm:text-4xl font-bold text-arb-text mb-4">
                Ready to <span className="gradient-text">Explore</span>?
              </div>
              <p className="text-arb-muted text-base sm:text-lg mb-8 max-w-lg mx-auto">
                Jump into the Concepts page, track live crypto prices, or mine your first block in the simulator.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/concepts" className="btn-primary text-sm px-8 py-3"><span>Start Learning →</span></Link>
                <Link to="/prices" className="btn-secondary text-sm px-8 py-3">Live Prices 📈</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
