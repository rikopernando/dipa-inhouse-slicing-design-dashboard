'use client';

import { memo, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { TimeRange } from '@/types/dashboard';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  isMobile?: boolean;
  className?: string;
}

export const TimeRangeSelector = memo(function TimeRangeSelector({
  value,
  onChange,
  isMobile = false,
  className,
}: TimeRangeSelectorProps) {
  const handleChange = useCallback(
    (newValue: string) => {
      if (newValue) {
        onChange(newValue as TimeRange);
      }
    },
    [onChange],
  );

  if (isMobile) {
    return (
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`w-[120px] ${className || ''}`}>{value}</SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Time</SelectItem>
          <SelectItem value="1W">1 Week</SelectItem>
          <SelectItem value="1M">1 Month</SelectItem>
          <SelectItem value="3M">3 Months</SelectItem>
          <SelectItem value="6M">6 Months</SelectItem>
          <SelectItem value="1Y">1 Year</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={value}
      spacing={1}
      onValueChange={handleChange}
      className={`justify-start ${className || ''}`}
    >
      <ToggleGroupItem value="All" aria-label="All Time" size="xs">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="1W" aria-label="1 Week" size="xs">
        1W
      </ToggleGroupItem>
      <ToggleGroupItem value="1M" aria-label="1 Month" size="xs">
        1M
      </ToggleGroupItem>
      <ToggleGroupItem value="3M" aria-label="3 Months" size="xs">
        3M
      </ToggleGroupItem>
      <ToggleGroupItem value="6M" aria-label="6 Months" size="xs">
        6M
      </ToggleGroupItem>
      <ToggleGroupItem value="1Y" aria-label="1 Year" size="xs">
        1Y
      </ToggleGroupItem>
    </ToggleGroup>
  );
});
