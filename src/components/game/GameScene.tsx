/**
 * GameScene - Three.js placeholder scene for the game
 * This is a template structure for adding 3D game content
 */

import { Canvas } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Grid,
  Environment,
  Sky,
  Stars,
} from '@react-three/drei';
import { Suspense } from 'react';

// Placeholder floor
const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#1a1f2e" />
    </mesh>
  );
};

// Placeholder building/obstacle
const PlaceholderBuilding = ({ position, size }: { position: [number, number, number]; size: [number, number, number] }) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#2a3040" />
      {/* Wireframe outline */}
      <mesh>
        <boxGeometry args={[size[0] + 0.02, size[1] + 0.02, size[2] + 0.02]} />
        <meshBasicMaterial wireframe color="#00f0ff" transparent opacity={0.3} />
      </mesh>
    </mesh>
  );
};

// Placeholder spawn point marker
const SpawnPoint = ({ position, team }: { position: [number, number, number]; team: 'blue' | 'red' }) => {
  const color = team === 'blue' ? '#3b82f6' : '#ef4444';
  
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// Placeholder weapon model (just a box for now)
const PlaceholderWeapon = () => {
  return (
    <group position={[0.5, -0.3, -0.8]}>
      {/* Gun body */}
      <mesh>
        <boxGeometry args={[0.1, 0.15, 0.6]} />
        <meshStandardMaterial color="#2a3040" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Scope placeholder */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
};

// Loading fallback
const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe color="#00f0ff" />
    </mesh>
  );
};

// Main scene component
interface GameSceneProps {
  showWeapon?: boolean;
  showControls?: boolean;
}

export const GameScene = ({ showWeapon = true, showControls = false }: GameSceneProps) => {
  return (
    <Canvas shadows className="w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
        
        {/* Controls (for development/preview) */}
        {showControls && <OrbitControls />}
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#0ea5e9" />
        <pointLight position={[10, 5, 10]} intensity={0.3} color="#f97316" />

        {/* Environment */}
        <Sky sunPosition={[100, 10, 100]} turbidity={10} rayleigh={0.5} />
        <Stars radius={100} depth={50} count={1000} factor={4} />
        <fog attach="fog" args={['#0a0e14', 30, 100]} />

        {/* Ground */}
        <Floor />
        <Grid
          position={[0, 0.01, 0]}
          args={[100, 100]}
          cellSize={2}
          cellThickness={0.5}
          cellColor="#0ea5e9"
          sectionSize={10}
          sectionThickness={1}
          sectionColor="#0ea5e9"
          fadeDistance={50}
          fadeStrength={1}
          infiniteGrid
        />

        {/* Placeholder structures - TODO: Replace with actual 3D models */}
        <PlaceholderBuilding position={[-10, 2.5, -10]} size={[5, 5, 5]} />
        <PlaceholderBuilding position={[10, 1.5, -15]} size={[8, 3, 4]} />
        <PlaceholderBuilding position={[0, 4, -20]} size={[6, 8, 6]} />
        <PlaceholderBuilding position={[-15, 1, 5]} size={[4, 2, 10]} />
        <PlaceholderBuilding position={[15, 2, 5]} size={[3, 4, 3]} />

        {/* Spawn points */}
        <SpawnPoint position={[-20, 0, 0]} team="blue" />
        <SpawnPoint position={[20, 0, 0]} team="red" />

        {/* FPS weapon (visible in first-person view) */}
        {showWeapon && <PlaceholderWeapon />}
      </Suspense>
    </Canvas>
  );
};

export default GameScene;
