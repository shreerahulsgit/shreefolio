import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';

import VioletBackground from '../../lib/components/music-scene/violet-background.jsx';
import ArtistArc from '../../lib/components/music-scene/artist-arc.jsx';
import NeonPlayer from '../../lib/components/music-scene/neon-player.jsx';
import SoundwaveTerrain from '../../lib/components/music-scene/soundwave-terrain.jsx';

const CameraRig = ({ selectedArtist }) => {
    const controls = useRef();

    useEffect(() => {
        if (controls.current) {
            if (selectedArtist) {
                controls.current.setLookAt(0, 2, 12, 0, 0, 0, true);
            } else {
                controls.current.setLookAt(0, 4, 14, 0, 0, 0, true);
            }
        }
    }, [selectedArtist]);

    return <CameraControls ref={controls} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />;
};

const MusicPage = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackUrl, setCurrentTrackUrl] = useState('/mp3/golden-brown-slowed.mp3'); 
    
    const dpr = 1.0; 
    const audioRef = useRef(null);
    const analyzer = null; 

    const currentAlbum = selectedArtist ? 
        { 
            title: selectedArtist.name + " Essentials", 
            artist: selectedArtist.name, 
            cover: selectedArtist.image, 
            accent: '#8A4FFF' 
        } : 
        { 
            title: 'Select an Artist', 
            artist: 'Explore the Violet Universe', 
            cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop', 
            accent: '#5B2EFF' 
        };

    const handleTogglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlayTrack = (url) => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTrackUrl(url);
        
        setTimeout(() => {
            if(audioRef.current) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
                setIsPlaying(true);
            }
        }, 100);
    };

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas dpr={[1, 1.5]}>
                
                <CameraRig selectedArtist={selectedArtist} />
                
                <ambientLight intensity={0.5} color="#2A0E4F" />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8A4FFF" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#5B2EFF" />

                <Suspense fallback={<color attach="background" args={['black']} />}>
                    <group position={[0, 0, -20]} scale={[30, 30, 1]}>
                        <VioletBackground />
                    </group>
                </Suspense>
                
                <group position={[0, 0, 0]}>
                    <Suspense fallback={null}>
                        <NeonPlayer 
                            isPlaying={isPlaying} 
                            currentAlbum={currentAlbum} 
                            onTogglePlay={handleTogglePlay}
                            selectedArtist={selectedArtist}
                            onPlayTrack={handlePlayTrack} 
                        />
                    </Suspense>

                    <Suspense fallback={null}>
                        <ArtistArc 
                            onSelectArtist={setSelectedArtist} 
                            selectedArtist={selectedArtist}
                        />
                    </Suspense>

                    <Suspense fallback={null}>
                        <group position={[0, -2, 0]}>
                             <SoundwaveTerrain analyser={analyzer} />
                        </group>
                    </Suspense>
                </group>

            </Canvas>

            <div className={`absolute top-0 left-0 w-full p-8 pointer-events-none flex justify-between items-start z-10 transition-opacity duration-1000 ${selectedArtist ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                <div>
                     <h1 className="text-6xl font-thin text-white tracking-widest mb-2 drop-shadow-[0_0_15px_rgba(138,79,255,0.6)]" style={{ fontFamily: 'BonVivant, serif' }}>
                        VIOLET
                    </h1>
                     <p className="text-sm text-purple-200/60 tracking-[0.3em] uppercase">
                        Late Night Dreamscape
                    </p>
                </div>
            </div>

            {selectedArtist && (
                <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none transition-all duration-700 animate-in fade-in slide-in-from-left-10">
                    <h2 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 opacity-20 rotate-90 origin-left whitespace-nowrap">
                        {selectedArtist.name}
                    </h2>
                </div>
            )}
            
            {selectedArtist && (
                <button 
                    className="absolute top-8 left-8 z-50 text-white/50 hover:text-white uppercase tracking-widest text-xs pointer-events-auto"
                    onClick={() => setSelectedArtist(null)}
                >
                    ← Back to Universe
                </button>
            )}

            <audio
                ref={audioRef}
                src={currentTrackUrl}
                crossOrigin="anonymous"
                loop={false}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
};

export default MusicPage;
