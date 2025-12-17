'use client';

import { IconArrowsUpDown } from '@tabler/icons-react';
import * as React from 'react';

import { ExchangeRateDisplay } from '@/components/atoms/exchange-rate-display';
import { TokenIcon } from '@/components/atoms/token-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { availableTokens } from '@/lib/mock-data/tokens';
import type { Token } from '@/types/dashboard';

interface QuickAccessWidgetProps {
  activeTab?: 'Swap' | 'Deposit' | 'Withdraw' | 'Transfer';
  onPreview?: (data: {
    fromToken: Token;
    toToken: Token;
    fromAmount: string;
    toAmount: string;
  }) => void;
}

export function QuickAccessWidget({ activeTab = 'Swap', onPreview }: QuickAccessWidgetProps) {
  const [selectedTab, setSelectedTab] = React.useState(activeTab);
  const [fromToken, setFromToken] = React.useState<Token>(availableTokens[0]);
  const [toToken, setToToken] = React.useState<Token>(availableTokens[1]);
  const [fromAmount, setFromAmount] = React.useState('');
  const [toAmount, setToAmount] = React.useState('');

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
              <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                <IconArrowsUpDown className="text-muted-foreground size-4" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="to-token">You&apos;ll receive</Label>
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
          <div className="border-border flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground text-sm">{selectedTab} coming soon</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
