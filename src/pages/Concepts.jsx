import Footer from '../components/Footer';

const concepts = [
  {
    title: 'Web2 vs Web3',
    emoji: '🌐',
    tagline: 'From corporate control to user ownership',
    left: {
      label: 'Web2',
      badge: 'badge-yellow',
      color: 'text-yellow-400',
      bgBlock: 'bg-yellow-500/8',
      borderCard: 'border-yellow-500/15',
      icon: '🏢',
      summary: 'The internet you grew up with — powerful but controlled by a handful of corporations.',
      points: [
        { icon: '🏦', text: 'Owned by corporations (Google, Meta, Amazon)' },
        { icon: '📊', text: 'Your data is the product — sold to advertisers' },
        { icon: '☁️', text: 'Centralized servers — single point of failure' },
        { icon: '🔑', text: 'Platform controls your account; can ban you anytime' },
        { icon: '💰', text: 'Creators earn tiny fractions; platforms take 30–70%' },
        { icon: '⚡', text: 'Fast and convenient — but fragile and gatekept' },
      ],
    },
    right: {
      label: 'Web3',
      badge: 'badge-blue',
      color: 'text-arb-blue',
      bgBlock: 'bg-arb-blue/8',
      borderCard: 'border-arb-blue/20',
      icon: '🌍',
      summary: 'The new internet — decentralized, user-owned, and governed by code, not companies.',
      points: [
        { icon: '👥', text: 'Owned by users via tokens, DAOs, and governance' },
        { icon: '🛡️', text: 'You control your data — on-chain, cryptographically' },
        { icon: '🔗', text: 'Decentralized nodes — no single point of failure' },
        { icon: '🔐', text: 'Your wallet = your universal identity; no one can ban it' },
        { icon: '🎨', text: 'Creators keep 90%+ via smart contracts and NFTs' },
        { icon: '⛓️', text: 'Trustless — rules enforced by code, not corporations' },
      ],
    },
  },
  {
    title: 'Ethereum vs Bitcoin',
    emoji: '⛓️',
    tagline: 'Digital gold vs programmable blockchain',
    left: {
      label: 'Bitcoin',
      badge: 'badge-yellow',
      color: 'text-yellow-400',
      bgBlock: 'bg-yellow-500/8',
      borderCard: 'border-yellow-500/15',
      icon: '₿',
      summary: 'The original blockchain — designed as a decentralized peer-to-peer currency and store of value.',
      points: [
        { icon: '🥇', text: 'Digital gold — the first and most trusted crypto' },
        { icon: '💎', text: 'Fixed supply: exactly 21 million BTC ever' },
        { icon: '🔐', text: 'Simple Script language — intentionally limited' },
        { icon: '⚡', text: '~7 transactions per second on-chain' },
        { icon: '⛏️', text: 'Proof of Work — miners solve SHA-256 puzzles' },
        { icon: '📅', text: 'Created in 2009 by the anonymous Satoshi Nakamoto' },
      ],
    },
    right: {
      label: 'Ethereum',
      badge: 'badge-purple',
      color: 'text-arb-purple',
      bgBlock: 'bg-arb-purple/8',
      borderCard: 'border-arb-purple/20',
      icon: 'Ξ',
      summary: 'A programmable blockchain — a global computer where developers deploy unstoppable applications.',
      points: [
        { icon: '💻', text: 'World computer — run code that never goes offline' },
        { icon: '♾️', text: 'No fixed supply; burns ETH via EIP-1559 (deflationary)' },
        { icon: '📝', text: 'Full Turing-complete EVM — any app you can imagine' },
        { icon: '🚀', text: '~30 TPS base + thousands more via L2s like Arbitrum' },
        { icon: '🌿', text: 'Proof of Stake since 2022 — 99.95% less energy' },
        { icon: '🏗️', text: 'Home to DeFi, NFTs, DAOs, and thousands of dApps' },
      ],
    },
  },
  {
    title: 'Public Key vs Private Key',
    emoji: '🔑',
    tagline: 'Your cryptographic identity on the blockchain',
    left: {
      label: 'Public Key',
      badge: 'badge-green',
      color: 'text-arb-green',
      bgBlock: 'bg-green-500/8',
      borderCard: 'border-green-500/20',
      icon: '🔓',
      summary: 'Your public address — share it freely. It\'s how people send you crypto or verify your transactions.',
      points: [
        { icon: '📬', text: 'Your wallet address — safe to share with anyone' },
        { icon: '🧮', text: 'Derived from private key via elliptic curve math (ECDSA)' },
        { icon: '📥', text: 'Others send funds to your public key / address' },
        { icon: '✅', text: 'Used to verify your transaction signatures' },
        { icon: '📧', text: 'Think of it as your blockchain email address' },
        { icon: '🌐', text: 'Visible on block explorers like Etherscan' },
      ],
    },
    right: {
      label: 'Private Key',
      badge: 'badge-red',
      color: 'text-arb-red',
      bgBlock: 'bg-red-500/8',
      borderCard: 'border-red-500/20',
      icon: '🔏',
      summary: 'Your master password — never share this. It proves you own the funds and signs every transaction.',
      points: [
        { icon: '🚨', text: 'NEVER share this with anyone, ever' },
        { icon: '🎲', text: '256-bit random number — astronomically hard to guess' },
        { icon: '✍️', text: 'Signs transactions to prove you authorized them' },
        { icon: '💼', text: 'Whoever holds this key controls all your funds' },
        { icon: '🔑', text: 'Think of it as your unbreakable master password' },
        { icon: '⚠️', text: 'Lose it = lose access to your wallet forever. No recovery.' },
      ],
    },
  },
  {
    title: 'Blockchain vs Traditional Database',
    emoji: '🗄️',
    tagline: 'Centralized control vs decentralized truth',
    left: {
      label: 'Traditional DB',
      badge: 'badge-yellow',
      color: 'text-arb-muted',
      bgBlock: 'bg-gray-500/8',
      borderCard: 'border-gray-500/15',
      icon: '🏦',
      summary: 'SQL/NoSQL databases — fast and flexible, but controlled by one organization that can change anything.',
      points: [
        { icon: '🏢', text: 'Controlled by one company or administrator' },
        { icon: '✏️', text: 'Data can be edited, deleted, or tampered anytime' },
        { icon: '⚡', text: 'Extremely fast: reads in milliseconds' },
        { icon: '🔒', text: 'Requires trust in the database operator' },
        { icon: '💡', text: 'Efficient — perfect for internal business data' },
        { icon: '⚠️', text: 'Single point of failure if server goes down' },
      ],
    },
    right: {
      label: 'Blockchain',
      badge: 'badge-blue',
      color: 'text-arb-blue',
      bgBlock: 'bg-arb-blue/8',
      borderCard: 'border-arb-blue/20',
      icon: '⛓️',
      summary: 'A distributed ledger — shared across thousands of nodes, immutable by design, and verified by math.',
      points: [
        { icon: '🌍', text: 'Maintained by thousands of independent nodes globally' },
        { icon: '🔒', text: 'Immutable — past data cannot be altered or deleted' },
        { icon: '🐢', text: 'Slower — writes take seconds to minutes to confirm' },
        { icon: '🤖', text: 'Trustless — cryptography enforces the rules' },
        { icon: '🔗', text: 'Each block is cryptographically linked to the last' },
        { icon: '✅', text: 'No single point of failure — globally distributed' },
      ],
    },
  },
];

