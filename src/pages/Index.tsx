/**
 * Main Index Page - Game Router
 * Routes between different game screens based on state
 */

import { useGameStore } from '@/stores/gameStore';
import LandingPage from './LandingPage';
import MainMenu from './MainMenu';
import LobbyScreen from './LobbyScreen';
import LoadoutScreen from './LoadoutScreen';
import MapSelectScreen from './MapSelectScreen';
import SettingsScreen from './SettingsScreen';
import GameScreen from './GameScreen';

const Index = () => {
  const currentScreen = useGameStore((state) => state.ui.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage />;
      case 'menu':
        return <MainMenu />;
      case 'lobby':
        return <LobbyScreen />;
      case 'loadout':
        return <LoadoutScreen />;
      case 'maps':
        return <MapSelectScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'game':
        return <GameScreen />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
};

export default Index;
