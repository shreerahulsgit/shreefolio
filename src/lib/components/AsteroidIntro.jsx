import React, { useEffect, useState } from 'react';

const AsteroidIntro = ({ onComplete }) => {
    const [phase, setPhase] = useState('drift'); // drift -> accelerate -> flash -> done

    useEffect(() => {
        // Timeline
        const accelerateTimer = setTimeout(() => setPhase('accelerate'), 3000); // 3s slow drift
        const flashTimer = setTimeout(() => setPhase('flash'), 5500); // 2.5s acceleration
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 6000); // 0.5s flash duration

        return () => {
            clearTimeout(accelerateTimer);
            clearTimeout(flashTimer);
            clearTimeout(doneTimer);
        };
    }, [onComplete]);

    if (phase === 'done') return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black overflow-hidden pointer-events-none">
            {/* Stars Background */}
            <div className="absolute inset-0 opacity-50">
                <div className="w-[1px] h-[1px] bg-white absolute top-1/4 left-1/4 shadow-[0_0_2px_#fff]" />
                <div className="w-[2px] h-[2px] bg-white absolute top-3/4 left-1/3 shadow-[0_0_2px_#fff]" />
                <div className="w-[1px] h-[1px] bg-white absolute top-1/2 left-3/4 shadow-[0_0_2px_#fff]" />
                {/* Add more inline stars or use a small repeating background if needed, keeping it simple for now */}
            </div>

            {/* The Asteroid */}
            <div 
                className={`absolute w-12 h-12 bg-gray-300 rounded-full shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.8)] transition-all ease-in-quad
                    ${phase === 'drift' ? 'duration-[4000ms] translate-x-[-20vw] translate-y-[-10vh] scale-75 rotate-0' : ''}
                    ${phase === 'accelerate' ? 'duration-[2500ms] translate-x-[60vw] translate-y-[30vh] scale-150 rotate-[360deg]' : ''}
                    ${phase === 'flash' ? 'duration-[200ms] translate-x-[150vw] translate-y-[50vh] scale-[5] opacity-0' : ''}
                `}
                style={{
                    top: '40%',
                    left: '20%',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, #a1a1aa, #404040, #000)',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
                }}
            />

            {/* Speed Lines / Streaks (during acceleration) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${phase === 'accelerate' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[1px] animate-pulse" />
                <div className="absolute top-[45%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[1px] delay-75" />
                 <div className="absolute top-[55%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[1px] delay-150" />
            </div>

            {/* The Flash */}
            <div className={`absolute inset-0 bg-white transition-opacity duration-500 ease-out ${phase === 'flash' ? 'opacity-100' : 'opacity-0'}`} />

            {/* Cinematic Title (Optional, fits Interstellar vibe) */}
            <div className={`absolute bottom-12 left-12 text-white/40 text-xs tracking-[0.5em] uppercase transition-opacity duration-1000 ${phase !== 'drift' ? 'opacity-0' : 'opacity-100'}`}>
                Initiating Sequence
            </div>
        </div>
    );
};

export default AsteroidIntro;
