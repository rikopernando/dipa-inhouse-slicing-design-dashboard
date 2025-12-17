'use client';

import { memo } from 'react';
import type { Payload, ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { Typography } from '@/components/atoms/typography';
import { formatNumber } from '@/lib/utils';
import type { PortfolioDataPoint } from '@/types/dashboard';

interface PortfolioChartTooltipProps {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
  filterDataByTimeRange: PortfolioDataPoint[];
  className?: string;
}

export const PortfolioChartTooltip = memo(
  function PortfolioChartTooltip({
    active,
    payload,
    filterDataByTimeRange,
    className,
  }: PortfolioChartTooltipProps) {
    if (!active || !payload || !payload.length) {
      return null;
    }

    // Format date to "March 19, 2025"
    const dataPoint = payload[0].payload;
    const date = new Date(
      filterDataByTimeRange.find((d) => d.date === dataPoint?.date)?.date || new Date(),
    );
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <div
        className={`border-border bg-popover rounded-lg border p-3 shadow-lg ${className || ''}`}
      >
        <div className="flex flex-col gap-2">
          {/* Date Header */}
          <Typography
            variant="small"
            as="div"
            className="text-foreground border-border pb-2 font-medium"
          >
            {formattedDate}
          </Typography>

          {/* Portfolio Worth */}
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary size-2 rounded-full" />
              <Typography variant="small" as="span" className="text-muted-foreground">
                Portfolio&apos;s worth
              </Typography>
            </div>
            <Typography
              variant="small"
              as="span"
              className="text-foreground font-semibold tabular-nums"
            >
              ${formatNumber(Number(payload[0]?.value ?? 0))}
            </Typography>
          </div>

          {/* Top Movers */}
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-secondary size-2 rounded-full" />
              <Typography variant="small" as="span" className="text-muted-foreground">
                Top movers
              </Typography>
            </div>
            <Typography variant="small" as="span" className="text-foreground font-semibold">
              BTC & ETH
            </Typography>
          </div>
        </div>
      </div>
    );
  },
  // Custom comparison function for performance
  (prevProps, nextProps) => {
    return (
      prevProps.active === nextProps.active &&
      prevProps.payload?.length === nextProps.payload?.length &&
      prevProps.payload?.[0]?.value === nextProps.payload?.[0]?.value
    );
  },
);
