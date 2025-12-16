import type { StakingItem } from '@/types/dashboard';

export const stakingItems: StakingItem[] = [
  {
    id: '1',
    token: 'ETH',
    tokenIcon: '/tokens/eth.svg',
    apy: 18.55,
    status: 'Staked',
    amount: '18.55',
    usdValue: 45512.5,
  },
  {
    id: '2',
    token: 'USDC',
    tokenIcon: '/tokens/usdc.svg',
    apy: 12.3,
    status: 'Staked',
    amount: '5,000',
    usdValue: 5000,
  },
  {
    id: '3',
    token: 'MATIC',
    tokenIcon: '/tokens/matic.svg',
    apy: 24.5,
    status: 'Staked',
    amount: '2.0',
    usdValue: 6250,
  },
  {
    id: '4',
    token: 'ATOM',
    tokenIcon: '/tokens/atom.svg',
    apy: 15.8,
    status: 'Unstaked',
    amount: '100',
    usdValue: 850,
  },
  {
    id: '5',
    token: 'AVAX',
    tokenIcon: '/tokens/avax.svg',
    apy: 19.2,
    status: 'Reward',
    amount: '0.5',
    usdValue: 420,
  },
];
