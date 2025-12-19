import { useState, useEffect } from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import LoadingOverlay from '../lib/components/loading-overlay.jsx';
import SplineMasking from '../lib/components/spline-masking.jsx';
import Spline from '@splinetool/react-spline';

// Glass Card Component with Apple-style shine effects
const GlassCard = ({ children, isHovered, onMouseEnter, onMouseLeave, className = '', delay = 0, isLoaded = true }) => (
    <div
        className={`group relative rounded-3xl p-8 md:p-10 transition-all duration-700 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        } ${className}`}
        style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: isHovered
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 10px 40px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transitionDelay: `${delay}ms`,
            transform: isHovered ? 'scale(1.02) translateY(-5px)' : 'scale(1) translateY(0)',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {/* Top shine line */}
        <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            }}
        />
        
        {/* Glass gradient overlay */}
        <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
        />

        {/* Shimmer effect on hover */}
        <div
            className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
            style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.15) 45%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 55%, transparent 60%)',
                    transform: 'translateX(-200%)',
                    animation: isHovered ? 'shimmer 2s infinite' : 'none',
                }}
            />
        </div>

        {/* Radial glow effect */}
        {isHovered && (
            <div
                className="absolute -inset-1 rounded-3xl pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                }}
            />
        )}

        {children}

        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-200%); }
                100% { transform: translateX(200%); }
            }
        `}</style>
    </div>
);

// Glass Button Component with Apple-style effects
const GlassButton = ({ children, onClick, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${className}`}
            style={{
                background: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`,
                boxShadow: isHovered
                    ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
            }}
        >
            {/* Top shine line */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                }}
            />
            
            {/* Glass gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
                }}
            />

            {/* Shimmer effect */}
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 60%)',
                        transform: 'translateX(-200%)',
                        animation: isHovered ? 'buttonShimmer 1.5s infinite' : 'none',
                    }}
                />
            </div>

            {/* Glow effect */}
            {isHovered && (
                <div
                    className="absolute -inset-2 rounded-2xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                        filter: 'blur(15px)',
                    }}
                />
            )}

            <span className="relative z-10 flex items-center justify-center gap-3">{children}</span>

            <style>{`
                @keyframes buttonShimmer {
                    0% { transform: translateX(-200%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </button>
    );
};

const ResumeMain = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [headerHovered, setHeaderHovered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const downloadResume = () => {
        const googleDriveFileId = '1Oyv6Rxij87SRkI9SNGpOE4022jd53SUv';
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Shree_Rahul_S_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen relative bg-black">
            <div
                className="fixed inset-0 z-0"
                style={{ pointerEvents: 'auto' }}
            >
                <Spline
                    scene="https://prod.spline.design/O9HVvHLsw6yzQ9GT/scene.splinecode"
                    className="w-full h-full"
                    style={{
                        pointerEvents: 'auto',
                        width: '100vw',
                        height: '100vh',
                        touchAction: 'auto',
                    }}
                    onLoad={() => {
                        setIsLoaded(true);
                        setSplineLoaded(true);
                    }}
                />
            </div>

            <div className="relative z-10" style={{ pointerEvents: 'none' }}>
                <header className="py-6" style={{ pointerEvents: 'auto' }}>
                    <div className="flex justify-center px-6 mt-6">
                        <div className="text-center">
                            <div
                                className={`inline-block mb-6 px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden transform transition-all duration-1000 ease-out ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                    color: '#E5E7EB',
                                }}
                            >
                                <div
                                    className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
                                    }}
                                />
                                <span className="relative z-10">📄 Professional Resume</span>
                            </div>
                            <h1
                                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transform transition-all duration-1000 ease-out bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 ${
                                    isLoaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-12 opacity-0'
                                }`}
                            >
                                Resume
                            </h1>
                            <p
                                className={`text-xl mb-2 transform transition-all duration-1000 delay-300 ease-out ${
                                    isLoaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-8 opacity-0'
                                }`}
                                style={{ color: '#9CA3AF' }}
                            >
                                Shree Rahul S - Full Stack Web Developer
                            </p>
                        </div>
                    </div>
                </header>

                <main
                    className="flex-1 py-6 pb-12"
                    style={{ pointerEvents: 'auto' }}
                >
                    <div className="flex justify-center px-6">
                        <div className="w-full max-w-4xl">
                            <GlassCard
                                isHovered={isHovering}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                delay={300}
                                isLoaded={isLoaded}
                                className="!p-5"
                            >
                                <div className="relative z-10">
                                    <div
                                        className="overflow-hidden rounded-2xl relative"
                                        style={{
                                            height: '103.75vh',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        {/* Top shine for iframe container */}
                                        <div
                                            className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                            }}
                                        />
                                        <iframe
                                            src="https://drive.google.com/file/d/1Oyv6Rxij87SRkI9SNGpOE4022jd53SUv/preview"
                                            className="w-full h-full"
                                            allow="autoplay"
                                            title="Shree Rahul S Resume"
                                        />
                                    </div>

                                    <div
                                        className={`absolute top-8 left-8 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 z-20 overflow-hidden ${
                                            isHovering
                                                ? 'opacity-100 transform scale-105'
                                                : 'opacity-70'
                                        }`}
                                        style={{
                                            background: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                                            backdropFilter: 'blur(20px)',
                                            WebkitBackdropFilter: 'blur(20px)',
                                            border: `1px solid ${isHovering ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`,
                                            color: '#E5E7EB',
                                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                                            }}
                                        />
                                        <span className="relative z-10">PDF Document</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </main>

                <footer
                    className="relative pt-10 pb-36"
                    style={{
                        pointerEvents: 'auto',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* Top shine line for footer */}
                    <div
                        className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                        }}
                    />

                    <div className="max-w-6xl mx-auto px-6">
                        <div
                            className={`flex justify-center gap-6 transform transition-all duration-1000 delay-500 ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-4 opacity-0'
                            }`}
                        >
                            <GlassButton onClick={downloadResume}>
                                <Download className="w-5 h-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-90" />
                                <span>Download Resume</span>
                            </GlassButton>
                        </div>

                        <div className="text-center mt-8 space-y-2">
                            <p className="text-sm font-medium text-gray-400">
                                PDF Format • Mobile Optimized • Secure Download
                            </p>
                            <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
                                <span>Last Updated: January 2025</span>
                                <span className="text-gray-600">|</span>
                                <span>File Size: ~150KB</span>
                                <span className="text-gray-600">|</span>
                                <span>Version 2.0</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <SplineMasking splineLoaded={splineLoaded} />

            {!splineLoaded && (
                <LoadingOverlay message="Preparing your resume experience" />
            )}
        </div>
    );
};

export default ResumeMain;
