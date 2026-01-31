/**
 * WeaponCard - Display weapon information with stats
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GamePanel } from './GamePanel';
import type { Weapon } from '@/types/game';

interface WeaponCardProps {
  weapon: Weapon;
  isSelected?: boolean;
  onClick?: () => void;
}

const StatBar = ({ label, value, max = 100 }: { label: string; value: number; max?: number }) => {
  const percent = (value / max) * 100;
  
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>
      <span className="w-8 text-right text-foreground font-mono">{value}</span>
    </div>
  );
};

export const WeaponCard = ({ weapon, isSelected = false, onClick }: WeaponCardProps) => {
  return (
    <GamePanel
      variant={isSelected ? 'elevated' : 'default'}
      glow={isSelected ? 'cyan' : 'none'}
      className={cn(
        'p-4 cursor-pointer transition-all duration-200',
        isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      )}
      onClick={onClick}
    >
      {/* Weapon Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs text-primary uppercase tracking-widest">
            {weapon.category}
          </span>
          <h3 className="text-lg font-orbitron font-bold text-foreground">
            {weapon.name}
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          LVL {weapon.unlockLevel}
        </span>
      </div>

      {/* Weapon Preview Placeholder */}
      <div className="h-24 mb-4 bg-muted/20 rounded-sm flex items-center justify-center border border-border/50">
        <span className="text-muted-foreground text-sm font-mono">
          [ 3D MODEL PLACEHOLDER ]
        </span>
      </div>

      {/* Weapon Stats */}
      <div className="space-y-2">
        <StatBar label="DMG" value={weapon.stats.damage} />
        <StatBar label="RATE" value={Math.min(weapon.stats.fireRate / 12, 100)} />
        <StatBar label="ACC" value={weapon.stats.accuracy} />
        <StatBar label="RANGE" value={weapon.stats.range} />
        <StatBar label="MOB" value={weapon.stats.mobility} />
      </div>

      {/* Magazine Info */}
      <div className="mt-4 pt-3 border-t border-border/50 flex justify-between text-xs">
        <span className="text-muted-foreground">
          MAG: <span className="text-foreground font-mono">{weapon.stats.magazineSize}</span>
        </span>
        <span className="text-muted-foreground">
          RESERVE: <span className="text-foreground font-mono">{weapon.stats.reserveAmmo}</span>
        </span>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="weapon-selection"
          className="absolute -inset-[2px] border-2 border-primary rounded-sm pointer-events-none"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </GamePanel>
  );
};
