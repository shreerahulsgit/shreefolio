
import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Hls from 'hls.js';

const GiantScreen = ({ videoUrl, isPlaying, shouldLoad }) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const [videoTexture, setVideoTexture] = useState(null);
    const videoRef = useRef(null);

    const arc = Math.PI / 2;
    const radius = 30;
    const height = 24;
    const segments = 64;

    const screenGeo = useMemo(() => {
        const geo = new THREE.CylinderGeometry(
            radius, radius, height, segments, 1, true,
            Math.PI - arc / 2, arc
        );

        const uvs = geo.attributes.uv;
        const count = uvs.count;

        let minU = Infinity, maxU = -Infinity;
        for (let i = 0; i < count; i++) {
            const u = uvs.getX(i);
            if (u < minU) minU = u;
            if (u > maxU) maxU = u;
        }

        const rangeU = maxU - minU || 1;

        for (let i = 0; i < count; i++) {
            const rawU = uvs.getX(i);
            const newU = 1.0 - (rawU - minU) / rangeU;
            const rawV = uvs.getY(i);
            uvs.setXY(i, newU, rawV);
        }

        uvs.needsUpdate = true;
        return geo;
    }, []);

    const frameGeo = useMemo(() => {
        return new THREE.CylinderGeometry(
            radius + 0.5, radius + 0.5, height + 0.5, segments, 1, true,
            Math.PI - arc / 2 - 0.02, arc + 0.04
        );
    }, []);

    useEffect(() => {
        if (!videoUrl || !shouldLoad) {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = '';
                videoRef.current = null;
            }
            if (videoTexture) {
                videoTexture.dispose();
                setVideoTexture(null);
            }
            return;
        }

        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        videoRef.current = video;

        let hls = null;
        let isHls = videoUrl.endsWith('.m3u8');

        if (isHls && Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
        } else {
            video.src = videoUrl;
        }

        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        const playTimer = setTimeout(() => {
            video.play().then(() => {
                console.log('✅ Video playing successfully');
                video.muted = false;
                setVideoTexture(texture);
            }).catch((err) => {
                console.warn('Video autoplay failed:', err);
                const tryPlay = () => {
                    video.play().then(() => {
                        console.log('✅ Video playing after user interaction');
                        video.muted = false;
                        setVideoTexture(texture);
                    });
                    document.removeEventListener('click', tryPlay);
                };
                document.addEventListener('click', tryPlay);
            });
        }, 2500);

        return () => {
            clearTimeout(playTimer);
            video.pause();
            video.src = '';
            texture.dispose();
            if (hls) {
                hls.destroy();
            }
            videoRef.current = null;
        };
    }, [videoUrl, shouldLoad]);

    useFrame(() => {
        if (materialRef.current) {
            const showVideo = isPlaying && videoTexture;
            
            if (showVideo) {
                materialRef.current.emissive.setHex(0xffffff);
                materialRef.current.emissiveIntensity = 1.5;
                materialRef.current.emissiveMap = videoTexture;
                materialRef.current.map = videoTexture;
                materialRef.current.toneMapped = false;
            } else {
                const targetEmissive = isPlaying ? 0.3 : 0;
                materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
                    materialRef.current.emissiveIntensity,
                    targetEmissive,
                    0.05
                );
                materialRef.current.map = null;
                materialRef.current.toneMapped = true;
            }
            materialRef.current.needsUpdate = true;
        }
    });

    return (
        <group position={[0, 4, 5]}>
            <mesh ref={meshRef} geometry={screenGeo}>
                <meshStandardMaterial
                    ref={materialRef}
                    side={THREE.DoubleSide}
                    color={isPlaying ? "#ffffff" : "#1a1525"}
                    emissive={isPlaying ? "#ffffff" : "#2a1845"}
                    emissiveIntensity={isPlaying ? 0 : 0.2}
                    roughness={0.1}
                    metalness={0}
                />
            </mesh>
        </group>
    );
};

export default GiantScreen;
