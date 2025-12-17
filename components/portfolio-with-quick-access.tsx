'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PortfolioChart } from '@/components/organisms/portfolio-chart';
import { QuickAccessPanel } from '@/components/organisms/quick-access-panel';
import { availableTokens } from '@/lib/mock-data/tokens';
import type {
  PortfolioDataPoint,
  PortfolioSummary,
  QuickAccessTab,
  Token,
} from '@/types/dashboard';

interface PortfolioWithQuickAccessProps {
  portfolioData: PortfolioDataPoint[];
  summary: PortfolioSummary;
  activeTab?: QuickAccessTab;
  onPreview?: (data: {
    fromToken: Token;
    toToken: Token;
    fromAmount: string;
    toAmount: string;
  }) => void;
}

export function PortfolioWithQuickAccess({
  portfolioData,
  summary,
  activeTab = 'Swap',
  onPreview,
}: PortfolioWithQuickAccessProps) {
  return (
    <Card className="relative bg-[url(/images/abstract/portfolio-gradient.svg)] bg-no-repeat">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_387px]">
        {/* Left Side - Portfolio Chart */}
        <PortfolioChart portfolioData={portfolioData} summary={summary} />

        {/* Vertical Separator */}
        <Separator orientation="vertical" className="hidden lg:block" />

        {/* Right Side - Quick Access */}
        <QuickAccessPanel
          activeTab={activeTab}
          availableTokens={availableTokens}
          onPreview={onPreview}
        />
      </div>
    </Card>
  );
}
