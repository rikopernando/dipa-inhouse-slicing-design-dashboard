'use client';

import { memo } from 'react';
import { TokenIcon } from '@/components/atoms/token-icon';
import { formatNumber } from '@/lib/utils';
import type { StakingItem } from '@/types/dashboard';
import { Typography } from '../atoms/typography';

interface StakingListItemProps {
  item: StakingItem;
  className?: string;
}

export const StakingListItem = memo(function StakingListItem({
  item,
  className,
}: StakingListItemProps) {
  return (
    <div
      className={`bg-input border-border hover:bg-accent flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors ${className || ''}`}
    >
      <div className="flex items-center gap-3">
        <TokenIcon symbol={item.token} icon={item.tokenIcon} size="lg" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Typography variant="small">
              {item.apy} {item.token}
            </Typography>
          </div>
          <Typography variant="muted" className="flex items-center gap-2">
            {item.name}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <Typography variant="small" className="tabular-nums">
          {item.status}
        </Typography>
        <Typography variant="muted" className="tabular-nums">
          {item.date}
        </Typography>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Typography variant="small" className="tabular-nums">
          ${formatNumber(item.usdValue)}
        </Typography>
        <Typography variant="muted" className="tabular-nums">
          APR: {item.percentage}%
        </Typography>
      </div>
    </div>
  );
});
