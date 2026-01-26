import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// --- COSMIC VOYAGER SCRIPT ---
const messages = [
    {
        text: "SYSTEM ONLINE.",
        sub: "Booting the vibes.",
    },
    {
        text: "ENTERING DEEP SPACE.",
        sub: "Uncharted. Unfiltered. Unprofessional.",
    },
    {
 text: "GRAVITY: OPTIONAL.",
sub: "Nothing here follows normal rules."

    },
    {
        text: "POWER CHECK.",
        sub: "RTX 3050+ recommended.\nCharger stays on.",
    },
    {
        text: "JUDGMENT FILTER.",
        sub: "Disabled by default. Appreciate it.",
    },
    {
        text: "STRANGE THINGS AHEAD.",
        sub: "If you’re okay with the weird…",
    },
    {
        text: "READY TO LAUNCH?",
        sub: "Click anywhere to drift into Void.",
    }
];


// --- WARP SPEED CANVAS ---
const WarpSpeedCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // Warp Star Logic
        const starCount = 400;
        const stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 1, // Depth/Speed factor
            length: Math.random() * 50 + 10 // Trail length
        }));

        let frameId;
        const animate = () => {
            // Clear with slight fade for motion blur feel (optional, but pure clear is sharper for trails)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // Slight trail retention
            ctx.fillRect(0, 0, width, height);
            
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;

            stars.forEach(star => {
                // Move Diagonally (Top Left -> Bottom Right)
                const speed = star.z * 15; // Speed multiplier
                star.x += speed;
                star.y += speed * 0.5; // Slightly shallower angle

                // Wrap around
                if (star.x > width + 100 || star.y > height + 100) {
                    star.x = Math.random() * width - width; // Start off-screen
                    star.y = Math.random() * height - height;
                }

                // Draw Trail
                ctx.beginPath();
                // Tail
                ctx.moveTo(star.x - star.length, star.y - (star.length * 0.5));
                // Head
                ctx.lineTo(star.x, star.y);
                
                // Varied opacity based on speed
                ctx.globalAlpha = (star.z - 1) * 0.5; 
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;
            
            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-black" />;
};

const BeyondDisclaimer = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [agreed, setAgreed] = useState(false);
    const [shake, setShake] = useState(false);

    // Persistence Check
    useEffect(() => {
        const hasAgreed = localStorage.getItem('beyond_disclaimer_agreed') === 'true';
        if (hasAgreed) {
            navigate('/beyond', { replace: true });
        }
    }, [navigate]);

    // Fade Animation
    useEffect(() => {
        setOpacity(0);
        const timer = setTimeout(() => setOpacity(1), 200); 
        return () => clearTimeout(timer);
    }, [step]);

    const handleInteraction = () => {
        if (step < messages.length - 1) {
            setStep(s => s + 1);
        } else {
            if (!agreed) {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                return;
            }
            localStorage.setItem('beyond_disclaimer_agreed', 'true');
            navigate('/beyond');
        }
    };

    const currentMsg = messages[step];
    const isLastStep = step === messages.length - 1;

    return (
        <div 
            className="fixed inset-0 bg-black text-white overflow-hidden cursor-crosshair font-['Jura'] select-none"
            onClick={handleInteraction}
        >
            {/* BACKGROUND */}
            <WarpSpeedCanvas />

            {/* Subtle Vignette */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />

            {/* Back Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute top-8 left-8 z-50 text-white/40 hover:text-white hover:scale-110 transition-all flex items-center gap-2 group cursor-pointer"
            >
                <ArrowLeft className="w-6 h-6" />
                <span className="text-xs tracking-[0.3em] font-bold uppercase">Disengage</span>
            </button>

            {/* MAIN CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-30">
                 <div 
                    className="transition-all duration-1000 ease-out transform"
                    style={{ 
                        opacity: opacity,
                        transform: `scale(${opacity ? 1 : 0.95}) translateY(${opacity ? 0 : 20}px)` 
                    }}
                 >
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                        {currentMsg.text}
                    </h1>
                    
                    <p className="text-xs md:text-sm text-blue-100/70 font-medium tracking-[0.3em] uppercase leading-relaxed max-w-xl mx-auto mb-8">
                        {currentMsg.sub}
                    </p>

                    {/* Terms Checkbox - Only show on last step */}
                    {isLastStep && (
                        <div 
                            className={`flex items-center justify-center gap-3 mt-8 animate-fade-in ${shake ? 'animate-shake' : ''}`}
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <label className={`flex items-center gap-3 cursor-pointer group transition-colors duration-300 ${shake ? 'text-red-400' : ''}`}>
                                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${
                                    agreed 
                                        ? 'bg-white/20 border-white' 
                                        : shake ? 'border-red-400' : 'border-white/40 group-hover:border-white/80'
                                }`}>
                                    {agreed && <div className="w-2.5 h-2.5 bg-white rounded-[1px]" />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={agreed} 
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <span className={`text-[10px] tracking-widest uppercase transition-colors ${shake ? 'text-red-400' : 'text-white/50 group-hover:text-white/80'}`}>
                                    I agree to the terms (Don't show this again)
                                </span>
                            </label>
                        </div>
                    )}
                 </div>

                 {/* HUD ELEMENTS - Centered */}
                 <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center font-mono text-[9px] text-white tracking-[0.2em] w-48">
                    <div className="mb-2 flex justify-between items-center px-1">
                        <span>VELOCITY</span>
                        <span>{((step+1) / messages.length * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-[1px] bg-white/50 relative overflow-hidden">
                        <div 
                            className="h-full bg-white transition-all duration-500 shadow-[0_0_8px_white]" 
                            style={{ width: `${((step)/(messages.length-1))*100}%` }} 
                        />
                    </div>
                 </div>

                 {/* Tap Hint */}
                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-[9px] tracking-[0.4em] animate-pulse">
                     {isLastStep && !agreed ? '[ AGREE TO PROCEED ]' : '[ CLICK TO PROCEED ]'}
                 </div>
            </div>
            
        </div>
    );
};

export default BeyondDisclaimer;
