'use client';

import { memo } from 'react';
import type { BreakdownItem } from '@/types/dashboard';

interface PortfolioBreakdownLegendProps {
  breakdown: BreakdownItem[];
  className?: string;
}

export const PortfolioBreakdownLegend = memo(function PortfolioBreakdownLegend({
  breakdown,
  className,
}: PortfolioBreakdownLegendProps) {
  return (
    <div className={`flex w-full flex-row justify-between ${className || ''}`}>
      {breakdown.map((item) => (
        <div key={item.name} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-xs" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground text-sm">{item.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tabular-nums">{item.percentage.toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
});
