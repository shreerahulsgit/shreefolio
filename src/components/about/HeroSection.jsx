import React, { useMemo, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { InteractiveImage } from "../../components/3d/InteractiveImage";
import { FloatingShapes } from "../../components/3d/FloatingShapes";

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Typewriter effect messages
    const messages = useMemo(() => [
        "I'm Shree Rahul —\nyeah… guy on the right.\nthe one pretending he knows what he's doing (he kinda does).",
        "I build stuffs.\nThe web stuffs.\nsometimes cool. sometimes not.but always fun.",
        "developer? yh, probably.\ncoffee + creativity? definitely.\nsleep schedule? absolutely elusive.",
        "Scroll around.\nThe fun parts are ahead ↓",
    ], []);

    const [displayedText, setDisplayedText] = useState("");
    const [msgIdx, setMsgIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingStarted, setTypingStarted] = useState(false);
    const typingTimeout = useRef(null);

    // Fade in effect
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // 3 second delay before typing starts
    useEffect(() => {
        const startTimeout = setTimeout(() => setTypingStarted(true), 3000);
        return () => clearTimeout(startTimeout);
    }, []);

    useEffect(() => {
        if (!typingStarted) return;

        const currentMessage = messages[msgIdx];
        let typeSpeed = isDeleting ? 40 : 70; // Slower typing
        let holdTime = 3500; // Longer pause before deleting

        if (!isDeleting && displayedText.length < currentMessage.length) {
            typingTimeout.current = setTimeout(() => {
                setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
            }, typeSpeed);
        } else if (!isDeleting && displayedText.length === currentMessage.length) {
            typingTimeout.current = setTimeout(() => setIsDeleting(true), holdTime);
        } else if (isDeleting && displayedText.length > 0) {
            typingTimeout.current = setTimeout(() => {
                setDisplayedText(currentMessage.slice(0, displayedText.length - 1));
            }, typeSpeed - 15);
        } else if (isDeleting && displayedText.length === 0) {
            typingTimeout.current = setTimeout(() => {
                setIsDeleting(false);
                setMsgIdx((prev) => (prev + 1) % messages.length);
            }, 500);
        }
        return () => clearTimeout(typingTimeout.current);
    }, [displayedText, isDeleting, msgIdx, typingStarted, messages]);

    return (
        <section className="h-screen w-full relative flex flex-col lg:flex-row items-center justify-center overflow-hidden">
            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    
                    <FloatingShapes />
                    
                    {/* Interactive Profile Image only on desktop probably, or adjust position */}
                    <group position={[0, -0.5, 0]}>
                         <InteractiveImage url="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58" />
                    </group>

                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Overlay UI Content */}
            <div
                className={`relative z-10 w-full max-w-7xl px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ pointerEvents: 'none' }} // Let clicks pass through to canvas primarily, but we need text to be selectable?
            >
                {/* Text Content - Make it clickable */}
                <div className="space-y-6 pointer-events-auto">
                    <div
                        className="inline-block mb-4 px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden"
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                            color: "#E5E7EB",
                        }}
                    >
                        <div
                            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                            style={{
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                            }}
                        />
                        <span className="relative z-10">Hyy, Homieee!!! <br />shh, the sentence below is doing a thing ↓</span>
                    </div>

                    {/* Typewriter Text */}
                    <div className="min-h-[280px] md:min-h-[320px] lg:min-h-[350px]">
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed"
                            style={{
                                fontFamily: "'Jura', sans-serif",
                                letterSpacing: "0.5px",
                                whiteSpace: "pre-line",
                                textShadow: "0 0 20px rgba(0,0,0,0.5)" // Readability against 3D
                            }}
                        >
                            {displayedText}
                            <span
                                className="inline-block w-[3px] h-[1em] bg-white align-middle ml-1"
                                style={{
                                    animation: "blink 1s steps(2, start) infinite",
                                }}
                            />
                        </h1>
                    </div>

                    <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>
                </div>
                
                {/* 
                  The Right Side (Image Area) is now handled by the 3D Canvas in the background.
                  We leave this empty or use it for spacing.
                */}
                <div className="hidden lg:block"></div>
            </div>
        </section>
    );
};

export default HeroSection;
