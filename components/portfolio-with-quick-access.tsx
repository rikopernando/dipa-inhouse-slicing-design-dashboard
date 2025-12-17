'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { IconArrowsUpDown } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ExchangeRateDisplay } from '@/components/atoms/exchange-rate-display';
import { TokenIcon } from '@/components/atoms/token-icon';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatNumber } from '@/lib/utils';
import { availableTokens } from '@/lib/mock-data/tokens';
import type { PortfolioDataPoint, PortfolioSummary, Token } from '@/types/dashboard';
import {
  Coins,
  ArrowRightLeft,
  ChartCandlestick,
  ChartLine,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

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
type TypeChart = 'LINE' | 'CANDLESTICK';

export function PortfolioWithQuickAccess({
  portfolioData,
  summary,
  activeTab = 'Swap',
  onPreview,
}: PortfolioWithQuickAccessProps) {
  const [typeChart, setTypeChart] = React.useState<TypeChart>('LINE');
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
      default:
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
    <Card className="relative bg-[url(/images/abstract/portfolio-gradient.svg)] bg-no-repeat">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_387px]">
        {/* Left Side - Portfolio Chart */}
        <div className="flex flex-col">
          <CardHeader className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <CardDescription>Total portfolio</CardDescription>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl font-medium tabular-nums lg:text-2xl">
                    ${formatNumber(summary.totalValue)}
                  </CardTitle>
                  <Badge variant={summary.percentageChange >= 0 ? 'outline' : 'destructive'}>
                    <p className="text-gradient-primary text-xs">{summary.percentageChangeLabel}</p>
                  </Badge>
                </div>
                <CardDescription>{summary.totalChangeLabel}</CardDescription>
              </div>
              {!isMobile ? (
                <div className="flex gap-2">
                  <ToggleGroup
                    type="single"
                    value={timeRange}
                    spacing={1}
                    onValueChange={(value) => value && setTimeRange(value as TimeRange)}
                    className="justify-start"
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
                  <ToggleGroup
                    type="single"
                    value={typeChart}
                    spacing={1}
                    onValueChange={(value) => value && setTypeChart(value as TypeChart)}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="LINE" aria-label="LINE" size="xs">
                      <ChartLine />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="CANDLESTICK" aria-label="CANDLESTICK" size="xs">
                      <ChartCandlestick />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
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
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 290}>
              <LineChart data={chartData} margin={{ top: 0, right: 0, left: -32, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="6 6" className="stroke-accent" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  className="text-primary text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                  className="text-accent-foreground text-xs"
                />
                <Tooltip
                  cursor={{
                    stroke: 'var(--accent)',
                    strokeWidth: 2,
                    strokeDasharray: '6 6',
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      // Format date to "March 19, 2025"
                      const dataPoint = payload[0].payload;
                      const date = new Date(
                        filterDataByTimeRange.find((d) => d.date === dataPoint.date)?.date ||
                          new Date(),
                      );
                      const formattedDate = date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      });

                      return (
                        <div className="border-border bg-popover rounded-lg border p-3 shadow-lg">
                          <div className="flex flex-col gap-2">
                            {/* Date Header */}
                            <div className="text-foreground border-border pb-2 text-sm font-medium">
                              {formattedDate}
                            </div>

                            {/* Portfolio Worth */}
                            <div className="flex items-center justify-between gap-8">
                              <div className="flex items-center gap-2">
                                <div className="bg-primary size-2 rounded-full" />
                                <span className="text-muted-foreground text-sm">
                                  Portfolio&apos;s worth
                                </span>
                              </div>
                              <span className="text-foreground text-sm font-semibold tabular-nums">
                                ${formatNumber(payload[0].value as number)}
                              </span>
                            </div>

                            {/* Top Movers */}
                            <div className="flex items-center justify-between gap-8">
                              <div className="flex items-center gap-2">
                                <div className="bg-secondary size-2 rounded-full" />
                                <span className="text-muted-foreground text-sm">Top movers</span>
                              </div>
                              <span className="text-foreground text-sm font-semibold">
                                BTC & ETH
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: 'var(--primary)',
                    stroke: 'var(--accent)',
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </div>

        {/* Vertical Separator */}
        <Separator orientation="vertical" className="hidden lg:block" />

        {/* Right Side - Quick Access */}
        <div className="flex flex-col border-t lg:border-t-0">
          <CardHeader className="gap-3">
            <CardTitle className="text-sm font-medium">Quick Access</CardTitle>
            <ToggleGroup
              type="single"
              value={selectedTab}
              spacing={1}
              onValueChange={(value) => value && setSelectedTab(value as typeof activeTab)}
              className="w-full justify-center"
            >
              <ToggleGroupItem value="Swap" aria-label="Swap" size="xs">
                <ArrowRightLeft />
                Swap
              </ToggleGroupItem>
              <ToggleGroupItem value="Deposit" aria-label="Deposit" size="xs">
                <Coins /> Deposit
              </ToggleGroupItem>
              <ToggleGroupItem value="Withdraw" aria-label="Withdraw" size="xs">
                <BanknoteArrowDown />
                Withdraw
              </ToggleGroupItem>
              <ToggleGroupItem value="Transfer" aria-label="Transfer" size="xs">
                <BanknoteArrowUp />
                Transfer
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent className="mt-3 flex flex-col gap-4">
            {selectedTab === 'Swap' && (
              <>
                <Card className="bg-input py-0">
                  <CardContent className="px-0 py-3">
                    <FieldGroup className="px-3">
                      <Field>
                        <FieldLabel htmlFor="send">You Send</FieldLabel>
                        <InputGroup className="bg-accent border-luxury-black-500 h-11">
                          <InputGroupInput
                            placeholder="0.00"
                            className="bg-accent"
                            onChange={(e) => setFromAmount(e.target.value)}
                          />
                          <InputGroupAddon align="inline-end">
                            <Select value={fromToken.symbol} onValueChange={handleFromTokenChange}>
                              <SelectTrigger className="bg-input" size="xs">
                                <SelectValue className="text-xs">
                                  <div className="flex items-center gap-2">
                                    <TokenIcon
                                      symbol={fromToken.symbol}
                                      icon={fromToken.icon}
                                      size="xs"
                                    />
                                    <span>{fromToken.symbol}</span>
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {availableTokens.map((token) => (
                                  <SelectItem key={token.symbol} value={token.symbol}>
                                    <div className="flex items-center gap-2">
                                      <TokenIcon
                                        symbol={token.symbol}
                                        icon={token.icon}
                                        size="sm"
                                      />
                                      <span>{token.symbol}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    </FieldGroup>

                    <div className="relative my-8 flex flex-col justify-center">
                      <Separator />
                      <div className="bg-gradient-accent absolute left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border">
                        <IconArrowsUpDown className="text-muted-foreground size-4" />
                      </div>
                    </div>

                    <FieldGroup className="px-3">
                      <Field>
                        <FieldLabel htmlFor="receive">You&apos;ll receive</FieldLabel>
                        <InputGroup className="bg-accent border-luxury-black-500 h-11">
                          <InputGroupInput
                            placeholder="0.00"
                            className="bg-accent"
                            onChange={(e) => setToAmount(e.target.value)}
                          />
                          <InputGroupAddon align="inline-end">
                            <Select value={toToken.symbol} onValueChange={handleToTokenChange}>
                              <SelectTrigger className="bg-input" size="xs">
                                <SelectValue className="text-xs">
                                  <div className="flex items-center gap-2">
                                    <TokenIcon
                                      symbol={toToken.symbol}
                                      icon={toToken.icon}
                                      size="xs"
                                    />
                                    <span>{toToken.symbol}</span>
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {availableTokens.map((token) => (
                                  <SelectItem key={token.symbol} value={token.symbol}>
                                    <div className="flex items-center gap-2">
                                      <TokenIcon
                                        symbol={token.symbol}
                                        icon={token.icon}
                                        size="sm"
                                      />
                                      <span>{token.symbol}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    </FieldGroup>

                    <ExchangeRateDisplay
                      fromSymbol={fromToken.symbol}
                      toSymbol={toToken.symbol}
                      rate="1,000"
                      className="mt-4 mb-2 px-3"
                    />
                  </CardContent>
                </Card>

                <Button onClick={handlePreview} className="w-full">
                  Preview
                </Button>
              </>
            )}
            {selectedTab !== 'Swap' && (
              <div className="border-border flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground text-sm">{selectedTab} coming soon</p>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
