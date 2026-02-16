import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Float, Stars, Sparkles, PerformanceMonitor, Billboard } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// --- Assets ---
const FONT_URL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff';

// --- Configuration ---
const SPIRAL_RADIUS = 5;
const VERTICAL_SPACING = 3.5; 
const ANGLE_STEP = Math.PI / 2; // sharper turn
const TOTAL_BLOCKS = 8;


// --- Content Data (Same as before) ---
const BLOCKS_DATA = [
  {
    id: 1,
    accentColor: '#ffffff',
    content: (
      <>
        <Text size={1.4} emissive="#ffffff">
          heyyy, quick heads up —
        </Text>
        <Text size={0.5} position={[0, -1.2, 0]} color="#777">
          (you’re entering unfiltered me )
        </Text>
      </>
    ),
  },

  {
    id: 2,
    accentColor: '#60a5fa',
    content: (
      <>
        <Text size={0.6} position={[0, 1.6, 0]} color="#bdbdbd">
          i’m more of a laugh-at-the-wrong-time kinda person 
        </Text>
        <Text size={0.6} position={[0, 0.6, 0]} color="#bdbdbd">
          i thrive around people who match that energy
        </Text>
        <Text
          size={1.1}
          position={[0, -1.2, 0]}
          color="#60a5fa"
          emissive="#60a5fa"
          letterSpacing={0.08}
        >
          same braincell. same chaos
        </Text>
      </>
    ),
  },

  {
    id: 3,
    accentColor: '#f87171',
    content: (
      <>
        <Text size={0.8} position={[-1.2, 2, 0]} color="#a3a3a3">
          i love the idea of traveling 
        </Text>
        <Text size={0.7} position={[1.2, 1.1, 0]} color="#737373">
          actually traveling?
        </Text>
        <Text
          size={1}
          position={[0, -0.2, 0]}
          color="#f87171"
          emissive="#f87171"
        >
          yeah… life said “not now bro”
        </Text>
        <Text size={0.6} position={[0, -1.8, 0]} color="#888">
          so for now, i explore places
        </Text>
        <Text size={0.7} position={[0, -2.6, 0]} color="#e5e5e5">
          through google maps and reels 
        </Text>
      </>
    ),
  },

  {
    id: 4,
    accentColor: '#fb7185',
    content: (
      <>
        <Text size={0.7} position={[-1.4, 1.4, 0]} color="#cfcfcf">
          not a hardcore cinephile
        </Text>
        <Text size={0.7} position={[1.4, 0.5, 0]} color="#cfcfcf">
          but i’ve watched enough
        </Text>
        <Text
          size={1.2}
          position={[0, -1.6, 0]}
          color="#fb7185"
          emissive="#fb7185"
          letterSpacing={0.06}
        >
          “this could’ve been shorter” 
        </Text>
      </>
    ),
  },

  {
    id: 5,
    accentColor: '#22c55e',
    content: (
      <>
        <Text size={0.8} position={[-1.6, 2.4, 0]} color="#eab308">
          anime? obviously 
        </Text>
        <Text size={0.8} position={[1.6, 1.6, 0]} color="#22c55e">
          music? mandatory
        </Text>
        <Text size={0.6} position={[0, 0.2, 0]} color="#a3a3a3">
          some days it’s the weeknd 
        </Text>
        <Text size={0.6} position={[0, -0.6, 0]} color="#a3a3a3">
          some days it’s raghu dixit 
        </Text>
        <Text
          size={1}
          position={[0, -2.4, 0]}
          color="#ffffff"
          letterSpacing={0.05}
        >
          mood swings, but make it musical
        </Text>
      </>
    ),
  },

  {
    id: 6,
    accentColor: '#a78bfa',
    content: (
      <>
        <Text size={0.7} position={[0, 1.6, 0]} color="#737373">
          yeah, i lowkey stay in trend
        </Text>
        <Text size={0.7} position={[0, 0.6, 0]} color="#737373">
          by doomscrolling social media
        </Text>
        <Text size={0.9} position={[0, -1, 0]} color="#c084fc">
          like it’s research 
        </Text>
        <Text
          size={1.2}
          position={[0, -2.6, 0]}
          emissive="#a78bfa"
          letterSpacing={0.12}
        >
          for awareness. totally
        </Text>
      </>
    ),
  },

  {
    id: 7,
    accentColor: '#facc15',
    content: (
      <>
        <Text size={0.6} position={[0, 2.2, 0]} color="#d4d4d4">
          i somehow know more than four languages 
        </Text>
        <Text size={0.5} position={[0, 1.5, 0]} color="#8a8a8a">
          (avg bengaluru behavior)
        </Text>
        <Text size={0.8} position={[0, 0.2, 0]} color="#e5e5e5">
          but still don’t fully belong there
        </Text>
        <Text size={0.8} position={[0, -0.8, 0]} color="#e5e5e5">
          and honestly?
        </Text>
        <Text
          size={1.1}
          position={[0, -2.4, 0]}
          color="#facc15"
          emissive="#facc15"
        >
          i’m not cool with that yet 🫠
        </Text>
      </>
    ),
  },

  {
    id: 8,
    accentColor: '#ffffff',
    content: (
      <>
        <Text size={0.8} position={[0, 1.2, 0]} color="#ffffff">
          now go around
        </Text>
        <Text
          size={1.6}
          position={[0, -1.2, 0]}
          emissive="#ffffff"
          color="#ffffff"
          letterSpacing={0.14}
          isAction
        >
          explore the stuff i love
        </Text>
      </>
    ),
    isAction: true,
  },
];

