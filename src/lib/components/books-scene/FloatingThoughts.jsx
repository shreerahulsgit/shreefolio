import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const THOUGHTS = [
    "Ideas live forever", "Read to live", "question everything", 
    "Focus", "Elegance", "Simplicity", "Truth", "perspective",
    "Build", "Dream", "Create"
];

const FloatingThoughts = () => {
    const group = useRef();

    const particles = useMemo(() => {
        return new Array(14).fill(0).map((_, i) => ({
            text: THOUGHTS[i % THOUGHTS.length],
            x: (Math.random() - 0.5) * 28,
            y: (Math.random() - 0.5) * 18,
            z: (Math.random() - 0.5) * 8 - 6,
            speed: Math.random() * 0.15 + 0.05,
            opacity: Math.random() * 0.2 + 0.05,
            size: Math.random() * 0.2 + 0.08
        }));
    }, []);

    useFrame((state) => {
        if (group.current) {
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.4;
            group.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={group}>
            {particles.map((p, i) => (
                <Text
                    key={i}
                    position={[p.x, p.y, p.z]}
                    fontSize={p.size}
                    color="#c084fc"
                    fillOpacity={p.opacity}
                    rotation={[0, Math.random() * 0.3, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    {p.text}
                </Text>
            ))}
        </group>
    );
};

export default FloatingThoughts;
