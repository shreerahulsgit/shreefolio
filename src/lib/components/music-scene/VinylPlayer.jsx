import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Cylinder, Html } from '@react-three/drei';
import * as THREE from 'three';

const VinylRecord = ({ isPlaying, albumCover, onTogglePlay }) => {
  const mesh = useRef();
  
  // Load album cover texture
  // Fallback if no cover provided
  const coverUrl = albumCover || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop';
  const texture = useTexture(coverUrl);
  
  // Materials
  const vinylMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111',
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  const labelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.4,
  }), [texture]);

  useFrame((state, delta) => {
    if (mesh.current && isPlaying) {
      mesh.current.rotation.y -= delta * 2; // Spin
    }
  });

  return (
    <group ref={mesh} onClick={onTogglePlay} cursor="pointer">
      {/* Vinyl Disc */}
      <Cylinder args={[4, 4, 0.1, 64]} castShadow receiveShadow>
        <primitive object={vinylMaterial} attach="material" />
      </Cylinder>
      
      {/* Label (Album Art) */}
      <Cylinder args={[1.5, 1.5, 0.11, 64]} rotation={[0, 0, 0]} position={[0, 0.01, 0]}>
        <primitive object={labelMaterial} attach="material" />
      </Cylinder>
      
      {/* Center Hole */}
      <Cylinder args={[0.15, 0.15, 0.5, 32]} position={[0, 0, 0]}>
         <meshBasicMaterial color="#000" />
      </Cylinder>

      {/* Grooves Texture (simulated with rings) */}
       <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.06, 0]}>
         <ringGeometry args={[1.55, 3.9, 64]} />
         <meshStandardMaterial 
            color="#111" 
            roughness={0.5} 
            metalness={0.5}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
         />
       </mesh>
    </group>
  );
};

const Tonearm = ({ isPlaying }) => {
    const armRef = useRef();

    useFrame((state, delta) => {
        if (armRef.current) {
            // Move arm towards record when playing
            const targetRotation = isPlaying ? 0.4 : 0;
            armRef.current.rotation.y = THREE.MathUtils.lerp(
                armRef.current.rotation.y,
                targetRotation,
                delta * 2
            );
        }
    });

    return (
        <group position={[4.5, 1, 3]} rotation={[0, 0, 0]} ref={armRef}>
             {/* Pivot Base */}
            <Cylinder args={[0.5, 0.6, 1, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </Cylinder>
            
            {/* The Arm */}
            <mesh position={[-2, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
                 <cylinderGeometry args={[0.1, 0.15, 5, 32]} />
                 <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
            </mesh>
            
             {/* Cartridge */}
            <mesh position={[-4.5, 0.4, 0.2]} rotation={[0, 0.5, 0]}>
                 <boxGeometry args={[0.5, 0.3, 0.8]} />
                 <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    );
}

const VinylPlayer = ({ isPlaying, currentAlbum, onTogglePlay }) => {
  return (
    <group rotation={[0.4, 0, 0]}> {/* Tilt slightly towards camera */}
      {/* Platter/Base */}
      <Cylinder args={[4.2, 4.5, 0.5, 64]} position={[0, -0.3, 0]} receiveShadow>
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.2} />
      </Cylinder>
      
      {/* The Record */}
      <VinylRecord 
        isPlaying={isPlaying} 
        albumCover={currentAlbum?.cover} 
        onTogglePlay={onTogglePlay} 
      />
      
      {/* Tonearm */}
      <Tonearm isPlaying={isPlaying} />
      
      {/* Ambient Glow */}
      <pointLight 
        position={[0, 2, 0]} 
        intensity={isPlaying ? 10 : 2} 
        color={currentAlbum?.accent ? '#a855f7' : '#fff'} // Fallback color
        distance={10} 
        decay={2}
      />
    </group>
  );
};

export default VinylPlayer;
