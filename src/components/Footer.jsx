import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/',          label: 'Home' },
  { to: '/concepts',  label: 'Concepts' },
  { to: '/prices',    label: 'Live Prices' },
  { to: '/simulator', label: 'Block Simulator' },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-arb-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-arb-dark to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-arb-purple/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10 border-b border-arb-border">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-btn-primary flex items-center justify-center text-white font-bold text-sm">A</div>
                <div className="absolute inset-0 rounded-lg bg-btn-primary blur-md opacity-40" />
              </div>
              <span className="font-display font-bold text-arb-text text-lg">Arbitrum<span className="gradient-text">Hub</span></span>
            </div>
            <p className="text-arb-muted text-sm leading-relaxed">
              A Web3 learning platform exploring Arbitrum, blockchain fundamentals, and live crypto data.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="badge badge-blue">Arbitrum Builder Labs</span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-arb-text font-semibold text-sm mb-4 uppercase tracking-widest">Pages</h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `text-sm transition-colors duration-200 flex items-center gap-2 ${
                        isActive ? 'text-arb-blue' : 'text-arb-muted hover:text-arb-text'
                      }`
                    }
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-arb-text font-semibold text-sm mb-4 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Arbitrum Docs',   href: 'https://docs.arbitrum.io' },
                { label: 'CoinGecko API',   href: 'https://www.coingecko.com/en/api' },
                { label: 'LamprosDAO',      href: 'https://github.com/lamprosdao' },
                { label: 'GitHub Repo',     href: 'https://github.com/Sakshi-2414/ArbitrumHub-Web3-' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-arb-muted hover:text-arb-blue transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                    {label}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-arb-dim">
          <p>Built for <span className="text-arb-muted">Arbitrum Builder Labs</span> · <span className="text-arb-muted">LamprosDAO</span> · Batch 2025</p>
          <div className="flex items-center gap-4">
             <span className="text-arb-muted">JOSHI SAKSHI</span> ·
            <a
              href="https://github.com/Sakshi-2414"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-arb-muted hover:text-arb-blue transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="https://arbitrum.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-arb-muted hover:text-arb-blue transition-colors"
            >
              arbitrum.io ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
