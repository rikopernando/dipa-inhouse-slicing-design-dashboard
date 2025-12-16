import type { Asset } from '@/types/dashboard';

export const userAssets: Asset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: '0.65',
    usdValue: 63000,
    change24h: 2.15,
    icon: '/tokens/btc.svg',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    amount: '1.23',
    usdValue: 2450,
    change24h: -1.25,
    icon: '/tokens/eth.svg',
  },
  {
    id: '3',
    symbol: 'XNA',
    name: 'Nexa',
    amount: '3,200',
    usdValue: 0.42,
    change24h: 5.67,
    icon: '/tokens/xna.svg',
  },
];
