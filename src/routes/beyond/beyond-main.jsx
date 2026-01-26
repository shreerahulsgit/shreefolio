import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WormholeBackground from '../../lib/components/WormholeBackground.jsx';

// ============================================
// CARD REFLECTION COMPONENT
// ============================================
const CardReflection = ({ card, isFront, cardSize }) => {
    if (!isFront) return null;
    
    return (
        <div 
            className="absolute pointer-events-none"
            style={{
                width: `${cardSize}px`,
                height: `${cardSize * 0.4}px`,
                bottom: `-${cardSize * 0.35}px`,
                left: 0,
                transform: 'scaleY(-1) perspective(500px) rotateX(30deg)',
                transformOrigin: 'top center',
            }}
        >
            <div 
                className="w-full h-full rounded-3xl overflow-hidden"
                style={{
                    background: `url(${card.image}) center center / cover`,
                    opacity: 0.1,
                    filter: 'blur(3px)',
                    maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 100%)',
                }}
            />
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
const BeyondMain = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    // --- PERSISTENCE LOGIC ---
    // Check if intro has been shown this session
    const shouldSkipIntro = sessionStorage.getItem('beyond_intro_done') === 'true';
    
    // Check if we have a saved card index
    const savedIndex = parseInt(sessionStorage.getItem('beyond_active_index') || '0', 10);

    const [isVisible, setIsVisible] = useState(shouldSkipIntro); // Visible immediately if skipping
    const [currentIndex, setCurrentIndex] = useState(savedIndex); // Restore index
    const [isAnimating, setIsAnimating] = useState(false);
    const [exitingIndex, setExitingIndex] = useState(null);
    const [passedCards, setPassedCards] = useState(() => {
        // If we restored an index (e.g. 2), we need to mark 0 and 1 as 'passed'
        // so they sit to the left.
        return Array.from({ length: savedIndex }, (_, i) => i);
    });
    
    // Mouse tracking with Inertia
    const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
    const currentMouseRef = useRef({ x: 0.5, y: 0.5 });
    const [smoothMouse, setSmoothMouse] = useState({ x: 0.5, y: 0.5 }); 
    const animationFrameRef = useRef();
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleIntroComplete = () => {
        setIsVisible(true);
        sessionStorage.setItem('beyond_intro_done', 'true');
    };

    // Save scroll position whenever it changes
    useEffect(() => {
        sessionStorage.setItem('beyond_active_index', currentIndex.toString());
    }, [currentIndex]);

    // Inertia Loop
    useEffect(() => {
        const updateInertia = () => {
            const target = targetMouseRef.current;
            const current = currentMouseRef.current;
            
            // Lerp factor (lower = heavier/smoother)
            const ease = 0.05; 
            
            current.x += (target.x - current.x) * ease;
            current.y += (target.y - current.y) * ease;
            
            currentMouseRef.current = { ...current };
            setSmoothMouse({ ...current }); // Trigger render for style updates
            
            animationFrameRef.current = requestAnimationFrame(updateInertia);
        };
        
        updateInertia();
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    // Track mouse target
    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        targetMouseRef.current = { x, y };
    }, []);

    const cards = [
        {
            title: 'UNFILTERED ME',
            subtitle: 'The raw, authentic version.',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop', // Placeholder: Calm beach/nature
            link: '/beyond/unfiltered',
        },
        {
            title: 'MUSIC',
            subtitle: 'Soundtracks to my moods.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170040/desk-music-black-and-white-technology-headphone-gadget-100901-pxhere.com_yeay0u.jpg',
            link: '/beyond/music',
        },
        {
            title: 'MOVIES',
            subtitle: 'Cinematic worlds I escape into.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170030/Movie_ogjjt6.jpg',
            link: '/beyond/movies',
        },
        {
            title: 'SPORTS & ADRENALINE',
            subtitle: 'The thrill side of me.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170028/F1_fne2yc.jpg',
            link: '/beyond/sports',
        },
        {
            title: 'BOOKS',
            subtitle: 'Stories that shaped how I think.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170029/books_uoldj8.jpg',
            link: '/beyond/books',
        },
        {
            title: 'RANDOM FACTS',
            subtitle: "Chaos you didn't ask for.",
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170029/BG_of_the_beyond_s5gpta.webp',
            link: '/beyond/random',
        },
    ];

    const totalCards = cards.length;
    const cardSize = 420;

    // Calculate magnetic tilt based on SMOOTH mouse position
    const getMagneticTilt = (cardIndex) => {
        if (hoveredCard !== cardIndex) return { rotateX: 0, rotateY: 0 };
        
        const tiltX = (smoothMouse.y - 0.5) * -25; // Increased range allowed by smooth damping
        const tiltY = (smoothMouse.x - 0.5) * 25;
        
        return { rotateX: tiltX, rotateY: tiltY };
    };

    // Calculate parallax offset for UI elements
    const getParallaxOffset = useCallback((intensity = 1) => {
        const offsetX = (smoothMouse.x - 0.5) * 40 * intensity; // Increased parallax
        const offsetY = (smoothMouse.y - 0.5) * 20 * intensity;
        return { x: offsetX, y: offsetY };
    }, [smoothMouse]);

    const getCardStyle = (cardIndex) => {
        const isPassed = passedCards.includes(cardIndex);
        const isCurrent = cardIndex === currentIndex;
        const isExiting = cardIndex === exitingIndex;
        const isOnRight = cardIndex % 2 === 0;
        const magneticTilt = getMagneticTilt(cardIndex);

        if (isExiting) {
            return {
                transform: `translateZ(600px) scale(1.2) rotateX(${magneticTilt.rotateX}deg) rotateY(${magneticTilt.rotateY}deg)`,
                opacity: 0,
                zIndex: 60,
                ...(isOnRight 
                    ? { right: '-5%', left: 'auto' }
                    : { left: '-5%', right: 'auto' }
                ),
                filter: 'none',
                pointerEvents: 'none',
            };
        }

        if (isPassed) {
            return {
                transform: 'translateZ(200px) scale(0.8)',
                opacity: 0,
                zIndex: 0,
                ...(isOnRight 
                    ? { right: '-50%', left: 'auto' }
                    : { left: '-50%', right: 'auto' }
                ),
                filter: 'blur(10px)',
                pointerEvents: 'none',
            };
        }

        if (isCurrent) {
            return {
                transform: `translateZ(0) scale(1) rotateX(${magneticTilt.rotateX}deg) rotateY(${magneticTilt.rotateY}deg)`,
                opacity: 1,
                zIndex: 50,
                ...(isOnRight 
                    ? { right: '8%', left: 'auto' }
                    : { left: '8%', right: 'auto' }
                ),
                filter: 'none',
                pointerEvents: 'auto',
            };
        }

        const depthLevel = cardIndex - currentIndex;

        if (depthLevel < 0) {
            return {
                transform: 'translateZ(-900px) scale(0.3)',
                opacity: 0,
                zIndex: 0,
                ...(isOnRight 
                    ? { right: '50%', left: 'auto' }
                    : { left: '50%', right: 'auto' }
                ),
                filter: 'blur(5px)',
                pointerEvents: 'none',
            };
        }

        const baseZ = -900 * depthLevel;
        const baseScale = 1 - depthLevel * 0.02; // Minimal scale reduction for deep visibility
        const baseOpacity = 0.9 - depthLevel * 0.1; // Keep opacity high

        return {
            transform: `translateZ(${baseZ}px) scale(${Math.max(baseScale, 0.5)}) rotateX(${magneticTilt.rotateX * 0.5}deg) rotateY(${magneticTilt.rotateY * 0.5}deg)`,
            opacity: Math.max(baseOpacity, 0),
            zIndex: 40 - depthLevel,
            ...(isOnRight 
                ? { right: '8%', left: 'auto' }
                : { left: '8%', right: 'auto' }
            ),
            filter: `blur(${depthLevel * 1}px)`,
            pointerEvents: depthLevel <= 3 ? 'auto' : 'none',
        };
    };

    const goToPrev = () => {
        if (isAnimating) return;
        if (passedCards.length === 0) return;

        setIsAnimating(true);

        const lastPassedCard = passedCards[passedCards.length - 1];
        setPassedCards(prev => prev.slice(0, -1));
        setCurrentIndex(lastPassedCard);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1800);
    };

    const goToNext = () => {
        if (isAnimating) return;
        if (currentIndex >= totalCards - 1) return;

        const nextIndex = currentIndex + 1;
        travelToNext(nextIndex);
    };

    const travelToNext = (nextIndex) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setExitingIndex(currentIndex);

        setPassedCards(prev => [...prev, currentIndex]);
        setCurrentIndex(nextIndex);

        setTimeout(() => {
            setExitingIndex(null);
            setExitingIndex(null); // double check cleaner
            setIsAnimating(false);
        }, 1800);
    };

    const handleFrontCardClick = () => {
        navigate(cards[currentIndex].link);
    };

    const handleBackCardClick = (clickedIndex) => {
        if (isAnimating || clickedIndex <= currentIndex) return;
        if (passedCards.includes(clickedIndex)) return;
        travelToNext(clickedIndex);
    };

    const isLastCard = currentIndex === totalCards - 1;
    const isFirstCard = passedCards.length === 0;

    const parallax = getParallaxOffset();

    return (
        <div 
            ref={containerRef}
            className="h-screen text-white overflow-hidden relative" 
            style={{ perspective: '2500px' }}
            onMouseMove={handleMouseMove}
        >
            {/* Wormhole Background - Handles Intro and Persistence */}
            <div className="absolute inset-0 z-[-1]">
                 <WormholeBackground 
                    onIntroComplete={handleIntroComplete} 
                    skipIntro={shouldSkipIntro}
                />
            </div>

            {/* Cinematic Noise Overlay */}
            <div 
                className="absolute inset-0 z-50 pointer-events-none opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Header Section with Parallax */}
            <div 
                className={`absolute top-0 left-0 right-0 z-30 pt-12 flex flex-col items-center text-center transition-all duration-[1500ms] ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
                style={{
                    transform: isVisible 
                        ? `translate(${parallax.x * -0.5}px, ${parallax.y * -0.5}px)` 
                        : 'translateY(-32px)',
                }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-1 rounded-full bg-blue-200/60 shadow-[0_0_10px_rgba(100,200,255,0.8)]" />
                    <span className="text-blue-100/50 text-[10px] uppercase tracking-[0.4em] font-medium">Beyond the Code</span>
                    <div className="w-1 h-1 rounded-full bg-blue-200/60 shadow-[0_0_10px_rgba(100,200,255,0.8)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-white">
                    EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200">BEYOND</span>
                </h1>
                <p className="text-blue-100/40 text-xs md:text-sm max-w-sm leading-relaxed tracking-wide font-light">
                    Dive into the stories, sounds, and experiences that shape who I am.
                </p>
            </div>

            {/* Cards Container */}
            <div 
                className={`absolute inset-0 flex items-end justify-center pb-32 transition-all duration-[2000ms] delay-300 ease-out ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {cards.map((card, index) => {
                    const isFront = index === currentIndex;
                    const style = getCardStyle(index);

                    return (
                        <div
                            key={index}
                            className="absolute cursor-pointer"
                            style={{
                                width: `${cardSize}px`,
                                height: `${cardSize}px`,
                                ...style,
                                transition: 'all 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)', // Custom bezier for heavier feel
                                transformStyle: 'preserve-3d',
                            }}
                            onClick={() => {
                                if (isFront && !isAnimating) {
                                    handleFrontCardClick();
                                } else if (!isFront && !isAnimating) {
                                    handleBackCardClick(index);
                                }
                            }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Reflection */}
                            <CardReflection card={card} isFront={isFront} cardSize={cardSize} />

                            <div 
                                className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700 ${
                                    isFront 
                                        ? 'shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]' 
                                        : 'opacity-60 grayscale-[50%] hover:grayscale-0 hover:opacity-100'
                                }`}
                                style={{
                                    boxShadow: isFront 
                                        ? '0 30px 60px -20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0,0,0,0.5)'
                                        : 'none',
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                                        isFront ? 'hover:scale-105' : ''
                                    }`}
                                />
                                {/* Deep blending overlay - Vignette feel */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                                
                                {isFront && (
                                    <div 
                                        className="absolute inset-0 opacity-10 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                                            animation: 'shimmer 4s ease-in-out infinite',
                                        }}
                                    />
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className={`transition-all duration-500 transform ${isFront ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                        <h3 className="font-bold tracking-widest mb-2 text-2xl text-white drop-shadow-lg">
                                            {card.title}
                                        </h3>
                                        <div className="h-[1px] w-12 bg-white/50 mb-3" />
                                        {isFront && (
                                            <p className="text-white/60 text-sm font-light tracking-wide leading-relaxed drop-shadow-md">{card.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Subtle Border Interaction */}
                                <div className={`absolute inset-0 rounded-3xl border border-white/5 transition-colors duration-500 ${isFront ? 'group-hover:border-white/10' : ''}`} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            {!isFirstCard && (
                <div className={`absolute inset-y-0 left-8 flex items-center z-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={goToPrev}
                        disabled={isAnimating}
                        className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                        style={{
                            boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                        }}
                    >
                        <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}
            {!isLastCard && (
                <div className={`absolute inset-y-0 right-8 flex items-center z-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={goToNext}
                        disabled={isAnimating}
                        className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                        style={{
                            boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                        }}
                    >
                        <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}

            {/* Bottom Quote with Parallax */}
            <div
                className={`absolute bottom-8 left-1/2 z-30 transition-all duration-1000 delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                    transform: `translateX(-50%) translate(${parallax.x}px, ${parallax.y}px)`,
                }}
            >
                <p className="text-white/60 text-sm italic text-center font-medium">
                    "Every story has a rhythm — this is mine."
                </p>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    50%, 100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default BeyondMain;
