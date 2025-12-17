import { AppSidebar } from '@/components/app-sidebar';
import { CommunityFeed } from '@/components/community-feed';
import { MarketTable } from '@/components/market-table';
import { MyStaking } from '@/components/my-staking';
import { PortfolioBreakdown } from '@/components/portfolio-breakdown';
import { PortfolioWithQuickAccess } from '@/components/portfolio-with-quick-access';
import { SecurityAlertBanner } from '@/components/security-alert-banner';
import { SiteHeader } from '@/components/site-header';
import { YourAssets } from '@/components/your-assets';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { userAssets } from '@/lib/mock-data/assets';
import { communityPosts } from '@/lib/mock-data/community';
import { marketCoins } from '@/lib/mock-data/market';
import {
  portfolioBreakdown,
  portfolioChartData,
  portfolioSummaryData,
} from '@/lib/mock-data/portfolio';
import { securityAlertData } from '@/lib/mock-data/security';
import { myStakingItems, stakingItems } from '@/lib/mock-data/staking';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 60)',
          '--header-height': 'calc(var(--spacing) * 17)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:p-6">
            {/* Full-width Security Alert */}
            <SecurityAlertBanner {...securityAlertData} />

            {/* Portfolio Chart with Quick Access - Combined Card */}
            <PortfolioWithQuickAccess
              portfolioData={portfolioChartData}
              summary={portfolioSummaryData}
              activeTab="Swap"
            />

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Left Column - Main Content */}
              <div className="col-span-1 flex flex-col gap-4 lg:col-span-7">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <YourAssets assets={userAssets} />
                  <PortfolioBreakdown breakdown={portfolioBreakdown} />
                </div>
                <MarketTable coins={marketCoins} />
              </div>

              {/* Right Column - Sidebar Widgets */}
              <div className="col-span-1 flex flex-col gap-4 lg:col-span-5">
                <MyStaking myStakingItems={myStakingItems} stakingItems={stakingItems} />
                {/* Full-width Community Feed */}
                <CommunityFeed posts={communityPosts} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
