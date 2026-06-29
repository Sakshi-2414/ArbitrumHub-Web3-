# ArbitrumHub — Web3 Explorer 🔵

> A modern, premium Web3 learning platform built for the **Arbitrum Builder Labs** assignment by **LamprosDAO**. Explore Layer 2 concepts, compare blockchain fundamentals, track live crypto prices, and simulate blockchain mining — all in one cohesive app.

![ArbitrumHub](https://img.shields.io/badge/Arbitrum-Builder%20Labs-12AAFF?style=for-the-badge&logo=ethereum&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| 🏠 Home | *<img width="1918" height="907" alt="Screenshot 2026-06-28 225413" src="https://github.com/user-attachments/assets/108bb905-6b4e-45b8-80d4-ec9ed45fe5aa" />* |
| 📚 Concepts | *<img width="1918" height="910" alt="Screenshot 2026-06-28 225435" src="https://github.com/user-attachments/assets/a502a693-3092-4462-8ebf-6f7ca9af4c7d" />* |
| 💹 Live Prices | *<img width="1918" height="906" alt="Screenshot 2026-06-28 225458" src="https://github.com/user-attachments/assets/9ba68fc0-f14c-4860-b1df-7c3c16befcf5" />* |
| ⛏️ Block Simulator | *<img width="1918" height="907" alt="Screenshot 2026-06-28 225525" src="https://github.com/user-attachments/assets/536ba4d5-5465-4964-a4b4-70824445aabf" />* |

---

## 📄 Pages

### 🏠 Page 1 — Home / Landing
The main landing page themed around **Arbitrum and Layer 2 scaling**.

- **Hero section** with headline, description, and call-to-action buttons
- **Stats bar** — avg gas fee, TPS capacity, TVL secured, dApps deployed
- **4 Feature cards** — speed, low fees, Ethereum security, EVM compatibility
- **Layer 2 Story** — 3-panel explainer covering:
  - Why Ethereum hit its limits (the problem)
  - What Arbitrum is and how Optimistic Rollups work (the solution)
  - Real-world benefits for everyday users (the outcome)
- **Rollup flow diagram** — 4-step visual: Submit → Batch → Post to Ethereum → Fraud Window
- **CTA section** — guides users to explore the rest of the site

---

### 📚 Page 2 — Concepts
A visual comparison reference page covering **4 core Web3 concepts**, each as a rich side-by-side card.

| Concept | Left Side | Right Side |
|---------|-----------|------------|
| 🌐 Web2 vs Web3 | Corporate-owned internet | User-owned, decentralized internet |
| ⛓️ Ethereum vs Bitcoin | Programmable blockchain | Digital gold / store of value |
| 🔑 Public Key vs Private Key | Shareable wallet address | Secret signing key — never share |
| 🗄️ Blockchain vs Traditional DB | Immutable distributed ledger | Fast but centralized database |

Each card includes:
- A summary paragraph explaining both sides in plain English
- Icon-per-bullet point layout for quick scanning
- Color-coded badges and side headers

---

### 💹 Page 3 — Live Prices
A **real-time cryptocurrency price dashboard** powered by the CoinGecko public API.

- **4 coins tracked** — Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Arbitrum (ARB)
- **Live price in USD** fetched on page load
- **24-hour change %** — green ↑ if positive, red ↓ if negative
- **Area chart** per coin showing simulated 24-hour price movement with gradient fill
- **24h range** (estimated low–high) shown per card
- **Refresh button** to re-fetch live data on demand
- **Graceful fallback** to simulated data if CoinGecko rate-limits
- **Explainer strip** — why we track prices, why BTC & ETH matter, what 24h change means

**API used:**
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,arbitrum&vs_currencies=usd&include_24hr_change=true
```
No API key required.

---

### ⛏️ Page 4 — Block Simulator
An **interactive blockchain mining simulator** built with pure JavaScript and the Web Crypto API (SHA-256). No blockchain library needed.

**What you can do:**
1. Enter block data (e.g. "Alice sends 1 ETH to Bob")
2. Click **Mine Block 1** — the nonce increments until the SHA-256 hash starts with `00`
3. Block 2 automatically links to Block 1's hash as its `previousHash`
4. Mine Block 2 to complete the chain
5. **Edit Block 1's data** — Block 2 instantly turns invalid (chain broken)

**Educational sections included:**
- **Glossary** — Block, Nonce, Hash, Mining explained in plain English
- **Step-by-step guide** — exactly what happens when you click "Mine"
- **Chain immutability callout** — explains in real-time why the chain broke
- **Activity log** — timestamped mining events

**Core insight demonstrated:**  
> When Block 1's data changes, its hash changes. Block 2's `previousHash` no longer matches → the chain is invalid. This is **immutability** in action — why you cannot secretly alter historical blockchain data.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | Component-based UI |
| [Vite 6](https://vitejs.dev) | Build tool and dev server |
| [React Router v7](https://reactrouter.com) | Client-side routing across 4 pages |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling |
| [Recharts](https://recharts.org) | Area charts for price trends |
| [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) | Native SHA-256 hashing in the browser |
| [CoinGecko API](https://www.coingecko.com/en/api) | Free real-time crypto price data |
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Display font |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Monospace font for hashes & code |

---

## 🚀 Setup & Run Locally

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone or extract the project
cd arbitrum-web3

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
arbitrum-web3/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Shared nav with active route highlight + mobile menu
│   │   └── Footer.jsx        # 3-column footer with links and resources
│   ├── pages/
│   │   ├── Home.jsx          # Landing page — Arbitrum / L2 overview
│   │   ├── Concepts.jsx      # Web3 concept comparison cards
│   │   ├── Prices.jsx        # Live crypto price dashboard
│   │   └── Simulator.jsx     # Interactive block mining simulator
│   ├── utils/
│   │   └── hash.js           # Web Crypto API SHA-256 wrapper
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles, design tokens, animations
├── index.html
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ✨ Design Highlights

- **Dark glassmorphism** — deep navy `#060B14` base with frosted glass cards
- **Gradient accents** — blue `#12AAFF` → purple `#A855F7` → pink `#EC4899`
- **Space Grotesk** display font for headings, JetBrains Mono for code and hashes
- **Smooth animations** — staggered `fadeUp` on page load, card lift on hover, glow effects on buttons
- **Fully responsive** — mobile, tablet, and desktop layouts tested
- **Custom scrollbar**, skeleton loading states, and animated badge pills

---

## ⚠️ Known Limitations

- CoinGecko's free API has a rate limit (~10–30 calls/min). If you refresh too quickly, it returns a 429 error — the app automatically falls back to simulated price data with a visible warning.
- Mining speed depends on your device. Finding a `00`-prefixed SHA-256 hash typically takes a few hundred to a few thousand nonce attempts and completes in 1–5 seconds on modern hardware.
- Price charts use simulated history (random walk from live price) since CoinGecko's historical endpoint requires a paid plan.

---

## 🔗 Resources

- [Arbitrum Documentation](https://docs.arbitrum.io)
- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)
- [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/)
- [LamprosDAO GitHub](https://github.com/lamprosdao)

---

## 👤 Author

Built for **Arbitrum Builder Labs** · **LamprosDAO** · Batch 2025  
GitHub: [@Sakshi-2414](https://github.com/Sakshi-2414)

---

*Every line of code you write this week is a step toward building on Arbitrum.* 🔵
