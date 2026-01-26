import { useState, useEffect, useRef, useCallback, memo } from "react";

// Film Grain Overlay
const FilmGrain = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      animation: "grain 0.5s steps(1) infinite",
    }}
  />
);

// Floating Fragment Component
const Fragment = ({ fragment, index, onHover, onLeave, onClick, isActive, mousePos }) => {
  const [position, setPosition] = useState({ x: fragment.x, y: fragment.y });
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const fragmentRef = useRef(null);

  // Parallax drift effect
  useEffect(() => {
    let rafId;
    const animate = () => {
      setDrift((prev) => ({
        x: Math.sin(Date.now() / (3000 + index * 500)) * 15,
        y: Math.cos(Date.now() / (4000 + index * 700)) * 10,
      }));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [index]);

  // Magnetic pull/push on hover
  useEffect(() => {
    if (mousePos && fragmentRef.current) {
      const rect = fragmentRef.current.getBoundingClientRect();
      const fragCenterX = rect.left + rect.width / 2;
      const fragCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mousePos.x - fragCenterX, 2) + Math.pow(mousePos.y - fragCenterY, 2)
      );

      if (distance < 200 && !isActive) {
        const angle = Math.atan2(fragCenterY - mousePos.y, fragCenterX - mousePos.x);
        const force = (200 - distance) / 200 * 20;
        setPosition({
          x: fragment.x + Math.cos(angle) * force,
          y: fragment.y + Math.sin(angle) * force,
        });
      } else {
        setPosition({ x: fragment.x, y: fragment.y });
      }
    }
  }, [mousePos, fragment.x, fragment.y, isActive]);

  return (
    <div
      ref={fragmentRef}
      className={`absolute cursor-pointer transition-all duration-1000 ease-out ${isActive ? "opacity-0 scale-0" : "opacity-100"}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) translate(${drift.x}px, ${drift.y}px)`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={() => onClick(fragment)}
    >
      <p
        className="text-lg md:text-xl lg:text-2xl font-light transition-all duration-700"
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          textShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
          fontStyle: "italic",
          letterSpacing: "0.02em",
        }}
      >
        {fragment.text}
      </p>

      {/* Micro-note on hover */}
      <div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 whitespace-nowrap"
        style={{
          opacity: fragment.isHovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${fragment.isHovered ? 0 : 10}px)`,
        }}
      >
        <span
          className="text-xs italic"
          style={{
            color: "rgba(255, 255, 255, 0.35)",
            fontFamily: "'Georgia', serif",
          }}
        >
          {fragment.microNote}
        </span>
      </div>
    </div>
  );
};

// Memoize Fragment component to prevent unnecessary re-renders
const MemoizedFragment = memo(Fragment);

// Memory View Component
const MemoryView = ({ memory, onClose }) => {
  const [stage, setStage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startXRef = useRef(0);
  const containerRef = useRef(null);

  // Sequential fade-in stages
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 1900),
      setTimeout(() => setStage(4), 2600),
      setTimeout(() => setStage(5), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX - dragX;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setDragX(e.clientX - startXRef.current);
    }
  };

  const handleMouseUp = () => {
    if (Math.abs(dragX) > 150) {
      onClose();
    } else {
      setDragX(0);
    }
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX - dragX;
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setDragX(e.touches[0].clientX - startXRef.current);
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 100) {
      onClose();
    } else {
      setDragX(0);
    }
    setIsDragging(false);
  };

  if (!memory) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{
        background: "rgba(0, 0, 0, 0.95)",
        transition: isDragging ? "none" : "transform 0.5s ease-out",
        transform: `translateX(${dragX}px)`,
        opacity: Math.abs(dragX) > 100 ? 1 - (Math.abs(dragX) - 100) / 100 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <FilmGrain />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-8 text-center">
        {/* Main sentence */}
        <p
          className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-16 transition-all duration-1000"
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          "{memory.mainThought}"
        </p>

        {/* Movie details */}
        <div
          className="mb-20 transition-all duration-1000"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-1">{memory.title}</p>
          <p className="text-xs text-gray-600">{memory.year} · {memory.director}</p>
        </div>

        {/* Floating reflections */}
        <div className="space-y-10">
          <div
            className="transition-all duration-1000"
            style={{
              opacity: stage >= 3 ? 1 : 0,
              transform: stage >= 3 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-base md:text-lg text-gray-400 italic">
              {memory.momentThatStayed}
            </p>
          </div>

          <div
            className="transition-all duration-1000"
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transform: stage >= 4 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-base md:text-lg text-gray-500 italic">
              {memory.questioned}
            </p>
          </div>

          <div
            className="transition-all duration-1000"
            style={{
              opacity: stage >= 5 ? 1 : 0,
              transform: stage >= 5 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-base md:text-lg text-gray-600 italic">
              {memory.feelingLeft}
            </p>
          </div>
        </div>

        {/* Drag hint */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{
            opacity: stage >= 5 ? 0.4 : 0,
          }}
        >
          <p className="text-xs text-gray-600 tracking-wide">drag sideways to release</p>
        </div>
      </div>
    </div>
  );
};

// Main Movies Page
export default function BeyondMusic() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [mousePos, setMousePos] = useState(null);
  const [showEnding, setShowEnding] = useState(false);
  const canvasRef = useRef(null);

  // Track mouse for magnetic effect
  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Show ending on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrolled + windowHeight > docHeight - 200) {
        setShowEnding(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Movie memories data
  const fragments = [
    {
      text: "that silence before everything collapsed",
      x: 15,
      y: 35,
      microNote: "this scene stayed.",
      mainThought: "this movie didn't explain itself. it trusted me.",
      title: "Arrival",
      year: "2016",
      director: "Denis Villeneuve",
      momentThatStayed: "the moment time bent backwards and everything made sense.",
      questioned: "can language really reshape how we perceive time?",
      feelingLeft: "a strange comfort in knowing endings are just beginnings seen differently.",
    },
    {
      text: "an ending that trusted the viewer",
      x: 70,
      y: 25,
      microNote: "still thinking about it.",
      mainThought: "some stories don't need closure. they need space.",
      title: "Lost in Translation",
      year: "2003",
      director: "Sofia Coppola",
      momentThatStayed: "that whisper we never get to hear.",
      questioned: "is connection always about understanding each other fully?",
      feelingLeft: "a longing for something I couldn't name.",
    },
    {
      text: "when the music said what words couldn't",
      x: 25,
      y: 60,
      microNote: "goosebumps every time.",
      mainThought: "the score carried emotions I didn't know I had.",
      title: "Interstellar",
      year: "2014",
      director: "Christopher Nolan",
      momentThatStayed: "docking scene. the organ. the silence of space.",
      questioned: "would I sacrifice decades for a chance to save everyone?",
      feelingLeft: "a terrifying awe at how small and significant we are.",
    },
    {
      text: "a conversation that felt like a memory",
      x: 75,
      y: 55,
      microNote: "felt too real.",
      mainThought: "walking and talking never felt this profound.",
      title: "Before Sunrise",
      year: "1995",
      director: "Richard Linklater",
      momentThatStayed: "the listening booth. two strangers avoiding eye contact.",
      questioned: "do we romanticize strangers because they can't disappoint us yet?",
      feelingLeft: "an ache for conversations that might never happen again.",
    },
    {
      text: "the weight of unspoken things",
      x: 50,
      y: 40,
      microNote: "heavy in the best way.",
      mainThought: "sometimes what's not said matters most.",
      title: "In the Mood for Love",
      year: "2000",
      director: "Wong Kar-wai",
      momentThatStayed: "the slow-motion walk past each other. saturated colors.",
      questioned: "is restraint a form of love or self-protection?",
      feelingLeft: "beautiful sadness. the kind you don't want to let go of.",
    },
    {
      text: "when the villain made too much sense",
      x: 20,
      y: 80,
      microNote: "uncomfortable truth.",
      mainThought: "the best antagonists hold up a mirror.",
      title: "The Dark Knight",
      year: "2008",
      director: "Christopher Nolan",
      momentThatStayed: "the ferries. the choice that defined humanity.",
      questioned: "are rules just agreements we break under pressure?",
      feelingLeft: "a quiet dread about how fragile order really is.",
    },
    {
      text: "laughter that turned into something else",
      x: 80,
      y: 75,
      microNote: "didn't see it coming.",
      mainThought: "comedy and tragedy are the same thing from different angles.",
      title: "Parasite",
      year: "2019",
      director: "Bong Joon-ho",
      momentThatStayed: "the rain. the stairs. the flood.",
      questioned: "can you blame anyone in a system designed to fail them?",
      feelingLeft: "guilt for laughing. guilt for not knowing what to feel.",
    },
    {
      text: "a world that felt more real than real",
      x: 45,
      y: 70,
      mainThought: "animation can hold more truth than live action.",
      title: "Spirited Away",
      year: "2001",
      director: "Hayao Miyazaki",
      momentThatStayed: "the train on water. silence. patience.",
      questioned: "do we lose magic because we stop looking for it?",
      feelingLeft: "nostalgia for a place I've never been.",
    },
  ];

  // Add hover state to fragments
  const fragmentsWithHover = fragments.map((f, i) => ({
    ...f,
    isHovered: hoveredIndex === i,
  }));

  return (
    <div
      ref={canvasRef}
      className="min-h-[200vh] relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Film Grain */}
      <FilmGrain />

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(ellipse at 70% 60%, rgba(255, 255, 255, 0.015) 0%, transparent 50%)",
        }}
      />

      {/* Intro text */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-center pt-20">
        <p className="text-sm text-gray-600 tracking-wide italic">
          movies don't end when the credits roll.
        </p>
      </div>

      {/* Floating Fragments Canvas */}
      <div className="fixed inset-0 z-10">
        {fragmentsWithHover.map((fragment, index) => (
          <MemoizedFragment
            key={index}
            fragment={fragment}
            index={index}
            onHover={setHoveredIndex}
            onLeave={() => setHoveredIndex(null)}
            onClick={setSelectedMemory}
            isActive={selectedMemory !== null}
            mousePos={mousePos}
          />
        ))}
      </div>

      {/* Memory View */}
      {selectedMemory && (
        <MemoryView
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}

      {/* Ending text */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pb-20 transition-all duration-1000"
        style={{
          opacity: showEnding ? 1 : 0,
          transform: showEnding ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <p className="text-sm text-gray-700 tracking-wide italic">
          more memories will surface.
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 0%); }
          60% { transform: translate(1%, 0%); }
          70% { transform: translate(0%, 1%); }
          80% { transform: translate(0%, -1%); }
          90% { transform: translate(1%, 1%); }
        }
      `}</style>
    </div>
  );
}