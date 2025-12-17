'use client';

import * as React from 'react';
import {
  IconLayoutDashboard,
  IconWallet,
  IconArrowsExchange,
  IconCoins,
  IconChartLine,
  IconNews,
  IconBookmark,
  IconChartBar,
  IconHelp,
  IconGift,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { NavWatchlist } from '@/components/nav-watchlist';
import { NavPromo } from '@/components/nav-promo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';

const data = {
  user: {
    name: 'Giyu Tomizawa',
    email: 'giyuuzw@mail.com',
    avatar: '/avatars/Avatar.webp',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconLayoutDashboard,
      isActive: true,
    },
    {
      title: 'My Assets',
      url: '#',
      icon: IconWallet,
    },
    {
      title: 'Trade',
      url: '#',
      icon: IconArrowsExchange,
    },
    {
      title: 'Staking',
      url: '#',
      icon: IconCoins,
    },
    {
      title: 'Market',
      url: '#',
      icon: IconChartLine,
    },
    {
      title: 'News & Trends',
      url: '#',
      icon: IconNews,
    },
    {
      title: 'Watchlist',
      url: '#',
      icon: IconBookmark,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: IconChartBar,
    },
  ],
  watchlist: [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 63250.0,
      change: 2.14,
      icon: '/crypto-icons/btc.svg',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3180.4,
      change: -0.72,
      icon: '/crypto-icons/eth.svg',
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      price: 145.75,
      change: 1.08,
      icon: '/crypto-icons/sol.svg',
    },
  ],
  navSecondary: [
    {
      title: 'Help center',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Referral',
      url: '#',
      icon: IconGift,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#" className="flex items-center gap-2 p-0">
                <Image
                  alt="StableVault"
                  className="mt-2 size-8"
                  width={32}
                  height={32}
                  src="/images/logo.svg"
                />
                <span className="text-lg font-semibold">StableVault</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavWatchlist items={data.watchlist} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavPromo />
      </SidebarFooter>
    </Sidebar>
  );
}
