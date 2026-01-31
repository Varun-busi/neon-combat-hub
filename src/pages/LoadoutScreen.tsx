/**
 * LoadoutScreen - Weapon and equipment selection
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '@/components/game/GameButton';
import { GamePanel } from '@/components/game/GamePanel';
import { WeaponCard } from '@/components/game/WeaponCard';
import { useGameStore } from '@/stores/gameStore';
import { MOCK_GRENADES, MOCK_PERKS } from '@/data/mockData';
import type { WeaponCategory, Weapon } from '@/types/game';
import { 
  ArrowLeft, 
  Save,
  RotateCcw,
  Crosshair,
  Bomb,
  Zap
} from 'lucide-react';

type TabType = 'primary' | 'secondary' | 'grenades' | 'perks';

const categoryLabels: Record<WeaponCategory, string> = {
  assault: 'Assault Rifles',
  sniper: 'Sniper Rifles',
  smg: 'SMGs',
  shotgun: 'Shotguns',
  pistol: 'Pistols',
  melee: 'Melee',
};

export const LoadoutScreen = () => {
  const { setScreen, weapons, loadout, selectPrimaryWeapon, selectSecondaryWeapon } = useGameStore();
  const [activeTab, setActiveTab] = useState<TabType>('primary');
  const [selectedCategory, setSelectedCategory] = useState<WeaponCategory>('assault');

  const filteredWeapons = weapons.filter(w => {
    if (activeTab === 'primary') {
      return ['assault', 'sniper', 'smg', 'shotgun'].includes(w.category);
    }
    if (activeTab === 'secondary') {
      return ['pistol', 'melee'].includes(w.category);
    }
    return false;
  });

  const categorizedWeapons = filteredWeapons.filter(w => {
    if (activeTab === 'primary') {
      return w.category === selectedCategory;
    }
    return ['pistol', 'melee'].includes(w.category);
  });

  const handleWeaponSelect = (weapon: Weapon) => {
    if (activeTab === 'primary') {
      selectPrimaryWeapon(weapon);
    } else if (activeTab === 'secondary') {
      selectSecondaryWeapon(weapon);
    }
  };

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
                LOADOUT CUSTOMIZATION
              </h1>
              <span className="text-sm text-muted-foreground">
                Select your weapons and equipment
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GameButton variant="ghost" size="sm">
              <RotateCcw className="w-5 h-5 mr-2" />
              RESET
            </GameButton>
            <GameButton variant="primary" size="sm" glow>
              <Save className="w-5 h-5 mr-2" />
              SAVE LOADOUT
            </GameButton>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Current loadout preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <h2 className="text-sm font-orbitron font-bold text-foreground mb-4 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-primary" />
              CURRENT LOADOUT
            </h2>

            <div className="space-y-4">
              {/* Primary weapon */}
              <GamePanel variant="default" className="p-4">
                <span className="text-xs text-primary uppercase tracking-widest">Primary</span>
                <h3 className="font-orbitron font-bold text-foreground mt-1">
                  {loadout.primary?.name || 'None Selected'}
                </h3>
                <div className="mt-3 h-16 bg-muted/20 rounded-sm flex items-center justify-center border border-border/50">
                  <span className="text-xs text-muted-foreground font-mono">[ WEAPON MODEL ]</span>
                </div>
              </GamePanel>

              {/* Secondary weapon */}
              <GamePanel variant="default" className="p-4">
                <span className="text-xs text-primary uppercase tracking-widest">Secondary</span>
                <h3 className="font-orbitron font-bold text-foreground mt-1">
                  {loadout.secondary?.name || 'None Selected'}
                </h3>
                <div className="mt-3 h-12 bg-muted/20 rounded-sm flex items-center justify-center border border-border/50">
                  <span className="text-xs text-muted-foreground font-mono">[ WEAPON MODEL ]</span>
                </div>
              </GamePanel>

              {/* Grenades */}
              <GamePanel variant="transparent" className="p-4">
                <span className="text-xs text-accent uppercase tracking-widest flex items-center gap-2">
                  <Bomb className="w-3 h-3" />
                  Grenades
                </span>
                <div className="mt-2 flex gap-2">
                  <div className="w-10 h-10 rounded-sm bg-muted/30 flex items-center justify-center border border-border/50">
                    <span className="text-xs text-muted-foreground">1</span>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-muted/30 flex items-center justify-center border border-border/50">
                    <span className="text-xs text-muted-foreground">2</span>
                  </div>
                </div>
              </GamePanel>

              {/* Perks */}
              <GamePanel variant="transparent" className="p-4">
                <span className="text-xs text-success uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Perks
                </span>
                <div className="mt-2 space-y-1">
                  {loadout.perks.length === 0 ? (
                    <span className="text-xs text-muted-foreground">No perks selected</span>
                  ) : (
                    loadout.perks.map(perk => (
                      <span key={perk.id} className="text-sm text-foreground block">{perk.name}</span>
                    ))
                  )}
                </div>
              </GamePanel>
            </div>
          </motion.div>

          {/* Weapon selection */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {(['primary', 'secondary', 'grenades', 'perks'] as TabType[]).map((tab) => (
                <GameButton
                  key={tab}
                  variant={activeTab === tab ? 'primary' : 'ghost'}
                  size="md"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </GameButton>
              ))}
            </div>

            {/* Category filter (for primary weapons) */}
            {activeTab === 'primary' && (
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {(['assault', 'sniper', 'smg', 'shotgun'] as WeaponCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm uppercase tracking-wider rounded-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary/20 text-primary border border-primary'
                        : 'text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            )}

            {/* Weapons grid */}
            {(activeTab === 'primary' || activeTab === 'secondary') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {categorizedWeapons.map((weapon, index) => (
                  <motion.div
                    key={weapon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <WeaponCard
                      weapon={weapon}
                      isSelected={
                        (activeTab === 'primary' && loadout.primary?.id === weapon.id) ||
                        (activeTab === 'secondary' && loadout.secondary?.id === weapon.id)
                      }
                      onClick={() => handleWeaponSelect(weapon)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Grenades grid */}
            {activeTab === 'grenades' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
              >
                {MOCK_GRENADES.map((grenade, index) => (
                  <motion.div
                    key={grenade.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GamePanel variant="default" className="p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-muted/20 rounded-sm flex items-center justify-center">
                          <Bomb className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="font-orbitron font-bold text-foreground text-sm">
                          {grenade.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {grenade.description}
                        </p>
                      </div>
                    </GamePanel>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Perks grid */}
            {activeTab === 'perks' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {MOCK_PERKS.map((perk, index) => (
                  <motion.div
                    key={perk.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GamePanel variant="default" className="p-4 cursor-pointer hover:border-success/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-sm bg-success/10 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h3 className="font-orbitron font-bold text-foreground">
                            {perk.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {perk.description}
                          </p>
                          <span className="text-xs text-success uppercase mt-2 inline-block">
                            {perk.category}
                          </span>
                        </div>
                      </div>
                    </GamePanel>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadoutScreen;
