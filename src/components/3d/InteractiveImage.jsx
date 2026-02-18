import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Image } from "@react-three/drei";
import * as THREE from "three";

// A distorting blob BEHIND the image to give it a futuristic aura
export const InteractiveImage = ({ url }) => {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
        // Smoothly interpolate distortion
        meshRef.current.distort = THREE.MathUtils.lerp(
            meshRef.current.distort,
            hovered ? 0.6 : 0.3,
            0.05
        );
    }
  });

  return (
    <group position={[2.5, 0, 0]} rotation={[0, -0.3, 0]}>
      {/* Aura Blob */}
      <mesh position={[0, 0, -0.8]}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <MeshDistortMaterial
          ref={meshRef}
          color="#4f46e5"
          speed={3}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.3}
          roughness={0}
        />
      </mesh>

      {/* Profile Image */}
      <Image
        url={url}
        transparent
        scale={[3.5, 4, 1]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        color={hovered ? "white" : "#e0e7ff"} // Tint shift
      />
    </group>
  );
};

export default InteractiveImage;
