'use client';

import { memo, useCallback } from 'react';
import { CardHeader } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartCandlestick, ChartLine } from 'lucide-react';
import { PortfolioSummaryDisplay } from '@/components/atoms/portfolio-summary-display';
import { TimeRangeSelector } from '@/components/atoms/time-range-selector';
import type { PortfolioSummary, TimeRange, TypeChart } from '@/types/dashboard';

interface PortfolioChartHeaderProps {
  summary: PortfolioSummary;
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
  typeChart: TypeChart;
  onTypeChartChange: (value: TypeChart) => void;
  className?: string;
}

export const PortfolioChartHeader = memo(function PortfolioChartHeader({
  summary,
  timeRange,
  onTimeRangeChange,
  typeChart,
  onTypeChartChange,
  className,
}: PortfolioChartHeaderProps) {
  const handleTypeChartChange = useCallback(
    (value: string) => {
      if (value) {
        onTypeChartChange(value as TypeChart);
      }
    },
    [onTypeChartChange],
  );

  return (
    <CardHeader className={`mb-8 ${className || ''}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <PortfolioSummaryDisplay
          totalValue={summary.totalValue}
          percentageChange={summary.percentageChange}
          percentageChangeLabel={summary.percentageChangeLabel}
          totalChangeLabel={summary.totalChangeLabel}
          className="flex flex-col gap-1"
        />
        <div className="flex gap-2">
          <TimeRangeSelector value={timeRange} onChange={onTimeRangeChange} isMobile={false} />
          <ToggleGroup
            type="single"
            value={typeChart}
            spacing={1}
            onValueChange={handleTypeChartChange}
            className="justify-start"
          >
            <ToggleGroupItem value="LINE" aria-label="LINE" size="xs">
              <ChartLine />
            </ToggleGroupItem>
            <ToggleGroupItem value="CANDLESTICK" aria-label="CANDLESTICK" size="xs">
              <ChartCandlestick />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </CardHeader>
  );
});
