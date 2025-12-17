'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreakdownItem } from '@/types/dashboard';

interface PortfolioBreakdownProps {
  breakdown: BreakdownItem[];
}

export function PortfolioBreakdown({ breakdown }: PortfolioBreakdownProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Portfolio Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ResponsiveContainer width="50%" height={180}>
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {breakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-3">
            {breakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums">
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
