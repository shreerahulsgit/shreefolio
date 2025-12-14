import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const BeyondMain = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false)
    const [suppressNext, setSuppressNext] = useState(false)
    const [splineLoaded, setSplineLoaded] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const cards = [
        {
            title: 'BOOKS',
            subtitle: 'Stories that shaped how I think.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170029/books_uoldj8.jpg',
            link: '/beyond/books',
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
            title: 'RANDOM FACTS',
            subtitle: "Chaos you didn't ask for.",
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170029/BG_of_the_beyond_s5gpta.webp',
            link: '/beyond/random',
        },
    ];

    const totalCards = cards.length;
    const cardWidth = 275;
    const gap = 28;

    const scrollToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handlePrev = () => {
        const newSlide = currentSlide > 0 ? currentSlide - 1 : totalCards - 1;
        scrollToSlide(newSlide);
    };

    const handleNext = () => {
        if (isAnimating) return

        // arrow always implies moving to +1
        setSuppressNext(true)
        setIsAnimating(true)

        const newSlide =
            currentSlide < totalCards - 1 ? currentSlide + 1 : 0

        scrollToSlide(newSlide)

        setTimeout(() => {
            setIsAnimating(false)
            setSuppressNext(false)
        }, 200)
    }

    const handleCardClick = (link) => {
        navigate(link);
    };

    const progressPercentage = ((currentSlide + 1) / totalCards) * 100;

    return (
        <div className="h-screen text-white overflow-hidden relative flex items-center">
            <div className="absolute inset-0">
                <Spline
                    scene="https://prod.spline.design/aBrOEZccG5o-XuUp/scene.splinecode"
                    className="w-full h-full"
                    onLoad={() => setSplineLoaded(true)}
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 w-full h-full flex">
                <div className="w-1/2 flex flex-col justify-center px-12 lg:px-16">
                    <div
                        className={`transition-all duration-1000 ${
                            isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-12'
                        }`}
                    >
                        <div className="mb-6">
                            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <p className="text-sm text-white/70 tracking-wider">
                                    BEYOND THE PORTFOLIO
                                </p>
                            </div>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-none">
                            <span className="block text-white">
                                LET'S EXPLORE
                            </span>
                            <span className="block text-white">
                                BEYOND TECH
                            </span>
                        </h1>

                        <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
                            The things that inspire me beyond coding — stories,
                            sounds, sports, and moments that fuel creativity.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>
                            <button
                                onClick={() => navigate('/beyond/books')}
                                className="group px-8 py-4 bg-white hover:bg-gray-200 text-black rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
                            >
                                <Sparkles className="w-5 h-5" />
                                Dive In
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex items-center relative">
                    <div
                        className={`w-full transition-all duration-1000 delay-300 ${
                            isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-12'
                        }`}
                    >
                        <div
                            className="relative flex items-center justify-center h-full"
                            style={{
                                width: `${cardWidth * 3 + gap * 2}px`,
                                height: '500px',
                                margin: '0 auto',
                            }}
                        >
                            {cards.map((card, index) => {
                                const isActive = index === currentSlide;
                                const distance = index - currentSlide;

                                const isVisible = Math.abs(distance) <= 1 && !(isAnimating && suppressNext && distance === 1)
                                if (!isVisible) return null;

                                const scale = isActive ? 1.0 : 0.75;
                                const opacity = isActive ? 1 : 0.6;
                                const translateX = distance * (cardWidth + gap);
                                const zIndex = isActive ? 10 : 5;

                                return (
                                    <div
                                        key={index}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            width: `${cardWidth}px`,
                                            transform: `translateX(${translateX}px) scale(${scale})`,
                                            opacity: opacity,
                                            filter: isActive
                                                ? 'none'
                                                : 'blur(0.5px)',
                                            zIndex: zIndex,
                                            left: '50%',
                                            marginLeft: `-${cardWidth / 2}px`,
                                            transition:
                                                'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        }}
                                        onClick={() => {
                                            if (isActive) { handleCardClick(card.link); return; }
                                            if (isAnimating) return

                                            if (distance === 1) {
                                                setSuppressNext(true)
                                            }
                                            setIsAnimating(true)
                                            scrollToSlide(index)

                                            setTimeout(() => {
                                                setIsAnimating(false)
                                                setSuppressNext(false)
                                            }, 200)
                                        }}
                                    >
                                        <div
                                            className="relative h-[375px] rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 shadow-2xl hover:border-white/40"
                                            style={{
                                                transition:
                                                    'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            }}
                                        >
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110"
                                                style={{
                                                    transition:
                                                        'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                }}
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                            <div className="relative h-full flex flex-col justify-end p-6">
                                                <div
                                                    className="space-y-3 transform translate-y-0 group-hover:-translate-y-2"
                                                    style={{
                                                        transition:
                                                            'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                    }}
                                                >
                                                    <div
                                                        className="w-12 h-1 bg-white/60 rounded-full group-hover:w-20 group-hover:bg-white"
                                                        style={{
                                                            transition:
                                                                'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                        }}
                                                    />
                                                    <h3 className="text-xl font-black text-white tracking-wide">
                                                        {card.title}
                                                    </h3>
                                                    <p className="text-white/70 text-xs">
                                                        {card.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className={`absolute inset-0 rounded-3xl border-2 transition-all duration-700 ${
                                                    isActive
                                                        ? 'border-white/30'
                                                        : 'border-white/0'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-8">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 border-2 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    {'<'}
                </button>

                <div className="w-72 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200 border-2 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    {'>'}
                </button>
            </div>

            <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                }`}
            >
                <p className="text-white/80 text-base italic text-center font-medium mr-10 pl-10">
                    "Every story has a rhythm — this is mine."
                </p>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 30px) scale(0.9);
                    }
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div
                className={`absolute bottom-4 right-4 z-30 transition-all duration-0 ${
                    splineLoaded
                        ? 'opacity-100'
                        : 'opacity-0'
                }`}
            >
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 shadow-2xl">
                    <p className="text-white text-sm font-medium">
                        @ Code by Shree Rahul
                    </p>
                </div>
            </div>

            {!splineLoaded && (
                <div
                    className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 34, 34, 0.5)' }}
                >
                    <div
                        className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
                        style={{
                            backgroundColor: 'rgba(248, 248, 248, 0.025)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'rgba(248, 248, 248, 0.2)',
                        }}
                    >
                        <div
                            className="w-16 h-16 border-2 rounded-full animate-spin mb-6"
                            style={{
                                borderColor: 'rgba(248, 248, 248, 0.2)',
                                borderTopColor: 'rgba(248, 248, 248, 0.8)',
                            }}
                        ></div>
                        <p
                            className="text-lg font-medium mb-2"
                            style={{ color: '#F8F8F8' }}
                        >
                            Loading Interactive Experience...
                        </p>
                        <p className="text-sm" style={{ color: '#7B7B7B' }}>
                            Preparing your skills experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeyondMain;
