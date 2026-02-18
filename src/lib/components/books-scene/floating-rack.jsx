import { useRef } from 'react';
import InteractiveBook from './interactive-book';
import { Float, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlowEdge = ({ position, args, dimmed }) => (
    <mesh position={position}>
        <boxGeometry args={args} />
        <meshBasicMaterial 
            color="#9B59B6" 
            transparent 
            opacity={dimmed ? 0.3 : 0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
        />
    </mesh>
);

const DeskLamp = ({ position, isOn, onToggle }) => {
    const lightRef = useRef();
    const bulbRef = useRef();
    const haloRef = useRef();

    useFrame((state, delta) => {
        const targetIntensity = isOn ? 12 : 0.8;
        const targetEmissive = isOn ? 8 : 0.4;
        const targetHalo = isOn ? 0.8 : 0.08;
        if (lightRef.current) {
            lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity, delta * 3);
        }
        if (bulbRef.current) {
            bulbRef.current.emissiveIntensity = THREE.MathUtils.lerp(bulbRef.current.emissiveIntensity, targetEmissive, delta * 3);
        }
        if (haloRef.current) {
            haloRef.current.material.opacity = THREE.MathUtils.lerp(haloRef.current.material.opacity, targetHalo, delta * 3);
        }
    });

    return (
        <group position={position} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.55, 0.12, 24]} />
                <meshStandardMaterial color="#aaaacc" roughness={0.1} metalness={0.95} />
            </mesh>
            <mesh position={[0, 0.07, 0]} rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[0.52, 0.02, 8, 24]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
            </mesh>

            <mesh position={[0, 0.55, 0.15]} rotation={[0.2, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 1.0, 8]} />
                <meshStandardMaterial color="#bbbbdd" roughness={0.15} metalness={0.9} />
            </mesh>
            <mesh position={[0, 1.0, 0.3]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 1.35, 0.45]} rotation={[0.4, 0, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.7, 8]} />
                <meshStandardMaterial color="#bbbbdd" roughness={0.15} metalness={0.9} />
            </mesh>

            <group position={[0, 1.6, 0.6]}>
                <mesh rotation={[0.5, 0, 0]}>
                    <coneGeometry args={[0.6, 0.5, 20, 1, true]} />
                    <meshStandardMaterial 
                        color="#9080b0" 
                        roughness={0.3} 
                        metalness={0.4}
                        emissive="#6a5a8a"
                        emissiveIntensity={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh rotation={[0.5, 0, 0]} scale={[0.95, 0.95, 0.95]}>
                    <coneGeometry args={[0.58, 0.48, 20, 1, true]} />
                    <meshStandardMaterial 
                        color="#ffe8c0" 
                        roughness={0.6}
                        emissive="#ffcc80"
                        emissiveIntensity={isOn ? 1.5 : 0.05}
                        side={THREE.FrontSide}
                    />
                </mesh>
                <mesh position={[0, -0.15, -0.08]} rotation={[0.5, 0, 0]}>
                    <torusGeometry args={[0.6, 0.015, 8, 24]} />
                    <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
                </mesh>
            </group>

            <mesh position={[0, 1.45, 0.55]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial 
                    ref={bulbRef}
                    color="#fff8e0" 
                    emissive="#ffcc44"
                    emissiveIntensity={0.4}
                />
            </mesh>

            <mesh ref={haloRef} position={[0, 1.45, 0.55]}>
                <sphereGeometry args={[0.4, 12, 12]} />
                <meshBasicMaterial 
                    color="#ffdd88" 
                    transparent 
                    opacity={0.08}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            <pointLight 
                ref={lightRef} 
                position={[0, 1.3, 0.5]} 
                color="#ffcc80" 
                intensity={0.8} 
                distance={15} 
                decay={2} 
            />
        </group>
    );
};

