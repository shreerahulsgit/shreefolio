import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

const CosmicBackground = () => {
    const starsRef = useRef();
    const orbsRef = useRef();

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.y += delta * 0.015;
        }
        if (orbsRef.current) {
            orbsRef.current.rotation.y += delta * 0.008;
        }
    });

    return (
        <group>
            <color attach="background" args={['#05010f']} />

            <group ref={starsRef}>
                <Stars 
                    radius={80} 
                    depth={60} 
                    count={5000} 
                    factor={5} 
                    saturation={0.3} 
                    fade 
                    speed={0.8} 
                />
            </group>

            <Sparkles 
                count={250} 
                scale={15} 
                size={1.5} 
                speed={0.3} 
                opacity={0.4} 
                noise={0.3} 
                color="#a855f7"
            />

            <Sparkles 
                count={150} 
                scale={25} 
                size={3} 
                speed={0.15} 
                opacity={0.25} 
                noise={0.5} 
                color="#6d28d9"
            />

            <Sparkles 
                count={80} 
                scale={35} 
                size={5} 
                speed={0.1} 
                opacity={0.15} 
                noise={0.4} 
                color="#c084fc"
            />

            <group ref={orbsRef}>
                <pointLight position={[-15, 8, -20]} color="#7c3aed" intensity={2} distance={60} decay={2} />
                <mesh position={[-15, 8, -20]}>
                    <sphereGeometry args={[0.5, 8, 8]} />
                    <meshBasicMaterial color="#7c3aed" transparent opacity={0.15} />
                </mesh>

                <pointLight position={[18, -6, -25]} color="#3b82f6" intensity={1.5} distance={50} decay={2} />
                <mesh position={[18, -6, -25]}>
                    <sphereGeometry args={[0.4, 8, 8]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
                </mesh>

                <pointLight position={[10, 12, -18]} color="#ec4899" intensity={1} distance={40} decay={2} />
                <mesh position={[10, 12, -18]}>
                    <sphereGeometry args={[0.3, 8, 8]} />
                    <meshBasicMaterial color="#ec4899" transparent opacity={0.08} />
                </mesh>
            </group>

            <ambientLight intensity={0.15} color="#1e1035" />
        </group>
    );
};

export default CosmicBackground;
