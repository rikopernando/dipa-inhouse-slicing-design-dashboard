import type { BreakdownItem, PortfolioDataPoint, PortfolioSummary } from '@/types/dashboard';

export const portfolioSummaryData: PortfolioSummary = {
  totalValue: 94726.5,
  currency: 'USD',
  percentageChange: 0.33,
  totalChange: 2987,
  percentageChangeLabel: '+0.3%',
  totalChangeLabel: '+$2.987',
  timeframe: 'This Month',
};

// Generate realistic portfolio chart data with high volatility
function generatePortfolioData(): PortfolioDataPoint[] {
  const data: PortfolioDataPoint[] = [];
  const startDate = new Date('2024-07-01');
  const endDate = new Date('2025-12-16');
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  let currentValue = 85000;

  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // High volatility: larger random swings (-3% to +3% daily)
    const dailyChange = (Math.random() - 0.5) * 0.06; // -3% to +3%
    currentValue = currentValue * (1 + dailyChange);

    // Add some market "events" - random big swings
    if (Math.random() > 0.95) {
      // 5% chance of big event
      const eventImpact = (Math.random() - 0.5) * 0.15; // -7.5% to +7.5%
      currentValue = currentValue * (1 + eventImpact);
    }

    // Add wave pattern for more visual interest
    const wave = Math.sin((i / daysDiff) * Math.PI * 4) * 3000;

    // Overall upward trend
    const trend = (i / daysDiff) * 15000;

    // Combine all factors
    currentValue = Math.max(70000, Math.min(110000, currentValue + wave + (trend / daysDiff) * 10));

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
