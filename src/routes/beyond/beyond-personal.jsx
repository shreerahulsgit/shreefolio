import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Float, Stars, Sparkles, PerformanceMonitor, Image } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Assets ---
// Clean, elegant font
const FONT_URL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff';

// --- Components ---

const FloatingText = ({ children, size = 1, color = "white", emissive = "white", ...props }) => {
  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} speed={1.5}>
      <Text
        font={FONT_URL}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        {...props}
      >
        {children}
        {/* Standard Material reacts to light + Emissive for Bloom */}
        <meshStandardMaterial 
            color={color} 
            emissive={emissive} 
            emissiveIntensity={0.5} 
            toneMapped={false} 
        />
      </Text>
    </Float>
  );
};

const Section = ({ z, children }) => {
  return (
    <group position={[0, 0, z]}>
      {children}
    </group>
  );
};

const MovingSpot = ({ color, position }) => {
    const light = useRef();
    useFrame((state) => {
        if(light.current) {
            light.current.position.x = position[0] + Math.sin(state.clock.elapsedTime) * 2;
        }
    });
    return <pointLight ref={light} position={position} color={color} intensity={2} distance={15} decay={2} />;
};

const Scene = () => {
    const scroll = useScroll();
    
    // Smooth camera movement
    useFrame((state, delta) => {
        // Longer scroll distance for more content
        const targetZ = -scroll.offset * 90; 
        
        state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ + 5, 2, delta);
        
        const { x, y } = state.pointer;
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x * 2, 2, delta);
        state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, y * 2, 2, delta);
    });

    return (
        <group>
            {/* 1. INTRO - Heavy Thoughts */}
            <Section z={0}>
                 <FloatingText size={0.5} position={[0, 2, 0]} color="#aaa">some things stayed unsaid.</FloatingText>
                 <FloatingText size={0.5} position={[0, 1.2, 0]} color="#aaa">not forgotten.</FloatingText>
                 <FloatingText size={1.5} position={[0, -0.5, 0]} emissive="white">just heavy.</FloatingText>
            </Section>

            {/* 2. ORIGIN - Soil & Time */}
            <Section z={-18}>
                <FloatingText size={0.8} position={[-2, 3, 0]} color="#ccc">not a loud place.</FloatingText>
                <FloatingText size={0.8} position={[2, 2, 0]} color="#ccc">no spotlight energy.</FloatingText>
                
                <FloatingText size={1.2} position={[0, 0, 0]} letterSpacing={0.1}>just soil. time. patience.</FloatingText>
                
                <FloatingText size={0.6} position={[0, -2, 0]} color="#888">it didn’t hype me.</FloatingText>
                <FloatingText size={0.6} position={[0, -2.8, 0]} color="#fff">it shaped me.</FloatingText>
            </Section>

            {/* 3. LANGUAGE - Kannada (Red/Yellow) */}
            <Section z={-40}>
                {/* Symbolic Lighting */}
                <MovingSpot position={[-5, 2, 0]} color="#FF0000" /> {/* Red */}
                <MovingSpot position={[5, -2, 0]} color="#FFD700" /> {/* Yellow */}
                
                <FloatingText size={0.5} position={[-2, 4, 0]} color="#aaa">some languages are chosen.</FloatingText>
                <FloatingText size={0.5} position={[2, 3.2, 0]} color="#fff">this one chose me.</FloatingText>
                
                <FloatingText size={0.6} position={[0, 1.5, 0]} color="#ccc">kannada runs in the background.</FloatingText>
                <FloatingText size={0.4} position={[0, 0.8, 0]} color="#888">in my silences. in my spine.</FloatingText>

                {/* SPLIT PROUDLY KANNADIGA */}
                <FloatingText size={1.8} position={[0, -1, 0]} letterSpacing={0.2} color="#FF0000" emissive="#FF0000">
                    PROUDLY
                </FloatingText>
                <FloatingText size={2.5} position={[0, -2.7, 0]} letterSpacing={0.05} color="#FFD700" emissive="#FFD700">
                    KANNADIGA
                </FloatingText>
                <FloatingText size={0.4} position={[2, -4, 0]} rotation={[0,0,-0.1]} color="#666">btw.</FloatingText>
                
                 <FloatingText size={0.5} position={[0, -5, 0]} letterSpacing={0.2} color="#fff">
                    permanent install.
                </FloatingText>
            </Section>

            {/* 4. PERSONALITY / CONNECT */}
            <Section z={-60}>
                <FloatingText size={0.8} position={[-2, 3, 0]}>still here?</FloatingText>
                <FloatingText size={1.2} position={[0, 1.5, 0]} emissive="#44aaff">yeah. you’re my kinda person.</FloatingText>
                
                <FloatingText size={0.6} position={[0, -0.5, 0]}>ig we should connect.</FloatingText>
                <FloatingText size={0.6} position={[0, -1.2, 0]}>you know where to find me.</FloatingText>

                {/* SOCIAL ICONS */}
               <group position={[0, -3.5, 0]}>
                    {/* Instagram */}
                    <group position={[-3, 0, 0]} onClick={() => window.open('https://instagram.com', '_blank')}>
                        <Float speed={2} rotationIntensity={0.5}>
                            <Image 
                                url="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" 
                                scale={[1.5, 1.5]} 
                                transparent 
                                toneMapped={false}
                            />
                        </Float>
                    </group>

                    {/* Snapchat */}
                    <group position={[0, -0.5, 1]} onClick={() => window.open('https://snapchat.com', '_blank')}>
                        <Float speed={3} rotationIntensity={0.5}>
                              <Image 
                                url="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1024px-Snapchat_logo.svg.png" 
                                scale={[1.5, 1.5]} 
                                transparent 
                                toneMapped={false}
                            />
                        </Float>
                    </group>

                    {/* X */}
                    <group position={[3, 0, 0]} onClick={() => window.open('https://x.com', '_blank')}>
                        <Float speed={2.5} rotationIntensity={0.5}>
                             <Image 
                                url="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/600px-X_logo_2023_%28white%29.png"
                                scale={[1.5, 1.5]} 
                                transparent 
                                toneMapped={false}
                            />
                        </Float>
                    </group>
                </group>
            </Section>

            {/* 5. LOGOUT */}
            <Section z={-80}>
                <FloatingText size={0.6} position={[0, 2, 0]} color="#666">no grand ending.</FloatingText>
                <FloatingText size={0.6} position={[0, 1.2, 0]} color="#666">no speech.</FloatingText>
                
                <FloatingText size={1} position={[0, -0.5, 0]}>just this —</FloatingText>
                
                <FloatingText size={1.5} position={[0, -2.5, 0]} emissive="white" letterSpacing={0.1}>stay rooted. stay real.</FloatingText>

                 <FloatingText size={0.5} position={[0, -5, 0]} color="#44aaff">bye from your kannadiga friend!!!!</FloatingText>
            </Section>
        </group>
    );
};

