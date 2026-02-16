import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars, Sparkles, PerformanceMonitor, CameraShake } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// --- Assets ---
const FONT_URL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff';

// --- Components ---

const ChaoticText = ({ 
    children, 
    position, 
    rotation = [0, 0, 0], 
    scale = 1, 
    onNavigate, // Changed from onClickPath
    color = "white",
    hoverColor = "#44aaff" 
}) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();
    
    // Random float parameters for "chaos"
    const floatSpeed = useMemo(() => Math.random() * 2 + 1, []);
    const floatIntensity = useMemo(() => Math.random() * 0.5 + 0.2, []);
    const floatRotation = useMemo(() => Math.random() * 0.5 + 0.1, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        
        // Glitch/Shake effect on hover
        if (hovered) {
             meshRef.current.position.x += (Math.random() - 0.5) * 0.05;
             meshRef.current.position.y += (Math.random() - 0.5) * 0.05;
        }
    });

    return (
        <Float 
            speed={floatSpeed} 
            rotationIntensity={floatRotation} 
            floatIntensity={floatIntensity}
            position={position}
            rotation={rotation}
        >
            <group 
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                onClick={(e) => {
                    e.stopPropagation();
                    if(onNavigate) onNavigate(); // Call the passed function
                }}
            >
                <Text
                    ref={meshRef}
                    font={FONT_URL}
                    fontSize={scale}
                    color={hovered ? hoverColor : color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={hovered ? 0.02 : 0}
                    outlineColor={hoverColor}
                >
                    {children}
                    <meshStandardMaterial 
                        color={hovered ? hoverColor : color} 
                        emissive={hovered ? hoverColor : color}
                        emissiveIntensity={hovered ? 2 : 0.5}
                        toneMapped={false} 
                    />
                </Text>
            </group>
        </Float>
    );
};

