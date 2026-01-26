import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

const ReflectiveFloor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]} // Blur ground reflections (width, height), 0 skips blur
                resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                mixBlur={1} // How much blur mixes with surface roughness (default = 1)
                mixStrength={40} // Strength of the reflections
                roughness={1}
                depthScale={1.2} // Scale the depth factor (0 = no depth, default = 0)
                minDepthThreshold={0.4} // Lower edge for the depth texture interpolation (default = 0)
                maxDepthThreshold={1.4} // Upper edge for the depth texture interpolation (default = 0)
                color="#050505"
                metalness={0.5}
            />
        </mesh>
    );
};

export default ReflectiveFloor;
