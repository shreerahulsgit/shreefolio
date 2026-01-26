import React from 'react';
import InteractiveBook from './InteractiveBook';
import { Float } from '@react-three/drei';

const FloatingRack = ({ books, activeBook,onSelect }) => {
    // Shelf Dimensions (Spine-out spacing is much tighter)
    const spacing = 0.4; // Width of spine + gap
    const shelfWidth = books.length * spacing + 1; // Add padding
    const shelfDepth = 2;
    const shelfThickness = 0.2;

    return (
        <group>
            {/* --- WOODEN BOOKSHELF STRUCTURE --- */}
            {/* Positioned so middle shelf is at y=0 */}
            <group position={[0, -1.2, 0]}> 
                {/* 1. Vertical Sides */}
                <mesh position={[-3.5, 2, 0]}>
                    <boxGeometry args={[0.2, 6, 2]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.6} /> {/* Dark Walnut */}
                </mesh>
                <mesh position={[3.5, 2, 0]}>
                    <boxGeometry args={[0.2, 6, 2]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.6} />
                </mesh>

                {/* 2. Top Shelf (Decor) */}
                <mesh position={[0, 4.5, 0]}>
                    <boxGeometry args={[7, 0.2, 2]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.6} />
                </mesh>
                
                {/* 3. Middle Shelf (Books) */}
                <mesh position={[0, 1.2, 0]}>
                    <boxGeometry args={[7, 0.2, 2]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.6} />
                </mesh>

                {/* 4. Bottom Shelf (Pot) */}
                <mesh position={[0, -2, 0]}>
                    <boxGeometry args={[7, 0.2, 2]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.6} />
                </mesh>

                {/* --- DECOR ITEMS --- */}
                {/* Vase (Top Left) */}
                <group position={[-2, 4.6, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.5, 1.2, 32]} />
                        <meshStandardMaterial color="#f8fafc" roughness={0.1} /> {/* White Ceramic */}
                    </mesh>
                </group>

                {/* Clock (Top Right) */}
                 <group position={[2, 5, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} rotation={[Math.PI/2, 0, 0]} />
                        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} /> {/* Gold */}
                    </mesh>
                </group>

                 {/* Plant Pot (Bottom Left) */}
                 <group position={[-2.5, -1.5, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.5, 0.4, 0.8, 16]} />
                        <meshStandardMaterial color="#d97706" roughness={0.9} /> {/* Clay */}
                    </mesh>
                    {/* Green Foliage */}
                    <mesh position={[0, 0.5, 0]}>
                        <dodecahedronGeometry args={[0.6]} />
                        <meshStandardMaterial color="#15803d" roughness={0.8} />
                    </mesh>
                </group>
            </group>

            {/* --- BOOKS ON SHELF --- */}
            {books.map((book, i) => {
                // Tightly packed linear layout
                const xPos = (i - (books.length - 1) / 2) * spacing; 
                
                return (
                    <group key={i} position={[xPos, 0, 0]}>
                         <InteractiveBook 
                            book={book} 
                            index={i} 
                            total={books.length} 
                            isActive={activeBook === book}
                            isAnyActive={!!activeBook}
                            onSelect={onSelect}
                            // Pass layout info down so book knows where to return
                            rackPosition={[xPos, 0, 0]}
                        />
                    </group>
                );
            })}
        </group>
    );
};

export default FloatingRack;
