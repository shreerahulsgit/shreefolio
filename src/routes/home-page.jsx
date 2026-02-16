import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../lib/components/loading-overlay.jsx";
import SplineMasking from "../lib/components/spline-masking.jsx";
import Spline from "@splinetool/react-spline";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_CONTEXT } from "../lib/portfolio-context";

// Helper function to parse markdown in chat messages
const parseMarkdown = (text) => {
  if (!text) return text;
  
  const parts = [];
  let remaining = text;
  let keyIndex = 0;
  
  // Regex patterns for markdown
  const patterns = [
    { regex: /\*\*(.+?)\*\*/g, component: (match, content) => <strong key={keyIndex++} className="font-semibold">{content}</strong> },
    { regex: /\*(.+?)\*/g, component: (match, content) => <em key={keyIndex++}>{content}</em> },
    { regex: /`(.+?)`/g, component: (match, content) => <code key={keyIndex++} className="bg-black/10 px-1 py-0.5 rounded text-xs">{content}</code> },
  ];
  
  // Process bold first, then italic, then code
  let result = text;
  
  // Bold: **text**
  result = result.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`b-${i}`} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Check for italic within plain text: *text*
    if (typeof part === 'string' && part.includes('*')) {
      return part.split(/(\*[^*]+\*)/).map((subpart, j) => {
        if (subpart.startsWith('*') && subpart.endsWith('*') && !subpart.startsWith('**')) {
          return <em key={`i-${i}-${j}`}>{subpart.slice(1, -1)}</em>;
        }
        // Check for inline code: `text`
        if (typeof subpart === 'string' && subpart.includes('`')) {
          return subpart.split(/(`[^`]+`)/).map((codePart, k) => {
            if (codePart.startsWith('`') && codePart.endsWith('`')) {
              return <code key={`c-${i}-${j}-${k}`} className="bg-black/10 px-1 py-0.5 rounded text-xs">{codePart.slice(1, -1)}</code>;
            }
            return codePart;
          });
        }
        return subpart;
      });
    }
    // Check for inline code in plain text
    if (typeof part === 'string' && part.includes('`')) {
      return part.split(/(`[^`]+`)/).map((codePart, j) => {
        if (codePart.startsWith('`') && codePart.endsWith('`')) {
          return <code key={`c-${i}-${j}`} className="bg-black/10 px-1 py-0.5 rounded text-xs">{codePart.slice(1, -1)}</code>;
        }
        return codePart;
      });
    }
    return part;
  });
  
  return result;
};

// --- PROFESSIONAL AI CHATBOT COMPONENT ---
const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: "Hello! I'm Zio, Shree's AI assistant. I can tell you about his projects, skills, and experience. What would you like to know?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Rate limiting state
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const lastRequestTimeRef = useRef(0);
  const responseCacheRef = useRef(new Map());
  const RATE_LIMIT_MS = 4000; // 4 seconds between requests (15 req/min max)

  // Suggestions for new users
  const suggestions = [
    "What are your main skills?",
    "Tell me about your projects",
    "How can I contact shree?"
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setShowWelcome(true), 500);
  }, []);

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;
    
    // Rate limiting check
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimeRef.current;
    
    if (timeSinceLastRequest < RATE_LIMIT_MS && lastRequestTimeRef.current !== 0) {
      const waitTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastRequest) / 1000);
      setCooldownSeconds(waitTime);
      
      // Start countdown
      const countdown = setInterval(() => {
        setCooldownSeconds(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return; // Don't send, user needs to wait
    }
    
    // Normalize query for cache lookup
    const cacheKey = text.trim().toLowerCase();
    const cachedResponse = responseCacheRef.current.get(cacheKey);
    
    if (cachedResponse) {
      // Use cached response instead of API call
      setMessages(prev => [...prev, 
        { role: 'user', content: text },
        { role: 'ai', content: cachedResponse + " _(cached)_" }
      ]);
      setInputValue('');
      return;
    }

    // Add user message
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    lastRequestTimeRef.current = now; // Record request time

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY;
      
      if (!apiKey) {
        throw new Error("API_KEY_MISSING");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      
      const chatHistory = [
        {
          role: "user",
          parts: [{ text: PORTFOLIO_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to answer questions about Shree Rahul as his portfolio assistant." }],
        },
        ...messages.slice(1).map(msg => ({
          role: msg.role === 'ai' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        }))
      ];

      const chat = model.startChat({
        history: chatHistory,
      });

      const result = await chat.sendMessage(text);
      const response = await result.response;
      const textResponse = response.text();
      
      // Cache the response for future identical questions
      const cacheKey = text.trim().toLowerCase();
      responseCacheRef.current.set(cacheKey, textResponse);

      setMessages(prev => [...prev, { role: 'ai', content: textResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      let errorMessage = "I'm currently offline. Please try again later.";
      
      if (error.message?.includes("API_KEY_MISSING")) {
        errorMessage = "My brain isn't connected yet! Please add the VITE_GOOGLE_AI_KEY to your .env file.";
      } else if (error.message?.includes("429") || error.message?.includes("quota")) {
        errorMessage = "I'm thinking too fast! 🤯 Please give me a minute to cool down. (Rate limit exceeded)";
      } else if (error.message?.includes("404")) {
         errorMessage = "I couldn't find the model. Please check the model name in the code.";
      } else {
         errorMessage = `Connection Error: ${error.message || "Unknown error"}`;
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: errorMessage
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      className={`flex flex-col h-[500px] w-full max-w-xl transition-all duration-1000 ease-out ${
        showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        fontFamily: "'Jura', sans-serif",
      }}
    >
      {/* Header / Welcome Area */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-wide">
          Ask me anything regarding <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
            Shree Rahul
          </span>
        </h1>
        <p className="text-gray-600 text-sm font-medium tracking-wider uppercase">
          AI-POWERED PORTFOLIO ASSISTANT
        </p>
      </div>

      {/* Chat Area */}
      <div 
        className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 95%, transparent)'
        }}
      >
        <div className="h-4"></div> {/* Spacer for mask */}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div 
              className={`
                max-w-[85%] px-5 py-3 rounded-2xl text-sm font-light backdrop-blur-md
                ${msg.role === 'user' 
                  ? 'bg-gray-900 text-white rounded-tr-sm shadow-lg' 
                  : 'bg-white/40 border border-gray-900/10 text-gray-800 rounded-tl-sm shadow-sm'
                }
              `}
              style={{
                 boxShadow: msg.role === 'ai' ? '0 4px 15px rgba(0,0,0,0.05)' : '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              {parseMarkdown(msg.content)}
            </div>
          </div>
        ))}

        {isTyping && (
           <div className="flex w-full justify-start animate-slide-up">
             <div className="bg-white/40 border border-gray-900/10 px-4 py-3 rounded-2xl rounded-tl-sm backdrop-blur-md flex gap-1 items-center shadow-sm">
               <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
               <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
               <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips (Only show if few messages) */}
      {messages.length < 3 && !isTyping && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(s)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-900/10 bg-white/20 text-gray-700 text-xs font-medium hover:bg-gray-900 hover:text-white hover:border-transparent transition-all duration-300"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Cooldown Indicator */}
      {cooldownSeconds > 0 && (
        <div className="mb-2 text-center text-xs text-gray-500 animate-pulse">
          ⏳ Please wait {cooldownSeconds}s before sending again...
        </div>
      )}

      {/* Input Area */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur transition-opacity opacity-0 group-hover:opacity-50 duration-500"></div>
        <div className="relative flex items-center bg-white/60 border border-gray-900/10 rounded-full backdrop-blur-lg transition-all duration-300 focus-within:border-gray-900/30 focus-within:bg-white/80 focus-within:shadow-[0_0_30px_rgba(0,0,0,0.05)]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask something..."
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 text-sm px-6 py-4 focus:outline-none font-medium tracking-wide"
          />
          <button 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="mr-2 p-2 rounded-full hover:bg-gray-900 text-gray-400 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        /* Custom Scrollbar for chat */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const ChargeUpAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("counting"); // counting, complete, popup, burst, done
  const [ballScale, setBallScale] = useState(0);
  const [burstScale, setBurstScale] = useState(0);
  const [ringScales, setRingScales] = useState([0, 0, 0]);
  const animationRef = useRef(null);

  // Phase 1: Count from 0 to 100
  useEffect(() => {
    if (phase !== "counting") return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.round(rawProgress));

      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setPhase("complete");
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [phase]);

  // Phase 2: Hold at 100%, then move to popup
  useEffect(() => {
    if (phase !== "complete") return;
    
    const timer = setTimeout(() => {
      setPhase("popup");
    }, 600); // Hold for 600ms
    
    return () => clearTimeout(timer);
  }, [phase]);

  // Phase 3: Ball pops up in center
  useEffect(() => {
    if (phase !== "popup") return;

    let scale = 0;
    const targetScale = 60; // Ball size in pixels

    const animate = () => {
      // Elastic pop-up effect
      scale += (targetScale - scale) * 0.15;
      setBallScale(scale);

      if (scale >= targetScale - 1) {
        setBallScale(targetScale);
        setTimeout(() => setPhase("burst"), 300); // Hold ball briefly
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [phase]);

  // Phase 4: Ball bursts with expanding rings
  useEffect(() => {
    if (phase !== "burst") return;

    let scale = 60;
    const maxScale = Math.max(window.innerWidth, window.innerHeight) * 3;
    let rings = [0, 0, 0];
    let frame = 0;

    const animate = () => {
      frame++;
      
      // Main burst expansion - SLOWER for cinematic effect
      scale *= 1.04;
      setBurstScale(scale);

      // Trigger rings at intervals
      if (frame === 5) rings[0] = 1;
      if (frame === 15) rings[1] = 1;
      if (frame === 25) rings[2] = 1;

      // Expand rings
      rings = rings.map((r, i) => {
        if (r > 0) return r * 1.08;
        return 0;
      });
      setRingScales([...rings]);

      if (scale >= maxScale) {
        setPhase("done");
        onComplete();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Progress counter - bottom left */}
      {(phase === "counting" || phase === "complete") && (
        <div 
          className="absolute bottom-16 left-16 z-20"
          style={{
            opacity: phase === "complete" ? 0 : 1,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div className="flex items-baseline gap-1">
            <span 
              className="text-white text-9xl font-thin tracking-tighter"
              style={{ 
                fontFamily: "'Inter', system-ui, sans-serif", 
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {progress}
            </span>
            <span className="text-white/40 text-3xl font-thin">%</span>
          </div>
        </div>
      )}

      {/* 100% Complete indicator - center */}
      {phase === "complete" && (
        <div className="text-white text-2xl font-light tracking-[0.5em] uppercase animate-pulse">
          READY
        </div>
      )}

      {/* Ball popup */}
      {phase === "popup" && (
        <div 
          className="rounded-full"
          style={{
            width: `${ballScale}px`,
            height: `${ballScale}px`,
            background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 40%, #d0d0d0 100%)',
            boxShadow: `
              0 0 ${ballScale}px rgba(255, 255, 255, 0.9),
              0 0 ${ballScale * 2}px rgba(255, 255, 255, 0.5),
              0 0 ${ballScale * 3}px rgba(255, 255, 255, 0.3)
            `,
          }}
        />
      )}

      {/* Burst expansion */}
      {phase === "burst" && (
        <>
          {/* Main burst with dynamic glow */}
          <div 
            className="absolute rounded-full"
            style={{
              width: `${burstScale}px`,
              height: `${burstScale}px`,
              background: 'radial-gradient(circle, #ffffff 0%, #fafafa 30%, #f0f0f0 100%)',
              boxShadow: `
                0 0 ${Math.min(burstScale * 0.5, 200)}px rgba(255, 255, 255, 1),
                0 0 ${Math.min(burstScale, 400)}px rgba(255, 255, 255, 0.8),
                0 0 ${Math.min(burstScale * 1.5, 600)}px rgba(255, 255, 255, 0.5),
                0 0 ${Math.min(burstScale * 2, 800)}px rgba(255, 255, 255, 0.3)
              `,
            }}
          />
          
          {/* Expanding rings */}
          {ringScales.map((scale, i) => scale > 0 && (
            <div 
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${scale * 100}px`,
                height: `${scale * 100}px`,
                opacity: Math.max(0, 1 - scale / 20),
              }}
            />
          ))}
        </>
      )}

      {/* Minimal branding - bottom right */}
      {phase === "counting" && (
        <div className="absolute bottom-16 right-16 z-20">
          <span className="text-white/20 text-xs uppercase tracking-[0.4em] font-light">
            Loading Experience
          </span>
        </div>
      )}
    </div>
  );
};


// Mobile Home Page Component
const MobileHomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background: "#a0a0a0",
        fontFamily: "Poppins, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Left - Code by text */}
      <div
        className={`absolute top-6 left-5 z-20 transform transition-all duration-700 ${
          isLoaded ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      >
        <p className="text-white text-xs font-medium tracking-wide">
          @ Code by Shree Rahul
        </p>
      </div>

      {/* Top Right - Description text */}
      <div
        className={`absolute top-6 right-5 z-20 max-w-[180px] text-right transform transition-all duration-700 delay-100 ${
          isLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        }`}
      >
        <p className="text-white/80 text-[10px] leading-relaxed font-light">
          Passionate Creative Designer and Developer, dedicated to crafting
          innovative solutions and exceptional digital experiences through
          modern technologies
        </p>
      </div>

      {/* Center - Profile Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className={`relative transform transition-all duration-1000 delay-300 ${
            isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Profile Image Container */}
          <div
            className="relative w-[280px] h-[350px] overflow-hidden"
            style={{
              filter: "grayscale(100%)",
            }}
          >
            <img
              src="/img/your-photo.jpg"
              alt="Shree Rahul"
              className="w-full h-full object-cover object-top"
              style={{
                mixBlendMode: "luminosity",
              }}
            />
          </div>

          {/* Arrow Button */}
          <div
            className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-500 ${
              isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div
              onClick={() => navigate("/about")}
              className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center cursor-pointer hover:border-white/70 hover:scale-110 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg
                className="w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Large Marquee Text */}
      <div
        className={`absolute bottom-24 left-0 right-0 z-10 overflow-hidden transform transition-all duration-1000 delay-600 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="marquee-container-large">
          <div className="marquee-content-large">
            <span className="marquee-text-large">
              Yoo!!!! Welcome to Shree's digital realm... To know about shree
              hit the about section.
            </span>
            <span className="marquee-text-large">
              Yoo!!!! Welcome to Shree's digital realm... To know about shree
              hit the about section.
            </span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');
        
        @keyframes marquee-large {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee-container-large {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
        
        .marquee-content-large {
          display: inline-block;
          animation: marquee-large 25s linear infinite;
        }
        
        .marquee-text-large {
          color: #ffffff;
          font-size: 85px;
          font-weight: 600;
          letter-spacing: 3px;
          padding: 0 50px;
          font-family: 'Jura', sans-serif !important;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

// Desktop Home Page Component
const DesktopHomePage = () => {
  /* Replaced auto-typing logic with ChatInterface */


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
        fontFamily: "Aeonik Trial, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline
          scene="https://prod.spline.design/ZgCNkRB0aMxXyHjI/scene.splinecode"
          className="w-full h-full"
          style={{
            pointerEvents: "auto",
            width: "100vw",
            height: "100vh",
          }}
          onLoad={() => {
            setSplineLoaded(true);
          }}
        />
      </div>

      <div className="absolute top-0 left-0 h-full flex items-center z-10 w-full md:w-1/2 px-6 md:px-16 lg:px-24 pointer-events-auto">
        <ChatInterface />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/30 pointer-events-none"></div>



      <SplineMasking splineLoaded={splineLoaded} />

      {!splineLoaded && (
        <LoadingOverlay message="Preparing your portfolio experience" />
      )}
    </div>
  );
};

// Main HomePage Component - switches between Mobile and Desktop
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if animation was already shown this session
  const hasSeenAnimation = sessionStorage.getItem('hasSeenChargeUp') === 'true';
  const [showChargeUp, setShowChargeUp] = useState(!hasSeenAnimation);
  const [animationComplete, setAnimationComplete] = useState(hasSeenAnimation);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChargeUpComplete = () => {
    setShowChargeUp(false);
    setAnimationComplete(true);
    // Remember that animation was shown
    sessionStorage.setItem('hasSeenChargeUp', 'true');
  };

  return (
    <>
      {showChargeUp && <ChargeUpAnimation onComplete={handleChargeUpComplete} />}
      {animationComplete && (
        <div
          style={{
            opacity: 1,
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {isMobile ? <MobileHomePage /> : <DesktopHomePage />}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default HomePage;

