import React, { useRef, useEffect } from 'react';
import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const LibraryCameraRig = ({ activeBook }) => {
    const controls = useRef();
    const { camera } = useThree();

    useEffect(() => {
        if (!controls.current) return;

        if (activeBook) {
            // READING MODE: Zoom in (but not too close), look slightly up
            // Position: (0, 0.5, 9) looking at (0, 0.5, 0)
            controls.current.setLookAt(0, 0.5, 7, 0, 0.5, 0, true);
        } else {
            // EXPLORE MODE: Overview position
            // Position: (0, 0, 14) looking at (0, 0, 0)
            controls.current.setLookAt(0, 0, 14, 0, 0, 0, true);
        }
    }, [activeBook]);

    return (
        <CameraControls 
            ref={controls} 
            maxDistance={20} 
            minDistance={4} 
            smoothTime={0.8} 
        />
    );
};

export default LibraryCameraRig;
