import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import * as THREE from 'three';

const GlassCard = ({ artist, position, rotation, onClick, isSelected }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);
    
    const material = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0,
        transmission: 0.6,
        thickness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 1.0, 
        side: THREE.DoubleSide
    }), []);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
            
            const targetScale = isSelected ? 1.2 : (hovered ? 1.1 : 1);
            mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
        }
    });

    return (
        <group 
            position={position} 
            rotation={rotation} 
            ref={mesh}
            onClick={() => onClick(artist)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            cursor="pointer"
        >
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[2.5, 3.5, 0.1]} />
                <primitive object={material} attach="material" />
            </mesh>
            
            {hovered && (
                 <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.55, 3.55, 0.08]} />
                    <meshBasicMaterial color="#8A4FFF" transparent opacity={0.5} />
                </mesh>
            )}

            <Image 
                url={artist.image.replace('/upload/', '/upload/w_512,q_auto,f_auto/')} 
                scale={[2.2, 2.2]} 
                position={[0, 0.3, 0.06]}
                radius={0.1}
                transparent
            />

            <Text
                position={[0, -1.2, 0.1]}
                fontSize={0.25}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {artist.name}
            </Text>
        </group>
    );
};

const ArtistArc = ({ onSelectArtist, selectedArtist }) => {
    const artists = [
        { 
            name: 'Kendrick Lamar', 
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760370259/kendrick-lamar-net-worth_a6enzz.webp',
            songs: [
                { title: 'All the Stars', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372140/1900x1900-000000-80-0-0_ehkjll.jpg' },
                { title: 'Luther', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372140/500x500_fv2bp7.jpg' },
                { title: 'Not Like Us', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372141/ab67616d0000b2731ea0c62b2339cbf493a999ad_bw6pdb.jpg' },
            ]
        },
        { 
            name: 'Ariana Grande', 
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768366152/ariana-grande-di-premiere-film-wicked-australia-6_43_vrgt4k.jpg',
            songs: [
                { title: 'thank u, next', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/ab67616d0000b27356ac7b86e090f307e218e9c8_knvipp.jpg' },
                { title: 'God is a woman', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/ab67616d0000b2738b58d20f1b77295730db15b4_yo1olr.jpg' },
            ]
        },
        { 
            name: 'Lana Del Rey',
            image: ' https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760370617/201f700163f3ea9d2037ee2d4d5fb1fc_jwbdtz.jpg',
            songs: [
                { title: 'Summertime Sadness', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371418/artworks-y7Sdw3GRwd2HKmbg-LY7XGw-t1080x1080_kcfgj6.jpg' },
                { title: 'Young and Beautiful', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371418/artworks-000122831703-5g3ch2-t500x500_uyhzki.jpg' },
                { title: 'Born to Die', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/ab67616d0000b273ebc8cfac8b586bc475b04918_qxlftu.jpg' },
            ]
        },
        { 
            name: 'The Weeknd', 
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768366154/The_Weeknd_Portrait_by_Brian_Ziff_oe6u9d.jpg',
            songs: [
                { title: 'Blinding Lights', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371418/the-weeknd-blinding-lights-cover-final-e1581621866909_wbst9l.webp' },
                { title: 'Timeless', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371418/timeless-weeknd_xmcz91.jpg' },
                { title: 'São Paulo', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/ab67616d0000b273caa27ecd2d27ea0429fbbcfc_ccimyv.jpg' },
                { title: 'Save Your Tears', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/761816c2d38fe30915cb3b5346c7eb35_rr0vsk.jpg' },
            ]
        },
        { 
            name: 'Billie Eilish', 
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768366152/2469_gcfjhq.webp',
            songs: [
                { title: 'bad guy', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371418/maxresdefault_vhr4cn.jpg' },
                { title: 'Birds of a Feather', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/ab67616d0000b27371d62ea7ea8a5be92d3c1f62_rijiw9.jpg' },
                { title: 'Happier Than Ever', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768371417/ab67616d0000b2732a038d3bf875d23e4aeaa84e_vvla8i.jpg' },
            ]
        },
        { 
            name: 'Dua Lipa', 
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768366153/Dua_Lipa___Dua_Lipa_cover_art_qw3g24.png',
            songs: [
                { title: 'Levitating', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372308/ab67616d0000b273bb1e7090e662ce98b0e1b4c0_aucaqn.jpg' },
                { title: 'Don’t Start Now', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372310/Dua_Lipa_-_Don_t_Start_Now_jx04r7.png' },
                { title: 'New Rules', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372309/artworks-000284980190-zd0pwj-t1080x1080_eagweb.jpg' },
            ]
        },
        { 
            name: 'Olivia Rodrigo', 
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760370525/61m4f1Zu19L._UF1000_1000_QL80__kyazdp.jpg',
            songs: [
                { title: 'drivers license', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372515/Drivers_License_by_Olivia_Rodrigo_uej24t.png' },
                { title: 'traitor', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372515/1900x1900-000000-80-0-0_1_v9brbv.jpg' },
                { title: 'deja vu', image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1768372515/a3974866951_10_dpvnho.jpg' },
            ]
        },
    ];
    
    const radius = 10;
    const totalAngle = Math.PI / 1.5;
    const startAngle = -totalAngle / 2;

    return (
        <group position={[0, 3.5, -5]}>
            {artists.map((artist, i) => {
                const angle = startAngle + (i / (artists.length - 1)) * totalAngle;
                const x = Math.sin(angle) * radius;
                const z = (Math.cos(angle) * radius) - radius;
                const rotY = -angle;
                
                return (
                    <GlassCard 
                        key={artist.name}
                        artist={artist}
                        position={[x, 0, z]}
                        rotation={[0, rotY, 0]}
                        onClick={onSelectArtist}
                        isSelected={selectedArtist?.name === artist.name}
                    />
                );
            })}
        </group>
    );
};

export default ArtistArc;
