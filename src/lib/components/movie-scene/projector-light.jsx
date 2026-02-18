import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

const ProjectorLight = ({ highPerf = true, isPlaying = false }) => {
    const light = useRef();

    useFrame((state, delta) => {
        const targetIntensity = isPlaying ? 8 : 3;
        if (light.current) {
            light.current.intensity = THREE.MathUtils.lerp(light.current.intensity, targetIntensity, delta * 2);
        }
    });

    const target = React.useMemo(() => {
        const t = new THREE.Object3D();
        t.position.set(0, 4, -25);
        return t;
    }, []);

    return (
        <group position={[0, 6, 15]} rotation={[-0.1, 0, 0]}>
            <mesh>
                <boxGeometry args={[2, 1, 3]} /> 
                <meshStandardMaterial 
                    emissive="#ffffff" 
                    emissiveIntensity={isPlaying ? 1.5 : 0.5} 
                    color="#222" 
                />
            </mesh>

            <mesh position={[0, 0, -1.6]}>
                 <circleGeometry args={[0.3, 32]} />
                 <meshBasicMaterial color="#fff" transparent opacity={isPlaying ? 1 : 0.6} />
            </mesh>

            <primitive object={target} />

            <SpotLight
                ref={light}
                position={[0, 0, -1.5]}
                target={target}
                angle={0.7}
                penumbra={0.3}
                intensity={3}
                color="#dceaff"
                distance={80}
                attenuation={8}
                anglePower={4}
                volumetric
                opacity={0.15}
            />
        </group>
    );
};

export default ProjectorLight;
