'use client';

import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { ViewBox } from 'recharts/types/util/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreakdownItem } from '@/types/dashboard';

interface PortfolioBreakdownProps {
  breakdown: BreakdownItem[];
}

interface CenterLabelProps {
  viewBox?: ViewBox;
  largestHolding: string;
}

const CenterLabel = ({ viewBox, largestHolding }: CenterLabelProps) => {
  // Type guard to check if viewBox has cx and cy (PolarViewBox)
  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;

  const { cx, cy } = viewBox;

  if (!cx || !cy) return null;

  const radius = 55;
  const circumference = 2 * Math.PI * radius; // ≈ 345.58
  const dashLength = circumference * 0.9; // 75% visible (270 degrees: 8 o'clock to 5 o'clock)
  const gapLength = circumference * 0.1; // 25% gap

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
};

export function PortfolioBreakdown({ breakdown }: PortfolioBreakdownProps) {
  // Find the largest holding
  const largestHolding = breakdown.reduce((prev, current) =>
    prev.percentage > current.percentage ? prev : current,
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio Breakdown</CardTitle>
        <Button variant="ghost" size="xs">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="xs:flex-row flex flex-col gap-4 sm:items-center sm:justify-between">
          <ResponsiveContainer width="60%" height={180}>
            <PieChart>
              <Pie
                startAngle={240}
                endAngle={-60}
                data={breakdown}
                dataKey="percentage"
                nameKey="name"
                innerRadius="80%"
                outerRadius="100%"
                cornerRadius="20%"
                paddingAngle={3}
              >
                {breakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
                <Label
                  content={(props) => (
                    <CenterLabel {...props} largestHolding={largestHolding.name} />
                  )}
                  position="center"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex w-full flex-row justify-between">
            {breakdown.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-xs" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground text-sm">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium tabular-nums">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
