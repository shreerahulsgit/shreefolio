import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Image, Float, MeshReflectorMaterial, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Assets ---
const FONT_URL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff';

// --- Components ---

const WallText = ({ children, size = 1, color = "white", emissive = "white", ...props }) => {
  return (
      <Text
        font={FONT_URL}
        fontSize={size}
        color={color}
        anchorX="left"
        anchorY="middle"
        {...props}
      >
        {children}
        <meshStandardMaterial 
            color={color} 
            emissive={emissive} 
            emissiveIntensity={0.6} 
            toneMapped={false} 
        />
      </Text>
  );
};

const FramedImage = ({ url, scale=[1, 1], ...props }) => {
    return (
        <group {...props}>
             <Image 
                url={url} 
                scale={scale} 
                toneMapped={false}
            />
            {/* Frame */}
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[scale[0] + 0.2, scale[1] + 0.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
            </mesh>
        </group>
    );
};

const Logo = ({ url, position, scale = [5, 5] }) => {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Image 
                url={url} 
                position={position} 
                scale={scale} 
                transparent 
                toneMapped={false}
            />
        </Float>
    );
};

const NeonStrip = ({ position }) => (
    <mesh position={position} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.1, 10]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={4} toneMapped={false} />
    </mesh>
);

const Environment = () => {
    return (
        <group>
            {/* FLOOR - Wet Asphalt */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[300, 20]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={512} // Optimized
                    mixBlur={1}
                    mixStrength={30}
                    roughness={0.8}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                />
            </mesh>

            {/* BACK WALL */}
            <mesh position={[0, 5, -5]}>
                <planeGeometry args={[300, 20]} />
                <meshStandardMaterial color="#080808" roughness={0.9} />
            </mesh>

            {/* CEILING LIGHTS */}
            {Array.from({ length: 30 }).map((_, i) => (
                <NeonStrip key={i} position={[-10 + i * 8, 4, 0]} />
            ))}
        </group>
    );
};

const Scene = () => {
    const scroll = useScroll();
    
    useFrame((state, delta) => {
        const targetX = scroll.offset * 120;
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 2, delta);
        state.camera.lookAt(state.camera.position.x, 0, -5);
    });

    return (
        <group>
            <Environment />
            
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 2, 5]} color="red" intensity={1} distance={50} />
            <pointLight position={[60, 2, 5]} color="red" intensity={1} distance={50} />
            <pointLight position={[100, 2, 5]} color="red" intensity={1} distance={50} />

            {/* --- EXHIBIT 1: INTRO (Center) --- */}
            <group position={[0, 0, -4.8]}>
                 <WallText position={[0, 3, 0]} size={0.4} color="#888">THE RED CORRIDOR</WallText>
                 <WallText position={[0, 1, 0]} size={0.8} maxWidth={8} color="#ccc" lineHeight={1.2}>
                    some stories don’t start with winning.{'\n'}
                    they start with showing up anyway.
                 </WallText>
                 
                 <mesh position={[0, -1.5, 0]}>
                    <boxGeometry args={[8, 0.05, 0.1]} />
                    <meshStandardMaterial color="red" emissive="red" />
                 </mesh>
            </group>

            {/* RCB Logo */}
            <Logo 
                url="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1769009861/Royal_Challengers_Bengaluru_Logo.svg_whwcry.png" 
                position={[15, 2, -4.8]} 
                scale={[3.6, 5]}
            />

            {/* --- EXHIBIT 2: CRICKET (Side-by-Side Columns) --- */}
            <group position={[25, 0, -4.8]}>
                 <FramedImage 
                    url="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766381911/244247_b9xgwi.webp" 
                    scale={[5, 3]} 
                    position={[-6, 1, 0]}
                 />
                 
                 {/* Column 1: Map */}
                 <WallText position={[-2, 1.5, 0]} size={0.5} color="#aaa" maxWidth={4} lineHeight={1.2}>
                    on the map.{'\n'}
                    and also deep in the chest.
                 </WallText>
                 
                 {/* Column 2: Years */}
                 <WallText position={[2, 1.5, 0]} size={0.6} color="white" maxWidth={4} lineHeight={1.2}>
                    years of answering the same question.{'\n'}
                    “this year?”{'\n'}
                    “yeah. this year.”
                 </WallText>

                 {/* Column 3: Mantra (Side-by-Side with Col 2) */}
                 <WallText position={[6, 1.5, 0]} size={0.5} color="#red" emissive="red" font={FONT_URL} maxWidth={4}>
                    EE SALA CUP NAMDU.
                 </WallText>
            </group>

            {/* --- EXHIBIT 3: THE WIN (Center Image, Split Text) --- */}
            <group position={[55, 0, -4.8]}>
                 <FramedImage 
                    url="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766378383/d58177b0-40b7-11f0-aac2-37f04d2f01bc_1_kgozeb.jpg"
                    scale={[4, 5]} 
                    position={[0, 0.5, 0]}
                 />
                 
                 {/* Left Side: Title */}
                  <WallText position={[-8, 0.5, 1]} size={1.2} color="white" emissive="#ff0000" textAlign="right">
                    VALIDATION.
                 </WallText>
                 
                 {/* Right Side: Body Text */}
                 <WallText position={[3, 2, 0]} size={0.5} color="#aaa" maxWidth={4}>
                    with noise.{'\n'}
                    with flex.
                 </WallText>

                 <WallText position={[6, 0.5, 0]} size={0.4} color="white" maxWidth={5} lineHeight={1.2}>
                    when loyalty looks back at you{'\n'}
                    and says —{'\n'}
                    worth it.
                 </WallText>
                 
                 <WallText position={[8, -1.5, 0]} size={0.4} color="#666" maxWidth={5}>
                    patience, once learned,{'\n'}
                    doesn’t uninstall.
                 </WallText>
            </group>

            {/* Ferrari Logo */}
            <Logo 
                url="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1769010462/Ferrari-Scuderia-Logo_1_agoiw4.png" 
                position={[78, 2, -4.8]} 
                scale={[4, 4]}
            />

            {/* --- EXHIBIT 4: F1 (Image Left, Text Right) --- */}
            <group position={[85, -1, -4.8]}>
                 <FramedImage 
                    url="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766378786/6dwneccoykmd1_vqyesk.jpg"
                    scale={[8, 4.5]} 
                    position={[-2, 1.5, 0]}
                 />
            </group>
            <group position={[85, 0, -4.8]}>
                 {/* Text 1: Top block */}
                 <WallText position={[3, 3, 0]} size={0.6} color="#aaa" maxWidth={6} lineHeight={1.2} anchorY="top">
                    the color stayed.{'\n'}
                    the expectations learned restraint.
                 </WallText>
                 
                 {/* Text 2: Middle block - increased gap */}
                 <WallText position={[10, 3, 0]} size={0.6} color="white" maxWidth={6} lineHeight={1.2} anchorY="top">
                    red, without guarantees.{'\n'}
                    faith, without timelines.
                 </WallText>
                 
                 {/* Text 3: Bottom block */}
                 <WallText position={[3, 0.5, 0]} size={0.5} color="#888" anchorY="top">
                    still chose it. with pride.
                 </WallText>
                 <WallText position={[7, -0.5, 0]} size={0.5}  color="white" emissive="#ff0000" anchorY="top">
                    FORZA FERRARI
                 </WallText>
            </group>

            {/* --- FINALE (Center) --- */}
            <group position={[110, 0, -4.8]}>
                 <WallText position={[0, 2.5, 0]} size={0.5} color="#666" maxWidth={8} textAlign="center" lineHeight={1.2}>
                    it was never about trophies.{'\n'}
                    or finishes.{'\n'}
                    or proof.
                 </WallText>
                 
                 <WallText position={[0, 1, 0]} size={0.6} color="#aaa">
                    it was about staying loyal.
                 </WallText>

                 <WallText position={[0, -0.5, 0]} size={3} color="red" emissive="red" emissiveIntensity={2} letterSpacing={0.05}>
                    RED STAYS.
                 </WallText>
                 
                 <WallText position={[0, -2.5, 0]} size={0.4} color="#555" lineHeight={1.2} textAlign="center">
                    i bleed in red.{'\n'}
                    and you?
                 </WallText>
            </group>
        </group>
    );
};

export default function BeyondSport() {
    const [dpr, setDpr] = useState(1.5);
    
    return (
        <div className="w-full h-screen bg-black">
             <Canvas 
                camera={{ position: [0, 0, 7], fov: 45 }} // Camera moved back to z=7 for better visibility
                dpr={dpr}
                gl={{ 
                    powerPreference: "high-performance", 
                    antialias: false,
                    stencil: false,
                    depth: true
                }}
            >
                <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
                
                <color attach="background" args={['#000']} />
                <fog attach="fog" args={['#000', 5, 25]} /> 

                <Suspense fallback={null}>
                    <ScrollControls pages={8} damping={0.2} horizontal>
                         <Scene />
                    </ScrollControls>
                </Suspense>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.5} radius={0.5} intensity={1.2} mipmapBlur />
                    <Noise opacity={0.1} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>

            {/* Hints */}
             <div className="absolute top-8 right-8 text-red-600 text-xs tracking-widest border border-red-900 px-3 py-1 rounded hidden md:block opacity-80">
                THE RED CORRIDOR
            </div>
            <div className="absolute bottom-8 left-8 text-white/50 text-xs tracking-widest animate-pulse">
                &larr; SCROLL &rarr;
            </div>
        </div>
    );
}
