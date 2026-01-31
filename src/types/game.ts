/**
 * FPV Shooter Game - Type Definitions
 * Contains all TypeScript interfaces and types for the game
 */

// ============================================
// PLAYER TYPES
// ============================================

export interface Player {
  id: string;
  username: string;
  team: 'blue' | 'red' | 'spectator';
  health: number;
  maxHealth: number;
  armor: number;
  kills: number;
  deaths: number;
  assists: number;
  score: number;
  position: Vector3D;
  rotation: Vector3D;
  isAlive: boolean;
  loadout: Loadout;
  isReady: boolean;
  ping: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// ============================================
// WEAPON TYPES
// ============================================

export type WeaponCategory = 'assault' | 'sniper' | 'smg' | 'shotgun' | 'pistol' | 'melee';
export type GrenadeType = 'frag' | 'smoke' | 'flash' | 'molotov';

export interface WeaponStats {
  damage: number;
  fireRate: number; // Rounds per minute
  reloadSpeed: number; // Seconds
  accuracy: number; // 0-100
  range: number; // Meters
  mobility: number; // Movement speed modifier
  magazineSize: number;
  reserveAmmo: number;
}

export interface Weapon {
  id: string;
  name: string;
  category: WeaponCategory;
  stats: WeaponStats;
  description: string;
  modelPath?: string; // Placeholder for 3D model
  iconPath?: string;
  unlockLevel: number;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'scope' | 'barrel' | 'grip' | 'magazine' | 'stock';
  statModifiers: Partial<WeaponStats>;
}

export interface Grenade {
  id: string;
  name: string;
  type: GrenadeType;
  damage?: number;
  radius: number;
  duration?: number; // For smoke, flash effects
  description: string;
}

export interface Loadout {
  primary: Weapon | null;
  secondary: Weapon | null;
  melee: Weapon | null;
  grenades: { type: Grenade; count: number }[];
  perks: Perk[];
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  category: 'speed' | 'stealth' | 'combat' | 'support';
}

// ============================================
// GAME & MATCH TYPES
// ============================================

export type GameMode = 'tdm' | 'ffa' | 'domination' | 'search' | 'campaign';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';
export type MatchState = 'lobby' | 'loading' | 'warmup' | 'active' | 'paused' | 'ended';

export interface GameSettings {
  mouseSensitivity: number;
  aimSensitivity: number;
  invertY: boolean;
  fov: number;
  graphicsQuality: 'low' | 'medium' | 'high' | 'ultra';
  shadowQuality: 'off' | 'low' | 'medium' | 'high';
  antiAliasing: 'off' | 'fxaa' | 'msaa2x' | 'msaa4x';
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  voiceVolume: number;
  voiceChatEnabled: boolean;
  crosshairStyle: number;
  crosshairColor: string;
  showFPS: boolean;
  showPing: boolean;
}

export interface Match {
  id: string;
  mode: GameMode;
  map: GameMap;
  state: MatchState;
  timeLimit: number; // Seconds
  scoreLimit: number;
  currentTime: number;
  teams: {
    blue: TeamScore;
    red: TeamScore;
  };
  players: Player[];
  killFeed: KillFeedEntry[];
}

export interface TeamScore {
  score: number;
  kills: number;
  deaths: number;
}

export interface KillFeedEntry {
  id: string;
  killer: string;
  killerTeam: 'blue' | 'red';
  victim: string;
  victimTeam: 'blue' | 'red';
  weapon: string;
  isHeadshot: boolean;
  timestamp: number;
}

// ============================================
// MAP TYPES
// ============================================

export interface GameMap {
  id: string;
  name: string;
  description: string;
  previewImage?: string;
  difficulty: Difficulty;
  minPlayers: number;
  maxPlayers: number;
  supportedModes: GameMode[];
  spawnPoints: {
    blue: Vector3D[];
    red: Vector3D[];
  };
  objectives?: MapObjective[];
}

export interface MapObjective {
  id: string;
  name: string;
  type: 'capture' | 'bomb' | 'extract';
  position: Vector3D;
}

// ============================================
// LOBBY TYPES
// ============================================

export interface Lobby {
  id: string;
  code: string;
  host: string;
  mode: GameMode;
  map: GameMap | null;
  maxPlayers: number;
  players: LobbyPlayer[];
  isPrivate: boolean;
  settings: LobbySettings;
}

export interface LobbyPlayer {
  id: string;
  username: string;
  team: 'blue' | 'red' | 'unassigned';
  isReady: boolean;
  isHost: boolean;
}

export interface LobbySettings {
  friendlyFire: boolean;
  autoBalance: boolean;
  difficulty: Difficulty;
  timeLimit: number;
  scoreLimit: number;
}

// ============================================
// AI / BOT TYPES (Placeholder)
// ============================================

export interface AIBot {
  id: string;
  name: string;
  difficulty: Difficulty;
  behavior: 'aggressive' | 'defensive' | 'balanced';
  team: 'blue' | 'red';
  // TODO: Add pathfinding, decision tree, and AI model integration
}

// ============================================
// MULTIPLAYER / NETWORKING TYPES (Placeholder)
// ============================================

export interface NetworkMessage {
  type: 'position' | 'shoot' | 'damage' | 'death' | 'chat' | 'sync';
  payload: unknown;
  timestamp: number;
  playerId: string;
}

export interface ServerState {
  connected: boolean;
  latency: number;
  region: string;
  matchId: string | null;
}

// ============================================
// UI STATE TYPES
// ============================================

export type Screen = 
  | 'landing'
  | 'login'
  | 'menu'
  | 'lobby'
  | 'loadout'
  | 'maps'
  | 'settings'
  | 'game'
  | 'postgame';

export interface UIState {
  currentScreen: Screen;
  isPaused: boolean;
  showHUD: boolean;
  showChat: boolean;
  showScoreboard: boolean;
  modalOpen: string | null;
}
