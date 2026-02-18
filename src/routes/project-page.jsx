import { useState, useEffect, useRef } from "react";
import Footer from "../lib/components/footer-main.jsx";

const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    shipped: {
      text: "shipped",
      bg: "rgba(34, 197, 94, 0.15)",
      border: "rgba(34, 197, 94, 0.3)",
      color: "rgb(134, 239, 172)",
      glow: "rgba(34, 197, 94, 0.4)",
    },
    "in progress": {
      text: "in progress",
      bg: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.3)",
      color: "rgb(147, 197, 253)",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    paused: {
      text: "paused (thinking)",
      bg: "rgba(251, 191, 36, 0.15)",
      border: "rgba(251, 191, 36, 0.3)",
      color: "rgb(253, 224, 71)",
      glow: "rgba(251, 191, 36, 0.4)",
    },
  };

  const config = statusConfig[status] || statusConfig.shipped;

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-medium animate-pulse-once"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        boxShadow: status === "in progress" ? `0 0 12px ${config.glow}` : "none",
        animation: status === "in progress" ? "breathe 3s ease-in-out infinite" : "none",
      }}
    >
      {config.text}
    </span>
  );
};

const TechChip = ({ tech }) => (
  <span
    className="px-2 py-0.5 rounded-md text-xs"
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.6)",
    }}
  >
    {tech}
  </span>
);

const RealityBadge = ({ type }) => {
  const badges = {
    "harder than expected": "🔥",
    "worth it": "✨",
    "would rebuild again": "🔁",
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <span>{badges[type] || "💭"}</span>
      <span>{type}</span>
    </span>
  );
};

