'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface TokenIconProps {
  symbol: string;
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
};

export function TokenIcon({ symbol, icon, size = 'md', className }: TokenIconProps) {
  const [imageError, setImageError] = useState(false);
  const pixelSize = sizeMap[size];

  if (imageError) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-semibold text-white',
          size === 'sm' && 'size-6 text-xs',
          size === 'md' && 'size-8 text-sm',
          size === 'lg' && 'size-10 text-base',
          className,
        )}
      >
        {symbol.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      src={icon}
      alt={symbol}
      width={pixelSize}
      height={pixelSize}
      className={cn('rounded-full', className)}
      onError={() => setImageError(true)}
    />
  );
}
