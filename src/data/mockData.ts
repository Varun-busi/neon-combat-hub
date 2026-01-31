/**
 * FPV Shooter Game - Mock Data
 * Placeholder data for weapons, maps, and other game content
 */

import type { Weapon, Grenade, GameMap, Perk, LobbyPlayer } from '@/types/game';

// ============================================
// WEAPONS DATA
// ============================================

export const MOCK_WEAPONS: Weapon[] = [
  // Assault Rifles
  {
    id: 'ar_phantom',
    name: 'PHANTOM AR-15',
    category: 'assault',
    description: 'Versatile assault rifle with excellent range and accuracy.',
    unlockLevel: 1,
    attachments: [],
    stats: {
      damage: 32,
      fireRate: 700,
      reloadSpeed: 2.1,
      accuracy: 75,
      range: 65,
      mobility: 70,
      magazineSize: 30,
      reserveAmmo: 120,
    },
  },
  {
    id: 'ar_vortex',
    name: 'VORTEX M4A1',
    category: 'assault',
    description: 'High fire rate assault rifle for aggressive playstyles.',
    unlockLevel: 15,
    attachments: [],
    stats: {
      damage: 28,
      fireRate: 850,
      reloadSpeed: 1.8,
      accuracy: 68,
      range: 55,
      mobility: 75,
      magazineSize: 30,
      reserveAmmo: 150,
    },
  },
  // Snipers
  {
    id: 'sniper_reaper',
    name: 'REAPER SR-50',
    category: 'sniper',
    description: 'One-shot-kill potential with unmatched range.',
    unlockLevel: 20,
    attachments: [],
    stats: {
      damage: 95,
      fireRate: 45,
      reloadSpeed: 3.5,
      accuracy: 95,
      range: 100,
      mobility: 45,
      magazineSize: 5,
      reserveAmmo: 25,
    },
  },
  {
    id: 'sniper_shadow',
    name: 'SHADOW DMR',
    category: 'sniper',
    description: 'Semi-automatic marksman rifle for precision shooters.',
    unlockLevel: 25,
    attachments: [],
    stats: {
      damage: 65,
      fireRate: 120,
      reloadSpeed: 2.8,
      accuracy: 88,
      range: 85,
      mobility: 55,
      magazineSize: 10,
      reserveAmmo: 40,
    },
  },
  // SMGs
  {
    id: 'smg_vector',
    name: 'VECTOR X9',
    category: 'smg',
    description: 'Lightning-fast SMG for close-quarters combat.',
    unlockLevel: 5,
    attachments: [],
    stats: {
      damage: 24,
      fireRate: 1100,
      reloadSpeed: 1.5,
      accuracy: 58,
      range: 25,
      mobility: 95,
      magazineSize: 33,
      reserveAmmo: 165,
    },
  },
  {
    id: 'smg_storm',
    name: 'STORM MP7',
    category: 'smg',
    description: 'Compact SMG with surprising range.',
    unlockLevel: 10,
    attachments: [],
    stats: {
      damage: 22,
      fireRate: 950,
      reloadSpeed: 1.7,
      accuracy: 62,
      range: 35,
      mobility: 90,
      magazineSize: 40,
      reserveAmmo: 160,
    },
  },
  // Shotguns
  {
    id: 'shotgun_devastator',
    name: 'DEVASTATOR 870',
    category: 'shotgun',
    description: 'Pump-action shotgun with devastating stopping power.',
    unlockLevel: 8,
    attachments: [],
    stats: {
      damage: 120,
      fireRate: 60,
      reloadSpeed: 4.0,
      accuracy: 45,
      range: 10,
      mobility: 65,
      magazineSize: 8,
      reserveAmmo: 32,
    },
  },
  // Pistols
  {
    id: 'pistol_viper',
    name: 'VIPER P320',
    category: 'pistol',
    description: 'Reliable sidearm with quick draw speed.',
    unlockLevel: 1,
    attachments: [],
    stats: {
      damage: 35,
      fireRate: 400,
      reloadSpeed: 1.2,
      accuracy: 70,
      range: 20,
      mobility: 100,
      magazineSize: 15,
      reserveAmmo: 60,
    },
  },
  {
    id: 'pistol_deagle',
    name: 'DESERT FURY',
    category: 'pistol',
    description: 'High-caliber pistol with massive damage.',
    unlockLevel: 30,
    attachments: [],
    stats: {
      damage: 65,
      fireRate: 150,
      reloadSpeed: 1.8,
      accuracy: 75,
      range: 30,
      mobility: 90,
      magazineSize: 7,
      reserveAmmo: 35,
    },
  },
  // Melee
  {
    id: 'melee_knife',
    name: 'TACTICAL KNIFE',
    category: 'melee',
    description: 'Standard issue combat knife.',
    unlockLevel: 1,
    attachments: [],
    stats: {
      damage: 100,
      fireRate: 60,
      reloadSpeed: 0,
      accuracy: 100,
      range: 2,
      mobility: 100,
      magazineSize: 1,
      reserveAmmo: 0,
    },
  },
];

// ============================================
// GRENADES DATA
// ============================================

export const MOCK_GRENADES: Grenade[] = [
  {
    id: 'frag',
    name: 'FRAG GRENADE',
    type: 'frag',
    damage: 150,
    radius: 8,
    description: 'Standard fragmentation grenade with lethal radius.',
  },
  {
    id: 'smoke',
    name: 'SMOKE GRENADE',
    type: 'smoke',
    radius: 12,
    duration: 15,
    description: 'Creates a smoke screen for tactical cover.',
  },
  {
    id: 'flash',
    name: 'FLASHBANG',
    type: 'flash',
    radius: 10,
    duration: 5,
    description: 'Blinds and deafens enemies in radius.',
  },
  {
    id: 'molotov',
    name: 'INCENDIARY',
    type: 'molotov',
    damage: 50,
    radius: 6,
    duration: 8,
    description: 'Area denial weapon that burns over time.',
  },
];

