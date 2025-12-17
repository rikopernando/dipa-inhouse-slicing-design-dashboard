'use client';

import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import Image from 'next/image';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface WatchlistItem {
  name: string;
  symbol: string;
  price: number;
  change: number;
  icon: string;
}

export function NavWatchlist({ items }: { items: WatchlistItem[] }) {
  return (
    <SidebarGroup className="mt-4">
      <SidebarGroupLabel className="text-grayscale-500 text-xs font-medium tracking-wider uppercase">
        My Watchlist
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu className="space-y-3">
          {items.map((item) => {
            const isPositive = item.change > 0;
            const formattedPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(item.price);
            const formattedChange = `${isPositive ? '+' : ''}${item.change.toFixed(2)}%`;

            return (
              <SidebarMenuItem key={item.symbol}>
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-muted-foreground text-xs font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{formattedPrice}</span>
                      <div
                        className={cn(
                          'flex items-center gap-0.5 text-xs font-medium',
                          isPositive ? 'text-primary-400' : 'text-destructive',
                        )}
                      >
                        <span>{formattedChange}</span>
                        {isPositive ? (
                          <IconTrendingUp className="size-3" />
                        ) : (
                          <IconTrendingDown className="size-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
