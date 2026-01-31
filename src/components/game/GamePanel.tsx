/**
 * GamePanel - Military-styled container panel
 * Used for cards, modals, and content sections
 */

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GamePanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'default' | 'elevated' | 'transparent';
  glow?: 'cyan' | 'orange' | 'none';
  corners?: boolean;
  scanlines?: boolean;
  children: React.ReactNode;
}

const GamePanel = forwardRef<HTMLDivElement, GamePanelProps>(
  ({ className, variant = 'default', glow = 'none', corners = true, scanlines = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-card border-border',
      elevated: 'bg-card/95 backdrop-blur-md border-primary/30',
      transparent: 'bg-background/50 backdrop-blur-sm border-border/50',
    };

    const glowStyles = {
      cyan: 'glow-cyan border-primary',
      orange: 'glow-orange border-accent',
      none: '',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'relative border rounded-sm overflow-hidden',
          'bg-gradient-card shadow-card',
          variants[variant],
          glowStyles[glow],
          corners && 'corner-cuts',
          scanlines && 'scanlines',
          className
        )}
        {...props}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

GamePanel.displayName = 'GamePanel';

export { GamePanel };
