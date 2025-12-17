'use client';

import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChartCenterLabel } from '@/components/atoms/pie-chart-center-label';
import { PortfolioBreakdownLegend } from '@/components/molecules/portfolio-breakdown-legend';
import type { BreakdownItem } from '@/types/dashboard';

interface PortfolioBreakdownProps {
  breakdown: BreakdownItem[];
}

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
                    <PieChartCenterLabel {...props} largestHolding={largestHolding.name} />
                  )}
                  position="center"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <PortfolioBreakdownLegend breakdown={breakdown} />
        </div>
      </CardContent>
    </Card>
  );
}
