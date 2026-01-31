/**
 * LobbyScreen - Multiplayer lobby for matchmaking
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '@/components/game/GameButton';
import { GamePanel } from '@/components/game/GamePanel';
import { PlayerCard } from '@/components/game/PlayerCard';
import { useGameStore } from '@/stores/gameStore';
import { MOCK_LOBBY_PLAYERS, MOCK_MAPS } from '@/data/mockData';
import { 
  ArrowLeft, 
  Copy, 
  Mic, 
  MicOff, 
  Users, 
  Clock,
  Crosshair,
  Settings as SettingsIcon
} from 'lucide-react';

export const LobbyScreen = () => {
  const { setScreen } = useGameStore();
  const [roomCode] = useState('XKCD-7742');
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const selectedMap = MOCK_MAPS[0];
  const players = MOCK_LOBBY_PLAYERS;

  const blueTeam = players.filter(p => p.team === 'blue');
  const redTeam = players.filter(p => p.team === 'red');
  const unassigned = players.filter(p => p.team === 'unassigned');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <GameButton variant="ghost" size="sm" onClick={() => setScreen('menu')}>
              <ArrowLeft className="w-5 h-5" />
            </GameButton>
            <div>
              <h1 className="text-xl font-orbitron font-bold text-foreground">
                TEAM DEATHMATCH LOBBY
              </h1>
              <span className="text-sm text-muted-foreground">
                Waiting for players...
              </span>
            </div>
          </div>

          {/* Room code */}
          <GamePanel variant="transparent" className="px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground uppercase">Room Code</span>
              <span className="font-mono text-lg text-primary font-bold">{roomCode}</span>
              <button 
                className="p-1 hover:bg-muted rounded-sm transition-colors"
                onClick={() => navigator.clipboard.writeText(roomCode)}
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </GamePanel>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Teams */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Blue Team */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-sm bg-team-blue" />
                  <h2 className="text-lg font-orbitron font-bold text-foreground">
                    BLUE TEAM
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {blueTeam.length}/8
                  </span>
                </div>

                <GamePanel variant="default" className="p-4">
                  <div className="space-y-3">
                    {blueTeam.map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        isCurrentPlayer={player.id === 'p1'}
                      />
                    ))}
                    {blueTeam.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No players yet
                      </div>
                    )}
                  </div>
                </GamePanel>
              </motion.div>

              {/* Red Team */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-sm bg-team-red" />
                  <h2 className="text-lg font-orbitron font-bold text-foreground">
                    RED TEAM
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {redTeam.length}/8
                  </span>
                </div>

                <GamePanel variant="default" className="p-4">
                  <div className="space-y-3">
                    {redTeam.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                    {redTeam.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No players yet
                      </div>
                    )}
                  </div>
                </GamePanel>
              </motion.div>
            </div>

            {/* Unassigned players */}
            {unassigned.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <h2 className="text-lg font-orbitron font-bold text-foreground mb-4 flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  UNASSIGNED
                  <span className="text-sm text-muted-foreground">
                    {unassigned.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {unassigned.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-sm font-orbitron font-bold text-foreground mb-3 flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-primary" />
                SELECTED MAP
              </h2>
              <GamePanel variant="default" className="overflow-hidden">
                <div className="h-32 bg-muted/30 flex items-center justify-center border-b border-border/50">
                  <span className="text-muted-foreground text-sm font-mono">[ MAP PREVIEW ]</span>
                </div>
                <div className="p-4">
                  <h3 className="font-orbitron font-bold text-foreground">
                    {selectedMap.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedMap.description}
                  </p>
                </div>
              </GamePanel>
            </motion.div>

            {/* Match settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-sm font-orbitron font-bold text-foreground mb-3 flex items-center gap-2">
                <SettingsIcon className="w-4 h-4 text-primary" />
                MATCH SETTINGS
              </h2>
              <GamePanel variant="transparent" className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Score Limit</span>
                  <span className="text-foreground font-mono">75</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Time Limit</span>
                  <span className="text-foreground font-mono">10:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Friendly Fire</span>
                  <span className="text-destructive font-mono">OFF</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="text-warning font-mono">MEDIUM</span>
                </div>
              </GamePanel>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <GameButton
                variant={isReady ? 'danger' : 'primary'}
                size="lg"
                glow={isReady}
                className="w-full"
                onClick={() => setIsReady(!isReady)}
              >
                {isReady ? 'CANCEL READY' : 'READY UP'}
              </GameButton>

              <div className="flex gap-3">
                <GameButton
                  variant={isMuted ? 'danger' : 'ghost'}
                  size="md"
                  className="flex-1"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  {isMuted ? 'Muted' : 'Voice'}
                </GameButton>

                <GameButton
                  variant="ghost"
                  size="md"
                  className="flex-1"
                  onClick={() => setScreen('loadout')}
                >
                  <Crosshair className="w-5 h-5 mr-2" />
                  Loadout
                </GameButton>
              </div>

              <GameButton
                variant="accent"
                size="lg"
                glow
                className="w-full"
                onClick={() => setScreen('game')}
              >
                <Clock className="w-5 h-5 mr-2" />
                START MATCH
              </GameButton>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
