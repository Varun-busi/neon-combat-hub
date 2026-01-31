/**
 * SettingsScreen - Game settings and configuration
 */

import { motion } from 'framer-motion';
import { GameButton } from '@/components/game/GameButton';
import { GamePanel } from '@/components/game/GamePanel';
import { useGameStore } from '@/stores/gameStore';
import { 
  ArrowLeft, 
  Monitor, 
  Volume2, 
  Gamepad2, 
  Eye,
  Save
} from 'lucide-react';

type SettingsTab = 'graphics' | 'audio' | 'controls' | 'gameplay';

import { useState } from 'react';

export const SettingsScreen = () => {
  const { setScreen, settings, updateSettings } = useGameStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('graphics');

  const tabs = [
    { id: 'graphics' as const, label: 'Graphics', icon: Monitor },
    { id: 'audio' as const, label: 'Audio', icon: Volume2 },
    { id: 'controls' as const, label: 'Controls', icon: Gamepad2 },
    { id: 'gameplay' as const, label: 'Gameplay', icon: Eye },
  ];

  const renderSlider = (
    label: string,
    value: number,
    onChange: (val: number) => void,
    min = 0,
    max = 100
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-sm appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-sm
                   [&::-webkit-slider-thumb]:bg-primary
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:shadow-glow-cyan"
      />
    </div>
  );

  const renderSelect = (
    label: string,
    value: string,
    options: { value: string; label: string }[],
    onChange: (val: string) => void
  ) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground
                   focus:outline-none focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderToggle = (
    label: string,
    value: boolean,
    onChange: (val: boolean) => void
  ) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          value ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${
            value ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );

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
            <h1 className="text-xl font-orbitron font-bold text-foreground">
              SETTINGS
            </h1>
          </div>

          <GameButton variant="primary" size="sm" glow>
            <Save className="w-5 h-5 mr-2" />
            APPLY
          </GameButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary border-l-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings content */}
          <div className="lg:col-span-3">
            <GamePanel variant="default" className="p-6">
              {/* Graphics */}
              {activeTab === 'graphics' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-orbitron font-bold text-foreground mb-6">
                    Graphics Settings
                  </h2>

                  {renderSelect('Graphics Quality', settings.graphicsQuality, [
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'ultra', label: 'Ultra' },
                  ], (val) => updateSettings({ graphicsQuality: val as any }))}

                  {renderSelect('Shadow Quality', settings.shadowQuality, [
                    { value: 'off', label: 'Off' },
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ], (val) => updateSettings({ shadowQuality: val as any }))}

                  {renderSelect('Anti-Aliasing', settings.antiAliasing, [
                    { value: 'off', label: 'Off' },
                    { value: 'fxaa', label: 'FXAA' },
                    { value: 'msaa2x', label: 'MSAA 2x' },
                    { value: 'msaa4x', label: 'MSAA 4x' },
                  ], (val) => updateSettings({ antiAliasing: val as any }))}

                  {renderSlider('Field of View', settings.fov, (val) => updateSettings({ fov: val }), 60, 120)}

                  <div className="pt-4 border-t border-border space-y-4">
                    {renderToggle('Show FPS', settings.showFPS, (val) => updateSettings({ showFPS: val }))}
                    {renderToggle('Show Ping', settings.showPing, (val) => updateSettings({ showPing: val }))}
                  </div>
                </motion.div>
              )}

              {/* Audio */}
              {activeTab === 'audio' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-orbitron font-bold text-foreground mb-6">
                    Audio Settings
                  </h2>

                  {renderSlider('Master Volume', settings.masterVolume, (val) => updateSettings({ masterVolume: val }))}
                  {renderSlider('Sound Effects', settings.sfxVolume, (val) => updateSettings({ sfxVolume: val }))}
                  {renderSlider('Music', settings.musicVolume, (val) => updateSettings({ musicVolume: val }))}
                  {renderSlider('Voice Chat', settings.voiceVolume, (val) => updateSettings({ voiceVolume: val }))}

                  <div className="pt-4 border-t border-border">
                    {renderToggle('Voice Chat Enabled', settings.voiceChatEnabled, (val) => updateSettings({ voiceChatEnabled: val }))}
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              {activeTab === 'controls' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-orbitron font-bold text-foreground mb-6">
                    Control Settings
                  </h2>

                  {renderSlider('Mouse Sensitivity', settings.mouseSensitivity, (val) => updateSettings({ mouseSensitivity: val }), 1, 100)}
                  {renderSlider('ADS Sensitivity', settings.aimSensitivity, (val) => updateSettings({ aimSensitivity: val }), 1, 100)}

                  <div className="pt-4 border-t border-border">
                    {renderToggle('Invert Y-Axis', settings.invertY, (val) => updateSettings({ invertY: val }))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Key Bindings</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { action: 'Move Forward', key: 'W' },
                        { action: 'Move Backward', key: 'S' },
                        { action: 'Move Left', key: 'A' },
                        { action: 'Move Right', key: 'D' },
                        { action: 'Jump', key: 'SPACE' },
                        { action: 'Crouch', key: 'CTRL' },
                        { action: 'Sprint', key: 'SHIFT' },
                        { action: 'Reload', key: 'R' },
                        { action: 'Interact', key: 'E' },
                        { action: 'Melee', key: 'V' },
                      ].map((binding) => (
                        <div key={binding.action} className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-sm">
                          <span className="text-muted-foreground">{binding.action}</span>
                          <span className="font-mono text-primary px-2 py-1 bg-primary/10 rounded-sm">
                            {binding.key}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Gameplay */}
              {activeTab === 'gameplay' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-orbitron font-bold text-foreground mb-6">
                    Gameplay Settings
                  </h2>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Crosshair</h3>
                    {renderSelect('Crosshair Style', String(settings.crosshairStyle), [
                      { value: '1', label: 'Cross' },
                      { value: '2', label: 'Dot' },
                      { value: '3', label: 'Circle' },
                      { value: '4', label: 'Dynamic' },
                    ], (val) => updateSettings({ crosshairStyle: Number(val) }))}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Crosshair Color</span>
                      <input
                        type="color"
                        value={settings.crosshairColor}
                        onChange={(e) => updateSettings({ crosshairColor: e.target.value })}
                        className="w-10 h-10 rounded-sm cursor-pointer border border-border"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </GamePanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
