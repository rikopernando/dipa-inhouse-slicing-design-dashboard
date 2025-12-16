import { cn } from '@/lib/utils';

interface ExchangeRateDisplayProps {
  fromSymbol: string;
  toSymbol: string;
  rate: string;
  className?: string;
}

export function ExchangeRateDisplay({
  fromSymbol,
  toSymbol,
  rate,
  className,
}: ExchangeRateDisplayProps) {
  return (
    <div className={cn('flex items-center justify-center gap-1 text-sm text-muted-foreground', className)}>
      <span>
        1 {fromSymbol} = {rate} {toSymbol}
      </span>
    </div>
  );
}
