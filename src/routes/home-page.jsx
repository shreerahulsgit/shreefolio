import { useState, useEffect, useRef } from 'react';
import LoadingOverlay from '../lib/components/loading-overlay.jsx';
import SplineMasking from '../lib/components/spline-masking.jsx';
import Spline from '@splinetool/react-spline';

const HomePage = () => {
    const messages = [
        'Yo! I’m Shree Rahul :)',
        'Oh wait! this thing on the right stole my intro :(',
        'To actually know me, hit the about section.',
    ];
    const highlightWords = ['Shree Rahul :)', 'stole my intro :(', 'About'];
    const [displayedText, setDisplayedText] = useState('');
    const [msgIdx, setMsgIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingStarted, setTypingStarted] = useState(false);
    const typingTimeout = useRef(null);

    useEffect(() => {
        const startTimeout = setTimeout(() => setTypingStarted(true), 2000);
        return () => clearTimeout(startTimeout);
    }, []);

    useEffect(() => {
        if (!typingStarted) return;
        const currentMessage = messages[msgIdx];
        let typeSpeed = isDeleting ? (msgIdx === 0 ? 80 : 30) : 55;
        let holdTime = 2000;

        if (!isDeleting && displayedText.length < currentMessage.length) {
            typingTimeout.current = setTimeout(() => {
                setDisplayedText(
                    currentMessage.slice(0, displayedText.length + 1)
                );
            }, typeSpeed);
        } else if (
            !isDeleting &&
            displayedText.length === currentMessage.length
        ) {
            typingTimeout.current = setTimeout(
                () => setIsDeleting(true),
                holdTime
            );
        } else if (isDeleting && displayedText.length > 0) {
            typingTimeout.current = setTimeout(() => {
                setDisplayedText(
                    currentMessage.slice(0, displayedText.length - 1)
                );
            }, typeSpeed - 10);
        } else if (isDeleting && displayedText.length === 0) {
            typingTimeout.current = setTimeout(() => {
                setIsDeleting(false);
                setMsgIdx((prev) => (prev + 1) % messages.length);
            }, 600);
        }
        return () => clearTimeout(typingTimeout.current);
    }, [displayedText, isDeleting, msgIdx, typingStarted]);

    const [splineLoaded, setSplineLoaded] = useState(false);
    const [showOverlays, setShowOverlays] = useState(false);

    useEffect(() => {
        if (!splineLoaded) return;

        const timer = setTimeout(() => {
            setShowOverlays(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [splineLoaded]);

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden"
            style={{
                fontFamily:
                    'Aeonik Trial, system-ui, -apple-system, sans-serif',
            }}
        >
            <div className="absolute inset-0 w-full h-full z-0">
                <Spline
                    scene="https://prod.spline.design/ZgCNkRB0aMxXyHjI/scene.splinecode"
                    className="w-full h-full"
                    style={{
                        pointerEvents: 'auto',
                        width: '100vw',
                        height: '100vh',
                    }}
                    onLoad={() => {
                        setSplineLoaded(true);
                    }}
                />
            </div>

            <div className="absolute top-0 left-0 h-full flex items-center z-10 w-full md:w-1/2 px-6 md:px-16 lg:px-23">
                <h1
                    className="text-3xl md:text-5xl lg:text-6xl font-semibold transition-all duration-300 ease-in-out cursor-pointer w-full"
                    style={{
                        fontFamily: 'Poppins, Arial, sans-serif',
                        letterSpacing: '1px',
                        whiteSpace: 'pre-line',
                    }}
                >
                    {(() => {
                        let rendered = [];
                        let text = displayedText;
                        let idx = 0;
                        while (text.length > 0) {
                            let found = highlightWords.find((hw) =>
                                text.startsWith(hw)
                            );
                            if (found) {
                                rendered.push(
                                    <span
                                        key={'highlight-' + idx}
                                        className="highlight-word"
                                    >
                                        {found}
                                    </span>
                                );
                                text = text.slice(found.length);
                                idx++;
                                continue;
                            }
                            let nextPos = Math.min(
                                ...highlightWords.map((hw) => {
                                    let pos = text.indexOf(hw);
                                    return pos === -1 ? text.length : pos;
                                })
                            );
                            let chunk = text.slice(0, nextPos);
                            chunk.split(/(\s+)/).forEach((w, i) => {
                                if (w.trim()) {
                                    rendered.push(
                                        <span
                                            key={'filled-' + idx + '-' + i}
                                            className="filled-word"
                                        >
                                            {w}
                                        </span>
                                    );
                                } else if (w) {
                                    rendered.push(w);
                                }
                            });
                            text = text.slice(nextPos);
                            idx++;
                        }
                        return rendered;
                    })()}
                    <span className="inline-block w-2 h-8 md:h-10 bg-gray-800 align-bottom animate-blink ml-1"></span>
                </h1>
                <style>
                    {`
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                        .animate-blink {
                            animation: blink 1s steps(2, start) infinite;
                        }
                        .filled-word {
                            color: #1f2937;
                            font-family: 'Poppins', Arial, sans-serif !important;
                        }
                        .highlight-word {
                            color: transparent;
                            -webkit-text-stroke: 2px #1f2937;
                            font-family: 'Poppins', Arial, sans-serif !important;
                        }
                    `}
                </style>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/30 pointer-events-none"></div>

            {showOverlays && (
                <><div className="absolute inset-0 pointer-events-none z-5">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }} />
                    ))}
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none z-5">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `
                linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
                `,
                                backgroundSize: '50px 50px',
                            }} />
                </div></>
            )}

            <SplineMasking splineLoaded={splineLoaded} />

            {!splineLoaded && (
                <LoadingOverlay message="Preparing your portfolio experience" />
            )}
        </div>
    );
};

export default HomePage;
