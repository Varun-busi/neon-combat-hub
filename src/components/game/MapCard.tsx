/**
 * MapCard - Display map preview and information
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GamePanel } from './GamePanel';
import { Users, Clock, Crosshair } from 'lucide-react';
import type { GameMap, Difficulty } from '@/types/game';

interface MapCardProps {
  map: GameMap;
  isSelected?: boolean;
  onClick?: () => void;
}

const difficultyColors: Record<Difficulty, string> = {
  easy: 'text-success bg-success/20',
  medium: 'text-warning bg-warning/20',
  hard: 'text-accent bg-accent/20',
  extreme: 'text-destructive bg-destructive/20',
};

export const MapCard = ({ map, isSelected = false, onClick }: MapCardProps) => {
  return (
    <GamePanel
      variant={isSelected ? 'elevated' : 'default'}
      glow={isSelected ? 'cyan' : 'none'}
      className={cn(
        'overflow-hidden cursor-pointer transition-all duration-200',
        isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      )}
      onClick={onClick}
    >
      {/* Map Preview */}
      <div className="h-40 relative bg-muted/20 border-b border-border/50">
        {/* Placeholder for map thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground text-sm font-mono">
            [ MAP PREVIEW ]
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 w-full h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-primary/10" />
            ))}
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-2 right-2">
          <span className={cn(
            'px-2 py-1 rounded-sm text-xs font-bold uppercase',
            difficultyColors[map.difficulty]
          )}>
            {map.difficulty}
          </span>
        </div>
      </div>

      {/* Map Info */}
      <div className="p-4">
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-1">
          {map.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {map.description}
        </p>

        {/* Map Stats */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{map.minPlayers}-{map.maxPlayers}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Crosshair className="w-3 h-3" />
            <span>{map.supportedModes.length} modes</span>
          </div>
        </div>

        {/* Supported modes */}
        <div className="mt-3 flex flex-wrap gap-1">
          {map.supportedModes.map((mode) => (
            <span
              key={mode}
              className="px-2 py-0.5 bg-muted/50 rounded-sm text-xs text-muted-foreground uppercase"
            >
              {mode}
            </span>
          ))}
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="map-selection"
          className="absolute -inset-[2px] border-2 border-primary rounded-sm pointer-events-none"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </GamePanel>
  );
};
