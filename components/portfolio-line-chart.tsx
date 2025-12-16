'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatNumber } from '@/lib/utils';
import type { PortfolioDataPoint, PortfolioSummary } from '@/types/dashboard';

interface PortfolioLineChartProps {
  data: PortfolioDataPoint[];
  summary: PortfolioSummary;
  onTimeRangeChange?: (range: string) => void;
}

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | 'All';

export function PortfolioLineChart({ data, summary }: PortfolioLineChartProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('3M');
  const isMobile = useIsMobile();

  const filterDataByTimeRange = React.useMemo(() => {
    const today = new Date();
    const filterDate = new Date(today);

    switch (timeRange) {
      case '1W':
        filterDate.setDate(today.getDate() - 7);
        break;
      case '1M':
        filterDate.setMonth(today.getMonth() - 1);
        break;
      case '3M':
        filterDate.setMonth(today.getMonth() - 3);
        break;
      case '6M':
        filterDate.setMonth(today.getMonth() - 6);
        break;
      case '1Y':
        filterDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'All':
        return data;
    }

    return data.filter((item) => new Date(item.date) >= filterDate);
  }, [data, timeRange]);

  const chartData = React.useMemo(
    () =>
      filterDataByTimeRange.map((item) => ({
        date: new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        value: item.value,
      })),
    [filterDataByTimeRange],
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardDescription>Your Portfolio Value</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-3xl tabular-nums lg:text-4xl">
                ${formatNumber(summary.totalValue)}
              </CardTitle>
              <Badge
                variant={summary.percentageChange >= 0 ? 'default' : 'destructive'}
                className="text-sm"
              >
                {summary.changeLabel}
              </Badge>
            </div>
          </div>
          {!isMobile ? (
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(value) => value && setTimeRange(value as TimeRange)}
              className="justify-start"
            >
              <ToggleGroupItem value="1W" aria-label="1 Week" size="sm">
                1W
              </ToggleGroupItem>
              <ToggleGroupItem value="1M" aria-label="1 Month" size="sm">
                1M
              </ToggleGroupItem>
              <ToggleGroupItem value="3M" aria-label="3 Months" size="sm">
                3M
              </ToggleGroupItem>
              <ToggleGroupItem value="6M" aria-label="6 Months" size="sm">
                6M
              </ToggleGroupItem>
              <ToggleGroupItem value="1Y" aria-label="1 Year" size="sm">
                1Y
              </ToggleGroupItem>
              <ToggleGroupItem value="All" aria-label="All Time" size="sm">
                All
              </ToggleGroupItem>
            </ToggleGroup>
          ) : (
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
              <SelectTrigger className="w-[120px]">{timeRange}</SelectTrigger>
              <SelectContent>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
                <SelectItem value="All">All Time</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value / 1000}k`}
              className="text-xs text-muted-foreground"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-foreground">{payload[0].payload.date}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Value
                          </span>
                          <span className="font-bold text-foreground">
                            ${formatNumber(payload[0].value as number)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#fillPortfolio)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
