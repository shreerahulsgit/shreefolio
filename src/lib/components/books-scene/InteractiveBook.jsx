import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// ============================================
// TEXTURE GENERATION (Premium Leather + Gold)
// ============================================
const createBookTexture = (title, author, color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Base leather fill
    ctx.fillStyle = color; 
    ctx.fillRect(0, 0, 512, 800);
    
    // Leather noise grain
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#000000';
    for(let i=0; i<40000; i++) {
        ctx.fillRect(Math.random()*512, Math.random()*800, 2, 2);
    }
    ctx.globalAlpha = 1.0;

    // Vintage vignette
    const gradient = ctx.createRadialGradient(256, 400, 100, 256, 400, 500);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 800);

    // Gold decorative border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(25, 25, 462, 750);
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 432, 720);

    // Corner ornaments
    const corners = [[50, 50], [462, 50], [50, 750], [462, 750]];
    corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.fill();
    });

    // Title
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 48px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    const words = title.split(' ');
    let y = 250;
    words.forEach(word => {
        ctx.fillText(word, 256, y);
        y += 60;
    });

    // Author in gold
    ctx.font = 'italic 26px "Arial", sans-serif';
    ctx.fillStyle = '#D4AF37';
    ctx.shadowBlur = 0;
    ctx.fillText(author, 256, 680);

    // Spine shadow
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.25;
    ctx.fillRect(0, 0, 35, 800);

    return new THREE.CanvasTexture(canvas);
};

// Helper to brighten a hex color for neon glow
const brightenColor = (hex) => {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgb(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)})`;
};

// ============================================
// COMPONENT
// ============================================
const InteractiveBook = ({ book, index, total, onSelect, isActive, isAnyActive, rackPosition }) => {
    const groupRef = useRef();
    const coverRef = useRef();
    const glowRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    useCursor(hovered);

    const texture = useMemo(() => createBookTexture(book.title, book.author, book.color), [book]);
    const glowColor = useMemo(() => brightenColor(book.color), [book.color]);
    
    const width = 1.4;
    const height = 2.2;
    const depth = 0.25;

    const [baseX, baseY, baseZ] = rackPosition || [0,0,0];

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        let targetPos = new THREE.Vector3(baseX, baseY, baseZ);
        const spineRot = -Math.PI / 2;
        let targetRot = new THREE.Euler(0, spineRot, 0); 

        if (isActive) {
            targetPos.set(-baseX, 0.5, 3.0); 
            targetRot.set(-0.1, 0, 0);
        } else if (isAnyActive) {
            // Stay on shelf
        } else if (hovered) {
            targetPos.z += 0.7;
            targetRot.y = spineRot + 0.5;
        }

        easing.damp3(groupRef.current.position, targetPos, isActive ? 0.4 : 0.25, delta);
        easing.dampE(groupRef.current.rotation, targetRot, isActive ? 0.4 : 0.25, delta);

        // Hinge animation
        const targetOpen = isActive ? -Math.PI * 0.85 : 0; 
        if (coverRef.current) {
            easing.damp(coverRef.current.rotation, 'y', targetOpen, isActive ? 0.5 : 0.3, delta);
        }

        // Glow outline animation
        if (glowRef.current) {
            const targetOpacity = hovered ? 0.4 : (isActive ? 0.2 : 0);
            glowRef.current.material.opacity = THREE.MathUtils.lerp(
                glowRef.current.material.opacity, targetOpacity, delta * 4
            );
        }
    });

    return (
        <group 
            ref={groupRef}
            onClick={(e) => { e.stopPropagation(); onSelect(book); }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <group position={[0, height/2, 0]}>
                {/* --- GLOW OUTLINE (Neon border on hover) --- */}
                <mesh ref={glowRef} position={[0, 0, 0]}>
                    <boxGeometry args={[width + 0.15, height + 0.15, depth + 0.15]} />
                    <meshBasicMaterial 
                        color={glowColor}
                        transparent
                        opacity={0}
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>

                {/* --- BACK COVER --- */}
                <mesh position={[0, 0, -depth/2 - 0.01]}> 
                    <boxGeometry args={[width, height, 0.05]} />
                    <meshStandardMaterial 
                        color={book.color} 
                        roughness={0.35} 
                        metalness={0.25}
                        emissive={book.color}
                        emissiveIntensity={hovered ? 0.15 : (isActive ? 0.1 : 0)} 
                    />
                </mesh>
                
                {/* --- PAGES (Cream paper) --- */}
                <mesh position={[0.05, 0, 0]}> 
                    <boxGeometry args={[width - 0.1, height - 0.1, depth]} />
                    <meshStandardMaterial color="#fdfbf7" roughness={0.8} />
                    
                    {/* Inner text when reading */}
                    {isActive && (
                        <group position={[0.1, 0, depth/2 + 0.01]}>
                            <Text
                                fontSize={0.11}
                                color="#0f172a"
                                maxWidth={width - 0.4}
                                lineHeight={1.5}
                                textAlign="left"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {book.favoriteIdea}
                            </Text>
                            
                            <Text
                                 position={[0, -0.8, 0]}
                                 fontSize={0.07}
                                 color="#94a3b8"
                                 anchorX="center"
                            >
                                 — {book.author}
                            </Text>
                        </group>
                    )}
                </mesh>

                {/* --- SPINE (with gold title) --- */}
                <group position={[-width/2, 0, 0]}>
                     <mesh>
                        <boxGeometry args={[0.05, height, depth + 0.04]} />
                        <meshStandardMaterial 
                            color={book.color} 
                            roughness={0.35} 
                            metalness={0.25}
                            emissive={book.color}
                            emissiveIntensity={isActive ? 0.3 : (hovered ? 0.2 : 0.05)}
                        />
                     </mesh>
                     <Text
                        position={[-0.035, 0, 0]}
                        rotation={[0, -Math.PI/2, -Math.PI/2]}
                        fontSize={0.12}
                        color="#D4AF37"
                        maxWidth={height - 0.2}
                        anchorX="center"
                        anchorY="middle"
                     >
                        {book.title}
                     </Text>
                </group>

                {/* --- FRONT COVER (Hinge pivot) --- */}
                <group ref={coverRef} position={[-width/2, 0, depth/2 + 0.01]}>
                    <mesh position={[width/2, 0, 0]}>
                        <boxGeometry args={[width, height, 0.05]} />
                        <meshStandardMaterial 
                            map={texture} 
                            color="white"
                            roughness={0.25}
                            metalness={0.15}
                        />
                    </mesh>
                </group>

                {/* Dramatic reading spotlight */}
                {isActive && (
                    <>
                        <pointLight position={[0.5, 1, 2.5]} color="#ffcc80" intensity={1.2} distance={5} decay={2} />
                        <pointLight position={[-0.3, -0.5, 1.5]} color="#a855f7" intensity={0.4} distance={3} decay={2} />
                    </>
                )}
            </group>
        </group>
    );
};

export default InteractiveBook;
