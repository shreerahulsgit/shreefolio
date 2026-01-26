import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const THOUGHTS = [
    "Ideas live forever", "Read to live", "Silence is answers", "Chaos is order", 
    "Build the future", "question everything", "Focus", "Deep Work", 
    "Elegance", "Simplicity", "Truth", "perspective"
];

const FloatingThoughts = () => {
    const group = useRef();

    const particles = useMemo(() => {
        return new Array(20).fill(0).map(() => ({
            text: THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)],
            x: (Math.random() - 0.5) * 30, // Wide spread
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 10 - 5,
            speed: Math.random() * 0.2 + 0.1,
            opacity: Math.random() * 0.4 + 0.1
        }));
    }, []);

    useFrame((state) => {
        if (group.current) {
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
            group.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={group}>
            {particles.map((p, i) => (
                <Text
                    key={i}
                    position={[p.x, p.y, p.z]}
                    fontSize={Math.random() * 0.3 + 0.1}
                    color="#a855f7" // Violet/Purple
                    fillOpacity={p.opacity}
                    // font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxXo.woff"
                    rotation={[0, Math.random() * 0.5, 0]}
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
