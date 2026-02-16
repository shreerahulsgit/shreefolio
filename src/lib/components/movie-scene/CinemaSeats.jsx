import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

const CinemaSeats = () => {
    const meshRef = useRef();
    
    // Premium Configuration: Fewer, bigger, wider
    const rows = 5; // Reduced from 12
    const seatsPerRow = 8; // Reduced from 20
    const count = rows * seatsPerRow;

    useLayoutEffect(() => {
        if (!meshRef.current) return;

        const tempObject = new THREE.Object3D();
        let i = 0;

        for (let row = 0; row < rows; row++) {
            const zRow = row * 3.5; // More legroom (was 1.8)
            const yRow = row * 1.0 - 6; // Steeper stadium seating
            
            for (let seat = 0; seat < seatsPerRow; seat++) {
                const xOffset = (seat - seatsPerRow / 2 + 0.5) * 3.0; // Wider spacing
                
                // Slight curve: move Z forward at edges
                const zCurve = Math.abs(xOffset) * 0.1; 
                
                tempObject.position.set(xOffset, yRow, zRow + zCurve + 5); // Shifted back a bit
                
                // Look at screen center
                tempObject.lookAt(0, 5, -25); 
                
                tempObject.updateMatrix();
                meshRef.current.setMatrixAt(i, tempObject.matrix);
                i++;
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, []);

    // Premium Chair Geometry
    // We can't do complex merged geometry easily in a single InstancedMesh without external loaders.
    // However, we can use a Group of InstancedMeshes or just stick to a better simple shape.
    // Let's use a "Group" approach by returning multiple InstancedMeshes? No, that's complex for positioning.
    // We will stick to one InstancedMesh but use a slightly more complex geometry if possible, 
    // OR just use a nice box scaling.
    
    // Let's try to make a "Chair" shape using a single geometry if possible?
    // Constructing a custom BufferGeometry is possible but verbose.
    // Let's stick to a Box but scale it to look like a wide recliner.

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
             {/* Wide Recliner Shape */}
             <boxGeometry args={[2.2, 1.5, 1.8]} /> 
             
             {/* Same as floor color */}
             <meshStandardMaterial 
               color="#1a1a1a"
                roughness={0.75} 
                metalness={0.15} 
                emissive="#6B3FA0"
                emissiveIntensity={0.25}
             />
        </instancedMesh>
    );
};

export default CinemaSeats;
