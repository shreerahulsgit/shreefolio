import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { CameraControls, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from 'three';
import { useNavigate } from "react-router-dom";

import CinemaEnvironment from "../../lib/components/movie-scene/cinema-environment.jsx";
import ProjectorLight from "../../lib/components/movie-scene/projector-light.jsx";
import MovieCloud from "../../lib/components/movie-scene/movie-cloud.jsx";
// import ReflectiveFloor from "../../lib/components/movie-scene/reflective_floor.jsx";
import CinemaSeats from "../../lib/components/movie-scene/cinema-seats.jsx";
import GiantScreen from "../../lib/components/movie-scene/giant-screen.jsx";

const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

const CameraRig = ({ selectedMovie, onTransitionComplete }) => {
    const controls = useRef();
    const camera = useThree((state) => state.camera);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const transitionStartTime = useRef(null);
    const startPos = useRef(new THREE.Vector3());
    const startQuat = useRef(new THREE.Quaternion());

    const targetPos = useMemo(() => new THREE.Vector3(0, -2, 5), []);
    const targetLookAt = useMemo(() => new THREE.Vector3(0, 4, -25), []);
    const targetQuat = useMemo(() => {
        const tempCam = new THREE.PerspectiveCamera();
        tempCam.position.copy(new THREE.Vector3(0, -2, 5));
        tempCam.lookAt(new THREE.Vector3(0, 4, -25));
        return tempCam.quaternion.clone();
    }, []);

    useEffect(() => {
        if (selectedMovie) {
            setIsTransitioning(true);
            setIsLocked(false);
            controls.current.enabled = false;
            startPos.current.copy(camera.position);
            startQuat.current.copy(camera.quaternion);
            transitionStartTime.current = null;
        } else {
            setIsTransitioning(false);
            setIsLocked(false);
            if (controls.current) {
                controls.current.enabled = true;
                controls.current.setLookAt(0, 10, 40, 0, 0, -10, true);
            }
        }
    }, [selectedMovie, camera]);

    useFrame((state) => {
        if (isTransitioning) {
            if (transitionStartTime.current === null) {
                transitionStartTime.current = state.clock.elapsedTime;
            }

            const elapsed = state.clock.elapsedTime - transitionStartTime.current;
            const duration = 2.5;
            const t = Math.min(elapsed / duration, 1);
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            camera.position.lerpVectors(startPos.current, targetPos, ease);
            camera.quaternion.slerpQuaternions(startQuat.current, targetQuat, ease);

            if (t >= 1) {
                setIsTransitioning(false);
                setIsLocked(true);
                camera.position.copy(targetPos);
                camera.quaternion.copy(targetQuat);
                if (onTransitionComplete) onTransitionComplete();
            }
        }

        if (isLocked) {
            camera.position.copy(targetPos);
            camera.quaternion.copy(targetQuat);
        }
    });

    return <CameraControls ref={controls} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI / 3} minDistance={5} maxDistance={60} />;
};

const TheaterLighting = ({ isPlaying }) => {
    const ambientRef = useRef();
    const warmL = useRef();
    const warmR = useRef();
    const overheadRef = useRef();

    useFrame((state, delta) => {
        const tAmbient = isPlaying ? 0.08 : 0.6;
        const tWarm = isPlaying ? 0.3 : 2.0;
        const tOverhead = isPlaying ? 0.1 : 1.0;
        
        if (ambientRef.current)
            ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, tAmbient, delta * 1.5);
        if (warmL.current)
            warmL.current.intensity = THREE.MathUtils.lerp(warmL.current.intensity, tWarm, delta * 1.5);
        if (warmR.current)
            warmR.current.intensity = THREE.MathUtils.lerp(warmR.current.intensity, tWarm, delta * 1.5);
        if (overheadRef.current)
            overheadRef.current.intensity = THREE.MathUtils.lerp(overheadRef.current.intensity, tOverhead, delta * 1.5);
    });

    return (
        <>
            <ambientLight ref={ambientRef} intensity={0.6} color="#FFE0C0" />
            <pointLight ref={warmL} position={[-22, 2, 5]} intensity={2.0} color="#9B59B6" distance={50} decay={2} />
            <pointLight ref={warmR} position={[22, 2, 5]} intensity={2.0} color="#9B59B6" distance={50} decay={2} />
            <pointLight ref={overheadRef} position={[0, 12, 5]} intensity={1.0} color="#C8B8E8" distance={60} decay={2} />
        </>
    );
};

