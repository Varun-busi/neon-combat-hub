/**
 * HUD Components - In-game heads-up display elements
 * Includes: Crosshair, HealthBar, AmmoCounter, MiniMap, KillFeed, MatchTimer
 */

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { KillFeedEntry } from '@/types/game';

// ============================================
// CROSSHAIR
// ============================================

interface CrosshairProps {
  style?: 'dot' | 'cross' | 'circle' | 'dynamic';
  color?: string;
  size?: number;
}

export const Crosshair = ({ style = 'cross', color = '#00f0ff', size = 24 }: CrosshairProps) => {
  const renderCrosshair = () => {
    switch (style) {
      case 'dot':
        return (
          <div 
            className="rounded-full" 
            style={{ width: size / 4, height: size / 4, backgroundColor: color }}
          />
        );
      case 'circle':
        return (
          <div 
            className="rounded-full border-2" 
            style={{ width: size, height: size, borderColor: color }}
          />
        );
      case 'dynamic':
        return (
          <>
            <div className="absolute" style={{ width: 2, height: size / 3, backgroundColor: color, top: -size / 2 }} />
            <div className="absolute" style={{ width: 2, height: size / 3, backgroundColor: color, bottom: -size / 2 }} />
            <div className="absolute" style={{ width: size / 3, height: 2, backgroundColor: color, left: -size / 2 }} />
            <div className="absolute" style={{ width: size / 3, height: 2, backgroundColor: color, right: -size / 2 }} />
            <div className="rounded-full" style={{ width: 4, height: 4, backgroundColor: color }} />
          </>
        );
      default: // cross
        return (
          <>
            <div className="absolute" style={{ width: 2, height: size, backgroundColor: color }} />
            <div className="absolute" style={{ width: size, height: 2, backgroundColor: color }} />
          </>
        );
    }
  };

  return (
    <div className="crosshair flex items-center justify-center">
      {renderCrosshair()}
    </div>
  );
};

// ============================================
// HEALTH BAR
// ============================================

interface HealthBarProps {
  current: number;
  max: number;
  showArmor?: boolean;
  armor?: number;
}

export const HealthBar = ({ current, max, showArmor = false, armor = 0 }: HealthBarProps) => {
  const healthPercent = (current / max) * 100;
  const healthColor = healthPercent > 60 ? 'bg-health-full' : healthPercent > 30 ? 'bg-health-medium' : 'bg-health-low';

  return (
    <div className="hud-element p-3 min-w-[200px]">
      <div className="flex items-center gap-3">
        {/* Health icon */}
        <svg className="w-6 h-6 text-health-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        
        <div className="flex-1">
          {/* Health bar */}
          <div className="h-4 bg-muted/50 rounded-sm overflow-hidden">
            <motion.div
              className={cn('h-full rounded-sm', healthColor)}
              initial={{ width: 0 }}
              animate={{ width: `${healthPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Armor bar */}
          {showArmor && armor > 0 && (
            <div className="h-2 mt-1 bg-muted/50 rounded-sm overflow-hidden">
              <motion.div
                className="h-full bg-team-blue rounded-sm"
                animate={{ width: `${armor}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>

        {/* Health number */}
        <span className="font-mono text-lg font-bold text-foreground min-w-[40px] text-right">
          {current}
        </span>
      </div>
    </div>
  );
};

// ============================================
// AMMO COUNTER
// ============================================

interface AmmoCounterProps {
  current: number;
  magazine: number;
  reserve: number;
  weaponName: string;
}

export const AmmoCounter = ({ current, magazine, reserve, weaponName }: AmmoCounterProps) => {
  const isLow = current <= magazine * 0.3;

  return (
    <div className="hud-element p-3">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {weaponName}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={cn(
          'ammo-display',
          isLow ? 'text-health-low animate-pulse' : 'text-foreground'
        )}>
          {current}
        </span>
        <span className="text-muted-foreground text-xl">/</span>
        <span className="text-muted-foreground text-xl">{reserve}</span>
      </div>
    </div>
  );
};

// ============================================
// MINI MAP (Placeholder)
// ============================================

interface MiniMapProps {
  size?: number;
}

export const MiniMap = ({ size = 150 }: MiniMapProps) => {
  return (
    <div 
      className="hud-element overflow-hidden"
      style={{ width: size, height: size }}
    >
      {/* Placeholder map background */}
      <div className="w-full h-full relative bg-muted/30">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-5 grid-rows-5 w-full h-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="border border-primary/20" />
            ))}
          </div>
        </div>
        
        {/* Player indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary" 
               style={{ transform: 'translate(-50%, -150%)' }} />
        </div>

        {/* Compass */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-mono text-primary">
          N
        </div>
      </div>
    </div>
  );
};

// ============================================
// KILL FEED
// ============================================

interface KillFeedProps {
  entries: KillFeedEntry[];
}

export const KillFeed = ({ entries }: KillFeedProps) => {
  return (
    <div className="space-y-1 max-w-[300px]">
      <AnimatePresence>
        {entries.slice(0, 5).map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="hud-element px-3 py-1.5 text-sm flex items-center gap-2"
          >
            <span className={cn(
              'font-semibold',
              entry.killerTeam === 'blue' ? 'text-team-blue' : 'text-team-red'
            )}>
              {entry.killer}
            </span>
            <span className="text-muted-foreground text-xs">
              [{entry.weapon}]
              {entry.isHeadshot && ' 🎯'}
            </span>
            <span className={cn(
              'font-semibold',
              entry.victimTeam === 'blue' ? 'text-team-blue' : 'text-team-red'
            )}>
              {entry.victim}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// MATCH TIMER
// ============================================

interface MatchTimerProps {
  seconds: number;
  isWarning?: boolean;
}

export const MatchTimer = ({ seconds, isWarning = false }: MatchTimerProps) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className={cn(
      'hud-element px-4 py-2',
      isWarning && 'border-destructive'
    )}>
      <span className={cn(
        'font-mono text-2xl font-bold tracking-wider',
        isWarning ? 'text-health-low animate-pulse' : 'text-foreground'
      )}>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
};

// ============================================
// SCORE DISPLAY
// ============================================

interface ScoreDisplayProps {
  blueScore: number;
  redScore: number;
  scoreLimit: number;
}

export const ScoreDisplay = ({ blueScore, redScore, scoreLimit }: ScoreDisplayProps) => {
  return (
    <div className="hud-element px-4 py-2 flex items-center gap-4">
      <div className="text-center">
        <span className="text-2xl font-bold text-team-blue">{blueScore}</span>
      </div>
      <div className="text-muted-foreground text-sm">
        / {scoreLimit}
      </div>
      <div className="text-center">
        <span className="text-2xl font-bold text-team-red">{redScore}</span>
      </div>
    </div>
  );
};
