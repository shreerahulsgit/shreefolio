import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';

const CinemaEnvironment = ({ highPerf = true }) => {
    return (
        <group>
            {/* Deep dark starfield background, barely visible */}
            <Stars radius={100} depth={50} count={highPerf ? 3000 : 500} factor={4} saturation={0} fade speed={1} />
            
            {/* Low lying fog for atmosphere */}
            <fog attach="fog" args={['#050505', 5, 25]} />
            
            {/* Subtle floating dust/smoke - positioned to catch the light */}
            {highPerf && (
                <Cloud 
                    opacity={0.3} 
                    speed={0.2} 
                    width={10} 
                    depth={1.5} 
                    segments={10} // Reduced segments
                    position={[0, -2, -5]}
                    color="#BDC3C7"
                />
            )}
        </group>
    );
};

export default CinemaEnvironment;