const FloatingRack = ({ books, activeBook, onSelect, lampOn, onToggleLamp }) => {
    const spacing = 0.4;
    const dimmed = !!activeBook;

    return (
        <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.15}>
            <group>
                <group position={[0, -1.2, 0]}>

                    <DeskLamp 
                        position={[2.2, 4.9, 0.2]} 
                        isOn={lampOn} 
                        onToggle={() => onToggleLamp()} 
                    />

                    {!lampOn && (
                        <group position={[2.2, 7.2, 0.5]}>
                            <Text
                                fontSize={0.28}
                                color="#ffcc80"
                                anchorX="center"
                                anchorY="middle"
                                letterSpacing={0.15}
                                font={undefined}
                            >
                                CLICK THE LAMP
                                <meshBasicMaterial 
                                    color="#ffcc80" 
                                    transparent 
                                    opacity={0.8}
                                    toneMapped={false}
                                />
                            </Text>
                            <Text
                                position={[0, -0.35, 0]}
                                fontSize={0.18}
                                color="#a855f7"
                                anchorX="center"
                                anchorY="middle"
                                letterSpacing={0.2}
                                font={undefined}
                            >
                                to turn on the lights
                                <meshBasicMaterial 
                                    color="#a855f7" 
                                    transparent 
                                    opacity={0.5}
                                    toneMapped={false}
                                />
                            </Text>
                            <pointLight position={[0, 0, 0.3]} color="#ffcc80" intensity={0.3} distance={3} decay={2} />
                        </group>
                    )}

                    {lampOn && (<>

                    {[-3.8, 3.8].map((x, i) => (
                        <mesh key={`side-${i}`} position={[x, 2, 0]}>
                            <boxGeometry args={[0.12, 6.5, 1.8]} />
                            <meshPhysicalMaterial 
                                color="#6a3d99"
                                transparent
                                opacity={0.15}
                                roughness={0.05}
                                metalness={0.3}
                                transmission={0.6}
                                thickness={0.5}
                                emissive="#6a3d99"
                                emissiveIntensity={lampOn ? 0.5 : 0}
                            />
                        </mesh>
                    ))}

                    {[4.8, 1.2, -2.2].map((y, i) => (
                        <group key={`shelf-${i}`}>
                            <mesh position={[0, y, 0]}>
                                <boxGeometry args={[7.5, 0.12, 1.8]} />
                                <meshPhysicalMaterial 
                                    color="#4a2080"
                                    transparent
                                    opacity={0.12}
                                    roughness={0.05}
                                    metalness={0.3}
                                    transmission={0.7}
                                    thickness={0.3}
                                    emissive="#4a2080"
                                    emissiveIntensity={lampOn ? 0.6 : 0}
                                />
                            </mesh>

                            <GlowEdge 
                                position={[0, y, 0.9]} 
                                args={[7.5, 0.04, 0.02]} 
                                dimmed={dimmed}
                            />
                            <GlowEdge 
                                position={[-3.74, y, 0]} 
                                args={[0.02, 0.04, 1.8]} 
                                dimmed={dimmed}
                            />
                            <GlowEdge 
                                position={[3.74, y, 0]} 
                                args={[0.02, 0.04, 1.8]} 
                                dimmed={dimmed}
                            />
                        </group>
                    ))}

                    {[-3.86, 3.86].map((x, i) => (
                        <GlowEdge 
                            key={`vedge-${i}`}
                            position={[x, 2, 0.9]} 
                            args={[0.02, 6.5, 0.02]} 
                            dimmed={dimmed}
                        />
                    ))}

                    <group position={[-2.5, 5.6, 0]}>
                        <mesh>
                            <sphereGeometry args={[0.55, 24, 24]} />
                            <meshStandardMaterial 
                                color="#1a2a5a" 
                                roughness={0.25} 
                                metalness={0.5}
                                emissive="#1a1a4a"
                                emissiveIntensity={0.25}
                            />
                        </mesh>
                        <mesh rotation={[Math.PI/2, 0, 0.3]}>
                            <torusGeometry args={[0.62, 0.02, 8, 32]} />
                            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.1} />
                        </mesh>
                        <mesh rotation={[0, 0, 0.3]}>
                            <torusGeometry args={[0.62, 0.015, 8, 32]} />
                            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
                        </mesh>
                        <mesh position={[0, -0.6, 0]}>
                            <cylinderGeometry args={[0.06, 0.22, 0.25, 12]} />
                            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.15} />
                        </mesh>
                        <pointLight position={[0, 0, 0.5]} color="#4466aa" intensity={0.3} distance={4} decay={2} />
                    </group>

                    <group position={[-0.5, 5.3, 0.3]}>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[0.5, 0.15, 0.5]} />
                            <meshStandardMaterial color="#1a1a2e" roughness={0.15} metalness={0.85} />
                        </mesh>
                        <mesh position={[0, 0.1, 0]}>
                            <boxGeometry args={[0.4, 0.08, 0.4]} />
                            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
                        </mesh>
                        <mesh position={[0, 0.35, 0]}>
                            <cylinderGeometry args={[0.05, 0.05, 0.45, 8]} />
                            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.15} />
                        </mesh>
                        <mesh position={[0, 0.7, 0]}>
                            <octahedronGeometry args={[0.28]} />
                            <meshStandardMaterial 
                                color="#D4AF37" 
                                metalness={0.95} 
                                roughness={0.05}
                                emissive="#D4AF37"
                                emissiveIntensity={0.25}
                            />
                        </mesh>
                        <pointLight position={[0, 0.7, 0]} color="#D4AF37" intensity={0.4} distance={3} decay={2} />
                    </group>

                    <group position={[-2.2, -1.3, 0.2]}>
                        <mesh rotation={[0, 0.5, 0.2]}>
                            <octahedronGeometry args={[0.5]} />
                            <meshPhysicalMaterial 
                                color="#7c3aed"
                                transparent
                                opacity={0.65}
                                roughness={0.02}
                                metalness={0.1}
                                transmission={0.5}
                                thickness={0.5}
                                emissive="#6d28d9"
                                emissiveIntensity={0.4}
                            />
                        </mesh>
                        <pointLight position={[0, 0, 0]} color="#a855f7" intensity={0.8} distance={5} decay={2} />
                    </group>

                    <group position={[0.5, -1.6, 0.3]}>
                        <mesh>
                            <cylinderGeometry args={[0.4, 0.32, 0.7, 16]} />
                            <meshStandardMaterial color="#c4956a" roughness={0.75} metalness={0.08} />
                        </mesh>
                        <mesh position={[0, 0.32, 0]}>
                            <torusGeometry args={[0.4, 0.04, 8, 16]} />
                            <meshStandardMaterial color="#b08050" roughness={0.6} metalness={0.1} />
                        </mesh>
                        <mesh position={[0, 0.3, 0]}>
                            <cylinderGeometry args={[0.37, 0.37, 0.08, 12]} />
                            <meshStandardMaterial color="#3a2a1a" roughness={1} />
                        </mesh>
                        <mesh position={[0, 0.8, 0]}>
                            <dodecahedronGeometry args={[0.5]} />
                            <meshStandardMaterial 
                                color="#2d8a4e" 
                                roughness={0.65}
                                emissive="#1a5a30"
                                emissiveIntensity={0.15}
                            />
                        </mesh>
                        <mesh position={[0.2, 0.95, 0.15]}>
                            <dodecahedronGeometry args={[0.25]} />
                            <meshStandardMaterial color="#3aad5e" roughness={0.7} emissive="#1a6a35" emissiveIntensity={0.1} />
                        </mesh>
                    </group>

                    <group position={[2.2, -1.75, 0]}>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1.1, 0.16, 0.8]} />
                            <meshStandardMaterial color="#8b2252" roughness={0.45} metalness={0.15} emissive="#4a1030" emissiveIntensity={0.05} />
                        </mesh>
                        <mesh position={[0.05, 0.17, 0]}>
                            <boxGeometry args={[1.0, 0.16, 0.75]} />
                            <meshStandardMaterial color="#1e3a8a" roughness={0.45} metalness={0.15} emissive="#0a1a4a" emissiveIntensity={0.05} />
                        </mesh>
                        <mesh position={[-0.04, 0.34, 0]}>
                            <boxGeometry args={[1.05, 0.16, 0.7]} />
                            <meshStandardMaterial color="#0f766e" roughness={0.45} metalness={0.15} emissive="#053a35" emissiveIntensity={0.05} />
                        </mesh>
                        <mesh position={[0.02, 0.51, 0]}>
                            <boxGeometry args={[0.95, 0.16, 0.72]} />
                            <meshStandardMaterial color="#5b21b6" roughness={0.45} metalness={0.15} emissive="#2a1060" emissiveIntensity={0.05} />
                        </mesh>
                    </group>
                    </>)}
                </group>

                {lampOn && books.map((book, i) => {
                    const xPos = (i - (books.length - 1) / 2) * spacing;
                    return (
                        <group key={i} position={[xPos, 0, 0]}>
                            <InteractiveBook 
                                book={book} 
                                index={i} 
                                total={books.length} 
                                isActive={activeBook === book}
                                isAnyActive={!!activeBook}
                                onSelect={onSelect}
                                rackPosition={[xPos, 0, 0]}
                            />
                        </group>
                    );
                })}
            </group>
        </Float>
    );
};

export default FloatingRack;
