import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';

const MovieFrame = ({ movie, position, onClick, isSelected }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    const scale = isSelected ? 1.3 : (hovered ? 1.15 : 1);

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
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[3.2, 4.7, 0.1]} />
                    <meshStandardMaterial color={isSelected ? "#fff" : "#444"} roughness={0.2} metalness={0.8} />
                </mesh>

                <Image 
                    url={`/posters/${movie.id}.jpg` || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop"} 
                    scale={[3, 4.5]}
                    position={[0, 0, 0.05]}
                    transparent
                />
                
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
        { id: 'interstellar', title: "Interstellar", mainThought: "the score carried emotions I didn't know I had.", year: "2014", director: "Christopher Nolan" },
        { id: 'avengers-infinity-war', title: "Avengers: Infinity War", mainThought: "the villain won. and it felt inevitable.", year: "2018", director: "Russo Brothers" },
        { id: 'avengers-endgame', title: "Avengers: Endgame",  mainThought: "whatever it takes.", year: "2019", director: "Russo Brothers" },
        { id: 'the-dark-knight', title: "The Dark Knight", mainThought: "the best antagonists hold up a mirror.", year: "2008", director: "Christopher Nolan" },
        { id: 'f1', title: "F1", mainThought: "speed is nothing without the will to push beyond.", year: "2025", director: "Joseph Kosinski" },
        { id: 'fight-club', title: "Fight Club", mainThought: "the things you own end up owning you.", year: "1999", director: "David Fincher" },
    ];

    return (
        <group position={[0, 0, 0]}>
            {movies.map((movie, i) => {
                const totalWidth = 18; 
                const step = totalWidth / (movies.length - 1);
                const x = -totalWidth / 2 + i * step;
                const z = 0;
                
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
