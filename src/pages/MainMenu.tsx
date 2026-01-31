/**
 * MainMenu - Game mode selection and navigation
 */

import { motion } from 'framer-motion';
import { GameButton } from '@/components/game/GameButton';
import { GamePanel } from '@/components/game/GamePanel';
import { useGameStore } from '@/stores/gameStore';
import { GAME_MODES } from '@/data/mockData';
import { 
  Users, 
  Crosshair, 
  Flag, 
  Bomb, 
  BookOpen, 
  Settings, 
  LogOut,
  User,
  Trophy,
  Star
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-8 h-8" />,
  Crosshair: <Crosshair className="w-8 h-8" />,
  Flag: <Flag className="w-8 h-8" />,
  Bomb: <Bomb className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
};

export const MainMenu = () => {
  const { setScreen, player } = useGameStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <Crosshair className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-2xl font-orbitron font-bold text-primary">STRIKER</h1>
              <span className="text-xs text-muted-foreground tracking-widest">PROTOCOL</span>
            </div>
          </div>

          {/* Player info */}
          <div className="flex items-center gap-4">
            <GamePanel variant="transparent" className="px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-foreground block">
                    {player?.username || 'Guest_001'}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Trophy className="w-3 h-3 text-accent" />
                    <span>Level 42</span>
                    <Star className="w-3 h-3 text-warning" />
                    <span>Elite</span>
                  </div>
                </div>
              </div>
            </GamePanel>

            <GameButton variant="ghost" size="sm" onClick={() => setScreen('settings')}>
              <Settings className="w-5 h-5" />
            </GameButton>
            
            <GameButton variant="ghost" size="sm" onClick={() => setScreen('landing')}>
              <LogOut className="w-5 h-5" />
            </GameButton>
          </div>
        </motion.header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game modes */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-orbitron font-bold text-foreground mb-6 flex items-center gap-3"
            >
              <div className="w-1 h-6 bg-primary" />
              SELECT GAME MODE
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GAME_MODES.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GamePanel
                    variant="default"
                    className="p-6 cursor-pointer menu-item-hover group"
                    onClick={() => setScreen('lobby')}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-sm bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {iconMap[mode.icon]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-orbitron font-bold text-foreground mb-1">
                          {mode.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {mode.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{mode.players} Players</span>
                        </div>
                      </div>
                    </div>
                  </GamePanel>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-orbitron font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-1 h-5 bg-accent" />
                QUICK ACTIONS
              </h2>
              
              <div className="space-y-3">
                <GameButton
                  variant="outline"
                  size="lg"
                  className="w-full justify-start"
                  onClick={() => setScreen('loadout')}
                >
                  <Crosshair className="w-5 h-5 mr-3" />
                  LOADOUT
                </GameButton>
                
                <GameButton
                  variant="outline"
                  size="lg"
                  className="w-full justify-start"
                  onClick={() => setScreen('maps')}
                >
                  <Flag className="w-5 h-5 mr-3" />
                  MAPS
                </GameButton>
                
                <GameButton
                  variant="outline"
                  size="lg"
                  className="w-full justify-start"
                  onClick={() => setScreen('settings')}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  SETTINGS
                </GameButton>
              </div>
            </motion.div>

            {/* News / Updates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GamePanel variant="default" className="p-4">
                <h3 className="text-sm font-orbitron font-bold text-accent mb-3">
                  📢 LATEST UPDATE
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  New map "Aircraft Carrier" now available! Experience naval combat like never before.
                </p>
                <span className="text-xs text-muted-foreground/60">2 hours ago</span>
              </GamePanel>
            </motion.div>

            {/* Player stats preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GamePanel variant="transparent" className="p-4">
                <h3 className="text-sm font-orbitron font-bold text-foreground mb-3">
                  YOUR STATS
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="text-2xl font-bold text-primary">247</span>
                    <span className="block text-xs text-muted-foreground">KILLS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-destructive">89</span>
                    <span className="block text-xs text-muted-foreground">DEATHS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-success">2.77</span>
                    <span className="block text-xs text-muted-foreground">K/D</span>
                  </div>
                </div>
              </GamePanel>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
