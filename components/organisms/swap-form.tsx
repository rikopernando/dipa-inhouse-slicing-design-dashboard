'use client';

import { IconArrowsUpDown } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TokenInput } from '@/components/atoms/token-input';
import { ExchangeRateDisplay } from '@/components/atoms/exchange-rate-display';
import type { Token } from '@/types/dashboard';
import { memo, useCallback, useState } from 'react';

interface SwapFormProps {
  availableTokens: Token[];
  initialFromToken?: Token;
  initialToToken?: Token;
  onPreview?: (data: {
    fromToken: Token;
    toToken: Token;
    fromAmount: string;
    toAmount: string;
  }) => void;
  className?: string;
}

export const SwapForm = memo(function SwapForm({
  availableTokens,
  initialFromToken,
  initialToToken,
  onPreview,
  className,
}: SwapFormProps) {
  const [fromToken, setFromToken] = useState<Token>(initialFromToken || availableTokens[0]);
  const [toToken, setToToken] = useState<Token>(initialToToken || availableTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleFromTokenChange = useCallback(
    (symbol: string) => {
      const token = availableTokens.find((t) => t.symbol === symbol);
      if (token) setFromToken(token);
    },
    [availableTokens],
  );

  const handleToTokenChange = useCallback(
    (symbol: string) => {
      const token = availableTokens.find((t) => t.symbol === symbol);
      if (token) setToToken(token);
    },
    [availableTokens],
  );

  const handleFromAmountChange = useCallback((amount: string) => {
    setFromAmount(amount);
  }, []);

  const handleToAmountChange = useCallback((amount: string) => {
    setToAmount(amount);
  }, []);

  const handlePreview = useCallback(() => {
    onPreview?.({
      fromToken,
      toToken,
      fromAmount,
      toAmount,
    });
  }, [fromToken, toToken, fromAmount, toAmount, onPreview]);

  return (
    <div className={className}>
      <Card className="bg-input py-0">
        <CardContent className="px-0 py-3">
          <TokenInput
            label="You Send"
            id="send"
            selectedToken={fromToken}
            amount={fromAmount}
            onTokenChange={handleFromTokenChange}
            onAmountChange={handleFromAmountChange}
            availableTokens={availableTokens}
            className="px-3"
          />

          <div className="relative my-8 flex flex-col justify-center">
            <Separator />
            <div className="bg-gradient-accent absolute left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border">
              <IconArrowsUpDown className="text-muted-foreground size-4" />
            </div>
          </div>

          <TokenInput
            label="You'll receive"
            id="receive"
            selectedToken={toToken}
            amount={toAmount}
            onTokenChange={handleToTokenChange}
            onAmountChange={handleToAmountChange}
            availableTokens={availableTokens}
            className="px-3"
          />

          <ExchangeRateDisplay
            fromSymbol={fromToken.symbol}
            toSymbol={toToken.symbol}
            rate="1,000"
            className="mt-4 mb-2 px-3"
          />
        </CardContent>
      </Card>

      <Button onClick={handlePreview} className="w-full">
        Preview
      </Button>
    </div>
  );
});