export default function Concepts() {
  return (
    <div className="min-h-screen bg-arb-navy relative">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-arb-purple/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="badge badge-purple mb-6 fade-up-1">📚 Core Web3 Concepts</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-arb-text mb-4 fade-up-2">
            Understand the <span className="gradient-text">Fundamentals</span>
          </h1>
          <p className="text-arb-muted text-lg max-w-2xl mx-auto fade-up-3">
            Four essential comparisons every Web3 developer must know — presented side-by-side with clear, real-world explanations.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-8 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {concepts.map(({ title, emoji, tagline, left, right }, idx) => (
            <div
              key={title}
              className="glass rounded-3xl border border-arb-border overflow-hidden card-hover"
              style={{ opacity: 0, animation: `fadeUp 0.7s ease-out ${0.1 + idx * 0.1}s forwards` }}
            >
              {/* Card header */}
              <div className="px-6 sm:px-8 py-5 border-b border-arb-border bg-gradient-to-r from-arb-cardHi to-arb-card flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-bright border border-arb-borderHi flex items-center justify-center text-xl">
                    {emoji}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-arb-text text-xl">{title}</h2>
                    <p className="text-arb-muted text-xs mt-0.5">{tagline}</p>
                  </div>
                </div>
              </div>

              {/* Side-by-side */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-arb-border">
                {[left, right].map((side) => (
                  <div key={side.label} className={`p-6 sm:p-8 ${side.bgBlock}`}>
                    {/* Side header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl glass-bright border ${side.borderCard} flex items-center justify-center text-xl font-bold ${side.color}`}>
                        {side.icon}
                      </div>
                      <div>
                        <span className={`badge ${side.badge}`}>{side.label}</span>
                      </div>
                    </div>

                    <p className="text-arb-muted text-sm leading-relaxed mb-5 italic border-l-2 border-arb-borderHi pl-3">
                      {side.summary}
                    </p>

                    <ul className="space-y-3">
                      {side.points.map(({ icon, text }) => (
                        <li key={text} className="flex items-start gap-3 text-sm">
                          <span className="text-base shrink-0 leading-none mt-0.5">{icon}</span>
                          <span className="text-arb-muted leading-relaxed">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
