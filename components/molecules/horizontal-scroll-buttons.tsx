'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HorizontalScrollButtonsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollAmount?: number;
  className?: string;
}

export const HorizontalScrollButtons = memo(function HorizontalScrollButtons({
  containerRef,
  scrollAmount = 300,
  className,
}: HorizontalScrollButtonsProps) {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScroll();

    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [containerRef, checkScroll]);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      const container = containerRef.current;
      if (!container) return;

      const scrollValue = direction === 'left' ? -scrollAmount : scrollAmount;
      container.scrollBy({ left: scrollValue, behavior: 'smooth' });
    },
    [containerRef, scrollAmount],
  );

  return (
    <>
      {/* Left scroll button */}
      {showLeftButton && (
        <div
          className={cn(
            'absolute top-0 left-0 z-10 flex h-full items-center',
            'from-background via-background/30 bg-linear-to-r to-transparent pr-8 pl-2',
            'pointer-events-none',
            className,
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={() => scroll('left')}
            className="pointer-events-auto size-8 rounded-full shadow-lg backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>
      )}

      {/* Right scroll button */}
      {showRightButton && (
        <div
          className={cn(
            'absolute top-0 right-0 z-10 flex h-full items-center',
            'from-background via-background/30 bg-linear-to-l to-transparent pr-2 pl-8',
            'pointer-events-none',
            className,
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={() => scroll('right')}
            className="pointer-events-auto size-8 rounded-full shadow-lg backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </>
  );
});
