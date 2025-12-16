import type {
  BreakdownItem,
  PortfolioDataPoint,
  PortfolioSummary,
} from '@/types/dashboard';

export const portfolioSummaryData: PortfolioSummary = {
  totalValue: 94726.5,
  currency: 'USD',
  percentageChange: 2.34,
  changeLabel: '+2%',
  timeframe: 'This Month',
};

// Generate realistic portfolio chart data for the past 6 months
function generatePortfolioData(): PortfolioDataPoint[] {
  const data: PortfolioDataPoint[] = [];
  const startDate = new Date('2024-07-01');
  const endDate = new Date('2024-12-16');
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  let currentValue = 85000;

  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Add some realistic volatility
    const volatility = (Math.random() - 0.5) * 2000;
    const trend = (i / daysDiff) * 12000; // Upward trend
    currentValue = 85000 + trend + volatility;

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue * 100) / 100,
    });
  }

  return data;
}

export const portfolioChartData: PortfolioDataPoint[] = generatePortfolioData();

export const portfolioBreakdown: BreakdownItem[] = [
  {
    name: 'BTC',
    value: 45000,
    percentage: 47.5,
    color: '#2cc184',
  },
  {
    name: 'ETH',
    value: 30000,
    percentage: 31.7,
    color: '#00c4bd',
  },
  {
    name: 'Others',
    value: 19726.5,
    percentage: 20.8,
    color: '#17c8cc',
  },
];
