import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = ({ count = 2000, analyzer }) => {
  const mesh = useRef();
  
  // Create particle positions and audio data placeholders
  const [positions, scales, randomness] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
        // Spherical distribution
        const r = 20 + Math.random() * 40;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        
        scales[i] = Math.random();
        randomness[i] = Math.random();
    }
    
    return [positions, scales, randomness];
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 20 }, // Base size
    uBeat: { value: 0 }, // REACTIVE
  }), []);

  const dataArray = useMemo(() => new Uint8Array(128), []);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value += delta;
      
      // Rotate the whole starfield slowly
      mesh.current.rotation.y += delta * 0.05;
      
       if (analyzer) {
        analyzer.getByteFrequencyData(dataArray);
        // Calculate average mid-high freqs for stars (sparkle)
        let sum = 0;
        for (let i = 20; i < 100; i++) {
          sum += dataArray[i];
        }
        const average = sum / 80;
        
        // Pulse size based on music
        mesh.current.material.uniforms.uBeat.value = THREE.MathUtils.lerp(
            mesh.current.material.uniforms.uBeat.value,
            average / 255,
            0.1
        );
      }
    }
  });

  // Custom Shader
  const vertexShader = `
    uniform float uTime;
    uniform float uSize;
    uniform float uBeat;
    
    attribute float aScale;
    attribute float aRandomness;
    
    varying float vAlpha;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Add some wobbly movement based on randomness
      // modelPosition.y += sin(uTime + modelPosition.x * 10.0) * aRandomness * 0.2;
      
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
      
      // REACTIVE SIZE
      float currentSize = uSize * aScale;
      // Add pulse
      currentSize += uBeat * 20.0 * aScale; 

      gl_PointSize = currentSize * (1.0 / -viewPosition.z);
      
      // Twinkle effect
      vAlpha = 0.5 + 0.5 * sin(uTime * 5.0 + aRandomness * 100.0);
    }
  `;

  const fragmentShader = `
    varying float vAlpha;

    void main() {
      // Circular particle
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = 0.05 / distanceToCenter - 0.1;
      
      gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * strength);
    }
  `;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
        />
        <bufferAttribute 
            attach="attributes-aScale"
            count={count}
            array={scales}
            itemSize={1}
        />
         <bufferAttribute 
            attach="attributes-aRandomness"
            count={count}
            array={randomness}
            itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
};

export default Starfield;
