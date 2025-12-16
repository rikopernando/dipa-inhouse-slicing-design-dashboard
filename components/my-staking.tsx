'use client';

import * as React from 'react';

import { TokenIcon } from '@/components/atoms/token-icon';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatNumber } from '@/lib/utils';
import type { StakingItem } from '@/types/dashboard';

interface MyStakingProps {
  stakingItems: StakingItem[];
  sortBy?: 'apy' | 'amount' | 'status';
  onSortChange?: (sort: string) => void;
}

type FilterTab = 'All' | 'Staked' | 'History';
type SortOption = 'apy' | 'amount' | 'status';

export function MyStaking({ stakingItems, sortBy = 'apy' }: MyStakingProps) {
  const [activeTab, setActiveTab] = React.useState<FilterTab>('All');
  const [sortOption, setSortOption] = React.useState<SortOption>(sortBy);

  const filteredItems = React.useMemo(() => {
    let items = [...stakingItems];

    // Filter by tab
    if (activeTab === 'Staked') {
      items = items.filter((item) => item.status === 'Staked');
    } else if (activeTab === 'History') {
      items = items.filter((item) => item.status === 'Unstaked');
    }

    // Sort
    items.sort((a, b) => {
      switch (sortOption) {
        case 'apy':
          return b.apy - a.apy;
        case 'amount':
          return b.usdValue - a.usdValue;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return items;
  }, [stakingItems, activeTab, sortOption]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Staking</CardTitle>
        <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apy">APY</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FilterTab)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Staked">Staked</TabsTrigger>
            <TabsTrigger value="History">History</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <TokenIcon symbol={item.token} icon={item.tokenIcon} size="md" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.token}</span>
                    <Badge
                      variant={
                        item.status === 'Staked'
                          ? 'default'
                          : item.status === 'Unstaked'
                            ? 'secondary'
                            : 'outline'
                      }
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="tabular-nums">{item.apy}% APY</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-semibold tabular-nums">${formatNumber(item.usdValue)}</span>
                <span className="text-sm text-muted-foreground">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
