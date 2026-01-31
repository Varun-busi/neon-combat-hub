/**
 * GameButton - Military-styled action button
 * Variants: primary (cyan), danger (red), ghost, outline
 */

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GameButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'danger' | 'ghost' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  children: React.ReactNode;
}

const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary',
      danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive',
      ghost: 'bg-transparent text-foreground hover:bg-muted/50 border-transparent',
      outline: 'bg-transparent text-primary hover:bg-primary/10 border-primary',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90 border-accent',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    const glowStyles = {
      primary: 'shadow-glow-cyan',
      danger: 'shadow-glow-red',
      accent: 'shadow-glow-orange',
      ghost: '',
      outline: '',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative font-orbitron font-semibold uppercase tracking-wider',
          'border-2 rounded-sm transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'corner-cuts',
          variants[variant],
          sizes[size],
          glow && glowStyles[variant],
          className
        )}
        {...props}
      >
        {/* Scan line effect on hover */}
        <span className="absolute inset-0 overflow-hidden rounded-sm opacity-0 hover:opacity-100 transition-opacity">
          <span className="absolute inset-0 translate-y-full animate-scan bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </span>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

GameButton.displayName = 'GameButton';

export { GameButton };
