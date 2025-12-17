'use client';

import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { AssetChangeBadge } from '@/components/atoms/asset-change-badge';
import { formatNumber } from '@/lib/utils';
import type { Asset } from '@/types/dashboard';

interface AssetListItemProps {
  asset: Asset;
  isLast?: boolean;
  className?: string;
}

export const AssetListItem = memo(function AssetListItem({
  asset,
  isLast = false,
  className,
}: AssetListItemProps) {
  return (
    <Item className={`${isLast ? 'pb-0' : 'pb-2.5'} ${className || ''}`}>
      <ItemMedia>
        <Avatar>
          <AvatarImage src={asset.icon} className="grayscale" />
          <AvatarFallback>{asset.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-1">
        <ItemTitle>
          {asset.amount} {asset.symbol}
        </ItemTitle>
        <ItemDescription>{asset.name}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <div className="flex flex-col items-end gap-1">
          <span className="font-medium tabular-nums">${formatNumber(asset.usdValue)}</span>
          <AssetChangeBadge change24h={asset.change24h} />
        </div>
      </ItemActions>
    </Item>
  );
});
