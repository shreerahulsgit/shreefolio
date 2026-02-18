import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

const CinemaSeats = () => {
    const meshRef = useRef();
    
    const rows = 5;
    const seatsPerRow = 8;
    const count = rows * seatsPerRow;

    useLayoutEffect(() => {
        if (!meshRef.current) return;

        const tempObject = new THREE.Object3D();
        let i = 0;

        for (let row = 0; row < rows; row++) {
            const zRow = row * 3.5;
            const yRow = row * 1.0 - 6;
            
            for (let seat = 0; seat < seatsPerRow; seat++) {
                const xOffset = (seat - seatsPerRow / 2 + 0.5) * 3.0;
                const zCurve = Math.abs(xOffset) * 0.1; 
    
                tempObject.position.set(xOffset, yRow, zRow + zCurve + 5);
                
                tempObject.lookAt(0, 5, -25); 
                
                tempObject.updateMatrix();
                meshRef.current.setMatrixAt(i, tempObject.matrix);
                i++;
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, []);

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <boxGeometry args={[2.2, 1.5, 1.8]} /> 
             
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
