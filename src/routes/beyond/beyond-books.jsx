import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr, Text, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';

// Modular Components
import CosmicBackground from '../../lib/components/books-scene/CosmicBackground';
import FloatingRack from '../../lib/components/books-scene/FloatingRack';
import LibraryCameraRig from '../../lib/components/books-scene/LibraryCameraRig';
import FloatingThoughts from '../../lib/components/books-scene/FloatingThoughts';

// Data
const BOOKS = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      color: "#1e3a8a", // Deep Navy
      note: "the 1% rule changed how I think about progress.",
      favoriteIdea: "You do not rise to the level of your goals. You fall to the level of your systems.",
      influence: ["thinking", "life"],
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      color: "#0f766e", // Emerald Teal
      note: "made me rethink my relationship with notifications.",
      favoriteIdea: "Deep work is the ability to focus without distraction on a cognitively demanding task.",
      influence: ["building", "life"],
    },
    {
      title: "Design of Everyday Things",
      author: "Don Norman",
      color: "#7f1d1d", // Rich Burgundy
      note: "now I see bad design everywhere.",
      favoriteIdea: "Good design is actually a lot harder to notice than poor design.",
      influence: ["building", "thinking"],
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      color: "#ea580c", // Burnt Orange
      note: "my brain lies to me. now I know how.",
      favoriteIdea: "Nothing in life is as important as you think it is, while you are thinking about it.",
      influence: ["thinking"],
    },
    {
      title: "Show Your Work!",
      author: "Austin Kleon",
      color: "#0f172a", // Charcoal
      note: "made building in public feel less scary.",
      favoriteIdea: "Make stuff you love and talk about it.",
      influence: ["building", "life"],
    },
    {
        title: "The Pragmatic Programmer",
        author: "Hunt & Thomas",
        color: "#4338ca", // Indigo
        note: "DRY and tracer bullets. simple but powerful.",
        favoriteIdea: "Don't leave broken windows.",
        influence: ["building"],
    },
    {
        title: "Sapiens",
        author: "Yuval Harari",
        color: "#3f6212", // Olive Green
        note: "made me feel both tiny and responsible.",
        favoriteIdea: "History is something that very few people have been doing while everyone else was ploughing fields.",
        influence: ["thinking", "life"],
    },
    {
        title: "Clean Code",
        author: "Robert Martin",
        color: "#5b21b6", // Royal Purple
        note: "names matter. a lot more than I thought.",
        favoriteIdea: "Truth can only be found in one place: the code.",
        influence: ["building"],
    }
];

export default function BeyondBooks() {
    const [dpr, setDpr] = useState(1.5);
    const [activeBook, setActiveBook] = useState(null);
    const [highPerf, setHighPerf] = useState(true);

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas
                dpr={1.5} // Fixed high quality for clarity
                gl={{ antialias: true, powerPreference: "high-performance" }} // Enabled AA for sharpness
                // shadows - DISABLED (Crash Risk)
            >
                {/* AdaptiveDpr for performance stability */}
                <AdaptiveDpr pixelated />

                {/* --- CAMERA RIG --- */}
                <LibraryCameraRig activeBook={activeBook} />

                {/* --- LIGHTING (High Clarity) --- */}
                {/* --- LIGHTING (High Clarity) --- */}
                <ambientLight intensity={0.5} color="#ffffff" />
                <pointLight position={[0, 5, 5]} intensity={1.5} color="#ffffff" />
                
                {/* <Environment preset="night" blur={0.6} />  DISABLED: CAUSING CRASH (CORS/GL LOST) */}

                <Suspense fallback={null}>
                     {/* --- ENVIRONMENT RESTORED (Safe Stars/Clouds) --- */}
                     <CosmicBackground />
                     <FloatingThoughts />

                    {/* --- BOOKS SHELF ONLY --- */}
                    <group position={[0, -0.5, 0]}>
                        <FloatingRack 
                            books={BOOKS} 
                            activeBook={activeBook} 
                            onSelect={(book) => setActiveBook(activeBook === book ? null : book)}
                        />
                    </group>
                </Suspense>

                {/* --- POST PROCESSING RESTORED --- */}
                {highPerf && (
                    <EffectComposer disableNormalPass>
                         {/* Only Bloom for the neon shelf glow, keeping it clean */}
                        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.0} radius={0.3} />
                        <ChromaticAberration offset={[0.0005, 0.0005]} />
                    </EffectComposer> 
                )}
            </Canvas>

            {/* --- UI OVERLAY --- */}
            <div className={`absolute top-0 left-0 w-full p-8 pointer-events-none flex justify-between items-start z-10 transition-opacity duration-1000 ${activeBook ? 'opacity-0' : 'opacity-100'}`}>
                <div>
                     <h1 className="text-6xl font-thin text-white tracking-widest mb-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" style={{ fontFamily: 'Georgia, serif' }}>
                        LIBRARY
                    </h1>
                     <p className="text-sm text-purple-200/60 tracking-[0.3em] uppercase">
                        Thoughts from the Void
                    </p>
                </div>
            </div>

            <div className="absolute bottom-8 left-8 text-white/40 text-xs tracking-[0.3em] font-light pointer-events-none">
                {activeBook ? "CLICK TO CLOSE" : "CLICK TO READ • SCROLL TO EXPLORE"}
            </div>
            
            {/* Back Button (Only visible when book active) */}
            {activeBook && (
                <button 
                    className="absolute top-8 left-8 z-50 text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto transition-colors"
                    onClick={() => setActiveBook(null)}
                >
                    ← Back to Shelf
                </button>
            )}
        </div>
    );
}
