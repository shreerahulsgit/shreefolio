import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import VinylPlayer from './vinyl-player';
import { fetchTrackPreview } from '../../utils/music-preview';

const SongOrb = ({ song, angle, radius, onSelect, isPlaying }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);
    
    useFrame((state, delta) => {
        if (mesh.current) {
            const time = state.clock.elapsedTime * 0.1;
            const currentAngle = angle + time;
            
            mesh.current.position.x = Math.cos(currentAngle) * radius;
            mesh.current.position.z = Math.sin(currentAngle) * radius;
            mesh.current.lookAt(0, 2, 20);
            
            const scale = hovered ? 1.2 : 1;
            mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), delta * 10);
            mesh.current.position.y = Math.sin(time * 2 + angle) * 0.2 + 1;
        }
    });

    return (
        <group 
            ref={mesh} 
            position={[radius, 0, 0]} 
            onClick={(e) => { 
                e.stopPropagation(); 
                onSelect(song);
            }} 
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)}
        >
            <mesh position={[0, 0, -0.02]}>
                <boxGeometry args={[1.6, 1.6, 0.05]} />
                <meshStandardMaterial color={hovered ? "#8A4FFF" : "#1a1a1a"} roughness={0.2} metalness={0.8} />
            </mesh>
            
            <Image 
                url={(song.image || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop').replace('/upload/', '/upload/w_256,q_auto,f_auto/')}
                scale={[1.5, 1.5]}
                position={[0, 0, 0.03]}
                transparent
            />

            {hovered && (
                 <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.65, 1.65, 0.04]} />
                    <meshBasicMaterial color="#8A4FFF" transparent opacity={0.5} />
                </mesh>
            )}

            <Text
                position={[0, -1, 0]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="top"
                maxWidth={1.5}
                textAlign="center"
            >
                {song.title}
            </Text>
        </group>
    );
};

const NeonPlayer = ({ isPlaying, currentAlbum, onTogglePlay, selectedArtist, onPlayTrack }) => {
    const ringRef = useRef();

    const songs = selectedArtist?.songs || [];

    const handleSongSelect = async (song) => {
        if (!selectedArtist || !onPlayTrack) return;
        
        const previewUrl = await fetchTrackPreview(selectedArtist.name, song.title);
        if (previewUrl) {
            onPlayTrack(previewUrl);
        } else {
            console.warn("No preview found via iTunes API");
        }
    };

    useFrame((state, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.5;
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.05;
            ringRef.current.scale.set(pulse, pulse, 1);
        }
    });

    return (
        <group>
            <VinylPlayer 
                isPlaying={isPlaying} 
                currentAlbum={currentAlbum} 
                onTogglePlay={onTogglePlay} 
            />

            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                <torusGeometry args={[4.8, 0.05, 12, 64]} />
                <meshBasicMaterial color="#8A4FFF" toneMapped={false} />
            </mesh>
            
            <pointLight position={[0, 2, 0]} intensity={2} color="#8A4FFF" distance={5} />

            {selectedArtist && songs.length > 0 && (
                <group position={[0, 1, 0]}>
                    {songs.map((song, i) => (
                        <SongOrb 
                            key={i} 
                            song={song} 
                            angle={(i / songs.length) * Math.PI * 2} 
                            radius={6}
                            onSelect={handleSongSelect}
                            isPlaying={isPlaying}
                        />
                    ))}
                </group>
            )}
        </group>
    );
};

export default NeonPlayer;
