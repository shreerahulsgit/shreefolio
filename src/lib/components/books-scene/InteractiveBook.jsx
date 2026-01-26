import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// ============================================
// TEXTURE GENERATION UTILS (High Fidelity)
// ============================================
const createBookTexture = (title, author, color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // 1. Base Leather Material
    // Darker, richer base
    ctx.fillStyle = color; 
    ctx.fillRect(0, 0, 512, 800);
    
    // 2. Leather Noise/Grain
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#000000';
    for(let i=0; i<50000; i++) {
        ctx.fillRect(Math.random()*512, Math.random()*800, 2, 2);
    }
    ctx.globalAlpha = 1.0;

    // 3. Vintage Vignette (Dark Edges)
    const gradient = ctx.createRadialGradient(256, 400, 100, 256, 400, 600);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 800);

    // 4. Gold Borders / Ornaments
    ctx.strokeStyle = '#D4AF37'; // Gold
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 472, 760); // Outer border
    ctx.lineWidth = 1;
    ctx.strokeRect(35, 35, 442, 730); // Inner border

    // 5. Title Typography (Serif, Elegant)
    ctx.fillStyle = '#e2e8f0'; // Off-white text
    ctx.font = 'bold 52px "Times New Roman", serif'; // Web safe serif
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Wrap Title
    const words = title.split(' ');
    let y = 250;
    words.forEach(word => {
        ctx.fillText(word, 256, y);
        y += 65;
    });

    // 6. Author
    ctx.font = 'italic 28px "Arial", sans-serif';
    ctx.fillStyle = '#D4AF37'; // Gold author
    ctx.shadowBlur = 0;
    ctx.fillText(author, 256, 680);

    // 7. Spine Area (Left side)
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, 40, 800); // Spine shadow

    return new THREE.CanvasTexture(canvas);
};

// ============================================
// COMPONENT
// ============================================
const InteractiveBook = ({ book, index, total, onSelect, isActive, isAnyActive, rackPosition }) => {
    const groupRef = useRef();
    const coverRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    // Change cursor on hover
    useCursor(hovered);

    // Memoize texture generation
    const texture = useMemo(() => createBookTexture(book.title, book.author, book.color), [book]);
    
    // Dimensions
    const width = 1.4;
    const height = 2.2;
    const depth = 0.25;

    // Default Linear Position (from Rack parent)
    const [baseX, baseY, baseZ] = rackPosition || [0,0,0];

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // --- 1. TARGETING LOGIC ---
        let targetPos = new THREE.Vector3(baseX, baseY, baseZ);
        // Default: Spine facing camera (Rotated -90 deg Y)
        const spineRot = -Math.PI / 2;
        let targetRot = new THREE.Euler(0, spineRot, 0); 

        if (isActive) {
            // READING MODE: Center of World (0,0,0)
            // Undo Parent X (-baseX)
            // Undo Parent Y (-0.5 -> set to 0.5 to reach 0)
            targetPos.set(-baseX, 0.5, 3.0); 
            targetRot.set(-0.1, 0, 0); // Flat face
        } else if (isAnyActive) {
            // BACKGROUND MODE: Stay on shelf, maybe dim?
        } else if (hovered) {
            // HOVER MODE: Slide out Z, Rotate slightly to show cover hint
            targetPos.z += 0.6;
            targetRot.y = spineRot + 0.4; // Twist to show cover
        }

        // --- 2. PHYSICS ANIMATION (Damping) ---
        easing.damp3(groupRef.current.position, targetPos, isActive ? 0.4 : 0.25, delta);
        easing.dampE(groupRef.current.rotation, targetRot, isActive ? 0.4 : 0.25, delta);

        // --- 3. HINGE ANIMATION ---
        // Open book when active (Wider angle for reading)
        const targetOpen = isActive ? -Math.PI * 0.85 : 0; 
        if (coverRef.current) {
            easing.damp(coverRef.current.rotation, 'y', targetOpen, isActive ? 0.5 : 0.3, delta);
        }
    });

    return (
        <group 
            ref={groupRef}
            onClick={(e) => { e.stopPropagation(); onSelect(book); }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* --- BOOK BODY (Sitting on shelf) --- */}
            <group position={[0, height/2, 0]}> {/* Center pivot at bottom of book */}
                {/* --- BACK COVER (Leather) --- */}
                <mesh position={[0, 0, -depth/2 - 0.01]}> 
                    <boxGeometry args={[width, height, 0.05]} />
                    <meshStandardMaterial 
                        color={book.color} 
                        roughness={0.4} 
                        metalness={0.2}
                        emissive={book.color}
                        emissiveIntensity={hovered ? 0.1 : 0} 
                    />
                </mesh>
                
                {/* --- PAGES BLOCK (Paper) --- */}
                <mesh position={[0.05, 0, 0]}> 
                    <boxGeometry args={[width - 0.1, height - 0.1, depth]} />
                    <meshStandardMaterial color="#fdfbf7" roughness={0.8} /> {/* Creamy paper */}
                    
                    {/* INNER TEXT (Visible Only When Active) */}
                    {isActive && (
                        <group position={[0.1, 0, depth/2 + 0.01]}>
                            <Text
                                fontSize={0.11}
                                color="#0f172a" // Dark Ink
                                maxWidth={width - 0.4}
                                lineHeight={1.5}
                                textAlign="left"
                                anchorX="center"
                                anchorY="middle"
                                // Using default font for stability
                            >
                                {book.favoriteIdea}
                            </Text>
                            
                            <Text
                                 position={[0, -0.8, 0]}
                                 fontSize={0.07}
                                 color="#94a3b8" // Grey Ink
                                 anchorX="center"
                            >
                                 — {book.author}
                            </Text>
                        </group>
                    )}
                </mesh>

                {/* --- SPINE (Gold Title) --- */}
                <group position={[-width/2, 0, 0]}>
                     <mesh>
                        <boxGeometry args={[0.05, height, depth + 0.04]} />
                        <meshStandardMaterial color={book.color} roughness={0.4} metalness={0.2} />
                     </mesh>
                     {/* Spine Text (Rotated) */}
                     <Text
                        position={[-0.03, 0, 0]}
                        rotation={[0, -Math.PI/2, -Math.PI/2]} // Reading down the spine
                        fontSize={0.12}
                        color="#D4AF37" // Gold
                        maxWidth={height - 0.2}
                        anchorX="center"
                        anchorY="middle"
                     >
                        {book.title}
                     </Text>
                </group>

                {/* --- FRONT COVER (Pivot) --- */}
                <group ref={coverRef} position={[-width/2, 0, depth/2 + 0.01]}>
                    <mesh position={[width/2, 0, 0]}>
                        <boxGeometry args={[width, height, 0.05]} />
                        <meshStandardMaterial 
                            map={texture} 
                            color="white"
                            roughness={0.3}
                            metalness={0.1}
                        />
                    </mesh>
                </group>

                 {/* Reading Light (Warm) */}
                 {isActive && (
                    <pointLight position={[0.5, 0, 2]} color="#ffaa00" intensity={0.5} distance={3} decay={2} />
                )}
            </group>
        </group>
    );
};

export default InteractiveBook;
