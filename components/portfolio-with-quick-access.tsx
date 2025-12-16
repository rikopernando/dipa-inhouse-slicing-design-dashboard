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
import { IconArrowsUpDown } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ExchangeRateDisplay } from '@/components/atoms/exchange-rate-display';
import { TokenIcon } from '@/components/atoms/token-icon';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatNumber } from '@/lib/utils';
import { availableTokens } from '@/lib/mock-data/tokens';
import type { PortfolioDataPoint, PortfolioSummary, Token } from '@/types/dashboard';

interface PortfolioWithQuickAccessProps {
  portfolioData: PortfolioDataPoint[];
  summary: PortfolioSummary;
  activeTab?: 'Swap' | 'Deposit' | 'Withdraw' | 'Transfer';
  onPreview?: (data: {
    fromToken: Token;
    toToken: Token;
    fromAmount: string;
    toAmount: string;
  }) => void;
}

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | 'All';

export function PortfolioWithQuickAccess({
  portfolioData,
  summary,
  activeTab = 'Swap',
  onPreview,
}: PortfolioWithQuickAccessProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('3M');
  const [selectedTab, setSelectedTab] = React.useState(activeTab);
  const [fromToken, setFromToken] = React.useState<Token>(availableTokens[0]);
  const [toToken, setToToken] = React.useState<Token>(availableTokens[1]);
  const [fromAmount, setFromAmount] = React.useState('');
  const [toAmount, setToAmount] = React.useState('');
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
        return portfolioData;
    }

    return portfolioData.filter((item) => new Date(item.date) >= filterDate);
  }, [portfolioData, timeRange]);

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

  const handleFromTokenChange = (symbol: string) => {
    const token = availableTokens.find((t) => t.symbol === symbol);
    if (token) setFromToken(token);
  };

  const handleToTokenChange = (symbol: string) => {
    const token = availableTokens.find((t) => t.symbol === symbol);
    if (token) setToToken(token);
  };

  const handlePreview = () => {
    onPreview?.({
      fromToken,
      toToken,
      fromAmount,
      toAmount,
    });
  };

  return (
    <Card>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_400px]">
        {/* Left Side - Portfolio Chart */}
        <div className="flex flex-col">
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
                <Select
                  value={timeRange}
                  onValueChange={(value) => setTimeRange(value as TimeRange)}
                >
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
                              <span className="font-bold text-foreground">
                                {payload[0].payload.date}
                              </span>
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
        </div>

        {/* Vertical Separator */}
        <Separator orientation="vertical" className="hidden lg:block" />

        {/* Right Side - Quick Access */}
        <div className="flex flex-col border-t lg:border-t-0">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <Tabs
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value as typeof activeTab)}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="Swap">Swap</TabsTrigger>
                <TabsTrigger value="Deposit">Deposit</TabsTrigger>
                <TabsTrigger value="Withdraw">Withdraw</TabsTrigger>
                <TabsTrigger value="Transfer">Transfer</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {selectedTab === 'Swap' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="from-token">You send</Label>
                  <div className="flex gap-2">
                    <Select value={fromToken.symbol} onValueChange={handleFromTokenChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <TokenIcon symbol={fromToken.symbol} icon={fromToken.icon} size="sm" />
                            <span>{fromToken.symbol}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {availableTokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center gap-2">
                              <TokenIcon symbol={token.symbol} icon={token.icon} size="sm" />
                              <span>{token.symbol}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="from-amount"
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <IconArrowsUpDown className="size-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="to-token">You'll receive</Label>
                  <div className="flex gap-2">
                    <Select value={toToken.symbol} onValueChange={handleToTokenChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <TokenIcon symbol={toToken.symbol} icon={toToken.icon} size="sm" />
                            <span>{toToken.symbol}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {availableTokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center gap-2">
                              <TokenIcon symbol={token.symbol} icon={token.icon} size="sm" />
                              <span>{token.symbol}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="to-amount"
                      type="number"
                      placeholder="0.00"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <ExchangeRateDisplay
                  fromSymbol={fromToken.symbol}
                  toSymbol={toToken.symbol}
                  rate="1,000"
                  className="py-2"
                />

                <Button onClick={handlePreview} size="lg" className="w-full">
                  Preview
                </Button>
              </>
            )}
            {selectedTab !== 'Swap' && (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border">
                <p className="text-sm text-muted-foreground">{selectedTab} coming soon</p>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