export default function BeyondMovie() {
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [highPerf, setHighPerf] = useState(true);
    const [videoPlaying, setVideoPlaying] = useState(false);

    const handleTransitionComplete = () => {
        setVideoPlaying(true);
    };

    useEffect(() => {
        if (!selectedMovie) setVideoPlaying(false);
    }, [selectedMovie]);

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas shadows dpr={[1, 1.5]} gl={{ powerPreference: "high-performance" }}>
                <PerformanceMonitor onDecline={() => setHighPerf(false)} />
                <AdaptiveDpr pixelated />

                <CameraRig selectedMovie={selectedMovie} onTransitionComplete={handleTransitionComplete} />
                
                <TheaterLighting isPlaying={videoPlaying} />

                <Suspense fallback={null}>
                    <CinemaEnvironment highPerf={highPerf} dimmed={videoPlaying} />
                    <ProjectorLight highPerf={highPerf} isPlaying={videoPlaying} />
                    
                    <CinemaSeats />
                    
                    <GiantScreen 
                        videoUrl={R2_PUBLIC_URL?.replace("{dir}", selectedMovie?.id)}
                        isPlaying={videoPlaying}
                        shouldLoad={!!selectedMovie}
                    />

                    <group position={[0, 6, 20]} visible={!selectedMovie}> 
                        <MovieCloud onSelectMovie={setSelectedMovie} selectedMovie={selectedMovie} />
                    </group>
                    
                </Suspense>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.2} />
                    <Noise opacity={0.02} /> 
                    <Vignette eskil={false} offset={0.3} darkness={1.1} />
                    <ChromaticAberration offset={[0.002, 0.002]} radialModulation={false} modulationOffset={0} />
                </EffectComposer>
            </Canvas>

            <div className={`absolute top-0 left-0 w-full p-8 pointer-events-none flex justify-between items-start z-10 transition-opacity duration-1000 ${selectedMovie ? 'opacity-0' : 'opacity-100'}`}>
                <div>
                     <h1 className="text-5xl font-thin text-white tracking-[0.2em] mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Georgia, serif' }}>
                        IMAX ARCHIVE
                    </h1>
                     <p className="text-sm text-gray-400 tracking-[0.3em] uppercase type-writer">
                        Cinema at the Edge of the Universe
                    </p>
                </div>
            </div>

            {selectedMovie && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-20 transition-opacity duration-1000 animate-in fade-in slide-in-from-bottom-5">
                     <h2 className="text-2xl text-white/50 font-light tracking-widest mb-1 uppercase">
                        Now Playing
                    </h2>
                    <h3 className="text-4xl text-white font-bold tracking-tight mb-2 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        {selectedMovie.title}
                    </h3>
                    <p className="text-sm text-white/40 italic">"{selectedMovie.mainThought}"</p>
                </div>
            )}

            <div className="absolute top-8 right-8 z-50 flex gap-4">
                {selectedMovie && (
                    <button 
                        className="text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto border border-white/20 px-4 py-2 hover:bg-white/10 transition-all rounded-full bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedMovie(null)}
                    >
                        Stop Projection
                    </button>
                )}
                 <button 
                    className="text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto border border-white/20 px-4 py-2 hover:bg-white/10 transition-all rounded-full bg-black/50 backdrop-blur-sm"
                    onClick={() => navigate('/beyond')}
                >
                    Exit Theatre
                </button>
            </div>
        </div>
    );
}