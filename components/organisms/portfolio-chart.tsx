'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { CardContent } from '@/components/ui/card';
import { PortfolioChartHeader } from '@/components/molecules/portfolio-chart-header';
import { PortfolioChartTooltip } from '@/components/atoms/portfolio-chart-tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import type { PortfolioDataPoint, PortfolioSummary, TimeRange, TypeChart } from '@/types/dashboard';

interface PortfolioChartProps {
  portfolioData: PortfolioDataPoint[];
  summary: PortfolioSummary;
  className?: string;
}

export const PortfolioChart = memo(function PortfolioChart({
  portfolioData,
  summary,
  className,
}: PortfolioChartProps) {
  const [typeChart, setTypeChart] = useState<TypeChart>('LINE');
  const [timeRange, setTimeRange] = useState<TimeRange>('3M');
  const isMobile = useIsMobile();

  const filterDataByTimeRange = useMemo(() => {
    const today = new Date();
    const filterDate = new Date(today);

    switch (timeRange) {
      case '1W':
        filterDate.setDate(today.getDate() - 7);
        break;
      case '1M':
        filterDate.setMonth(today.getMonth() - 1);
        break;
      case '3M':
        filterDate.setMonth(today.getMonth() - 3);
        break;
      case '6M':
        filterDate.setMonth(today.getMonth() - 6);
        break;
      case '1Y':
        filterDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        return portfolioData;
    }

    return portfolioData.filter((item) => new Date(item.date) >= filterDate);
  }, [portfolioData, timeRange]);

  const chartData = useMemo(
    () =>
      filterDataByTimeRange.map((item) => ({
        date: new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        value: item.value,
      })),
    [filterDataByTimeRange],
  );

  const handleTimeRangeChange = useCallback((value: TimeRange) => {
    setTimeRange(value);
  }, []);

  const handleTypeChartChange = useCallback((value: TypeChart) => {
    setTypeChart(value);
  }, []);

  return (
    <div className={`mb-4 flex flex-col lg:mb-0 ${className || ''}`}>
      <PortfolioChartHeader
        summary={summary}
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        typeChart={typeChart}
        onTypeChartChange={handleTypeChartChange}
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 290}>
          <LineChart data={chartData} margin={{ top: 0, right: 0, left: -32, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="6 6" className="stroke-accent" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className="text-primary text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              className="text-accent-foreground text-xs"
            />
            <Tooltip
              cursor={{
                stroke: 'var(--accent)',
                strokeWidth: 2,
                strokeDasharray: '6 6',
              }}
              content={({ active, payload }: TooltipProps<ValueType, NameType>) => (
                <PortfolioChartTooltip
                  active={active}
                  payload={payload}
                  filterDataByTimeRange={filterDataByTimeRange}
                />
              )}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: 'var(--primary)',
                stroke: 'var(--accent)',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  );
});
