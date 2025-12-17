'use client';

import { Fragment } from 'react';

import { Button } from '@/components/ui/button';
import { ItemGroup, ItemSeparator } from '@/components/ui/item';
import { Typography } from '@/components/atoms/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssetListItem } from '@/components/molecules/asset-list-item';
import type { Asset } from '@/types/dashboard';

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
                <AssetListItem asset={asset} isLast={index === assets.length - 1} />
                {index !== assets.length - 1 && <ItemSeparator />}
              </Fragment>
            ))}
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  );
}
