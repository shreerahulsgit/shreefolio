import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

const ProjectorLight = ({ highPerf = true }) => {
    const light = useRef();
    
    useFrame((state) => {
        if (light.current && highPerf) {
            // Organic Flicker effect (simulating old arc lamp)
            const time = state.clock.elapsedTime;
            const flicker = Math.sin(time * 10) * 0.1 + Math.cos(time * 23) * 0.1 + Math.random() * 0.1; 
            light.current.intensity = 2 + flicker;
            
            // Subtle position shake
            light.current.position.x = Math.sin(time * 50) * 0.005;
        }
    });

    return (
        <group position={[0, 2, 10]} rotation={[0.2, 0, 0]}>
            {/* The Source */}
            <mesh>
                <boxGeometry args={[0.2, 0.2, 0.4]} />
                <meshStandardMaterial emissive="#ffffff" emissiveIntensity={2} color="#000" />
            </mesh>

            {/* The Beam (Volumetric Fake) - Only on High Perf */}
            {highPerf && (
                <>
                    <mesh position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.1, 4, 10, 32, 1, true]} />
                        <meshBasicMaterial 
                            color="#b9d2ff" 
                            transparent 
                            opacity={0.05} 
                            side={THREE.DoubleSide} 
                            blending={THREE.AdditiveBlending} 
                            depthWrite={false}
                        />
                    </mesh>
                    
                    <mesh position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.05, 3, 10, 32, 1, true]} />
                        <meshBasicMaterial 
                            color="#ffffff" 
                            transparent 
                            opacity={0.1} 
                            side={THREE.DoubleSide} 
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                </>
            )}

            {/* Actual Light Source for scene */}
            <SpotLight
                ref={light}
                position={[0, 0, 0]}
                target-position={[0, 0, -20]}
                angle={0.5}
                penumbra={0.5}
                intensity={2}
                castShadow
                color="#dceaff"
                distance={30}
            />
        </group>
    );
};

export default ProjectorLight;
