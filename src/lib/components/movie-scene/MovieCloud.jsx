import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const MovieFrame = ({ movie, position, rotation, onClick, isSelected }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);
    
    useFrame((state, delta) => {
        // Look at center (roughly where camera starts) if not selected
        // If selected, maybe face camera direction more directly?
        // simple LookAt(0,0,10)
    });

    const scale = isSelected ? 1.5 : (hovered ? 1.2 : 1);

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group 
                position={position} 
                rotation={rotation}
                onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Frame Border - Lighter Silver/Grey for visibility */}
                <mesh position={[0, 0, -0.02]}>
                    <boxGeometry args={[3.2, 4.7, 0.1]} />
                    <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.8} emissive="#222222" />
                </mesh>

                {/* Movie Poster */}
                <Image 
                    url={movie.image || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop"} // Cinematic placeholder
                    scale={[3, 4.5]}
                    position={[0, 0, 0.05]}
                    transparent
                    opacity={1} // Always fully visible
                />
                
                {/* Title - Always Visible, Larger, and Lower */}
                <Text
                    position={[0, -2.8, 0]}
                    fontSize={0.3} // Bigger font
                    color="#ffffff" // White
                    anchorX="center"
                    anchorY="top"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {movie.title}
                </Text>

                {/* Glow Selection */}
                {isSelected && (
                     <pointLight position={[0, 0, 2]} intensity={2} color="#ffffff" distance={5} />
                )}
            </group>
        </Float>
    );
};

const MovieCloud = ({ onSelectMovie, selectedMovie }) => {
    // Data from original file
    const movies = [
        { title: "Arrival", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "this movie didn't explain itself. it trusted me.", year: "2016", director: "Denis Villeneuve" },
        { title: "Lost in Translation", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "some stories don't need closure. they need space.", year: "2003", director: "Sofia Coppola" },
        { title: "Interstellar", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "the score carried emotions I didn't know I had.", year: "2014", director: "Christopher Nolan" },
        { title: "Before Sunrise", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "walking and talking never felt this profound.", year: "1995", director: "Richard Linklater" },
        { title: "In the Mood for Love", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "sometimes what's not said matters most.", year: "2000", director: "Wong Kar-wai" },
        { title: "The Dark Knight", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "the best antagonists hold up a mirror.", year: "2008", director: "Christopher Nolan" },
        { title: "Parasite", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "comedy and tragedy are the same thing from different angles.", year: "2019", director: "Bong Joon-ho" },
        { title: "Spirited Away", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", mainThought: "animation can hold more truth than live action.", year: "2001", director: "Hayao Miyazaki" },
    ];

    // Spiral / Helix Layout
    return (
        <group>
            {movies.map((movie, i) => {
                const angle = (i / movies.length) * Math.PI * 2; // Circle
                const radius = 6 + Math.random() * 2; // Random dist
                const x = Math.cos(angle) * (radius + i * 0.5); // Spiral out slightly
                const z = Math.sin(angle) * (radius + i * 0.5) - 5; 
                const y = Math.sin(i * 1.5) * 3; // Vertical wave

                return (
                    <MovieFrame 
                        key={i}
                        movie={movie}
                        position={[x, y, z]}
                        rotation={[0, -angle - Math.PI/2, 0]} // Face somewhat inward
                        onClick={onSelectMovie}
                        isSelected={selectedMovie?.title === movie.title}
                    />
                );
            })}
        </group>
    );
};

export default MovieCloud;
