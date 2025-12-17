'use client';

import { memo } from 'react';
import { TokenIcon } from '@/components/atoms/token-icon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { MyStakingItem } from '@/types/dashboard';
import { Typography } from './typography';

interface StakingCardProps {
  item: MyStakingItem;
  className?: string;
}

export const StakingCard = memo(function StakingCard({ item, className }: StakingCardProps) {
  return (
    <Card className={`bg-input border-accent shrink-0 py-4 ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <TokenIcon symbol={item.token} icon={item.tokenIcon} size="md" />
          <div className="flex flex-col">
            <span className="font-semibold">{item.token}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <Typography variant="large" className="font-medium text-white">
          {item.percentage}%
        </Typography>
        <Typography variant="muted" className="text-xs">
          {item.amount} {item.token}
        </Typography>
        <Typography variant="muted" className="mt-6 text-xs uppercase">
          Est. montly earns: {item.monthlyEarn} {item.token}
        </Typography>
      </CardContent>
    </Card>
  );
});
