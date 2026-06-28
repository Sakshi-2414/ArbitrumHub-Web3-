import { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart,
} from 'recharts';
import Footer from '../components/Footer';

function generateHistory(basePrice, points = 25) {
  const data = [];
  let price = basePrice * 0.92;
  for (let i = 0; i < points; i++) {
    price = price * (1 + (Math.random() - 0.478) * 0.028);
    data.push({ time: `${i}h`, price: parseFloat(price.toFixed(2)) });
  }
  data.push({ time: 'now', price: parseFloat(basePrice.toFixed(2)) });
  return data;
}

const COINS = [
  { id: 'bitcoin',  name: 'Bitcoin',  symbol: 'BTC', icon: '₿', color: '#F7931A', glow: 'rgba(247,147,26,0.25)' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA', glow: 'rgba(98,126,234,0.25)' },
  { id: 'solana',   name: 'Solana',   symbol: 'SOL', icon: '◎', color: '#9945FF', glow: 'rgba(153,69,255,0.25)' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', icon: 'A', color: '#12AAFF', glow: 'rgba(18,170,255,0.25)' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-bright border border-arb-borderHi rounded-xl px-3 py-2 text-xs shadow-card">
        <span className="text-arb-muted">Price: </span>
        <span className="text-arb-text font-semibold">${payload[0].value.toLocaleString()}</span>
      </div>
    );
  }
  return null;
};

function CoinCard({ coin, price, change, history }) {
  const positive = change >= 0;
  const lineColor = positive ? '#10B981' : '#EF4444';

  return (
    <div
      className="glass rounded-2xl border border-arb-border card-hover overflow-hidden group"
      style={{ '--glow': coin.glow }}
    >
      {/* Top gradient strip */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${coin.color}, transparent)` }} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl border transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: coin.color + '18', color: coin.color, borderColor: coin.color + '30' }}
            >
              {coin.icon}
            </div>
            <div>
              <div className="font-display font-bold text-arb-text text-base">{coin.name}</div>
              <div className="text-arb-dim text-xs font-mono">{coin.symbol} / USD</div>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-xl ${
            positive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            <span className="text-base leading-none">{positive ? '↑' : '↓'}</span>
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-1">
          {price ? (
            <div className="font-display text-3xl font-bold text-arb-text tracking-tight">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          ) : (
            <div className="skeleton h-9 w-40" />
          )}
        </div>
        <div className="text-arb-dim text-xs mb-5">24-hour price change</div>

        {/* Chart */}
        <div className="h-24 -mx-1">
          {history ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id={`grad-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={lineColor} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={lineColor} stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,69,0.5)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={lineColor}
                  strokeWidth={2}
                  fill={`url(#grad-${coin.id})`}
                  dot={false}
                  activeDot={{ r: 4, fill: lineColor, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="skeleton h-full w-full" />
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-arb-border flex justify-between text-xs text-arb-dim">
          <span>24h Range</span>
          <span className="font-mono">
            {price ? (
              <>
                <span className="text-red-400">${(price * 0.96).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                {' — '}
                <span className="text-green-400">${(price * 1.04).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </>
            ) : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Prices() {
  const [prices, setPrices]     = useState({});
  const [histories, setHistories] = useState({});
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const ids = 'bitcoin,ethereum,solana,arbitrum';
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();

      const newPrices = {};
      const newHistories = {};
      COINS.forEach(({ id }) => {
        const d = data[id];
        if (d) {
          newPrices[id]    = { price: d.usd, change: d.usd_24h_change || 0 };
          newHistories[id] = generateHistory(d.usd);
        }
      });
      setPrices(newPrices);
      setHistories(newHistories);
      setLastUpdated(new Date());
    } catch {
      setError('CoinGecko rate-limited — showing simulated data.');
      const fallback = {
        bitcoin:  { price: 67420, change:  2.34 },
        ethereum: { price: 3218,  change: -1.12 },
        solana:   { price: 178,   change:  5.67 },
        arbitrum: { price: 1.24,  change: -0.89 },
      };
      const newHistories = {};
      Object.entries(fallback).forEach(([id, { price }]) => {
        newHistories[id] = generateHistory(price);
      });
      setPrices(fallback);
      setHistories(newHistories);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPrices(); }, [fetchPrices]);

  return (
    <div className="min-h-screen bg-arb-navy relative">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[600px] h-[400px] bg-arb-blue/6 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="badge badge-green mb-6 fade-up-1">
            <span className="w-1.5 h-1.5 rounded-full bg-arb-green animate-pulse" />
            Live Market Data · CoinGecko API
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-arb-text mb-4 fade-up-2">
            Crypto <span className="gradient-text">Live Prices</span>
          </h1>
          <p className="text-arb-muted text-lg max-w-2xl mx-auto mb-8 fade-up-3">
            Real-time prices fetched directly from the <span className="text-arb-text font-medium">CoinGecko public API</span> — no API key required. Charts show simulated 24-hour price movement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up-4">
            <button
              onClick={fetchPrices}
              disabled={loading}
              className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
            >
              <span className={`text-base ${loading ? 'animate-spin' : ''}`}>↻</span>
              <span>{loading ? 'Refreshing...' : 'Refresh Prices'}</span>
            </button>
            {lastUpdated && (
              <span className="text-arb-dim text-xs font-mono">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {error && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/8 border border-yellow-500/20 text-yellow-400 text-xs">
              <span>⚠️</span> {error}
            </div>
          )}
        </div>
      </section>

      {/* Explainer strip */}
      <section className="px-4 sm:px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl border border-arb-border p-6 sm:p-8">
            <h3 className="font-display font-bold text-arb-text text-lg mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> Why Track Crypto Prices?
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-arb-blue font-semibold mb-1.5 flex items-center gap-2">
                  <span>📈</span> Price Discovery
                </div>
                <p className="text-arb-muted leading-relaxed">
                  Crypto markets are global and 24/7. Unlike stocks, there's no closing bell — prices reflect real-time supply and demand from millions of traders worldwide.
                </p>
              </div>
              <div>
                <div className="text-arb-purple font-semibold mb-1.5 flex items-center gap-2">
                  <span>₿</span> Why BTC & ETH?
                </div>
                <p className="text-arb-muted leading-relaxed">
                  Bitcoin is the reserve asset — when BTC moves, the whole market tends to follow. Ethereum drives Web3 activity — gas fees, DeFi volume, and NFT trends all correlate with ETH price.
                </p>
              </div>
              <div>
                <div className="text-arb-green font-semibold mb-1.5 flex items-center gap-2">
                  <span>🔢</span> 24h Change %
                </div>
                <p className="text-arb-muted leading-relaxed">
                  The 24-hour percentage change shows how volatile a coin has been. Green = it's up from yesterday. Red = it's down. Traders use this to gauge market momentum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price cards */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          {loading && Object.keys(prices).length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {COINS.map(({ id }) => (
                <div key={id} className="glass rounded-2xl p-6 border border-arb-border">
                  <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                      <div className="skeleton w-11 h-11 rounded-xl" />
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-24" />
                        <div className="skeleton h-3 w-14" />
                      </div>
                    </div>
                    <div className="skeleton h-8 w-40" />
                    <div className="skeleton h-24 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {COINS.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  price={prices[coin.id]?.price}
                  change={prices[coin.id]?.change || 0}
                  history={histories[coin.id]}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
