'use client';

import { motion, useInView, type UseInViewOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import type { Variants } from 'framer-motion';
import { defaultViewport } from '@/lib/animations';

interface AnimateOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

/**
 * AnimateOnScroll Component
 *
 * Wrapper component that triggers animations when scrolled into view.
 * Automatically respects prefers-reduced-motion.
 */
export function AnimateOnScroll({
  children,
  variants,
  className,
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, defaultViewport as UseInViewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
