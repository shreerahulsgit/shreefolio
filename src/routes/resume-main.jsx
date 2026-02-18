import { useState, useEffect, useRef } from 'react';
import { Download, Mountain, FileText, Zap, AlertTriangle, Flame, CheckCircle2 } from 'lucide-react';

// Starfield with Star Trails
const Starfield = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    twinkleDelay: Math.random() * 5,
  }));

  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 10 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div style={{ position: "absolute", inset: 0, background: "#000000" }} />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size}px rgba(255,255,255,${star.opacity * 0.5})`,
            animation: `twinkle ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}

      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            top: `${5 + Math.random() * 25}%`,
            left: '-5%',
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)',
            animation: `shootingStar 5s linear infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.6; } }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          5% { opacity: 1; }
          20% { opacity: 1; }
          25% { opacity: 0; }
          100% { transform: translateX(110vw) translateY(40vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Cosmic Cloud Overlay - Resume blocked by rocks and nebula
const CosmicCloudOverlay = ({ onUnlock }) => {
  const [isKeyHovered, setIsKeyHovered] = useState(false);
  const [btnPos, setBtnPos] = useState({ top: '80%', left: '50%' });

  useEffect(() => {
    // Randomize button position on mount
    setBtnPos({
      top: `${Math.random() * 60 + 20}%`, // Keep within 20-80% vertically
      left: `${Math.random() * 80 + 10}%`, // Keep within 10-90% horizontally
    });
  }, []);

  // Smoke particles for nebula effect
  const smokeParticles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 50 + Math.random() * 150,
    opacity: 0.3 + Math.random() * 0.5,
    duration: 12 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  // Cosmic dust particles - MORE
  const cosmicDust = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 3,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 15,
    startY: Math.random() * 100,
  }));

  // Energy Nerve tendrils - MORE and structured
  const energyNerves = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    // Generate curved paths
    d: `M ${Math.random() * 100}% ${Math.random() * 100}% Q ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}% T ${Math.random() * 100}% ${Math.random() * 100}%`,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 5,
    opacity: 0.1 + Math.random() * 0.3,
    width: 0.5 + Math.random() * 1.5,
  }));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes smokeDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.95); }
          75% { transform: translate(-30px, -15px) scale(1.05); }
        }
        @keyframes dustDrift {
          0% { transform: translateX(-10vw) translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateX(110vw) translateY(-30vh); opacity: 0; }
        }
        @keyframes subtleGlow {
          0%, 100% { opacity: 0.15; box-shadow: 0 0 10px rgba(255,255,255,0.05); }
          50% { opacity: 0.35; box-shadow: 0 0 20px rgba(255,255,255,0.1); }
        }
        @keyframes nerveFlow {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes introFade {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .intro-animate {
          animation: introFade 1s ease-out forwards;
        }
        @keyframes signalBeacon {
          0% { transform: scale(1); opacity: 0.8; border-color: rgba(139,92,246,0.8); }
          100% { transform: scale(4); opacity: 0; border-color: transparent; }
        }
      `}</style>

      <div className="absolute inset-0 bg-black intro-animate" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }}>
        {energyNerves.map((n) => (
          <path
            key={n.id}
            d={n.d}
            fill="none"
            stroke="rgba(139,92,246,0.4)"
            strokeWidth={n.width}
            strokeDasharray="10 30"
            style={{
              animation: `nerveFlow ${n.duration}s linear infinite`,
              animationDelay: `${n.delay}s`,
              filter: 'drop-shadow(0 0 2px rgba(139,92,246,0.3))',
            }}
          />
        ))}
      </svg>

      {smokeParticles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(30,30,30,${p.opacity}) 0%, rgba(15,15,15,${p.opacity * 0.5}) 40%, transparent 70%)`,
            filter: 'blur(20px)',
            animation: `smokeDrift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {cosmicDust.map((d) => (
        <div
          key={`dust-${d.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: '-5%',
            top: `${d.startY}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: '#A78BFA',
            boxShadow: `0 0 ${d.size * 2}px rgba(139,92,246,0.6), 0 0 ${d.size}px rgba(139,92,246,0.8)`,
            animation: `dustDrift ${d.duration}s linear infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}\n
      {/* Title Section */}
      <div className="absolute top-1/4 text-center z-10">
        <Mountain className="w-14 h-14 mx-auto mb-5 text-white/30" />
        <h2 className="text-2xl md:text-3xl font-bold text-white/80 mb-3">
          BLOCKED BY DEBRIS
        </h2>
        <div className="font-mono text-xs text-gray-500 px-4 py-2 rounded inline-block" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          [ LOCATE THE ENERGY SOURCE TO CLEAR PATH ]
        </div>
      </div>

      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          top: btnPos.top,
          left: btnPos.left,
          width: '48px',
          height: '48px',
          border: '2px solid rgba(139,92,246,0.5)',
          transform: 'translate(-50%, -50%)', // Centering adjustment if needed, but button uses top/left directly. 
          // Wait, button uses top/left directly without translate(-50%, -50%). 
          // Actually, let's wrap button and beacon in a container or just position beacon same as button.
          // The button has w-12 h-12 (48px). 
          // Let's position this div exactly like the button.
          animation: 'signalBeacon 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        }}
      />

      <button
        onClick={onUnlock}
        onMouseEnter={() => setIsKeyHovered(true)}
        onMouseLeave={() => setIsKeyHovered(false)}
        className="absolute z-50 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-500"
        style={{
          top: btnPos.top,
          left: btnPos.left,
          background: isKeyHovered ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isKeyHovered ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isKeyHovered ? '0 0 25px rgba(139,92,246,0.5)' : 'none',
          opacity: isKeyHovered ? 1 : 0.6,
          transform: isKeyHovered ? 'scale(1.2)' : 'scale(1)',
          animation: isKeyHovered ? 'none' : 'subtleGlow 3s ease-in-out infinite',
        }}
        aria-label="Unlock Beam"
      >
        <Zap 
          className="w-5 h-5 transition-all duration-300" 
          style={{ 
            color: isKeyHovered ? '#8B5CF6' : 'rgba(255,255,255,0.3)',
            opacity: isKeyHovered ? 1 : 0.5,
          }} 
        />
      </button>


      <div className="absolute bottom-6 font-mono text-xs text-gray-600 text-center w-full">
        <p>Click the button to unleash the energy beam</p>
      </div>
    </div>
  );
};

// Aggressive Beam Unlock Animation with Burst Effect
const BeamUnlockAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [burstScale, setBurstScale] = useState(0);
  const [ringScales, setRingScales] = useState([0, 0, 0]);
  const animationRef = useRef(null);
  const energyColor = "#8B5CF6";

  // Phase timing - SLOWER
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),    // Beam starts
      setTimeout(() => setPhase(2), 1200),   // Impact + ball forms (was 500)
      setTimeout(() => setPhase(3), 1800),   // Burst expansion starts (was 800)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Phase 3: Burst expansion animation (like home-page.jsx)
  useEffect(() => {
    if (phase !== 3) return;

    let scale = 60;
    const maxScale = Math.max(window.innerWidth, window.innerHeight) * 3;
    let rings = [0, 0, 0];
    let frame = 0;

    const animate = () => {
      frame++;
      
      // Main burst expansion - SLOWER for cinematic effect
      scale *= 1.03;
      setBurstScale(scale);

      // Trigger rings at intervals
      if (frame === 5) rings[0] = 1;
      if (frame === 12) rings[1] = 1;
      if (frame === 20) rings[2] = 1;

      // Expand rings
      rings = rings.map((r) => {
        if (r > 0) return r * 1.1;
        return 0;
      });
      setRingScales([...rings]);

      if (scale >= maxScale) {
        setPhase(4);
        setTimeout(() => onComplete(), 1500);
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ pointerEvents: phase >= 4 ? 'none' : 'auto' }}>
      <style>{`
        @keyframes aggressiveBeam {
          0% { transform: scaleY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes checkPop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes textSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(139,92,246,0.8)) drop-shadow(0 0 30px rgba(139,92,246,0.4)); }
          50% { filter: drop-shadow(0 0 25px rgba(139,92,246,1)) drop-shadow(0 0 50px rgba(139,92,246,0.6)); }
        }
      `}</style>

      {/* Dark overlay that fades */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-1000"
        style={{ opacity: phase >= 4 ? 0 : 1 }}
      />

      {/* SLIM but INTENSE Beam */}
      {phase >= 1 && phase < 4 && (
        <>
          {/* Main beam core - SLIM but intense glow */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full origin-top"
            style={{
              width: '4px',
              background: `linear-gradient(180deg, #fff 0%, ${energyColor} 5%, ${energyColor} 60%, transparent 100%)`,
              boxShadow: `0 0 20px ${energyColor}, 0 0 50px ${energyColor}, 0 0 80px ${energyColor}, 0 0 120px ${energyColor}60`,
              animation: 'aggressiveBeam 0.8s ease-out forwards',
            }}
          />
          {/* Intense glow layer */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full origin-top"
            style={{
              width: '60px',
              background: `linear-gradient(180deg, ${energyColor}80 0%, ${energyColor}50 50%, transparent 100%)`,
              filter: 'blur(15px)',
              animation: 'aggressiveBeam 0.8s ease-out forwards',
            }}
          />
        </>
      )}

      {/* Slim side beams */}
      {phase >= 1 && phase < 3 && (
        <>
          <div 
            className="absolute top-0 h-full origin-top"
            style={{
              left: 'calc(50% - 40px)',
              width: '2px',
              background: `linear-gradient(180deg, ${energyColor}80 0%, transparent 70%)`,
              boxShadow: `0 0 10px ${energyColor}, 0 0 20px ${energyColor}60`,
              animation: 'aggressiveBeam 1s ease-out forwards 0.1s',
              opacity: 0,
            }}
          />
          <div 
            className="absolute top-0 h-full origin-top"
            style={{
              left: 'calc(50% + 40px)',
              width: '2px',
              background: `linear-gradient(180deg, ${energyColor}80 0%, transparent 70%)`,
              boxShadow: `0 0 10px ${energyColor}, 0 0 20px ${energyColor}60`,
              animation: 'aggressiveBeam 1s ease-out forwards 0.1s',
              opacity: 0,
            }}
          />
        </>
      )}

      {/* Impact Ball - Phase 2 - at BOTTOM where beam ends */}
      {phase === 2 && (
        <div 
          className="absolute rounded-full"
          style={{
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70px',
            height: '70px',
            background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
            boxShadow: '0 0 80px #fff, 0 0 150px rgba(255,255,255,0.8), 0 0 220px rgba(255,255,255,0.6)',
          }}
        />
      )}

      {/* Burst Expansion - Phase 3 - WHITE, from BOTTOM */}
      {phase === 3 && (
        <>
          <div 
            className="absolute rounded-full"
            style={{
              bottom: `calc(10% - ${burstScale / 2}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${burstScale}px`,
              height: `${burstScale}px`,
              background: 'radial-gradient(circle, #ffffff 0%, #fafafa 30%, #f5f5f5 100%)',
              boxShadow: `0 0 ${Math.min(burstScale * 0.5, 250)}px #fff, 0 0 ${Math.min(burstScale, 500)}px rgba(255,255,255,0.8)`,
            }}
          />
          {ringScales.map((scale, i) => scale > 0 && (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                bottom: `calc(10% - ${scale * 50}px)`,
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${scale * 100}px`,
                height: `${scale * 100}px`,
                border: `${3 - i}px solid rgba(255,255,255,${Math.max(0, 1 - scale / 25)})`,
              }}
            />
          ))}
        </>
      )}

      {/* Path Cleared - Phase 4 */}
      {phase >= 4 && (
        <div className="absolute text-center">
          <div className="relative inline-block">
            <Flame 
              className="w-24 h-24 mx-auto" 
              style={{ 
                color: '#fff',
                filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.8)) drop-shadow(0 0 30px rgba(139,92,246,0.5))',
                animation: 'glowPulse 2s ease-in-out infinite',
              }} 
            />
            <CheckCircle2 
              className="w-10 h-10 absolute -bottom-1 -right-1" 
              style={{ 
                color: '#22C55E',
                filter: 'drop-shadow(0 0 10px #22C55E)',
                animation: 'checkPop 0.5s ease-out forwards',
              }} 
            />
          </div>
          <h2 
            className="text-3xl md:text-4xl font-bold tracking-wider mt-6"
            style={{ 
              color: '#fff',
              textShadow: `0 0 20px ${energyColor}60`,
              animation: 'textSlide 0.5s ease-out forwards 0.3s',
              opacity: 0,
            }}
          >
            PATH CLEARED
          </h2>
          <p 
            className="font-mono text-sm text-gray-400 mt-3"
            style={{ animation: 'textSlide 0.5s ease-out forwards 0.5s', opacity: 0 }}
          >
            Debris cleared • Resume revealed
          </p>
        </div>
      )}
    </div>
  );
};

// Classified Document Component - BLACK/WHITE borders
const ClassifiedDocument = ({ onDownload, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isVisible) return null;

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animation: 'fadeSlideUp 0.8s ease-out forwards' }}
    >
      <style>{`
        @keyframes scanLine { 0% { top: -5%; } 100% { top: 105%; } }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(255,255,255,0.15); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
          50% { border-color: rgba(255,255,255,0.3); box-shadow: 0 0 30px rgba(0,0,0,0.5), 0 0 2px rgba(255,255,255,0.1); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartbeat {
          0%, 100% { box-shadow: 0 0 15px rgba(139,92,246,0.1); }
          15% { box-shadow: 0 0 35px rgba(139,92,246,0.35), 0 0 60px rgba(139,92,246,0.15); }
          30% { box-shadow: 0 0 15px rgba(139,92,246,0.1); }
          45% { box-shadow: 0 0 25px rgba(139,92,246,0.25), 0 0 45px rgba(139,92,246,0.1); }
          60% { box-shadow: 0 0 15px rgba(139,92,246,0.1); }
        }
        .doc-border { animation: borderGlow 3s ease-in-out infinite; }
        .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
      `}</style>

      {/* Document Container - Heartbeat with violet glow */}
      <div 
        className="relative rounded-lg overflow-hidden transition-all duration-300 heartbeat"
        style={{
          background: 'linear-gradient(180deg, rgba(15,15,18,0.99) 0%, rgba(8,8,10,1) 100%)',
          border: isHovered ? '2px solid rgba(139,92,246,0.5)' : '2px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Header Bar - Clean, professional */}
        <div 
          className="flex items-center justify-between px-6 py-4 flex-wrap gap-4"
          style={{ 
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-white/60" />
            <span className="font-mono text-sm tracking-widest text-white/70">
              PERSONNEL DOCUMENT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/30 hidden md:inline">DOC-ID: SR-2025-001</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
              <span className="font-mono text-xs" style={{ color: '#22C55E' }}>VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Corner Brackets - WHITE */}
        <div className="absolute top-20 left-4 w-6 h-6 transition-all duration-300" style={{ borderLeft: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}`, borderTop: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}` }} />
        <div className="absolute top-20 right-4 w-6 h-6 transition-all duration-300" style={{ borderRight: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}`, borderTop: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}` }} />
        <div className="absolute bottom-20 left-4 w-6 h-6 transition-all duration-300" style={{ borderLeft: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}`, borderBottom: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}` }} />
        <div className="absolute bottom-20 right-4 w-6 h-6 transition-all duration-300" style={{ borderRight: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}`, borderBottom: `2px solid ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}` }} />

        {/* Scan Line - subtle white */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: isHovered ? 0.4 : 0.15 }}>
          <div className="absolute w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', animation: 'scanLine 3s linear infinite' }} />
        </div>

        {/* Resume Image */}
        <div className="p-6 pt-4">
          <div className="relative rounded overflow-hidden" style={{ boxShadow: isHovered ? '0 0 30px rgba(255,255,255,0.1)' : 'none', transition: 'box-shadow 0.3s' }}>
            <img 
              src="/resume.jpg" 
              alt="Shree Rahul S - Resume"
              className="w-full h-auto"
              onLoad={() => setIsLoaded(true)}
              style={{ filter: isLoaded ? 'none' : 'blur(10px)', transition: 'filter 0.5s' }}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
                <div className="font-mono text-sm text-white/50">LOADING DOCUMENT...</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Clean */}
        <div 
          className="flex items-center justify-between px-6 py-4 flex-wrap gap-4"
          style={{ background: 'linear-gradient(0deg, rgba(255,255,255,0.03) 0%, transparent 100%)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center gap-4 font-mono text-xs text-white/30 flex-wrap">
            <span>CLEARANCE: PUBLIC</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">LAST UPDATED: JAN 2025</span>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
              color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
            }}
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD</span>
          </button>
        </div>
      </div>

      {/* Subtle External Glow - white */}
      <div 
        className="absolute -inset-2 rounded-lg pointer-events-none transition-opacity duration-500 -z-10"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)', filter: 'blur(20px)', opacity: isHovered ? 1 : 0.3 }}
      />
    </div>
  );
};

const ResumeMain = () => {
  const [accessState, setAccessState] = useState('locked');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => setAccessState('unlocking');
  const handleUnlockComplete = () => setAccessState('unlocked');

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
      <Starfield />
      
      {accessState === 'locked' && <CosmicCloudOverlay onUnlock={handleUnlock} />}
      {accessState === 'unlocking' && <BeamUnlockAnimation onComplete={handleUnlockComplete} />}
      
      {accessState === 'unlocked' && (
        <div className="relative z-10 pt-24 pb-16 px-6">
          <div className="text-center mb-12">
            <div
              className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-mono text-sm transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
            >
              <FileText className="w-4 h-4" />
              <span>PERSONNEL FILE</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-200 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Resume
            </h1>
            
            <p 
              className={`text-lg text-gray-400 font-mono transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '400ms' }}
            >
              Shree Rahul S • Full Stack Developer
            </p>
          </div>

          <ClassifiedDocument onDownload={downloadResume} isVisible={accessState === 'unlocked'} />

          <div 
            className={`text-center mt-12 font-mono text-xs text-gray-600 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <p>[ SECURE DOCUMENT • CLICK DOWNLOAD FOR PDF VERSION ]</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMain;
