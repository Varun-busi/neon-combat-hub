/**
 * FPV Shooter Game - Global State Management
 * Using Zustand for lightweight, scalable state
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  Player,
  Match,
  Lobby,
  GameSettings,
  UIState,
  Screen,
  Loadout,
  Weapon,
  GameMap,
  KillFeedEntry,
  ServerState,
} from '@/types/game';
import { MOCK_WEAPONS, MOCK_MAPS } from '@/data/mockData';

// ============================================
// GAME STORE INTERFACE
// ============================================

interface GameStore {
  // Player State
  player: Player | null;
  setPlayer: (player: Player) => void;
  updatePlayerHealth: (health: number) => void;
  updatePlayerPosition: (position: { x: number; y: number; z: number }) => void;
  
  // Match State
  match: Match | null;
  setMatch: (match: Match | null) => void;
  updateMatchTime: (time: number) => void;
  addKillFeedEntry: (entry: KillFeedEntry) => void;
  
  // Lobby State
  lobby: Lobby | null;
  setLobby: (lobby: Lobby | null) => void;
  joinLobby: (code: string) => Promise<boolean>;
  leaveLobby: () => void;
  toggleReady: () => void;
  
  // Loadout State
  loadout: Loadout;
  setLoadout: (loadout: Loadout) => void;
  selectPrimaryWeapon: (weapon: Weapon) => void;
  selectSecondaryWeapon: (weapon: Weapon) => void;
  
  // Settings
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;
  
  // UI State
  ui: UIState;
  setScreen: (screen: Screen) => void;
  togglePause: () => void;
  toggleScoreboard: (show?: boolean) => void;
  setModal: (modal: string | null) => void;
  
  // Available Content
  weapons: Weapon[];
  maps: GameMap[];
  
  // Server State (Placeholder)
  server: ServerState;
  connectToServer: () => Promise<void>;
  disconnectFromServer: () => void;
  
  // Game Actions
  startGame: () => void;
  endGame: () => void;
  respawn: () => void;
  shoot: () => void;
  reload: () => void;
}

// ============================================
// DEFAULT VALUES
// ============================================

const defaultSettings: GameSettings = {
  mouseSensitivity: 50,
  aimSensitivity: 40,
  invertY: false,
  fov: 90,
  graphicsQuality: 'high',
  shadowQuality: 'medium',
  antiAliasing: 'fxaa',
  masterVolume: 80,
  sfxVolume: 100,
  musicVolume: 60,
  voiceVolume: 80,
  voiceChatEnabled: true,
  crosshairStyle: 1,
  crosshairColor: '#00f0ff',
  showFPS: true,
  showPing: true,
};

const defaultLoadout: Loadout = {
  primary: MOCK_WEAPONS.find(w => w.category === 'assault') || null,
  secondary: MOCK_WEAPONS.find(w => w.category === 'pistol') || null,
  melee: MOCK_WEAPONS.find(w => w.category === 'melee') || null,
  grenades: [],
  perks: [],
};

const defaultUI: UIState = {
  currentScreen: 'landing',
  isPaused: false,
  showHUD: true,
  showChat: false,
  showScoreboard: false,
  modalOpen: null,
};

const defaultServer: ServerState = {
  connected: false,
  latency: 0,
  region: 'us-east',
  matchId: null,
};

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      // Player
      player: null,
      setPlayer: (player) => set({ player }),
      updatePlayerHealth: (health) =>
        set((state) => ({
          player: state.player ? { ...state.player, health } : null,
        })),
      updatePlayerPosition: (position) =>
        set((state) => ({
          player: state.player ? { ...state.player, position } : null,
        })),

      // Match
      match: null,
      setMatch: (match) => set({ match }),
      updateMatchTime: (currentTime) =>
        set((state) => ({
          match: state.match ? { ...state.match, currentTime } : null,
        })),
      addKillFeedEntry: (entry) =>
        set((state) => ({
          match: state.match
            ? {
                ...state.match,
                killFeed: [entry, ...state.match.killFeed].slice(0, 6),
              }
            : null,
        })),

      // Lobby
      lobby: null,
      setLobby: (lobby) => set({ lobby }),
      joinLobby: async (code) => {
        // TODO: Implement WebSocket connection to lobby
        console.log(`Joining lobby with code: ${code}`);
        return true;
      },
      leaveLobby: () => set({ lobby: null }),
      toggleReady: () =>
        set((state) => {
          if (!state.lobby || !state.player) return state;
          const updatedPlayers = state.lobby.players.map((p) =>
            p.id === state.player!.id ? { ...p, isReady: !p.isReady } : p
          );
          return {
            lobby: { ...state.lobby, players: updatedPlayers },
          };
        }),

      // Loadout
      loadout: defaultLoadout,
      setLoadout: (loadout) => set({ loadout }),
      selectPrimaryWeapon: (weapon) =>
        set((state) => ({
          loadout: { ...state.loadout, primary: weapon },
        })),
      selectSecondaryWeapon: (weapon) =>
        set((state) => ({
          loadout: { ...state.loadout, secondary: weapon },
        })),

      // Settings
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // UI
      ui: defaultUI,
      setScreen: (currentScreen) =>
        set((state) => ({
          ui: { ...state.ui, currentScreen },
        })),
      togglePause: () =>
        set((state) => ({
          ui: { ...state.ui, isPaused: !state.ui.isPaused },
        })),
      toggleScoreboard: (show) =>
        set((state) => ({
          ui: {
            ...state.ui,
            showScoreboard: show ?? !state.ui.showScoreboard,
          },
        })),
      setModal: (modalOpen) =>
        set((state) => ({
          ui: { ...state.ui, modalOpen },
        })),

      // Available Content
      weapons: MOCK_WEAPONS,
      maps: MOCK_MAPS,

      // Server
      server: defaultServer,
      connectToServer: async () => {
        // TODO: Implement WebSocket connection
        console.log('Connecting to server...');
        set({
          server: { ...defaultServer, connected: true, latency: 45 },
        });
      },
      disconnectFromServer: () => {
        set({ server: defaultServer });
      },

      // Game Actions
      startGame: () => {
        const { lobby, loadout, player } = get();
        if (!lobby || !player) return;

        const match: Match = {
          id: `match_${Date.now()}`,
          mode: lobby.mode,
          map: lobby.map!,
          state: 'warmup',
          timeLimit: lobby.settings.timeLimit,
          scoreLimit: lobby.settings.scoreLimit,
          currentTime: 0,
          teams: {
            blue: { score: 0, kills: 0, deaths: 0 },
            red: { score: 0, kills: 0, deaths: 0 },
          },
          players: lobby.players.map((p) => ({
            ...player,
            id: p.id,
            username: p.username,
            team: p.team === 'unassigned' ? 'blue' : p.team,
            loadout,
            isReady: true,
          })),
          killFeed: [],
        };

        set({
          match,
          ui: { ...get().ui, currentScreen: 'game', showHUD: true },
        });
      },
      endGame: () => {
        set({
          match: null,
          ui: { ...get().ui, currentScreen: 'postgame', showHUD: false },
        });
      },
      respawn: () => {
        // TODO: Implement respawn logic with spawn points
        set((state) => ({
          player: state.player
            ? { ...state.player, health: state.player.maxHealth, isAlive: true }
            : null,
        }));
      },
      shoot: () => {
        // TODO: Implement shooting with raycasting
        console.log('Shooting...');
      },
      reload: () => {
        // TODO: Implement reload animation and ammo management
        console.log('Reloading...');
      },
    }),
    { name: 'GameStore' }
  )
);
