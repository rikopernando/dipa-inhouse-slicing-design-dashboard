'use client';

import { memo } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortableTableHeaderProps {
  label: string;
  onSort: () => void;
  className?: string;
}

export const SortableTableHeader = memo(function SortableTableHeader({
  label,
  onSort,
  className,
}: SortableTableHeaderProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onSort}
      className={`font-inter-tight text-grayscale-500 !px-0 text-xs font-medium ${className || ''}`}
    >
      {label}
      <ChevronsUpDown className="ml-2 size-4" />
    </Button>
  );
});
