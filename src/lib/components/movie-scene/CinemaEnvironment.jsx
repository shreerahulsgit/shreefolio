import React from 'react';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const CinemaEnvironment = ({ highPerf = true, dimmed = false }) => {
    return (
        <group>
            {/* Deep space background */}
            <color attach="background" args={['#020205']} />
            <fog attach="fog" args={['#020205', 10, 120]} />

            {/* Stars - hidden during playback */}
            <group visible={!dimmed}>
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            </group>

            {/* ═══ FLOOR ═══ */}
            <mesh position={[0, -10, 5]} rotation={[-Math.PI / 8, 0, 0]}>
                <boxGeometry args={[50, 1, 50]} />
                <meshStandardMaterial 
                    color="#1a1a2a"
                    roughness={0.85}
                    metalness={0.1}
                    emissive="#0d0d18"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Aisle runner — violet accent */}
            <mesh position={[0, -9.4, 5]} rotation={[-Math.PI / 8, 0, 0]}>
                <boxGeometry args={[2.5, 0.05, 50]} />
                <meshStandardMaterial 
                    color="#6B3FA0"
                    roughness={0.7}
                    emissive="#4a2a80"
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* Screen Stage Platform */}
            <mesh position={[0, -8, -25]}>
                <cylinderGeometry args={[35, 35, 1.5, 64]} />
                <meshStandardMaterial 
                    color="#1a1028"
                    roughness={0.15}
                    metalness={0.9}
                    emissive="#2a1845"
                    emissiveIntensity={0.25}
                />
            </mesh>

            {/* ═══ VIOLET BORDER STRIPS ═══ */}

            {/* Left wall violet strip */}
            <mesh position={[-25, -2, -5]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[50, 0.25]} />
                <meshBasicMaterial color="#9B59B6" transparent opacity={dimmed ? 0.2 : 0.6} />
            </mesh>

            {/* Right wall violet strip */}
            <mesh position={[25, -2, -5]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[50, 0.25]} />
                <meshBasicMaterial color="#9B59B6" transparent opacity={dimmed ? 0.2 : 0.6} />
            </mesh>

            {/* Floor edge violet strips — left & right */}
            {[-1.5, 1.5].map((x, i) => (
                <mesh key={i} position={[x, -9.35, 5]} rotation={[-Math.PI / 8, 0, 0]}>
                    <boxGeometry args={[0.08, 0.02, 50]} />
                    <meshBasicMaterial color="#9B59B6" transparent opacity={dimmed ? 0.25 : 0.5} />
                </mesh>
            ))}

            {/* Step row violet dots */}
            {[0, 1, 2, 3, 4].map((row) => {
                const z = row * 3.5 + 5;
                const y = row * 1.0 - 6.5;
                return (
                    <group key={row}>
                        {[-14, -10, 10, 14].map((x, i) => (
                            <mesh key={i} position={[x, y, z]}>
                                <sphereGeometry args={[0.08, 8, 8]} />
                                <meshBasicMaterial color="#8E44AD" transparent opacity={dimmed ? 0.15 : 0.4} />
                            </mesh>
                        ))}
                    </group>
                );
            })}
        </group>
    );
};

export default CinemaEnvironment;
