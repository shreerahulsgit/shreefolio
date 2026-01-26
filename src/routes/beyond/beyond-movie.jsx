import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Environment, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";

// 3D Components
import CinemaEnvironment from "../../lib/components/movie-scene/CinemaEnvironment";
import ProjectorLight from "../../lib/components/movie-scene/ProjectorLight";
import MovieCloud from "../../lib/components/movie-scene/MovieCloud";
import ReflectiveFloor from "../../lib/components/movie-scene/ReflectiveFloor";

// ------------------------------------------
// CAMERA RIG
// ------------------------------------------
const CameraRig = ({ selectedMovie }) => {
    const controls = useRef();

    useEffect(() => {
        if (controls.current) {
            if (selectedMovie) {
                // Focus: Move closer to the movie? Or just look at it?
                // Since MovieCloud layout is complex, fixing a camera view might be cleaner
                // Let's float near the center but zoom in slightly
                controls.current.setLookAt(0, 0, 10, 0, 0, 0, true);
                controls.current.dolly(5, true); 
            } else {
                // Overview: Fly back
                controls.current.setLookAt(0, 0, 20, 0, 0, 0, true);
            }
        }
    }, [selectedMovie]);

    return <CameraControls ref={controls} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} minDistance={5} maxDistance={30} />;
};

// ------------------------------------------
// MAIN PAGE
// ------------------------------------------
export default function BeyondMovie() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [highPerf, setHighPerf] = useState(true);

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}>
                <PerformanceMonitor onDecline={() => setHighPerf(false)} />
                <AdaptiveDpr pixelated />

                <CameraRig selectedMovie={selectedMovie} />
                

                {/* Scene Content */}
                <Suspense fallback={null}>
                    <CinemaEnvironment highPerf={highPerf} />
                    <ProjectorLight highPerf={highPerf} />
                    <MovieCloud onSelectMovie={setSelectedMovie} selectedMovie={selectedMovie} />
                    {highPerf && <ReflectiveFloor />} {/* Only show reflections on high perf */}
                </Suspense>

                {/* Cinematic Post Processing - Only enabled if high performance */}
                {highPerf && (
                    <EffectComposer disableNormalPass multisampling={0}> {/* multiexampling=0 prevents some crashes */}
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                        <Noise opacity={0.2} /> 
                        <Vignette eskil={false} offset={0.3} darkness={1.1} />
                        <ChromaticAberration offset={[0.003, 0.003]} radialModulation={false} modulationOffset={0} />
                    </EffectComposer>
                )}
            </Canvas>

            {/* UI Overlay */}
            <div className={`absolute top-0 left-0 w-full p-8 pointer-events-none flex justify-between items-start z-10 transition-opacity duration-1000 ${selectedMovie ? 'opacity-0' : 'opacity-100'}`}>
                <div>
                     <h1 className="text-5xl font-thin text-white tracking-[0.2em] mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Georgia, serif' }}>
                        ARCHIVE
                    </h1>
                     <p className="text-sm text-gray-400 tracking-[0.3em] uppercase type-writer">
                        Memories stored in light.
                    </p>
                </div>
            </div>

            {/* Movie Detail Overlay */}
            {selectedMovie && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-end p-12 pb-24 z-20 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <div className="max-w-4xl transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
                        <h2 className="text-6xl text-white font-bold tracking-tighter mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                            {selectedMovie.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-xs text-gray-400 uppercase tracking-widest mb-8">
                            <span>{selectedMovie.year}</span>
                            <span>•</span>
                            <span>{selectedMovie.director}</span>
                        </div>
                        <p className="text-2xl text-white/90 font-light italic leading-relaxed max-w-2xl border-l-2 border-white/20 pl-6">
                            "{selectedMovie.mainThought}"
                        </p>
                    </div>
                </div>
            )}

            {/* Back Button */}
            {selectedMovie && (
                <button 
                    className="absolute top-8 right-8 z-50 text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto border border-white/20 px-4 py-2 hover:bg-white/10 transition-all"
                    onClick={() => setSelectedMovie(null)}
                >
                    Close Memory
                </button>
            )}
            
            {/* CSS for Typewriter effect if needed later, simplistic for now */}
        </div>
    );
}