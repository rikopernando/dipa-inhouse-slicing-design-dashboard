'use client';

import { memo } from 'react';
import { TokenIcon } from '@/components/atoms/token-icon';

interface CoinNameCellProps {
  name: string;
  symbol: string;
  icon?: string;
  className?: string;
}

export const CoinNameCell = memo(function CoinNameCell({
  name,
  symbol,
  icon = '',
  className,
}: CoinNameCellProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <TokenIcon symbol={symbol} icon={icon} size="lg" />
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground text-xs">{symbol}</span>
      </div>
    </div>
  );
});
