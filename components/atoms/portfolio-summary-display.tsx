'use client';

import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

interface PortfolioSummaryDisplayProps {
  totalValue: number;
  percentageChange: number;
  percentageChangeLabel: string;
  totalChangeLabel: string;
  className?: string;
}

export const PortfolioSummaryDisplay = memo(function PortfolioSummaryDisplay({
  totalValue,
  percentageChange,
  percentageChangeLabel,
  totalChangeLabel,
  className,
}: PortfolioSummaryDisplayProps) {
  return (
    <div className={className}>
      <CardDescription>Total portfolio</CardDescription>
      <div className="flex items-center gap-2">
        <CardTitle className="text-xl font-medium tabular-nums lg:text-2xl">
          ${formatNumber(totalValue)}
        </CardTitle>
        <Badge variant={percentageChange >= 0 ? 'outline' : 'destructive'}>
          <p className="text-gradient-primary text-xs">{percentageChangeLabel}</p>
        </Badge>
      </div>
      <CardDescription>{totalChangeLabel}</CardDescription>
    </div>
  );
});
