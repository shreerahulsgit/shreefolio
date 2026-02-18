import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

import CosmicBackground from '../../lib/components/books-scene/cosmic-background.jsx';
import FloatingRack from '../../lib/components/books-scene/floating-rack.jsx';
import LibraryCameraRig from '../../lib/components/books-scene/library-camera-rig.jsx';
import FloatingThoughts from '../../lib/components/books-scene/floating-thoughts.jsx';

const SceneLighting = ({ lampOn }) => {
    const ambientRef = useRef();
    const keyRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();
    const fillRef = useRef();

    useFrame((state, delta) => {
        const speed = delta * 2;
        const targetAmbient = lampOn ? 0.4 : 0.03;
        const targetKey = lampOn ? 1.8 : 0;
        const targetAccent = lampOn ? 0.8 : 0;
        const targetFill = lampOn ? 0.4 : 0;

        if (ambientRef.current) ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, speed);
        if (keyRef.current) keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, targetKey, speed);
        if (leftRef.current) leftRef.current.intensity = THREE.MathUtils.lerp(leftRef.current.intensity, targetAccent, speed);
        if (rightRef.current) rightRef.current.intensity = THREE.MathUtils.lerp(rightRef.current.intensity, targetAccent, speed);
        if (fillRef.current) fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, targetFill, speed);
    });

    return (
        <>
            <ambientLight ref={ambientRef} intensity={0} color="#e8d5ff" />
            <pointLight ref={keyRef} position={[0, 5, 8]} intensity={0} color="#ffffff" distance={30} decay={2} />
            <pointLight ref={leftRef} position={[-6, 3, 4]} intensity={0} color="#a855f7" distance={20} decay={2} />
            <pointLight ref={rightRef} position={[6, 3, 4]} intensity={0} color="#7c3aed" distance={20} decay={2} />
            <pointLight ref={fillRef} position={[0, -3, 6]} intensity={0} color="#6d28d9" distance={15} decay={2} />
        </>
    );
};

const BOOKS = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      color: "#1e3a8a",
      note: "the 1% rule changed how I think about progress.",
      favoriteIdea: "You do not rise to the level of your goals. You fall to the level of your systems.",
      influence: ["thinking", "life"],
    },
    {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        color: "#854d0e",
        note: "made me calmer about money and long-term decisions.",
        favoriteIdea: "Doing well with money has little to do with how smart you are and a lot to do with how you behave.",
        influence: ["thinking", "life"],
    },
    {
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        color: "#1f2937",
        note: "helped me organize my priorities instead of reacting to everything.",
        favoriteIdea: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
        influence: ["thinking", "life"],
    },
    {
      title: "Design of Everyday Things",
      author: "Don Norman",
      color: "#7f1d1d",
      note: "now I see bad design everywhere.",
      favoriteIdea: "Good design is actually a lot harder to notice than poor design.",
      influence: ["building", "thinking"],
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      color: "#ea580c",
      note: "my brain lies to me. now I know how.",
      favoriteIdea: "Nothing in life is as important as you think it is, while you are thinking about it.",
      influence: ["thinking"],
    },
    {
      title: "Show Your Work!",
      author: "Austin Kleon",
      color: "#0f172a",
      note: "made building in public feel less scary.",
      favoriteIdea: "Make stuff you love and talk about it.",
      influence: ["building", "life"],
    },
    
    {
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        color: "#92400e",
        note: "showed me how belief and persistence compound over time.",
        favoriteIdea: "Whatever the mind can conceive and believe, it can achieve.",
        influence: ["thinking", "life"],
    }
];
export default function BeyondBooks() {
    const navigate = useNavigate();
    const [activeBook, setActiveBook] = useState(null);
    const [highPerf, setHighPerf] = useState(true);
    const [lampOn, setLampOn] = useState(false);

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas
                dpr={1.5}
                gl={{ antialias: true, powerPreference: "high-performance" }}
            >
                <PerformanceMonitor onDecline={() => setHighPerf(false)} />
                <AdaptiveDpr pixelated />

                <LibraryCameraRig activeBook={activeBook} />

                <SceneLighting lampOn={lampOn} />

                <Suspense fallback={null}>
                     {lampOn && <CosmicBackground />}
                     {lampOn && <FloatingThoughts />}

                    <group position={[0, -0.5, 0]}>
                        <FloatingRack 
                            books={BOOKS} 
                            activeBook={activeBook} 
                            onSelect={(book) => lampOn ? setActiveBook(activeBook === book ? null : book) : null}
                            lampOn={lampOn}
                            onToggleLamp={() => setLampOn(!lampOn)}
                        />
                    </group>
                </Suspense>

                {highPerf && (
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0.3} mipmapBlur intensity={1.5} radius={0.4} />
                        <Vignette eskil={false} offset={0.2} darkness={lampOn ? 0.8 : 1.4} />
                        <ChromaticAberration offset={[0.0005, 0.0005]} />
                    </EffectComposer> 
                )}
            </Canvas>

            <div className={`absolute top-0 left-0 w-full p-8 pointer-events-none flex justify-between items-start z-10 transition-opacity duration-1000 ${!lampOn || activeBook ? 'opacity-0' : 'opacity-100'}`}>
                <div>
                     <h1 
                        className="text-6xl font-thin text-white tracking-widest mb-2" 
                        style={{ 
                            fontFamily: 'Georgia, serif',
                            textShadow: '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.2)'
                        }}
                    >
                        LIBRARY
                    </h1>
                     <p className="text-sm text-purple-300/50 tracking-[0.3em] uppercase">
                        Thoughts from the Void
                    </p>
                </div>
            </div>

            {activeBook && (
                <div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center px-8 py-5 rounded-2xl"
                    style={{
                        background: 'rgba(20, 10, 40, 0.6)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(168, 85, 247, 0.1)',
                    }}
                >
                    <p className="text-xs text-purple-300/60 tracking-[0.4em] uppercase mb-2">Now Reading</p>
                    <h3 
                        className="text-2xl text-white font-light tracking-wide mb-1 text-center"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        {activeBook.title}
                    </h3>
                    <p className="text-xs text-purple-200/40 mb-3">by {activeBook.author}</p>
                    <p className="text-sm text-white/50 italic max-w-md text-center leading-relaxed">
                        "{activeBook.note}"
                    </p>
                </div>
            )}

            <div className={`absolute bottom-8 left-8 text-purple-300/30 text-xs tracking-[0.3em] font-light pointer-events-none transition-opacity duration-1000 ${lampOn ? 'opacity-100' : 'opacity-0'}`}>
                {activeBook ? "CLICK TO CLOSE" : "CLICK TO READ • SCROLL TO EXPLORE"}
            </div>
            
            <div className="absolute top-8 right-8 z-50 flex gap-4">
                {activeBook && (
                    <button 
                        className="text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto border border-purple-500/30 px-4 py-2 hover:bg-purple-500/10 transition-all rounded-full"
                        style={{ backdropFilter: 'blur(10px)', background: 'rgba(10, 5, 20, 0.5)' }}
                        onClick={() => setActiveBook(null)}
                    >
                        ← Back to Shelf
                    </button>
                )}
                <button 
                    className="text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto border border-purple-500/30 px-4 py-2 hover:bg-purple-500/10 transition-all rounded-full"
                    style={{ backdropFilter: 'blur(10px)', background: 'rgba(10, 5, 20, 0.5)' }}
                    onClick={() => navigate('/beyond')}
                >
                    Exit Library
                </button>
            </div>
        </div>
    );
}
