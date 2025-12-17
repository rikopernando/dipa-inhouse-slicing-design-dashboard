'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function NavPromo() {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-teal-900/30 to-teal-950/50">
      <CardContent className="relative">
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <Image
              src="/crypto-icons/3d-coin.svg"
              alt="Crypto coin"
              width={48}
              height={48}
              className="size-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white">Earn while you sleep</h3>
            <p className="text-muted-foreground text-sm">
              Put your idle crypto to work with flexible yield options.
            </p>
          </div>
          <Button size="sm" variant="secondary">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