// --- Helpers ---
const CloudText = ({ size = 1, color = "white", emissive = "white", children, isAction, ...props }) => {
    const matRef = useRef();
    
    // Pulsing glow for action/CTA blocks
    useFrame((state) => {
        if (matRef.current && isAction) {
            const pulse = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2; // 0→1 breathing
            matRef.current.emissiveIntensity = 0.5 + pulse * 1.5;
        }
    });

    return (
        <Text
            fontSize={size * 0.6}
            color={color}
            anchorX="center"
            anchorY="middle"
            {...props}
        >
            {children}
            <meshStandardMaterial 
                ref={matRef}
                color={color} 
                emissive={emissive} 
                emissiveIntensity={isAction ? 1.0 : 0.6} 
                toneMapped={false} 
                transparent
            />
        </Text>
    );
};

// --- Components ---

const SpiralBlock = ({ data, index, total, onNavigate }) => {
    const groupRef = useRef();
    const lightRef = useRef();
    const [hovered, setHovered] = useState(false);

    // SPIRAL MATH
    const angle = index * ANGLE_STEP;
    const y = -index * VERTICAL_SPACING;
    const x = Math.sin(angle) * SPIRAL_RADIUS;
    const z = -Math.cos(angle) * SPIRAL_RADIUS;

    // Fade-in config
    const REVEAL_RANGE = 8; // units of camera distance to fully reveal

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        // --- SCROLL PROXIMITY FADE-IN ---
        const camY = state.camera.position.y;
        const distance = Math.abs(camY - y);
        
        // visibility: 1 when camera is at block, 0 when far away
        const visibility = THREE.MathUtils.clamp(1 - distance / REVEAL_RANGE, 0, 1);
        // Smooth ease-in curve
        const eased = visibility * visibility * (3 - 2 * visibility); // smoothstep
        
        // Apply opacity to all children materials
        groupRef.current.traverse((child) => {
            if (child.material) {
                child.material.opacity = eased;
                child.material.transparent = true;
            }
        });
        
        // Scale: from 0.6 to 1 (or 1.1 if hovered action)
        const baseScale = 0.6 + eased * 0.4;
        const targetScale = (data.isAction && hovered) ? baseScale * 1.1 : baseScale;
        const currentScale = groupRef.current.scale.x;
        const smoothScale = THREE.MathUtils.damp(currentScale, targetScale, 5, delta);
        groupRef.current.scale.setScalar(smoothScale);

        // --- ACCENT LIGHT ---
        if (lightRef.current) {
            lightRef.current.intensity = eased * 3;
        }
    });

    const handlePointerOver = () => data.isAction && setHovered(true);
    const handlePointerOut = () => data.isAction && setHovered(false);
    const handleClick = () => {
        if (data.isAction) {
            onNavigate('/beyond');
        }
    };

     const renderChildren = React.Children.map(data.content.props.children, (child) => {
        if (React.isValidElement(child) && child.type === Text) {
             const { isAction } = data;
             return (
                 <CloudText 
                    {...child.props} 
                    isAction={isAction}
                    onPointerOver={isAction ? handlePointerOver : undefined}
                    onPointerOut={isAction ? handlePointerOut : undefined}
                    onClick={isAction ? handleClick : undefined}
                />
             );
        }
        return child;
    });

    return (
        <group 
            ref={groupRef} 
            position={[x, y, z]}
        >
             {/* Accent light that fades with proximity */}
             <pointLight
                 ref={lightRef}
                 color={data.accentColor || '#ffffff'}
                 intensity={0}
                 distance={12}
                 decay={2}
                 position={[0, 0, 2]}
             />
             <Billboard>
                 <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                    {renderChildren}
                </Float>
             </Billboard>
        </group>
    );
};

