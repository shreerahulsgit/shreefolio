import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Image, Float, MeshReflectorMaterial, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

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

const NeonStrip = ({ position, rotation = [0, 0, 0], length = 10, intensity = 4 }) => (
    <mesh position={position} rotation={rotation}>
        <boxGeometry args={[0.2, 0.1, length]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={intensity} toneMapped={false} />
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

            {Array.from({ length: 30 }).map((_, i) => (
                <group key={i}>
                    {/* Ceiling Light */}
                    <NeonStrip position={[-10 + i * 8, 4, 0]} />
                    {/* Floor Light (Matching Rib) */}
                    <NeonStrip position={[-10 + i * 8, -2, 0]} />
                </group>
            ))}


        </group>
    );
};

const Scene = ({ isAutoScroll, setIsAutoScroll }) => {
    const scroll = useScroll();
    
    // Auto-scroll logic
    React.useEffect(() => {
        if (!isAutoScroll) return;

        // Auto-scroll logic
        const tl = gsap.timeline({
            onComplete: () => setIsAutoScroll(false) // Reset when done
        });

        // For horizontal scrolling, use scrollLeft instead of scrollTop
        const isHorizontal = true; 
        const maxScroll = isHorizontal 
            ? scroll.el.scrollWidth - scroll.el.clientWidth 
            : scroll.el.scrollHeight - scroll.el.clientHeight;
        
        const scrollProp = isHorizontal ? "scrollLeft" : "scrollTop";
        
        // Helper to convert x-coord (0-120) into scrollLeft (px)
        const toScroll = (x) => (x / 120) * maxScroll;

        // --- Variable Speed Logic ---
        // Content zones need to be slow (e.g., 2 units/sec)
        // Empty gaps need to be fast (e.g., 10 units/sec)
        const slowSpeed = 4; // Lower = Slower
        const fastSpeed = 25; // Higher = Faster

        const zones = [
            { x: 0, speed: slowSpeed },    // Start slow (Intro)
            { x: 10, speed: fastSpeed },   // Intro done -> Fast Gap
            { x: 14, speed: slowSpeed },   // RCB Logo
            { x: 28, speed: fastSpeed },   // RCB/Cricket Map done -> Fast Gap
            { x: 50, speed: slowSpeed },   // The Win start
            { x: 60, speed: fastSpeed },   // The Win done -> Fast Gap
            { x: 75, speed: slowSpeed },   // Ferrari/F1 start
            { x: 90, speed: fastSpeed },   // Ferrari/F1 done -> Fast Gap
            { x: 105, speed: slowSpeed },  // Finale start
            { x: 120, speed: slowSpeed }   // End
        ];

        let currentX = 0;
        zones.forEach((zone) => {
            const distance = zone.x - currentX;
            if (distance > 0) {
                // Calculate duration based on distance and speed
                const duration = distance / (zone.speed === slowSpeed ? 2 : 12); 
                
                tl.to(scroll.el, { 
                    [scrollProp]: toScroll(zone.x), 
                    duration: duration, 
                    ease: "none" 
                });
                currentX = zone.x;
            } else {
                // Initial state update (if needed) but we start at 0
                currentX = zone.x;
            }
            // Update speed for next segment based on this zone's definition?
            // Actually, the array defines the END point of a segment and the speed of THAT segment.
            // Let's refine the logic:
            // The array defines specific points. We animate FROM currentX TO zone.x.
            // But what determines the speed?
        });

        // Simpler reliable approach: define segments explicitly
        const segments = [
            { endX: 10, type: 'slow' },  // Intro (0->10)
            { endX: 14, type: 'slow' },  // Gap (10->14)
            { endX: 30, type: 'fast' },  // RCB/Cricket (14->30)
            { endX: 50, type: 'fast' },  // Gap (30->50) - BIG GAP
            { endX: 62, type: 'slow' },  // The Win (50->62)
            { endX: 75, type: 'fast' },  // Gap (62->75) - BIG GAP
            { endX: 92, type: 'slow' },  // Ferrari/F1 (75->92)
            { endX: 105, type: 'fast' }, // Gap (92->105)
            { endX: 120, type: 'slow' }, // Finale (105->120)
        ];

        let lastX = 0;
        segments.forEach(segment => {
            const distance = segment.endX - lastX;
            // Calibrate speeds: 
            // Slow: 1 unit per 0.8s (e.g. 10 units = 8s)
            // Fast: 1 unit per 0.1s (e.g. 10 units = 1s)
            const durationPerUnit = segment.type === 'slow' ? 0.8 : 0.05; 
            const duration = distance * durationPerUnit;

            tl.to(scroll.el, {
                [scrollProp]: toScroll(segment.endX),
                duration: duration,
                ease: "none"
            });
            lastX = segment.endX;
        });

        return () => tl.kill();
    }, [isAutoScroll, scroll.el]);
    
    
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
                    we kept saying the same answer.{'\n'}
                    “Ee Sala Cup Namde!!”{'\n'}
                    and we did it!!
                 </WallText>

                 {/* Column 3: Mantra (Side-by-Side with Col 2) */}
                 <WallText position={[8, 1.5, 0]} size={0.5} color="#red" emissive="red" font={FONT_URL} maxWidth={4}>
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
                    STATEMENT.
                 </WallText>
                 
                 {/* Right Side: Body Text */}
                 <WallText position={[3, 2, 0]} size={0.5} color="#aaa" maxWidth={4}>
                    with noise.{'\n'}
                    with flex.
                 </WallText>
                 
                 <WallText position={[6, 0.5, 0]} size={0.4} color="white" maxWidth={5} lineHeight={1.2}>
                    We are ,{'\n'}
                    Champions — 2k25.
                 </WallText> 
                 <WallText position={[8, -1.0, 0]} size={0.4} color="#666" maxWidth={5}>
                    when loyalty looks back {'\n'}
                    and says — f worth it.{'\n'}
                    
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
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    
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
                         <Scene isAutoScroll={isAutoScroll} setIsAutoScroll={setIsAutoScroll} />
                    </ScrollControls>
                </Suspense>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.5} radius={0.5} intensity={1.2} mipmapBlur />
                    <Noise opacity={0.1} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>

            {/* Hints */}
             <button 
                onClick={() => setIsAutoScroll(!isAutoScroll)}
                className={`absolute top-8 left-8 z-[1000] px-6 py-2 border rounded text-xs tracking-widest transition-all duration-300 ${
                    isAutoScroll 
                        ? "bg-red-600 border-red-600 text-white" 
                        : "border-white/20 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
             >
                {isAutoScroll ? "STOP EXPERIENCE" : "START EXPERIENCE"}
             </button>

             <div className="absolute top-8 right-8 text-red-600 text-xs tracking-widest border border-red-900 px-3 py-1 rounded hidden md:block opacity-80">
                THE RED CORRIDOR
            </div>
            <div className="absolute bottom-8 left-8 text-white/50 text-xs tracking-widest animate-pulse">
                &larr; SCROLL &rarr;
            </div>
        </div>
    );
}
