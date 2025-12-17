'use client';

import { memo } from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface AssetChangeBadgeProps {
  change24h: number;
  className?: string;
}

export const AssetChangeBadge = memo(function AssetChangeBadge({
  change24h,
  className,
}: AssetChangeBadgeProps) {
  const isPositive = change24h >= 0;

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs',
        isPositive ? 'text-primary-400' : 'text-destructive',
        className,
      )}
    >
      {Math.abs(change24h)}%
      <IconArrowUpRight
        className="size-3"
        style={{
          transform: isPositive ? undefined : 'rotate(90deg)',
        }}
      />
    </div>
  );
});
