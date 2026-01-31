/**
 * PlayerCard - Display player info in lobby
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Crown, Mic, MicOff, Check, Clock } from 'lucide-react';
import type { LobbyPlayer } from '@/types/game';

interface PlayerCardProps {
  player: LobbyPlayer;
  isCurrentPlayer?: boolean;
}

export const PlayerCard = ({ player, isCurrentPlayer = false }: PlayerCardProps) => {
  const teamColors = {
    blue: 'border-team-blue bg-team-blue/10',
    red: 'border-team-red bg-team-red/10',
    unassigned: 'border-muted bg-muted/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'relative p-3 rounded-sm border-l-4 bg-card/50 backdrop-blur-sm',
        teamColors[player.team],
        isCurrentPlayer && 'ring-1 ring-primary/50'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-sm bg-muted/50 flex items-center justify-center border border-border/50">
          <span className="text-lg font-bold text-muted-foreground">
            {player.username.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Player info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              'font-semibold truncate',
              isCurrentPlayer ? 'text-primary' : 'text-foreground'
            )}>
              {player.username}
            </span>
            {player.isHost && (
              <Crown className="w-4 h-4 text-accent" />
            )}
          </div>
          <span className="text-xs text-muted-foreground uppercase">
            {player.team === 'unassigned' ? 'Not Assigned' : `Team ${player.team}`}
          </span>
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-2">
          {/* Voice chat status */}
          <div className="text-muted-foreground">
            <Mic className="w-4 h-4" />
          </div>
          
          {/* Ready status */}
          <div className={cn(
            'w-6 h-6 rounded-sm flex items-center justify-center',
            player.isReady ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted-foreground'
          )}>
            {player.isReady ? (
              <Check className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
