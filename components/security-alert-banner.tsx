'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { SecurityAlert } from '@/types/dashboard';
import { Typography } from '@/components/atoms/typography';

interface SecurityAlertBannerProps extends SecurityAlert {
  onEnableSecurity?: () => void;
}

export function SecurityAlertBanner({
  message,
  description,
  onEnableSecurity,
}: SecurityAlertBannerProps) {
  return (
    <Card className="relative py-0">
      <div className="absolute top-0 left-1 h-full w-25 bg-[url(/images/abstract/dots.svg)] bg-cover bg-center bg-no-repeat" />
      <div className="absolute top-0 right-0 h-full w-45 bg-[url(/images/abstract/pattern.svg)] bg-cover bg-center bg-no-repeat" />
      <CardContent className="flex flex-col gap-4 pl-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3 md:items-center">
          <Image
            src="/images/icons/lock.svg"
            alt="Security Alert"
            className="w-auto"
            width={64}
            height={64}
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small">{message}</Typography>
            <Typography variant="muted">{description}</Typography>
          </div>
        </div>
        <Button variant="outline" onClick={onEnableSecurity} className="shrink-0 md:w-auto">
          <p className="text-gradient-primary">Enable security</p>
        </Button>
      </CardContent>
    </Card>
  );
}