const Starfield = () => {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    twinkleDelay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
        }}
      />
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
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity})`,
            animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const HolographicOrbit = ({ projects, onOpenProject }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [rotation, setRotation] = useState(0);

  const energyColor = "#8B5CF6";

  useEffect(() => {
    if (activeProject !== null) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.09) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [activeProject]);

  const getProjectPosition = (index, total) => {
    const angle = ((index / total) * 360 + rotation) * (Math.PI / 180);
    const radius = 400;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.35,
      z: Math.sin(angle),
    };
  };

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: "680px" }}>
      <style>{`
        @keyframes scanLine { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes pulseCore { 
          0%, 5% { box-shadow: 0 0 40px rgba(139,92,246,0.2), inset 0 0 20px rgba(139,92,246,0.05); }
          10%, 20% { box-shadow: 0 0 100px rgba(139,92,246,0.7), inset 0 0 50px rgba(139,92,246,0.25); }
          30%, 100% { box-shadow: 0 0 40px rgba(139,92,246,0.2), inset 0 0 20px rgba(139,92,246,0.05); }
        }
        @keyframes orbitGlow { 
          0%, 8% { opacity: 0.2; }
          12%, 22% { opacity: 0.6; }
          32%, 100% { opacity: 0.2; }
        }
        @keyframes energyPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes cardEnergy {
          0%, 28% { 
            border-color: rgba(255,255,255,0.15);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          35%, 50% { 
            border-color: rgba(139,92,246,0.8);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 35px rgba(139,92,246,0.5);
          }
          60%, 100% { 
            border-color: rgba(255,255,255,0.15);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
        }
        .card-energy {
          border: 1px solid rgba(255,255,255,0.15);
          animation: cardEnergy 3s ease-in-out infinite;
        }
      `}</style>

      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: "820px", height: "290px", border: `1px solid rgba(139,92,246,0.25)`, animation: "orbitGlow 4s ease-in-out infinite" }}
      />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: "860px", height: "300px", border: "1px dashed rgba(255,255,255,0.08)" }}
      />

      <div 
        className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center justify-center"
        style={{
          width: "160px", height: "160px",
          background: "radial-gradient(circle, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 70%, transparent 100%)",
          borderRadius: "50%", 
          border: "2px solid rgba(139,92,246,0.4)",
          transform: "translate(-50%, -50%)", 
          animation: "pulseCore 3s ease-in-out infinite",
        }}
      >
        <span className="text-white text-sm font-mono tracking-widest mb-1" style={{ textShadow: `0 0 20px ${energyColor}` }}>PROJECTS</span>
        <span className="text-white/40 text-[11px] font-mono">{projects.length} ACTIVE</span>
      </div>

      {projects.map((project, index) => {
        const pos = getProjectPosition(index, projects.length);
        const isActive = activeProject === index;
        const depth = (pos.z + 1) / 2;
        const scale = 0.85 + depth * 0.2;

        return (
          <div
            key={project.id}
            className="absolute left-1/2 top-1/2 cursor-pointer transition-all"
            style={{
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${isActive ? 1.1 : scale})`,
              zIndex: isActive ? 100 : Math.round(depth * 10),
              opacity: isActive ? 1 : 0.5 + depth * 0.5,
              transitionDuration: isActive ? "300ms" : "80ms",
            }}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => onOpenProject(project)}
          >
            <div
              className="relative overflow-hidden card-energy"
              style={{
                width: "220px", 
                padding: "20px",
                background: isActive 
                  ? "linear-gradient(180deg, rgba(30,30,30,0.98) 0%, rgba(15,15,15,0.99) 100%)"
                  : "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)",
                borderRadius: "12px",
                ...(isActive && {
                  border: `1px solid ${energyColor}`,
                  boxShadow: `0 0 50px ${energyColor}60, 0 20px 40px rgba(0,0,0,0.6)`,
                }),
              }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" style={{ opacity: isActive ? 0.5 : 0.15 }}>
                <div 
                  className="absolute w-full h-px"
                  style={{ 
                    background: `linear-gradient(90deg, transparent, ${energyColor}60, transparent)`,
                    animation: "scanLine 2.5s linear infinite" 
                  }} 
                />
              </div>

              <div className="absolute top-2 left-2 w-3 h-px transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute top-2 left-2 w-px h-3 transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute top-2 right-2 w-3 h-px transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute top-2 right-2 w-px h-3 transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute bottom-2 left-2 w-3 h-px transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute bottom-2 left-2 w-px h-3 transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute bottom-2 right-2 w-3 h-px transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />
              <div className="absolute bottom-2 right-2 w-px h-3 transition-all" style={{ background: isActive ? energyColor : 'rgba(255,255,255,0.3)' }} />

              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-2 h-2 rounded-full transition-all" 
                  style={{ 
                    background: isActive ? energyColor : 'rgba(255,255,255,0.5)', 
                    boxShadow: isActive ? `0 0 10px ${energyColor}` : 'none',
                    animation: isActive ? "energyPulse 2s ease-in-out infinite" : "none",
                  }} 
                />
                <span className="text-[9px] font-mono tracking-wider transition-all" style={{ color: isActive ? energyColor : 'rgba(255,255,255,0.5)' }}>
                  {project.status.toUpperCase()}
                </span>
              </div>

              <span className="text-[9px] text-white/30 font-mono block mb-1">{project.id.toUpperCase()}</span>

              <h3 
                className="text-sm font-bold text-white leading-tight mb-2 transition-all" 
                style={{ textShadow: isActive ? `0 0 15px ${energyColor}60` : "none" }}
              >
                {project.name}
              </h3>

              <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2 mb-3">{project.hypothesis}</p>

              <div className="flex flex-wrap gap-1 mb-5">
                {project.techPreview.slice(0, 3).map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-1.5 py-0.5 text-[8px] rounded transition-all" 
                    style={{ 
                      background: isActive ? `${energyColor}20` : "rgba(255,255,255,0.05)", 
                      border: `1px solid ${isActive ? energyColor + '50' : 'rgba(255,255,255,0.15)'}`, 
                      color: isActive ? energyColor : "rgba(255,255,255,0.5)" 
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {isActive && (
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-[8px] font-mono" style={{ color: energyColor }}>[ CLICK TO ACCESS ]</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ExperimentCard = ({ project, index, isVisible, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{
        background: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 25px 60px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
          : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      <div
        className="absolute -inset-1 rounded-2xl blur-xl transition-all duration-500 pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          opacity: isHovered ? 0.5 : 0,
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs text-gray-500 font-mono tracking-wide">
            {project.id}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">{project.name}</h3>

        <div className="mb-4 min-h-[48px]">
          <p
            className="text-sm text-gray-400 leading-relaxed transition-all duration-500"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
              position: isHovered ? "absolute" : "relative",
            }}
          >
            <span className="text-gray-500 text-xs">hypothesis:</span> {project.hypothesis}
          </p>
          <p
            className="text-sm text-gray-300 leading-relaxed transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <span className="text-gray-500 text-xs">result:</span> {project.result}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techPreview.map((tech, idx) => (
            <TechChip key={idx} tech={tech} />
          ))}
        </div>

        <div
          className="text-center transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <span className="text-xs text-gray-500 italic">click to open the dossier</span>
        </div>
      </div>
    </div>
  );
};

