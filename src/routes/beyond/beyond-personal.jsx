import { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Float, Stars, Sparkles, PerformanceMonitor, Image } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

const FONT_URL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff';

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
+        <meshStandardMaterial 
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

const PulsingText = ({ children, size = 1, color = "white", emissive = "white", pulseSpeed = 1, ...props }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * pulseSpeed) + 1) / 2;
      ref.current.material.emissiveIntensity = 0.2 + pulse * 1.2;
      ref.current.material.opacity = 0.3 + pulse * 0.7;
    }
  });
  return (
    <Float floatIntensity={0.3} rotationIntensity={0.1} speed={0.8}>
      <Text
        ref={ref}
        font={FONT_URL}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        {...props}
      >
        {children}
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          toneMapped={false}
          transparent
          opacity={0.8}
        />
      </Text>
    </Float>
  );
};

const DriftingDots = ({ count = 30, area = 10, zPos = 0 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * area,
        y: (Math.random() - 0.5) * area,
        z: zPos + (Math.random() - 0.5) * 5,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return pos;
  }, [count, area, zPos]);

  return (
    <group>
      {positions.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={0.5} position={[p.x, p.y, p.z]}>
          <mesh>
            <sphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
            <meshStandardMaterial
              color="#44aaff"
              emissive="#44aaff"
              emissiveIntensity={1}
              toneMapped={false}
              transparent
              opacity={0.4 + Math.random() * 0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const Scene = () => {
    const scroll = useScroll();
    
    useFrame((state, delta) => {
        const targetZ = -scroll.offset * 200; 
        
        state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ + 5, 2, delta);
        
        const { x, y } = state.pointer;
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x * 2, 2, delta);
        state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, y * 2, 2, delta);
    });

    return (
        <group>
            <Section z={0}>
                 <FloatingText size={0.5} position={[0, 2, 0]} color="#aaa">some things stayed unsaid.</FloatingText>
                 <FloatingText size={0.5} position={[0, 1.2, 0]} color="#aaa">not forgotten.</FloatingText>
                 <FloatingText size={1.5} position={[0, -0.5, 0]} emissive="white">just heavy.</FloatingText>
            </Section>

            <Section z={-18}>
                <FloatingText size={0.8} position={[-2, 3, 0]} color="#ccc">i carry karnataka quietly.</FloatingText>
                <FloatingText size={0.8} position={[2, 2, 0]} color="#ccc">in the way i greet.</FloatingText>
                
                <FloatingText size={1.2} position={[0, 0, 0]} letterSpacing={0.1}>kannada isn’t what i speak.</FloatingText>
                
                <FloatingText size={0.6} position={[0, -2, 0]} color="#888">
it’s what i return to.</FloatingText>
                
            </Section>

            <Section z={-40}>
                <MovingSpot position={[-5, 2, 0]} color="#FF0000" /> {/* Red */}
                <MovingSpot position={[5, -2, 0]} color="#FFD700" /> {/* Yellow */}
                
                <FloatingText size={0.5} position={[-2, 4, 0]} color="#aaa">some languages are chosen.</FloatingText>
                <FloatingText size={0.5} position={[2, 3.2, 0]} color="#fff">this one chose me.</FloatingText>
                
                <FloatingText size={0.6} position={[0, 1.5, 0]} color="#ccc">kannada runs in the background.</FloatingText>
                <FloatingText size={0.4} position={[0, 0.8, 0]} color="#888">karnataka runs in my roots.</FloatingText>

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

            <Section z={-60}>
                <FloatingText size={0.8} position={[-2, 3, 0]}>still here?</FloatingText>
                <FloatingText size={1.2} position={[0, 1.5, 0]} emissive="#44aaff">yeah. you’re my kinda person.</FloatingText>
                
                <FloatingText size={0.6} position={[0, -0.5, 0]}>ig we should connect.</FloatingText>
                <FloatingText size={0.6} position={[0, -1.2, 0]}>you know where to find me.</FloatingText>

               <group position={[0, -3.5, 0]}>
                    <group position={[-3, 0, 0]} onClick={() => window.open('https://www.instagram.com/shreerahuls/?__pwa=1', '_blank')}>
                        <Float speed={2} rotationIntensity={0.5}>
                            <Image 
                                url="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" 
                                scale={[1.5, 1.5]} 
                                transparent 
                                toneMapped={false}
                            />
                        </Float>
                    </group>

                    <group position={[0, -0.5, 1]} onClick={() => window.open('https://snapchat.com/add/shreerahul_s', '_blank')}>
                        <Float speed={3} rotationIntensity={0.5}>
                              <Image 
                                url="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1024px-Snapchat_logo.svg.png" 
                                scale={[1.5, 1.5]} 
                                transparent 
                                toneMapped={false}
                            />
                        </Float>
                    </group>

                    <group position={[3, 0, 0]} onClick={() => window.open('https://x.com/G0j0Satoruuu', '_blank')}>
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

            <Section z={-80}>
                <FloatingText size={0.6} position={[0, 2, 0]} color="#666">no grand ending.</FloatingText>
                <FloatingText size={0.6} position={[0, 1.2, 0]} color="#666">no speech.</FloatingText>
                
                <FloatingText size={1} position={[0, -0.5, 0]}>just this —</FloatingText>
                
                <FloatingText size={1.5} position={[0, -2.5, 0]} emissive="white" letterSpacing={0.1}>stay rooted. stay real.</FloatingText>

                 <FloatingText size={0.5} position={[0, -5, 0]} color="#44aaff">bye from your kannadiga friend!!!!</FloatingText>
            </Section>

            <Section z={-100}>
                <DriftingDots count={20} area={12} zPos={0} />
                <FloatingText size={0.4} position={[-3, 2, -1]} color="#333">still scrolling?</FloatingText>
                <FloatingText size={0.3} position={[4, 0.5, -2]} color="#222">kinda curious huh..?</FloatingText>
                <FloatingText size={0.35} position={[-1, -2, 0]} color="#2a2a2a">Nah.. this isn't infinite</FloatingText>
            </Section>

            <Section z={-118}>
                <DriftingDots count={15} area={15} zPos={0} />
                <PulsingText size={0.8} position={[0, 1.5, 0]} color="#44aaff" emissive="#44aaff" pulseSpeed={0.5}>
                    There are no more words.
                </PulsingText>
                <FloatingText size={0.3} position={[2, -1, -1]} color="#1a1a1a">you again?</FloatingText>
                <FloatingText size={0.3} position={[-2.5, -2, 0]} color="#1a1a1a">Enough already.</FloatingText>
                <FloatingText size={0.3} position={[0, -3, -2]} color="#1a1a1a">!!!</FloatingText>
            </Section>

            <Section z={-136}>
                <DriftingDots count={10} area={18} zPos={0} />
                <FloatingText size={0.25} position={[-5, 3, -3]} color="#181818">. . .</FloatingText>
                <FloatingText size={0.5} position={[0, 0, 0]} color="#333">you scrolled past the ending.</FloatingText>
                <FloatingText size={0.25} position={[4, -2, -1]} color="#181818">there's nothing left to prove.</FloatingText>
            </Section>

            <Section z={-154}>
                <PulsingText size={1.5} position={[0, 0, 0]} color="#ffffff" emissive="#ffffff" pulseSpeed={1}>
                    .
                </PulsingText>
            </Section>

            <Section z={-168}>
                <DriftingDots count={5} area={25} zPos={0} />
                <FloatingText size={0.2} position={[0, 1, -4]} color="#111">this space is yours now.</FloatingText>
                <FloatingText size={0.15} position={[0, -1, -5]} color="#0a0a0a">breathe....</FloatingText>
            </Section>

            <Section z={-185}>
                <PulsingText size={0.6} position={[0, 1, 0]} color="#44aaff" emissive="#44aaff" pulseSpeed={0.3}>
                    see you on the other side...
                </PulsingText>
                <FloatingText size={0.2} position={[0, -1, 0]} color="#222">— S</FloatingText>
                <DriftingDots count={40} area={30} zPos={-5} />
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
                <fog attach="fog" args={['#050505', 5, 25]} /> 
                <ambientLight intensity={0.2} />
                
                <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
                {highPerf && <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.4} color="#44aaff" />}

                <Suspense fallback={null}>
                    <ScrollControls pages={18} damping={0.15}>
                        <Scene />
                    </ScrollControls>
                </Suspense>

                <EffectComposer disableNormalPass>
                    <Bloom 
                        luminanceThreshold={0.2} 
                        luminanceSmoothing={0.9} 
                        height={300} 
                        intensity={1.5}
                    />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <ChromaticAberration offset={[0.001, 0.001]} />
                </EffectComposer>
            </Canvas>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-white/30 text-xs uppercase tracking-[0.3em] animate-pulse">
                Scroll to Float
            </div>
            
            <div className="absolute top-8 left-8 pointer-events-none text-white/20 text-xs uppercase tracking-widest hidden md:block">
                The Void of Identity
            </div>
        </div>
    );
}
