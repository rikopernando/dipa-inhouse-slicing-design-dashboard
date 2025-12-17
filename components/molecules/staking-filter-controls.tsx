'use client';

import { memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type FilterTab = 'All' | 'Staked' | 'Earnings' | 'History';

interface StakingFilterControlsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  onSortClick?: () => void;
  className?: string;
}

export const StakingFilterControls = memo(function StakingFilterControls({
  activeTab,
  onTabChange,
  onSortClick,
  className,
}: StakingFilterControlsProps) {
  const handleTabChange = useCallback(
    (value: string) => {
      if (value) {
        onTabChange(value as FilterTab);
      }
    },
    [onTabChange],
  );

  return (
    <div className={`flex justify-between ${className || ''}`}>
      <ToggleGroup
        type="single"
        value={activeTab}
        spacing={1}
        onValueChange={handleTabChange}
        className="justify-start"
      >
        <ToggleGroupItem value="All" aria-label="All" size="xs">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="Staked" aria-label="Staked" size="xs">
          Staked
        </ToggleGroupItem>
        <ToggleGroupItem value="Earnings" aria-label="Earnings" size="xs">
          Earnings
        </ToggleGroupItem>
        <ToggleGroupItem value="History" aria-label="History" size="xs">
          History
        </ToggleGroupItem>
      </ToggleGroup>

      <Button variant="secondary" size="sm" onClick={onSortClick} className="hidden sm:flex">
        Sort by
        <ChevronDown className="text-grayscale-500" />
      </Button>
    </div>
  );
});
