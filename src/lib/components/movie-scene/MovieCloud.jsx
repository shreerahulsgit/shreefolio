import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const MovieFrame = ({ movie, position, onClick, isSelected }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    // Scale on hover/selection
    const scale = isSelected ? 1.3 : (hovered ? 1.15 : 1);

    // Billboarding: Face camera continuously
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <group 
                ref={groupRef}
                position={position} 
                scale={[scale, scale, scale]}
                onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Frame Border */}
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[3.2, 4.7, 0.1]} />
                    <meshStandardMaterial color={isSelected ? "#fff" : "#444"} roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Movie Poster */}
                <Image 
                    url={movie.image || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop"} 
                    scale={[3, 4.5]}
                    position={[0, 0, 0.05]}
                    transparent
                />
                
                {/* Title */}
                <Text
                    position={[0, -2.8, 0]}
                    fontSize={0.25}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="top"
                    maxWidth={3}
                    textAlign="center"
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                >
                    {movie.title}
                </Text>
            </group>
        </Float>
    );
};

const MovieCloud = ({ onSelectMovie, selectedMovie }) => {
    const movies = [
        { title: "Interstellar", image: "/MovieCards/interstellar.jpg", video: "/videos/interstellar.mp4", mainThought: "the score carried emotions I didn't know I had.", year: "2014", director: "Christopher Nolan" },
        { title: "Avengers: Infinity War", image: "/MovieCards/Avengers Infinity war.jpg", video: "/videos/Avengers Infinity War.mp4", mainThought: "the villain won. and it felt inevitable.", year: "2018", director: "Russo Brothers" },
        { title: "Avengers: Endgame", image: "/MovieCards/Avengers End Game.jpg", video: "/videos/Avengers_Endgame.mp4", mainThought: "whatever it takes.", year: "2019", director: "Russo Brothers" },
        { title: "The Dark Knight", image: "/MovieCards/the dark Night.jpg", video: "/videos/The_Dark_Knight.mp4", mainThought: "the best antagonists hold up a mirror.", year: "2008", director: "Christopher Nolan" },
        { title: "F1", image: "/MovieCards/f1.jpg", video: "/videos/F1.mp4", mainThought: "speed is nothing without the will to push beyond.", year: "2025", director: "Joseph Kosinski" },
        { title: "Fight Club", image: "/MovieCards/Fight Club.jpg", video: "/videos/Fight Club.mp4", mainThought: "the things you own end up owning you.", year: "1999", director: "David Fincher" },
    ];

    // Neat Arc Layout
    return (
        <group position={[0, 0, 0]}>
            {movies.map((movie, i) => {
                // Tighter arc, closer together
                const totalWidth = 18; 
                const step = totalWidth / (movies.length - 1);
                const x = -totalWidth / 2 + i * step;
                const z = 0; // Flat line relative to group, since group is placed relative to camera
                
                return (
                    <MovieFrame 
                        key={i}
                        movie={movie}
                        position={[x, 0, z]} 
                        onClick={onSelectMovie}
                        isSelected={selectedMovie?.title === movie.title}
                    />
                );
            })}
        </group>
    );
};

export default MovieCloud;
