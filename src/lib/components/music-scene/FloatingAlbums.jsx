import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import * as THREE from 'three';

const AlbumItem = ({ album, index, total, isActive, onClick, radius = 8 }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Calculate position in circle
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state) => {
    if (mesh.current) {
      // Look at center (where camera usually is looking from) or look at camera
      mesh.current.lookAt(0, 0, 0);
      
      // Floating animation
      mesh.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
      
      // Scale up if active or hovered
      const targetScale = isActive ? 1.5 : (hovered ? 1.2 : 1);
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
        position={[x, 0, z]} 
        ref={mesh}
        onClick={() => onClick(index)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
    >
      <Image 
        url={album.cover} 
        transparent 
        side={THREE.DoubleSide}
        scale={[3, 3]} // Size of the Plane
      />
      
      {/* Album Title on Hover */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        opacity={hovered || isActive ? 1 : 0}
      >
        {album.title}
      </Text>
       <Text
        position={[0, -2.4, 0]}
        fontSize={0.2}
        color="gray"
        anchorX="center"
        anchorY="middle"
        opacity={hovered || isActive ? 1 : 0}
      >
        {album.artist}
      </Text>
    </group>
  );
};

const FloatingAlbums = ({ albums, currentAlbumIndex, onSelect }) => {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
        // Slowly rotate entire ring
        group.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      {albums.map((album, idx) => (
        <AlbumItem
          key={album.title}
          album={album}
          index={idx}
          total={albums.length}
          isActive={idx === currentAlbumIndex}
          onClick={onSelect}
        />
      ))}
    </group>
  );
};

export default FloatingAlbums;