const DossierModal = ({ project, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          opacity: isAnimating ? 1 : 0,
        }}
      />

      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl transition-all duration-500"
        style={{
          background: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.6)",
          opacity: isAnimating ? 1 : 0,
          transform: isAnimating ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none rounded-t-3xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full transition-all duration-300 hover:bg-white/10 z-10"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          <div className="mb-8">
            <span className="text-xs text-gray-500 font-mono tracking-wide">{project.id}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">{project.name}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              {project.role && (
                <span className="text-xs text-gray-500">{project.role}</span>
              )}
              {project.timeSpent && (
                <span className="text-xs text-gray-500">• {project.timeSpent}</span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>✯</span> The Problem
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>✯</span> The Idea
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.idea}</p>
            </div>

            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>✯</span> The Mess
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.mess}</p>
            </div>

            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>✯</span> The Fix
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.fix}</p>
            </div>

            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>✯</span> The Outcome
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs text-gray-500">Tech Stack:</span>
              {project.techStack.map((tech, idx) => (
                <TechChip key={idx} tech={tech} />
              ))}
            </div>

            {project.realityCheck && (
              <div className="flex flex-wrap gap-2">
                {project.realityCheck.map((check, idx) => (
                  <RealityBadge key={idx} type={check} />
                ))}
              </div>
            )}
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-6 flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                  }}
                >
                  View Live →
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  View Code →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 16px rgba(59, 130, 246, 0.5); }
        }
      `}</style>
    </div>
  );
};

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [projectsRef, projectsVisible] = useScrollAnimation(0.1);

  const projects = [
    {
      id: "experiment_01",
      name: "Portfolio Website",
      status: "shipped",
      hypothesis: "a portfolio should feel alive, not like a resume PDF.",
      result: "built something I'm actually proud to share.",
      techPreview: ["React", "Spline", "Tailwind"],
      techStack: ["React", "Spline 3D", "Tailwind CSS", "Framer Motion"],
      role: "solo",
      timeSpent: "~3 weeks",
      problem: "traditional portfolios feel static and forgettable.",
      idea: "create an immersive, interactive experience with 3D elements and micro-animations.",
      mess: "spline performance issues, animation timing nightmares, glassmorphism inconsistencies.",
      fix: "lazy loading for 3D, refined animation curves, created a consistent design system.",
      outcome: "a portfolio that actually represents my design sensibilities. still iterating.",
      realityCheck: ["harder than expected", "worth it"],
      liveUrl: "#",
      repoUrl: "https://github.com",
    },
    {
      id: "experiment_02",
      name: "AI Study Assistant",
      status: "in progress",
      hypothesis: "AI can make studying less painful and more personalized.",
      result: "early signs of promise. needs more data.",
      techPreview: ["Python", "OpenAI", "React"],
      techStack: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
      role: "solo",
      timeSpent: "~2 weeks (ongoing)",
      problem: "generic study tools don't adapt to how individuals learn.",
      idea: "build an AI tutor that learns your weak spots and adjusts accordingly.",
      mess: "prompt engineering is an art. token limits. response consistency.",
      fix: "fine-tuned prompts, added conversation memory, built feedback loops.",
      outcome: "working prototype. needs user testing and refinement.",
      realityCheck: ["harder than expected", "would rebuild again"],
    },
    {
      id: "experiment_03",
      name: "Expense Tracker",
      status: "shipped",
      hypothesis: "tracking money shouldn't require a finance degree.",
      result: "simple beats complex. people actually use it.",
      techPreview: ["React", "Node.js", "MongoDB"],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      role: "solo",
      timeSpent: "~2 weeks",
      problem: "most expense apps are bloated with features nobody asked for.",
      idea: "build the simplest possible tracker that still provides insights.",
      mess: "date handling across timezones. chart rendering performance.",
      fix: "moment.js for dates, virtualized lists, lazy chart loading.",
      outcome: "clean, fast, and actually useful. friends use it daily.",
      realityCheck: ["worth it"],
      repoUrl: "https://github.com",
    },
    {
      id: "experiment_04",
      name: "Real-time Chat App",
      status: "shipped",
      hypothesis: "websockets are overkill for simple chat apps.",
      result: "they're not. real-time is real-time.",
      techPreview: ["Socket.io", "React", "Node.js"],
      techStack: ["React", "Node.js", "Socket.io", "Redis", "MongoDB"],
      role: "solo",
      timeSpent: "~2 weeks",
      problem: "wanted to understand real-time communication at a deep level.",
      idea: "build a chat app from scratch without any abstractions.",
      mess: "connection state management. handling disconnects gracefully.",
      fix: "heartbeat mechanism, reconnection logic, optimistic UI updates.",
      outcome: "solid understanding of websockets. app works smoothly.",
      realityCheck: ["harder than expected", "worth it", "would rebuild again"],
      repoUrl: "https://github.com",
    },
    {
      id: "experiment_05",
      name: "Weather Dashboard",
      status: "paused",
      hypothesis: "weather apps can be beautiful AND useful.",
      result: "design is done. API integration pending.",
      techPreview: ["React", "D3.js", "APIs"],
      techStack: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
      role: "solo",
      timeSpent: "~1 week",
      problem: "most weather apps prioritize data over experience.",
      idea: "visualize weather in a way that feels intuitive and beautiful.",
      mess: "API rate limits. D3 learning curve. responsive chart scaling.",
      fix: "caching strategy, simplified visualizations, mobile-first approach.",
      outcome: "paused to focus on other priorities. will revisit.",
      realityCheck: ["harder than expected"],
    },
    {
      id: "experiment_06",
      name: "URL Shortener",
      status: "shipped",
      hypothesis: "a weekend project to learn about systems design.",
      result: "learned about databases, caching, and analytics.",
      techPreview: ["Node.js", "Redis", "MongoDB"],
      techStack: ["Node.js", "Express", "Redis", "MongoDB", "Analytics"],
      role: "solo",
      timeSpent: "~3 days",
      problem: "wanted a practical project to understand URL shortening at scale.",
      idea: "build a shortener with analytics and custom slugs.",
      mess: "collision handling for short codes. analytics without slowing down redirects.",
      fix: "base62 encoding, async analytics logging, redis for hot paths.",
      outcome: "simple but taught me a lot about system design trade-offs.",
      realityCheck: ["worth it"],
      repoUrl: "https://github.com",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Starfield />

      <div className="relative z-10">
        <section
          ref={heroRef}
          className="flex items-center justify-center px-6 md:px-12 lg:px-24 pt-16 pb-0"
        >
          <div className="text-center max-w-4xl">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-purple-200 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "200ms" }}
            >
              Experiments Lab
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-400 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              mission control for ideas that demanded to be built
            </p>

            <p
              className={`text-sm text-gray-600 mt-4 transform transition-all duration-1000 font-mono ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "600ms" }}
            >
              [ orbiting • hover to scan • click to access ]
            </p>
          </div>
        </section>

        <section ref={projectsRef} className="relative">
          <HolographicOrbit 
            projects={projects} 
            onOpenProject={(project) => setSelectedProject(project)}
          />
        </section>

        <Footer />
      </div>

      {selectedProject && (
        <DossierModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}
