/**
 * GameScreen - Main in-game screen with HUD and 3D scene
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameScene } from '@/components/game/GameScene';
import {
  Crosshair,
  HealthBar,
  AmmoCounter,
  MiniMap,
  KillFeed,
  MatchTimer,
  ScoreDisplay,
} from '@/components/game/HUD';
import { GameButton } from '@/components/game/GameButton';
import { GamePanel } from '@/components/game/GamePanel';
import { useGameStore } from '@/stores/gameStore';
import type { KillFeedEntry } from '@/types/game';
import { 
  Pause, 
  Play, 
  Settings, 
  LogOut, 
  Volume2, 
  VolumeX,
  Users
} from 'lucide-react';

// Mock kill feed entries for demo
const mockKillFeed: KillFeedEntry[] = [
  { id: '1', killer: 'ShadowHunter', killerTeam: 'blue', victim: 'NightWolf_X', victimTeam: 'red', weapon: 'PHANTOM AR-15', isHeadshot: true, timestamp: Date.now() },
  { id: '2', killer: 'GhostReaper99', killerTeam: 'red', victim: 'TacticalSniper', victimTeam: 'blue', weapon: 'REAPER SR-50', isHeadshot: false, timestamp: Date.now() - 5000 },
  { id: '3', killer: 'PhantomAce', killerTeam: 'blue', victim: 'StealthKiller', victimTeam: 'red', weapon: 'VECTOR X9', isHeadshot: false, timestamp: Date.now() - 10000 },
];

export const GameScreen = () => {
  const { setScreen, loadout, settings } = useGameStore();
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState(false);
  
  // Mock game state
  const [health, setHealth] = useState(85);
  const [ammo, setAmmo] = useState(24);
  const [matchTime, setMatchTime] = useState(420); // 7 minutes
  const [blueScore, setBlueScore] = useState(42);
  const [redScore, setRedScore] = useState(38);

  // Countdown timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setMatchTime((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle escape key for pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPaused((prev) => !prev);
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        setShowScoreboard(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setShowScoreboard(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Game Scene */}
      <div className="absolute inset-0">
        <GameScene showWeapon={true} showControls={false} />
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crosshair */}
        <Crosshair 
          style={(['cross', 'dot', 'circle', 'dynamic'] as const)[settings.crosshairStyle - 1] || 'cross'}
          color={settings.crosshairColor}
          size={24}
        />

        {/* Top HUD */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-auto">
          <ScoreDisplay blueScore={blueScore} redScore={redScore} scoreLimit={75} />
          <MatchTimer seconds={matchTime} isWarning={matchTime < 60} />
        </div>

        {/* Top-right: Mini map & Kill feed */}
        <div className="absolute top-4 right-4 space-y-4">
          <MiniMap size={150} />
          <KillFeed entries={mockKillFeed} />
        </div>

        {/* Bottom-left: Health */}
        <div className="absolute bottom-4 left-4">
          <HealthBar current={health} max={100} showArmor armor={65} />
        </div>

        {/* Bottom-right: Ammo */}
        <div className="absolute bottom-4 right-4">
          <AmmoCounter
            current={ammo}
            magazine={30}
            reserve={120}
            weaponName={loadout.primary?.name || 'PHANTOM AR-15'}
          />
        </div>

        {/* Top-left: Quick actions */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsPaused(true)}
            className="p-2 rounded-sm bg-background/50 backdrop-blur-sm border border-border hover:bg-muted/50 transition-colors"
          >
            <Pause className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-sm bg-background/50 backdrop-blur-sm border border-border hover:bg-muted/50 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-destructive" />
            ) : (
              <Volume2 className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* FPS/Ping display */}
        {(settings.showFPS || settings.showPing) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded-sm">
            {settings.showFPS && <span>FPS: 144</span>}
            {settings.showFPS && settings.showPing && <span> | </span>}
            {settings.showPing && <span>PING: 32ms</span>}
          </div>
        )}
      </div>

      {/* Scoreboard Overlay */}
      <AnimatePresence>
        {showScoreboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <GamePanel variant="elevated" className="p-8 min-w-[600px]">
              <h2 className="text-xl font-orbitron font-bold text-foreground text-center mb-6">
                SCOREBOARD
              </h2>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Blue team */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-team-blue rounded-sm" />
                    <span className="font-orbitron font-bold text-team-blue">BLUE TEAM</span>
                    <span className="text-muted-foreground ml-auto">{blueScore}</span>
                  </div>
                  <div className="space-y-2">
                    {['ShadowHunter', 'TacticalSniper', 'PhantomAce', 'StormBringer'].map((name, i) => (
                      <div key={name} className="flex items-center justify-between text-sm py-2 px-3 bg-team-blue/10 rounded-sm">
                        <span className="text-foreground">{name}</span>
                        <span className="text-muted-foreground">{12 - i * 2} / {3 + i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red team */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-team-red rounded-sm" />
                    <span className="font-orbitron font-bold text-team-red">RED TEAM</span>
                    <span className="text-muted-foreground ml-auto">{redScore}</span>
                  </div>
                  <div className="space-y-2">
                    {['NightWolf_X', 'GhostReaper99', 'SilentKiller', 'DarkVenom'].map((name, i) => (
                      <div key={name} className="flex items-center justify-between text-sm py-2 px-3 bg-team-red/10 rounded-sm">
                        <span className="text-foreground">{name}</span>
                        <span className="text-muted-foreground">{10 - i * 2} / {4 + i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GamePanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pause Menu */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50"
          >
            <GamePanel variant="elevated" glow="cyan" className="p-8 min-w-[400px]">
              <h2 className="text-2xl font-orbitron font-bold text-foreground text-center mb-8">
                GAME PAUSED
              </h2>
              
              <div className="space-y-4">
                <GameButton
                  variant="primary"
                  size="lg"
                  glow
                  className="w-full"
                  onClick={() => setIsPaused(false)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  RESUME
                </GameButton>

                <GameButton
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setIsPaused(false);
                    setScreen('settings');
                  }}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  SETTINGS
                </GameButton>

                <GameButton
                  variant="danger"
                  size="lg"
                  className="w-full"
                  onClick={() => setScreen('menu')}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  LEAVE MATCH
                </GameButton>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Press ESC to resume
              </p>
            </GamePanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameScreen;
