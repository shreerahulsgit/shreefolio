import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uBass;
  
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    
    vec3 modelPosition = position;
    
    // Create wave effect
    float elevation = sin(modelPosition.x * 0.2 + uTime) * sin(modelPosition.y * 0.2 + uTime) * 1.5;
    
    // Add bass reaction (spikes)
    elevation += sin(modelPosition.x * 0.5 + uTime * 2.0) * uBass * 0.5;
    
    modelPosition.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(modelPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  
  varying float vElevation;

  void main() {
    float mixStrength = (vElevation + 1.0) * 0.5;
    vec3 color = mix(uColorA, uColorB, mixStrength);
    
    // Add grid lines
    // float grid = step(0.98, fract(vUv.x * 20.0)) + step(0.98, fract(vUv.y * 20.0));
    // color += grid;

    gl_FragColor = vec4(color, 0.8);
  }
`;

const SoundwaveTerrain = ({ analyser }) => {
  const meshRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBass: { value: 0 },
      uColorA: { value: new THREE.Color('#000000') },
      uColorB: { value: new THREE.Color('#8b5cf6') }, // Purple
    }),
    []
  );

  const dataArray = useMemo(() => new Uint8Array(128), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += delta * 0.5;
      
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        // Calculate average bass (lower frequencies)
        let bass = 0;
        for (let i = 0; i < 20; i++) {
          bass += dataArray[i];
        }
        bass = bass / 20;
        
        // Smoothly interpolate bass value
        meshRef.current.material.uniforms.uBass.value = THREE.MathUtils.lerp(
          meshRef.current.material.uniforms.uBass.value,
          bass / 50, // Normalize roughly
          0.1
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[60, 60, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
      />
    </mesh>
  );
};

export default SoundwaveTerrain;
