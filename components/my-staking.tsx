'use client';

import { useMemo, useRef, useState } from 'react';

import { StakingCard } from '@/components/atoms/staking-card';
import { HorizontalScrollButtons } from '@/components/molecules/horizontal-scroll-buttons';
import { StakingListItem } from '@/components/molecules/staking-list-item';
import { StakingFilterControls } from '@/components/molecules/staking-filter-controls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { MyStakingItem, StakingItem } from '@/types/dashboard';

interface MyStakingProps {
  myStakingItems: MyStakingItem[];
  stakingItems: StakingItem[];
  onSortChange?: (sort: string) => void;
}

type FilterTab = 'All' | 'Staked' | 'Earnings' | 'History';

export function MyStaking({ myStakingItems, stakingItems }: MyStakingProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    let items = [...stakingItems];

    // Filter by tab
    if (activeTab === 'Staked') {
      items = items.filter((item) => item.status === 'Staked');
    } else if (activeTab === 'History') {
      items = items.filter((item) => item.status === 'Unstaked');
    }

    return items;
  }, [stakingItems, activeTab]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Staking</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-0">
        {/* Horizontal scrollable card section */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="no-scrollbar ml-0 flex gap-4 overflow-x-auto px-4"
          >
            {myStakingItems.map((item) => (
              <StakingCard key={`card-${item.id}`} item={item} />
            ))}
          </div>
          <HorizontalScrollButtons containerRef={scrollContainerRef} />
        </div>

        <div className="px-4">
          <Separator />

          <StakingFilterControls
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            className="mt-6 mb-4"
          />

          {/* Row list view */}
          <div className="flex flex-col gap-2">
            {filteredItems.map((item) => (
              <StakingListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
