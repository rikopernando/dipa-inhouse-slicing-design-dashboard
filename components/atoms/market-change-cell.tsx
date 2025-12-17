'use client';

import { memo } from 'react';
import { Typography } from '@/components/atoms/typography';
import { cn } from '@/lib/utils';

interface MarketChangeCellProps {
  change: number;
  className?: string;
}

export const MarketChangeCell = memo(function MarketChangeCell({
  change,
  className,
}: MarketChangeCellProps) {
  const isPositive = change >= 0;
  const isNegative = change <= 0;

  let textColor = 'text-white';

  if (isPositive) {
    textColor = 'text-primary-400';
  } else if (isNegative) {
    textColor = 'text-destructive';
  }

  return (
    <Typography variant="small" className={cn('tabular-nums', textColor, className)}>
      {isNegative && '-'}
      {Math.abs(change)}%
    </Typography>
  );
});
