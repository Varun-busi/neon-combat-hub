/**
 * LandingPage - Cinematic game landing page
 */

import { motion } from 'framer-motion';
import { GameButton } from '@/components/game/GameButton';
import { useGameStore } from '@/stores/gameStore';
import { Crosshair, Users, Trophy, Settings } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const LandingPage = () => {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crosshair className="w-16 h-16 text-primary mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-orbitron font-black tracking-wider mb-4">
            <span className="text-glow-cyan text-primary">STRIKER</span>
            <span className="block text-foreground">PROTOCOL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-rajdhani tracking-wide">
            TACTICAL MULTIPLAYER COMBAT
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <GameButton
            variant="primary"
            size="xl"
            glow
            onClick={() => setScreen('menu')}
            className="min-w-[280px]"
          >
            <span className="text-xl">ENTER COMBAT</span>
          </GameButton>
          
          <span className="text-sm text-muted-foreground">
            Press ENTER to continue
          </span>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>12,847 Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span>Season 3 Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>v2.4.1</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-24 h-24 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-24 h-24 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
};

export default LandingPage;
