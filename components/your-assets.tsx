'use client';

import { Fragment } from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';
import type { Asset } from '@/types/dashboard';
import { Typography } from '@/components/atoms/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatNumber } from '@/lib/utils';

interface YourAssetsProps {
  assets: Asset[];
  onSeeAll?: () => void;
}

export function YourAssets({ assets, onSeeAll }: YourAssetsProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Assets</CardTitle>
        <Button variant="ghost" size="xs" onClick={onSeeAll}>
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-input mb-3 flex justify-between rounded-xs px-3 py-2">
          <Typography variant="muted" className="text-grayscale-500 text-xs">
            Amount
          </Typography>
          <Typography variant="muted" className="text-grayscale-500 text-xs">
            Value & Change
          </Typography>
        </div>
        <div className="flex w-full max-w-md flex-col gap-6">
          <ItemGroup>
            {assets.map((asset, index) => (
              <Fragment key={asset.id}>
                <Item className={assets.length - 1 === index ? 'pb-0' : 'pb-2.5'}>
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
                      <span className="font-medium tabular-nums">
                        ${formatNumber(asset.usdValue)}
                      </span>
                      <div
                        className={cn(
                          'flex items-center gap-1 text-xs',
                          asset.change24h >= 0 ? 'text-primary-400' : 'text-destructive',
                        )}
                      >
                        {Math.abs(asset.change24h)}%
                        <IconArrowUpRight
                          className="size-3"
                          style={{
                            transform: asset.change24h < 0 ? 'rotate(90deg)' : undefined,
                          }}
                        />
                      </div>
                    </div>
                  </ItemActions>
                </Item>
                {index !== assets.length - 1 && <ItemSeparator />}
              </Fragment>
            ))}
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  );
}
