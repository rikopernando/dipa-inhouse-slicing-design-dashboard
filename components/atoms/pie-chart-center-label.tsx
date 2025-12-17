'use client';

import { memo } from 'react';
import type { ViewBox } from 'recharts/types/util/types';

interface PieChartCenterLabelProps {
  viewBox?: ViewBox;
  largestHolding: string;
}

export const PieChartCenterLabel = memo(function PieChartCenterLabel({
  viewBox,
  largestHolding,
}: PieChartCenterLabelProps) {
  // Type guard to check if viewBox has cx and cy (PolarViewBox)
  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;

  const { cx, cy } = viewBox;

  if (!cx || !cy) return null;

  const radius = 55;
  const circumference = 2 * Math.PI * radius; // ≈ 345.58
  const dashLength = circumference * 0.9; // 90% visible
  const gapLength = circumference * 0.1; // 10% gap

  return (
    <g>
      {/* Circular border - from 8 o'clock to 5 o'clock */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth={3}
        opacity={0.3}
        strokeDasharray={`${dashLength} ${gapLength}`}
        transform={`rotate(108 ${cx} ${cy})`}
      />

      {/* Two-line text */}
      <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="central">
        <tspan fill="var(--card-foreground)" fontSize="16" fontWeight="500">
          {largestHolding}
        </tspan>
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="central">
        <tspan fill="var(--grayscale-500)" fontSize="9" fontWeight="500">
          LARGEST HOLDING
        </tspan>
      </text>
    </g>
  );
});
