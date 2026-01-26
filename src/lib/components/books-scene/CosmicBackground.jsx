import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';

const CosmicBackground = () => {
    const starsRef = useRef();

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.y += delta * 0.02; // Slow rotation
        }
    });

    return (
        <group>
            {/* Deep Space Base Color */}
            <color attach="background" args={['#030008']} />
            {/* <fog attach="fog" args={['#030008', 10, 50]} /> DISABLE FOG FOR DIAGNOSTIC */}

            {/* Distant Stars */}
            <group ref={starsRef}>
                <Stars 
                    radius={100} 
                    depth={50} 
                    count={7000} 
                    factor={4} 
                    saturation={0} 
                    fade 
                    speed={1} 
                />
            </group>

            {/* Floating Space Dust (Sparkles) */}
            <Sparkles 
                count={300} 
                scale={20} 
                size={2} 
                speed={0.4} 
                opacity={0.5} 
                noise={0.2} 
                color="#8b5cf6" // Purple dust
            />
            <Sparkles 
                count={200} 
                scale={25} 
                size={4} 
                speed={0.2} 
                opacity={0.3} 
                noise={0.5} 
                color="#4c1d95" // Darker purple
            />

            {/* Nebula Clouds (Optimized) */}
             <Cloud 
                opacity={0.1} 
                speed={0.1} 
                width={15} 
                depth={1} 
                segments={8} // Low segments for stability
                position={[0, -5, -10]}
                color="#5b2eff"
            />
             <Cloud 
                opacity={0.05} 
                speed={0.1} 
                width={15} 
                depth={1} 
                segments={8} // Low segments for stability
                position={[5, 5, -12]}
                color="#c084fc"
            />

            {/* Ambient Lighting for Atmosphere */}
            <ambientLight intensity={0.2} color="#2e1065" />
            <pointLight position={[-10, 10, -10]} color="#7c3aed" intensity={1} distance={50} />
            <pointLight position={[10, -10, -10]} color="#2563eb" intensity={1} distance={50} />
        </group>
    );
};

export default CosmicBackground;
