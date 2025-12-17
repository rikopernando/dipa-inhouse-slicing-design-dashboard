'use client';

import { ArrowRightLeft, BanknoteArrowDown, BanknoteArrowUp, Coins } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SwapForm } from '@/components/organisms/swap-form';
import type { QuickAccessTab, Token } from '@/types/dashboard';
import { memo, useCallback, useState } from 'react';

interface QuickAccessPanelProps {
  activeTab?: QuickAccessTab;
  availableTokens: Token[];
  onPreview?: (data: {
    fromToken: Token;
    toToken: Token;
    fromAmount: string;
    toAmount: string;
  }) => void;
  className?: string;
}

export const QuickAccessPanel = memo(function QuickAccessPanel({
  activeTab = 'Swap',
  availableTokens,
  onPreview,
  className,
}: QuickAccessPanelProps) {
  const [selectedTab, setSelectedTab] = useState<QuickAccessTab>(activeTab);

  const handleTabChange = useCallback((value: string) => {
    if (value) {
      setSelectedTab(value as QuickAccessTab);
    }
  }, []);

  return (
    <div className={`flex flex-col border-t lg:border-t-0 ${className || ''}`}>
      <CardHeader className="gap-3 pt-4 lg:pt-0">
        <CardTitle className="text-sm font-medium">Quick Access</CardTitle>
        <ToggleGroup
          type="single"
          value={selectedTab}
          spacing={1}
          onValueChange={handleTabChange}
          className="justify-start"
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
          <SwapForm availableTokens={availableTokens} onPreview={onPreview} />
        )}
        {selectedTab !== 'Swap' && (
          <div className="border-border flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground text-sm">{selectedTab} coming soon</p>
          </div>
        )}
      </CardContent>
    </div>
  );
});
