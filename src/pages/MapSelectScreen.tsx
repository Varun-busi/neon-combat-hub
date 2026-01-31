/**
 * MapSelectScreen - Map selection for matches
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '@/components/game/GameButton';
import { MapCard } from '@/components/game/MapCard';
import { useGameStore } from '@/stores/gameStore';
import type { GameMap, Difficulty } from '@/types/game';
import { ArrowLeft, Filter } from 'lucide-react';

export const MapSelectScreen = () => {
  const { setScreen, maps } = useGameStore();
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');

  const filteredMaps = difficultyFilter === 'all' 
    ? maps 
    : maps.filter(m => m.difficulty === difficultyFilter);

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
                SELECT MAP
              </h1>
              <span className="text-sm text-muted-foreground">
                Choose your battleground
              </span>
            </div>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {(['all', 'easy', 'medium', 'hard', 'extreme'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaps.map((map, index) => (
            <motion.div
              key={map.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MapCard
                map={map}
                isSelected={selectedMap?.id === map.id}
                onClick={() => setSelectedMap(map)}
              />
            </motion.div>
          ))}
        </div>

        {/* Selected map actions */}
        {selectedMap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
          >
            <GameButton variant="ghost" size="lg" onClick={() => setSelectedMap(null)}>
              CANCEL
            </GameButton>
            <GameButton variant="primary" size="lg" glow onClick={() => setScreen('lobby')}>
              SELECT {selectedMap.name}
            </GameButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MapSelectScreen;
