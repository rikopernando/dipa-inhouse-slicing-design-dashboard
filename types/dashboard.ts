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
  totalChange: number;
  currency: string;
  percentageChange: number;
  percentageChangeLabel: string;
  totalChangeLabel: string;
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
  name: string;
  status: 'Staked' | 'Unstaked' | 'Reward';
  amount: string;
  date: string;
  percentage: number;
  usdValue: number;
}

export interface MyStakingItem {
  id: string;
  token: string;
  tokenIcon: string;
  amount: number;
  percentage: number;
  monthlyEarn: number;
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

/**
 * Chart and component types
 */
export type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | 'All';
export type TypeChart = 'LINE' | 'CANDLESTICK';
export type QuickAccessTab = 'Swap' | 'Deposit' | 'Withdraw' | 'Transfer';

/**
 * Event handler types
 */
export type TimeRangeChangeHandler = (value: TimeRange) => void;
export type TypeChartChangeHandler = (value: TypeChart) => void;
export type TokenChangeHandler = (symbol: string) => void;
export type AmountChangeHandler = (amount: string) => void;
export type SwapPreviewHandler = (data: SwapData) => void;