// ============================================
// MAPS DATA
// ============================================

export const MOCK_MAPS: GameMap[] = [
  {
    id: 'map_warehouse',
    name: 'ABANDONED WAREHOUSE',
    description: 'Close-quarters combat in a derelict industrial complex.',
    difficulty: 'easy',
    minPlayers: 2,
    maxPlayers: 12,
    supportedModes: ['tdm', 'ffa'],
    spawnPoints: {
      blue: [
        { x: -20, y: 0, z: 0 },
        { x: -22, y: 0, z: 5 },
      ],
      red: [
        { x: 20, y: 0, z: 0 },
        { x: 22, y: 0, z: -5 },
      ],
    },
  },
  {
    id: 'map_downtown',
    name: 'DOWNTOWN RUINS',
    description: 'Urban warfare in a destroyed city center.',
    difficulty: 'medium',
    minPlayers: 4,
    maxPlayers: 16,
    supportedModes: ['tdm', 'ffa', 'domination'],
    spawnPoints: {
      blue: [
        { x: -40, y: 0, z: 0 },
        { x: -42, y: 0, z: 10 },
      ],
      red: [
        { x: 40, y: 0, z: 0 },
        { x: 42, y: 0, z: -10 },
      ],
    },
    objectives: [
      { id: 'obj_a', name: 'Point Alpha', type: 'capture', position: { x: 0, y: 0, z: 15 } },
      { id: 'obj_b', name: 'Point Bravo', type: 'capture', position: { x: 0, y: 0, z: 0 } },
      { id: 'obj_c', name: 'Point Charlie', type: 'capture', position: { x: 0, y: 0, z: -15 } },
    ],
  },
  {
    id: 'map_bunker',
    name: 'UNDERGROUND BUNKER',
    description: 'Intense firefights in a military installation.',
    difficulty: 'hard',
    minPlayers: 6,
    maxPlayers: 20,
    supportedModes: ['tdm', 'search', 'domination'],
    spawnPoints: {
      blue: [{ x: -50, y: -10, z: 0 }],
      red: [{ x: 50, y: -10, z: 0 }],
    },
  },
  {
    id: 'map_desert',
    name: 'DESERT OUTPOST',
    description: 'Long-range engagements in open terrain.',
    difficulty: 'medium',
    minPlayers: 4,
    maxPlayers: 24,
    supportedModes: ['tdm', 'ffa', 'domination'],
    spawnPoints: {
      blue: [{ x: -60, y: 0, z: 0 }],
      red: [{ x: 60, y: 0, z: 0 }],
    },
  },
  {
    id: 'map_carrier',
    name: 'AIRCRAFT CARRIER',
    description: 'Naval combat on a massive warship.',
    difficulty: 'extreme',
    minPlayers: 8,
    maxPlayers: 32,
    supportedModes: ['tdm', 'domination'],
    spawnPoints: {
      blue: [{ x: -80, y: 5, z: 0 }],
      red: [{ x: 80, y: 5, z: 0 }],
    },
  },
];

// ============================================
// PERKS DATA
// ============================================

export const MOCK_PERKS: Perk[] = [
  {
    id: 'perk_quick_hands',
    name: 'Quick Hands',
    description: 'Faster weapon swap and reload speed.',
    category: 'speed',
  },
  {
    id: 'perk_ghost',
    name: 'Ghost',
    description: 'Invisible to enemy radar and UAVs.',
    category: 'stealth',
  },
  {
    id: 'perk_hardline',
    name: 'Hardline',
    description: 'Killstreaks require one less kill.',
    category: 'combat',
  },
  {
    id: 'perk_scavenger',
    name: 'Scavenger',
    description: 'Resupply ammo from dead enemies.',
    category: 'support',
  },
];

// ============================================
// MOCK PLAYERS FOR LOBBY
// ============================================

export const MOCK_LOBBY_PLAYERS: LobbyPlayer[] = [
  { id: 'p1', username: 'ShadowHunter', team: 'blue', isReady: true, isHost: true },
  { id: 'p2', username: 'NightWolf_X', team: 'blue', isReady: true, isHost: false },
  { id: 'p3', username: 'GhostReaper99', team: 'red', isReady: false, isHost: false },
  { id: 'p4', username: 'TacticalSniper', team: 'red', isReady: true, isHost: false },
  { id: 'p5', username: 'PhantomAce', team: 'unassigned', isReady: false, isHost: false },
];

// ============================================
// GAME MODE INFO
// ============================================

export const GAME_MODES = [
  {
    id: 'tdm',
    name: 'Team Deathmatch',
    description: 'Two teams fight to reach the score limit first.',
    icon: 'Users',
    players: '4-16',
  },
  {
    id: 'ffa',
    name: 'Free For All',
    description: 'Every player for themselves. Be the last one standing.',
    icon: 'Crosshair',
    players: '2-12',
  },
  {
    id: 'domination',
    name: 'Domination',
    description: 'Capture and hold objectives to earn points.',
    icon: 'Flag',
    players: '6-24',
  },
  {
    id: 'search',
    name: 'Search & Destroy',
    description: 'Plant or defuse the bomb. No respawns.',
    icon: 'Bomb',
    players: '4-12',
  },
  {
    id: 'campaign',
    name: 'Campaign',
    description: 'Solo or co-op story missions against AI.',
    icon: 'BookOpen',
    players: '1-4',
  },
];
