import React, { useEffect, useState } from 'react';

const TimeTravelIntro = ({ onComplete }) => {
    const [phase, setPhase] = useState('warp'); // 'warp', 'slowmo', 'exit'

    useEffect(() => {
        // Timeline
        const slowMoTimer = setTimeout(() => setPhase('slowmo'), 2000); // 2s warp
        const exitTimer = setTimeout(() => setPhase('exit'), 4500); // 2.5s slowmo
        const completeTimer = setTimeout(onComplete, 5500); // 1s exit fade

        return () => {
            clearTimeout(slowMoTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
                phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* 1. The Warp Tunnel (Streaks) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[3000ms] ease-out ${
                phase === 'slowmo' ? 'scale-150 opacity-50 blur-sm' : 'scale-100 opacity-100'
            }`}>
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-[2px] h-[50vh] bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-0 animate-warp-streak"
                        style={{
                            transform: `rotate(${i * 18}deg) translateY(-50%)`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: phase === 'slowmo' ? '10s' : '0.2s', // THE SLOW MOTION TRICK
                        }}
                    />
                ))}
            </div>

            {/* 2. The Clock / Portal Rings */}
            <div className="relative">
                {/* Outer Ring */}
                <div 
                    className={`w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/20 flex items-center justify-center transition-all duration-[2000ms] cubic-bezier(0.1, 0.8, 0.2, 1) ${
                        phase === 'slowmo' ? 'scale-125 border-cyan-500/50' : 'scale-100'
                    }`}
                >
                    <div 
                        className="absolute inset-0 rounded-full border-t-2 border-white animate-spin-fast"
                        style={{ animationDuration: phase === 'slowmo' ? '15s' : '0.5s' }} 
                    />
                </div>

                {/* Inner Ring */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full border border-white/10 flex items-center justify-center transition-all duration-[2000ms]"
                >
                     <div 
                        className="absolute inset-0 rounded-full border-b-2 border-cyan-400 animate-spin-reverse-fast"
                        style={{ animationDuration: phase === 'slowmo' ? '12s' : '0.3s' }} 
                    />
                </div>

                {/* Center Text/Date */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white mix-blend-difference">
                    <div className={`text-4xl md:text-6xl font-black tracking-tighter transition-all duration-1000 ${
                        phase === 'slowmo' ? 'tracking-[0.5em] scale-110 blur-[1px]' : 'tracking-normal'
                    }`}>
                        {phase === 'warp' ? 'TRAVERSING' : (phase === 'slowmo' ? 'BEYOND' : 'ARRIVED')}
                    </div>
                </div>
            </div>
            
            {/* 3. Flash Effect on SlowMo trigger */}
            <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-1000 ${
                phase === 'slowmo' ? 'opacity-20' : 'opacity-0'
            }`} />

            <style>{`
                @keyframes warp-streak {
                    0% { transform: rotate(var(--r)) translateY(60vh) scaleY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: rotate(var(--r)) translateY(-60vh) scaleY(2); opacity: 0; }
                }
                .animate-warp-streak {
                    animation-name: warp-streak;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .animate-spin-fast {
                    animation: spin 1s linear infinite;
                }
                .animate-spin-reverse-fast {
                    animation: spin-reverse 1s linear infinite;
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
            `}</style>
        </div>
    );
};

export default TimeTravelIntro;
