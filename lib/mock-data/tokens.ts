import type { Token } from '@/types/dashboard';

export const availableTokens: Token[] = [
  { symbol: 'USDT', name: 'Tether', icon: '/tokens/usdt.svg' },
  { symbol: 'ETH', name: 'Ethereum', icon: '/tokens/eth.svg' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '/tokens/btc.svg' },
  { symbol: 'USDC', name: 'USD Coin', icon: '/tokens/usdc.svg' },
  { symbol: 'BNB', name: 'Binance Coin', icon: '/tokens/bnb.svg' },
  { symbol: 'XRP', name: 'Ripple', icon: '/tokens/xrp.svg' },
  { symbol: 'ADA', name: 'Cardano', icon: '/tokens/ada.svg' },
  { symbol: 'MATIC', name: 'Polygon', icon: '/tokens/matic.svg' },
  { symbol: 'DOT', name: 'Polkadot', icon: '/tokens/dot.svg' },
  { symbol: 'SOL', name: 'Solana', icon: '/tokens/sol.svg' },
  { symbol: 'ATOM', name: 'Cosmos', icon: '/tokens/atom.svg' },
  { symbol: 'AVAX', name: 'Avalanche', icon: '/tokens/avax.svg' },
];
