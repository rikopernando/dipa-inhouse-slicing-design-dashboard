'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { TokenIcon } from '@/components/atoms/token-icon';
import type { Token } from '@/types/dashboard';

interface TokenInputProps {
  label: string;
  id: string;
  selectedToken: Token;
  amount: string;
  onTokenChange: (symbol: string) => void;
  onAmountChange: (amount: string) => void;
  availableTokens: Token[];
  placeholder?: string;
  className?: string;
}

export const TokenInput = React.memo(function TokenInput({
  label,
  id,
  selectedToken,
  amount,
  onTokenChange,
  onAmountChange,
  availableTokens,
  placeholder = '0.00',
  className,
}: TokenInputProps) {
  const handleAmountChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onAmountChange(e.target.value);
    },
    [onAmountChange],
  );

  return (
    <FieldGroup className={className}>
      <Field>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <InputGroup className="bg-accent border-luxury-black-500 h-11">
          <InputGroupInput
            id={id}
            placeholder={placeholder}
            className="bg-accent"
            value={amount}
            onChange={handleAmountChange}
          />
          <InputGroupAddon align="inline-end">
            <Select value={selectedToken.symbol} onValueChange={onTokenChange}>
              <SelectTrigger className="bg-input" size="xs">
                <SelectValue className="text-xs">
                  <div className="flex items-center gap-2">
                    <TokenIcon symbol={selectedToken.symbol} icon={selectedToken.icon} size="xs" />
                    <span>{selectedToken.symbol}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center gap-2">
                      <TokenIcon symbol={token.symbol} icon={token.icon} size="sm" />
                      <span>{token.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
});
