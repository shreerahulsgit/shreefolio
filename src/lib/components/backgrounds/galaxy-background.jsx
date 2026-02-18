import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GalaxyMaterial = {
    vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float aScale;
        attribute vec3 aRandomness;
        varying vec3 vColor;
        
        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            // Optional: Subtle gentle movement
            // float angle = atan(modelPosition.x, modelPosition.z);
            // float distanceToCenter = length(modelPosition.xz);
            // float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
            // angle += angleOffset;
            // modelPosition.x = cos(angle) * distanceToCenter;
            // modelPosition.z = sin(angle) * distanceToCenter;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
            
            // Size attenuation
            gl_PointSize = uSize * aScale;
            gl_PointSize *= (1.0 / -viewPosition.z);

            vColor = color;
        }
    `,
    fragmentShader: `
        varying vec3 vColor;

        void main() {
            // Soft circle shape
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 5.0); // Smooth falloff

            vec3 color = vColor;
            gl_FragColor = vec4(color, strength);
        }
    `
};

const GalaxySpiral = ({ count = 4000, variant }) => {
    const pointsRef = useRef();
    
    const { positions, colors, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const scales = new Float32Array(count * 1);

        const branches = 3;
        const radius = 8;
        const spin = 0.8; 
        const randomness = 0.5;
        const randomnessPower = 3;

        const colorInside = new THREE.Color('#ffffff'); 
        const colorOutside = new THREE.Color('#8B5CF6'); 

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            const radiusDist = Math.random() * radius;
            const branchAngle = (i % branches) / branches * Math.PI * 2;
            const spinAngle = radiusDist * spin;

            const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusDist;
            const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusDist / 2; // Flattened Y
            const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusDist;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radiusDist + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radiusDist + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radiusDist / radius);
            
            mixedColor.r += (Math.random() - 0.5) * 0.1;
            mixedColor.b += (Math.random() - 0.5) * 0.1;

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            scales[i] = Math.random();
        }

        return { positions, colors, scales };
    }, [count]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSize: { value: 200 * window.devicePixelRatio }
    }), []);

    const targetRotationX = variant === 'tilted' ? Math.PI / 2.5 : 0.2;

    useFrame((state, delta) => {
        uniforms.uTime.value = state.clock.elapsedTime;
        pointsRef.current.rotation.y += delta * 0.05;
        pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * delta * 1.5;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={scales}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={GalaxyMaterial.vertexShader}
                fragmentShader={GalaxyMaterial.fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={true}
                transparent={true}
            />
        </points>
    );
};

const Scene = ({ variant }) => {
    const { scene } = useThree();


    React.useEffect(() => {
        scene.fog = new THREE.FogExp2('#050505', 0.08);
    }, [scene]);

    return (
        <GalaxySpiral count={4500} variant={variant} />
    );
};

const GalaxyBackground = ({ variant = 'default' }) => {
    return (
        <div className="fixed inset-0 z-0 w-full h-full bg-[#050505] overflow-hidden">
            <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.4) 60%, #050505 100%)'
                }}
            />
            
            <Canvas
                camera={{ position: [0, 5, 8], fov: 45 }}
                gl={{ 
                    antialias: false,
                    powerPreference: "high-performance",
                    alpha: false 
                }}
                dpr={[1, 2]}
            >
                <Scene variant={variant} />
            </Canvas>
        </div>
    );
};

export default GalaxyBackground;
