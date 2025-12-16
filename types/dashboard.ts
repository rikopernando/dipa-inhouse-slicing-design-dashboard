/**
 * Shared TypeScript types for dashboard components
 */

export interface Token {
  symbol: string;
  name: string;
  icon: string;
}

export interface Asset extends Token {
  id: string;
  amount: string;
  usdValue: number;
  change24h: number;
}

export interface PortfolioDataPoint {
  date: string;
  value: number;
}

export interface PortfolioSummary {
  totalValue: number;
  currency: string;
  percentageChange: number;
  changeLabel: string;
  timeframe: string;
}

export interface BreakdownItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface StakingItem {
  id: string;
  token: string;
  tokenIcon: string;
  apy: number;
  status: 'Staked' | 'Unstaked' | 'Reward';
  amount: string;
  usdValue: number;
}

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface SecurityAlert {
  isSecurityEnabled: boolean;
  message: string;
  description: string;
}

export interface SwapData {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  exchangeRate: string;
}
