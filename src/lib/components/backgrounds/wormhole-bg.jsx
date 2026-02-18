import { useEffect, useRef, useState } from 'react';

const WormholeBackground = ({ onIntroComplete, skipIntro = false }) => {
    const canvasRef = useRef(null);
    const [introDone, setIntroDone] = useState(skipIntro);

    useEffect(() => {
        if (skipIntro && onIntroComplete) {
            onIntroComplete();
        }
    }, [skipIntro, onIntroComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false }); 
        let animationFrameId;

        let stars = [];
        const starCount = 4000; 
        let speed = 0.5;
        let warpFactor = 0;
        
        let shake = { x: 0, y: 0 };
        
        let startTime = Date.now();
        let phase = skipIntro ? 'coast' : 'drift'; 

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };
        
        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * 2000,
                    size: Math.random(), 
                });
            }
        };

        const update = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            
            if (phase === 'drift') {
                speed = 0.2;
                warpFactor = 0;
                if (elapsed > 4000) phase = 'accelerate';
            } else if (phase === 'accelerate') {
                const progress = Math.min((elapsed - 4000) / 4000, 1);
                speed = 0.2 + (progress * progress) * 80; 
                warpFactor = progress;
                
                const shakeIntensity = progress * 5;
                shake.x = (Math.random() - 0.5) * shakeIntensity;
                shake.y = (Math.random() - 0.5) * shakeIntensity;

                if (progress >= 1) phase = 'peak';
            } else if (phase === 'peak') {
                speed = 100;
                warpFactor = 1;
                shake.x = (Math.random() - 0.5) * 15;
                shake.y = (Math.random() - 0.5) * 15;
                
                if (elapsed > 10000) phase = 'flash';
            } else if (phase === 'flash') {
                if (elapsed > 10200 && !introDone) {
                     if (onIntroComplete && !skipIntro) onIntroComplete();
                     setIntroDone(true);
                     phase = 'coast';
                }
            } else if (phase === 'coast') {
                speed = 0.4;
                warpFactor = 0;
                shake.x = 0;
                shake.y = 0;
            }

            ctx.fillStyle = 'black'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = (canvas.width / 2) + shake.x;
            const cy = (canvas.height / 2) + shake.y;

            for (let i = 0; i < stars.length; i++) {
                let star = stars[i];
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                    star.z = 2000;
                }

                const scale = 1000 / star.z;
                const x = cx + star.x * scale;
                const y = cy + star.y * scale;

                if (warpFactor > 0.1) {
                    const trailLength = Math.max(2, speed * (warpFactor * 2));
                    const xp = cx + star.x * (1000 / (star.z + trailLength));
                    const yp = cy + star.y * (1000 / (star.z + trailLength));

                    const alpha = Math.min(1, scale * 1.5 * warpFactor);
                    ctx.strokeStyle = `rgba(200, 220, 255, ${alpha})`;
                    ctx.lineWidth = scale * (1 + warpFactor) * 2;
                    ctx.beginPath();
                    ctx.moveTo(xp, yp);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                } else {
                    const brightness = (1 - star.z / 2000);
                    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                    ctx.beginPath();
                    ctx.arc(x, y, Math.max(0.4, scale * star.size), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resize);
        resize();
        update();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [skipIntro]);

    return (
        <div className="fixed inset-0 z-0 bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            
            {!skipIntro && (
                <div 
                    className="absolute inset-0 z-[100] pointer-events-none mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,230,255,0.9) 25%, rgba(100,150,255,0.4) 50%, rgba(0,0,0,0) 80%)',
                        opacity: 0,
                        animation: 'optical-flash 14s linear forwards', 
                    }}
                />
            )}
            
            <style>{`
                @keyframes optical-flash {
                    0% { opacity: 0; transform: scale(0.5); }
                    68% { opacity: 0; transform: scale(0.8); }
                    70% { opacity: 1; transform: scale(1.2); } /* EXPLOSION */
                    85% { opacity: 0.8; transform: scale(3.5); } /* EXPAND & FADE */
                    100% { opacity: 0; transform: scale(4.0); }
                }
            `}</style>
        </div>
    );
};

export default WormholeBackground;
