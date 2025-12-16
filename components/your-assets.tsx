'use client';

import { IconArrowUpRight, IconChevronRight } from '@tabler/icons-react';

import { TokenIcon } from '@/components/atoms/token-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import type { Asset } from '@/types/dashboard';

interface YourAssetsProps {
  assets: Asset[];
  onSeeAll?: () => void;
}

export function YourAssets({ assets, onSeeAll }: YourAssetsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Assets</CardTitle>
        <Button variant="ghost" size="sm" onClick={onSeeAll} className="text-muted-foreground">
          See all
          <IconChevronRight className="ml-1 size-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <TokenIcon symbol={asset.symbol} icon={asset.icon} size="md" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.amount}</span>
                    <span className="text-sm text-muted-foreground">{asset.symbol}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{asset.name}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-semibold tabular-nums">
                  ${formatNumber(asset.usdValue)}
                </span>
                <Badge
                  variant={asset.change24h >= 0 ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  <IconArrowUpRight
                    className="size-3"
                    style={{
                      transform: asset.change24h < 0 ? 'rotate(90deg)' : undefined,
                    }}
                  />
                  {Math.abs(asset.change24h)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