export default function BeyondPersonal() {
    const [dpr, setDpr] = useState(1.5);
    const [highPerf, setHighPerf] = useState(true);

    return (
        <div className="w-full h-screen bg-black">
            <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={dpr}
                gl={{ 
                    powerPreference: "high-performance", 
                    antialias: false, // Let Composer handle AA or rely on pixel density
                    stencil: false,
                    depth: true
                }}
            >
                {/* Performance Monitoring for RTX 3050 stability */}
                <PerformanceMonitor 
                    onDecline={() => { setDpr(1); setHighPerf(false); }} 
                    onIncline={() => { setDpr(1.5); setHighPerf(true); }}
                />

                {/* Atmosphere */}
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 25]} /> 
                <ambientLight intensity={0.2} />
                
                {/* Particles - Optimized count */}
                <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
                {highPerf && <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.4} color="#44aaff" />}

                <Suspense fallback={null}>
                    <ScrollControls pages={8} damping={0.2}>
                        <Scene />
                    </ScrollControls>
                </Suspense>

                {/* CINEMATIC POST PROCESSING */}
                <EffectComposer disableNormalPass>
                    <Bloom 
                        luminanceThreshold={0.2} 
                        luminanceSmoothing={0.9} 
                        height={300} 
                        intensity={1.5} // Neon Glow
                    />
                    <Noise opacity={0.05} /> {/* Film Grain */}
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <ChromaticAberration offset={[0.001, 0.001]} /> {/* Subtle Lens defect */}
                </EffectComposer>
            </Canvas>

             {/* Hint UI */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/30 text-xs uppercase tracking-[0.3em] animate-pulse">
                Scroll to Float
            </div>
            
            <div className="absolute top-8 left-8 pointer-events-none text-white/20 text-xs uppercase tracking-widest hidden md:block">
                The Void of Identity
            </div>
        </div>
    );
}