const Scene = ({ navigate }) => { // Receive navigate here
    // Mouse interaction for subtle parallax
    useFrame((state) => {
        const { x, y } = state.pointer;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 2, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 2, 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group>
            {/* CENTRAL TITLE */}
            <ChaoticText 
                position={[0, 0, 0]} 
                scale={1.5} 
                color="#888" 
                hoverColor="white"
            >
                BEYOND
            </ChaoticText>
            
            <ChaoticText 
                position={[0, -0.6, 0]} 
                scale={0.4} 
                color="#444" 
                hoverColor="#666"
            >
                (choose your chaos)
            </ChaoticText>

            {/* SCATTERED LINKS */}
            
            {/* Top Left - Unfiltered */}
            <ChaoticText 
                position={[-4, 2.5, -2]} 
                rotation={[0, 0.2, 0.1]}
                scale={0.8} 
                onNavigate={() => navigate('/beyond/unfiltered')}
                hoverColor="#ff4444"
            >
                UNFILTERED_ME
            </ChaoticText>

            {/* Top Right - Music */}
            <ChaoticText 
                position={[4, 2, -3]} 
                rotation={[0, -0.2, -0.05]}
                scale={0.9} 
                onNavigate={() => navigate('/beyond/music')}
                hoverColor="#ffff00"
            >
                AUDIO_HAVEN
            </ChaoticText>

            {/* Mid Left - Movies */}
            <ChaoticText 
                position={[-3.5, -0.5, 1]} 
                rotation={[0.1, 0.1, 0]}
                scale={0.7} 
                onNavigate={() => navigate('/beyond/movies')}
                hoverColor="#00ff88"
            >
                CINEMA_REALM
            </ChaoticText>

            {/* Mid Right - Sports */}
            <ChaoticText 
                position={[3, -1.5, 0]} 
                rotation={[-0.1, -0.2, 0.05]}
                scale={0.8} 
                onNavigate={() => navigate('/beyond/sports')}
                hoverColor="#ff00ff"
            >
                ADRENALINE
            </ChaoticText>

            {/* Bottom Left - Books */}
            <ChaoticText 
                position={[-2, -3, -1]} 
                rotation={[0, 0.1, -0.1]}
                scale={0.6} 
                onNavigate={() => navigate('/beyond/books')}
                hoverColor="#44aaff"
            >
                MIND_ARCHIVE
            </ChaoticText>

              {/* Bottom Right - Random */}
            <ChaoticText 
                position={[2.5, 3.5, -4]} 
                rotation={[0, -0.1, 0.1]}
                scale={0.5} 
                onNavigate={() => navigate('/beyond/random')}
                hoverColor="#ff8800"
            >
                CHAOS_THEORY
            </ChaoticText>
            
             {/* Deep Background Noise Text */}
             <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
                 <Text 
                    position={[0, 0, -10]} 
                    fontSize={5} 
                    color="#111" 
                    fillOpacity={0.5}
                    font={FONT_URL}
                >
                    ? ? ?
                 </Text>
             </Float>

        </group>
    );
};

import WormholeBackground from '../../lib/components/WormholeBackground.jsx';

export default function BeyondMain() {
    const navigate = useNavigate();
    const [dpr, setDpr] = useState(1.5);
    const [highPerf, setHighPerf] = useState(true);
    
    // --- INTRO LOGIC ---
    const shouldSkipIntro = sessionStorage.getItem('beyond_intro_done') === 'true';
    const [introDone, setIntroDone] = useState(shouldSkipIntro);

    const handleIntroComplete = () => {
        setIntroDone(true);
        sessionStorage.setItem('beyond_intro_done', 'true');
    };

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            
            {/* INTRO LAYER */}
            {!introDone && (
                <div className="absolute inset-0 z-[100]">
                    <WormholeBackground 
                        onIntroComplete={handleIntroComplete} 
                        skipIntro={shouldSkipIntro}
                    />
                </div>
            )}

            {/* MAIN 3D SCENE - Fade in when intro is done */}
            <div className={`w-full h-full transition-opacity duration-1000 ${introDone ? 'opacity-100' : 'opacity-0'}`}>
                <Canvas 
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    dpr={dpr}
                    gl={{ 
                        powerPreference: "high-performance",
                        antialias: false,
                        stencil: false,
                        depth: true
                    }}
                >
                     <PerformanceMonitor 
                        onDecline={() => { setDpr(1); setHighPerf(false); }} 
                        onIncline={() => { setDpr(1.5); setHighPerf(true); }}
                    />

                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 5, 30]} />
                    
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    
                    {/* Background Particles */}
                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                    {highPerf && <Sparkles count={150} scale={20} size={3} speed={0.4} opacity={0.2} color="#ffffff" />}

                    <Suspense fallback={null}>
                        <Scene navigate={navigate} />
                    </Suspense>

                    {/* Post Processing */}
                    <EffectComposer disableNormalPass>
                        <Bloom 
                            luminanceThreshold={0.2} 
                            luminanceSmoothing={0.9} 
                            height={300} 
                            intensity={1.2} 
                        />
                        <Noise opacity={0.1} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        <ChromaticAberration 
                             offset={[0.002, 0.002]} // RGB Shift for "Chaos"
                             radialModulation={false}
                             modulationOffset={0}
                        /> 
                    </EffectComposer>
                    
                    {/* Camera Shake for hand-held feel */}
                    <CameraShake 
                        maxYaw={0.05} 
                        maxPitch={0.05} 
                        maxRoll={0.05} 
                        yawFrequency={0.1} 
                        pitchFrequency={0.1} 
                        rollFrequency={0.1} 
                        intensity={0.5} 
                    />

                </Canvas>

                {/* Static UI Overlay */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/20 text-xs uppercase tracking-[0.5em] animate-pulse">
                    Explore the Void
                </div>
                
                <div className="absolute top-8 left-8 pointer-events-none text-white/10 text-xs uppercase tracking-widest hidden md:block">
                    Beyond Logic
                </div>
            </div>
        </div>
    );
}