const SpiralScene = ({ onNavigate }) => {
    const scroll = useScroll();
    const { camera } = useThree();
    
    useFrame((state, delta) => {
        // SCROLL DRIVES CAMERA DESCENT
        // We need to move Camera Y down.
        // Total height = TOTAL_BLOCKS * VERTICAL_SPACING
        const scrollOffset = scroll.offset;
        const totalHeight = (TOTAL_BLOCKS - 1) * VERTICAL_SPACING;
        
        const targetY = -(scrollOffset * totalHeight); 
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);
        
        // SCROLL DRIVES CAMERA ROTATION (SPIRAL)
        // We rotate the camera around the Y axis to match the spiral angle.
        // Current Angle should match the Index we are at.
        // Index = scrollOffset * (TOTAL - 1)
        // Angle = Index * ANGLE_STEP
        
        const currentAngle = scrollOffset * (TOTAL_BLOCKS - 1) * ANGLE_STEP;
        
        // Camera Position relative to center
        // We want to be inside the spiral, looking slightly out or at the wall?
        // Let's stay in the center x=0, z=0.
        // And rotate the camera Y to look at the current wall.
        
        // Actually, better visual: Camera describes a smaller inner spiral?
        // Or just rotate the camera itself.
        
        // Simple: Camera at 0,y,0. Rotating Y.
        // Target Rotation Y = -currentAngle + Offset to center text
        // Adding Math.PI to face the text which is at 'currentAngle'
        
        // We control camera.rotation.y directly or use lookAt
        // Damp rotation
        const targetRotY = currentAngle;
        
        // We manually update camera rotation (quaternion is better but Euler is fine here for Y axis)
        // Note: We need to respect the initial Camera setup.
        // Let's dampen the rotation value
        
        // To make it smooth continuous rotation:
        const smoothRot = THREE.MathUtils.damp(camera.rotation.y, -targetRotY, 2, delta);
        camera.rotation.y = smoothRot; // This might fight transparent OrbitControls if we had them. ScrollControls doesn't rotate cam.
        
        // Floating effect
        camera.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        camera.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.5;
    });

    return (
        <group>
            {BLOCKS_DATA.map((block, i) => (
                <SpiralBlock 
                    key={block.id} 
                    data={block} 
                    index={i} 
                    total={TOTAL_BLOCKS}
                    onNavigate={onNavigate}
                />
            ))}
        </group>
    );
};

export default function BeyondUnfiltered() {
    const navigate = useNavigate();
    const [dpr, setDpr] = useState(1.5);

    return (
        <div className="w-full h-screen bg-black">
            <Canvas 
                // Camera starts at 0,0,0
                camera={{ position: [0, 0, 0], fov: 60 }}
                dpr={dpr}
                gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: true }}
            >
                <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />

                <color attach="background" args={['#030303']} />
                {/* Fog: Linear or Exp2. Exp2 covers the bottom well. */}
                <fogExp2 attach="fog" args={['#030303', 0.05]} /> 
                <ambientLight intensity={0.2} />

                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                {/* Tall sparkle field for the spiral */}
                <group position={[0, -20, 0]} scale={[1, 5, 1]}>
                    <Sparkles count={200} scale={20} size={3} speed={0.4} opacity={0.3} color="#64748b" />
                </group>

                <Suspense fallback={null}>
                    {/* Pages needs to match the length of the spiral */}
                    <ScrollControls pages={6} damping={0.4}>
                        <SpiralScene onNavigate={navigate} />
                    </ScrollControls>
                </Suspense>

                {/* POST PROCESSING */}

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                    <Noise opacity={0.03} /> 
                    <Vignette eskil={false} offset={0.1} darkness={1.0} />
                    <ChromaticAberration offset={[0.0005, 0.0005]} />
                </EffectComposer>
            </Canvas>

             {/* Hint UI */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/30 text-xs uppercase tracking-[0.3em] animate-pulse">
                Descend
            </div>
            
            <div className="absolute top-8 left-8 pointer-events-none text-white/20 text-xs uppercase tracking-widest hidden md:block">
                The Spiral
            </div>
        </div>
    );
}
