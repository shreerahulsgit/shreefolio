import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

export const FloatingShapes = () => {
  const shapes = useRef([]);

  useFrame((state) => {
    shapes.current.forEach((shape, i) => {
      if (shape) {
        shape.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.003 * (i % 2 === 0 ? -1 : 1);
      }
    });
  });

  return (
    <>
      {/* Background Torus */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Torus
          ref={(el) => (shapes.current[0] = el)}
          args={[3, 0.2, 16, 100]}
          position={[-4, 2, -5]}
          rotation={[Math.PI / 4, 0, 0]}
        >
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#a78bfa"
            roughness={0.2}
            metalness={0.8}
            transparent={true}
            opacity={0.3}
          />
        </Torus>
      </Float>

      {/* Floating Icosahedron */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron
          ref={(el) => (shapes.current[1] = el)}
          args={[1, 0]}
          position={[4, -2, -5]}
        >
           <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.2}
            anisotropy={0.3}
            distortion={0.4}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#60a5fa"
            roughness={0.1}
            metalness={0.1}
            transparent={true}
            opacity={0.5}
          />
        </Icosahedron>
      </Float>
      
       {/* Small floating particles */}
       {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5 - 2
          ]}>
            <octahedronGeometry args={[Math.random() * 0.2]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#a78bfa" : "#60a5fa"} emissive={i % 2 === 0 ? "#a78bfa" : "#60a5fa"} emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </>
  );
};
