import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  SiJavascript,
  SiMysql,
  SiReact,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiAmazonwebservices,
  SiGithub,
} from "react-icons/si";
import { FaGithub, FaLinkedin, FaCode, FaRocket, FaEnvelope } from "react-icons/fa";
import TiltedCard from "../lib/components/tilted-card.jsx";
import Footer from "../lib/components/footer.jsx";
import Galaxy from "../components/about/Galaxy.jsx";

// Starfield Background Component (same as contact page)
const Starfield = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  }));

  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 8 + Math.random() * 5,
    duration: 1.5 + Math.random(),
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes shootingStar {
          0% { transform: translateX(-100px) translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px)); opacity: 0; }
        }
        @keyframes nebulaDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
      `}</style>
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            left: '-100px',
            top: `${20 + star.id * 25}%`,
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), #fff)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(139,92,246,0.5)',
            animation: `shootingStar ${star.duration}s linear infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Nebula Clouds */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 30}%`,
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            background: `radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animation: `nebulaDrift ${15 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Glass Button Component with Apple-style shine effect
const GLASS_BUTTON_SIZE_CLASSES = {
  default: "px-8 py-4",
  large: "px-10 py-5",
};

const GlassButton = ({
  onClick,
  children,
  className = "",
  size = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 ${GLASS_BUTTON_SIZE_CLASSES[size]} ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isHovered ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(139, 92, 246, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Top shine gradient */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)",
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.8s ease-in-out, opacity 0.3s",
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-3 text-white font-semibold text-lg">
        {children}
      </span>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.1)",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </button>
  );
};

// Glass Card Component with shine effect
const GlassCard = ({
  children,
  className = "",
  isHovered = false,
  style = {},
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${className}`}
      style={{
        background: "rgba(20, 20, 20, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
          : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        ...style,
      }}
    >
      {/* Top shine */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent)",
        }}
      />
      {children}
    </div>
  );
};

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

const HeroSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  
  // Typewriter effect messages
  const messages = useMemo(() => [
    "I'm Shree Rahul —\nyeah… guy on the left.\nthe one pretending he knows what he's doing (he kinda does).",
    "I build stuffs.\nThe web stuffs.\nsometimes cool. sometimes not.but always fun.",
    "developer? yh, probably.\ncoffee + creativity? definitely.\nsleep schedule? absolutely elusive.",
    "Scroll around.\nThe fun parts are ahead ↓",
  ], []);
  
  const [displayedText, setDisplayedText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const typingTimeout = useRef(null);

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
  }, [displayedText, isDeleting, msgIdx, typingStarted]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-start justify-center px-6 md:px-12 lg:px-24 pt-40 md:pt-48 relative z-10"
    >
      <div
        className={`w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="space-y-6">
          <div
            className="inline-block mb-4 px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              color: "#E5E7EB",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            />
            <span className="relative z-10">Hyy, Homieee!!! 
              <br />shh, the sentence below is doing a thing ↓</span>
          </div>
          
          {/* Typewriter Text */}
          <div className="min-h-[280px] md:min-h-[320px] lg:min-h-[350px]">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed"
              style={{
                fontFamily: "'Jura', sans-serif",
                letterSpacing: "0.5px",
                whiteSpace: "pre-line",
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
        <div className="flex justify-center lg:justify-end">
          <TiltedCard
            imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
            altText="Shree Rahul S - Album Cover"
            captionText="Shree Rahul S"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="350px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={<p className="tilted-card-demo-text"></p>}
          />
        </div>
      </div>
    </section>
  );
};


const SkillCard = ({ skill, delay, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <div
      className={`relative overflow-hidden p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? `0 20px 60px ${skill.color}30, 0 0 40px ${skill.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
          : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered
          ? "translateY(-8px) scale(1.05)"
          : "translateY(0) scale(1)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top shine line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${isHovered ? skill.color : "rgba(255, 255, 255, 0.3)"}, transparent)`,
          transition: "all 0.5s",
        }}
      />
      {/* Glass shine gradient */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
          borderRadius: "16px 16px 0 0",
        }}
      />
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${skill.color}30 50%, transparent 60%)`,
          transform: isHovered ? "translateX(200%)" : "translateX(-200%)",
          transition: "transform 0.8s ease-in-out",
        }}
      />
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color}15, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div
        className="text-5xl transition-all duration-500 relative z-10"
        style={{
          color: skill.color,
          filter: isHovered
            ? `drop-shadow(0 8px 16px ${skill.color}60) brightness(1.2)`
            : `drop-shadow(0 2px 4px ${skill.color}30)`,
          transform: isHovered ? "scale(1.2)" : "scale(1)",
        }}
      >
        <Icon />
      </div>
      <span
        className="text-sm md:text-base font-medium transition-colors duration-300 relative z-10"
        style={{ color: isHovered ? skill.color : "#D1D5DB" }}
      >
        {skill.name}
      </span>
    </div>
  );
};

const ExperienceSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const experiences = [
    {
      role: "Web Development Intern",
      organization: "CIT Chennai",
      duration: "Nov 2025 - Dec 2025",
      description: "Built a full-on college web app with a squad of 4 (group project but make it real). Handled features like attendance, seating arrangements, lab occupancy, and timetable generation — basically turned college chaos into one sol.",
      techStack: ["React", "JavaScript", "Python: Fast API", "MySQL", "Git"],
      xp: {
        learning: 8,
        stress: 10,
        satisfaction: 8,
      },
    },
    {
      role: "Research Intern",
      organization: "CIT Chennai",
      duration: "Apr 2025 – May 2025",
      description: "Entered my big-brain era.Reviewed energy-efficient cloud computing methods — VM migration, energy-aware scheduling, forecasting models, and renewable energy integration (saving clouds AND the planet fr ).Explored a Kubernetes-based Multi-Objective Reinforcement Learning framework to optimize cost and SLA across AWS, Azure, and GCP.Yes, it was complex. Yes, I survived.",
      techStack: ["React", "Express.js", "MySQL", "Firebase"],
      xp: {
        learning: 6,
        stress: 8,
        satisfaction: 7,
      },
    },
       {
  role: "UI/UX & Frontend Intern",
  organization: "Altruisty",
  duration: "Nov 2024 – Jan 2025",
  description: "Completed a 2-month internship with a strong focus on UI/UX design within frontend development. Crafted clean, user-friendly interfaces while understanding how frontend decisions connect with backend logic (designing responsibly fr).",
  techStack: ["Figma", "HTML", "CSS", "JavaScript"],
  xp: {
    learning: 9,
    stress: 5,
    satisfaction: 9,
  },
},
    {
      role: "Web Development Intern",
      organization: "Smart Qart",
      duration: "Nov 2024 – Dec 2024",
      description: "Got hands-on with the real e-commerce dev grind.Worked closely with actual devs (yes, professionals ) and learned how production code doesn’t forgive mistakes.",
      techStack: ["React", "Node.js", "MongoDB", "AWS"],
      xp: {
        learning: 9,
        stress: 6,
        satisfaction: 8,
      },
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderXPMeter = (value, maxValue = 10) => {
    const filled = Math.round((value / maxValue) * 9);
    const empty = 9 - filled;
    return "█".repeat(filled) + "░".repeat(empty);
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 relative z-10"
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
              Where I Gained XP
            </h2>
            <span
              className="px-4 py-1 rounded-full text-sm font-medium text-white relative overflow-hidden"
              style={{
                background: "rgba(139, 92, 246, 0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                boxShadow:
                  "0 4px 24px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(139, 92, 246, 0.2)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              <span className="relative z-10">Quest Log</span>
            </span>
          </div>
          <p className="text-lg md:text-xl" style={{ color: '#A78BFA' }}>
            side quests that shaped the main character...
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg, rgba(167, 139, 250, 0.5), rgba(167, 139, 250, 0.1))",
            }}
          />

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative pl-16 md:pl-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-4 md:left-6 w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-150"
                  style={{
                    background: expandedIndex === index
                      ? "linear-gradient(135deg, #A78BFA, #60A5FA)"
                      : "rgba(167, 139, 250, 0.6)",
                    boxShadow: expandedIndex === index
                      ? "0 0 20px rgba(167, 139, 250, 0.8)"
                      : "0 0 10px rgba(167, 139, 250, 0.3)",
                    top: "24px",
                  }}
                  onClick={() => toggleExpand(index)}
                />

                {/* Card */}
                <div
                  className="relative rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden group"
                  style={{
                    background: "rgba(20, 20, 20, 0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: expandedIndex === index
                      ? "0 20px 60px rgba(167, 139, 250, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                    transform: expandedIndex === index ? "translateY(-4px)" : "translateY(0)",
                  }}
                  onClick={() => toggleExpand(index)}
                >
                  {/* Top shine line */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    }}
                  />

                  {/* Collapsed View */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-gray-400">{exp.organization}</p>
                      </div>
                      <span
                        className="text-sm px-3 py-1 rounded-full self-start md:self-auto"
                        style={{
                          background: "rgba(167, 139, 250, 0.2)",
                          color: "#A78BFA",
                          border: "1px solid rgba(167, 139, 250, 0.3)",
                        }}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    {/* Expand indicator */}
                    <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
                      <span>{expandedIndex === index ? "tap to collapse" : "tap to expand"}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded View */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: expandedIndex === index ? "400px" : "0px",
                      opacity: expandedIndex === index ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-6 space-y-5">
                      {/* Divider */}
                      <div
                        className="h-px"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                        }}
                      />

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              background: "rgba(96, 165, 250, 0.15)",
                              color: "#60A5FA",
                              border: "1px solid rgba(96, 165, 250, 0.3)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* XP Meters */}
                      <div className="space-y-2 font-mono text-sm">
                        <div className="flex items-center gap-3">
                          <span className="w-32 text-gray-400"> Learning:</span>
                          <span className="text-green-400">{renderXPMeter(exp.xp.learning)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-32 text-gray-400"> Stress:</span>
                          <span className="text-red-400">{renderXPMeter(exp.xp.stress)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-32 text-gray-400"> Satisfaction:</span>
                          <span className="text-blue-400">{renderXPMeter(exp.xp.satisfaction)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Line */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm italic">
            Still leveling up. More XP loading…
          </p>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);

  const skills = [
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-0 pb-24 relative z-10"
    >
      <div className="w-full max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
              Skills
            </h2>
            <span
              className="px-4 py-1 rounded-full text-sm font-medium text-white relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              <span className="relative z-10">Core Technologies</span>
            </span>
          </div>
          <p className="text-lg md:text-xl" style={{ color: '#A78BFA' }}>
            stuff I poke until it works...
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <GlassButton onClick={() => navigate("/skills")}>
            <span>View All Skills</span>
            <FaRocket className="text-white/80 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
          </GlassButton>
        </div>
      </div>
    </section>
  );
};

const FeaturedProjects = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
  label: "Featured Project",
  title: "Campus-Connect",
  description:
    "A centralized web application built to simplify college operations. Features include digital attendance tracking, automated exam seating arrangements, real-time lab occupancy monitoring, and timetable generation — reducing manual work and peak-hour chaos for students and faculty.",
  image:
    "",
},
    {
  label: "Featured Project",
  title: "Farm Sync",
  description:
    "A smart agriculture web application designed to help farmers make better decisions using real-time data. Features include crop insights, weather-aware guidance, and live commodity price updates to support smarter selling and planning — tech but make it farmer-friendly.",
  image:
    "",
},

  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 relative z-10"
    >
      <div className="w-full max-w-7xl">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
              Featured Projects
            </h2>
            <span
              className="px-4 py-1 rounded-full text-sm font-medium text-white relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              <span className="relative z-10">Highlights</span>
            </span>
          </div>
          <p className="text-lg md:text-xl" style={{ color: '#A78BFA' }}>
            things I've built that didn't crash... mostly.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative flex flex-col lg:flex-row items-center justify-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : `opacity-0 translate-y-12`}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Left Content (for even index) or Right Content (for odd index) */}
              <div
                className={`relative z-10 flex flex-col ${index % 2 === 0 ? "lg:order-1 items-start" : "lg:order-2 items-start lg:items-end"}`}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  marginRight: index % 2 === 0 ? "-60px" : "0",
                  marginLeft: index % 2 === 0 ? "0" : "-60px",
                }}
              >
                {/* Title outside the card */}
                <div className={`mb-4 ${index % 2 === 0 ? "text-left" : "text-left lg:text-right"}`}>
                  <span
                    className="text-sm font-medium mb-2 block"
                    style={{ color: "#A78BFA" }}
                  >
                    {project.label}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Description Card - overlaps image */}
                <div
                  className="p-6 rounded-2xl space-y-3 relative overflow-hidden transition-all duration-500"
                  style={{
                    background: "rgba(20, 20, 20, 0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      hoveredProject === index
                        ? "0 25px 80px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                        : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Top shine line */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    }}
                  />
                  {/* Glass shine gradient */}
                  <div
                    className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                  <p className="text-sm md:text-base text-gray-300 relative z-10">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Image Container */}
              <div
                className={`relative ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
                style={{ 
                  width: "100%", 
                  maxWidth: "550px",
                  marginTop: "20px",
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden cursor-pointer relative group"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow:
                      hoveredProject === index
                        ? "0 25px 80px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        : "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                    height: "300px",
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform:
                      hoveredProject === index
                        ? "scale(1.02)"
                        : "scale(1)",
                    transition: "all 0.5s ease-out",
                  }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Top shine line */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                    }}
                  />
                  {/* Glass overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.4) 100%)",
                      opacity: hoveredProject === index ? 1 : 0.5,
                    }}
                  />
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)",
                      transform:
                        hoveredProject === index
                          ? "translateX(200%)"
                          : "translateX(-200%)",
                      transition: "transform 1s ease-in-out",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <GlassButton onClick={() => navigate("/projects")}>
            <span>View All Projects</span>
            <FaRocket className="text-white/80 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
          </GlassButton>
        </div>
      </div>
    </section>
  );
};

const CertificatesSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const certificates = [
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      color: "#FF9900",
      icon: "☁️",
    },
    {
      title: "Dynamic Web Development",
      issuer: "Web Development Certification",
      color: "#61DAFB",
      icon: "🌐",
    },
    {
      title: "SQL Database",
      issuer: "Database Management",
      color: "#4479A1",
      icon: "🗄️",
    },
    {
      title: "Python Programming",
      issuer: "Programming Certification",
      color: "#3776AB",
      icon: "🐍",
    },
    {
      title: "NPTEL – Cloud Computing",
      issuer: "NPTEL",
      color: "#A78BFA",
      icon: "☁️",
    },
    {
      title: "NPTEL – Database Management Systems",
      issuer: "NPTEL",
      color: "#47A248",
      icon: "📊",
    },
    {
      title: "NPTEL – Parallel Computing Architecture",
      issuer: "NPTEL",
      color: "#E0234E",
      icon: "⚡",
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, certificates.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 relative z-10"
    >
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
              Certifications
            </h2>
            <span
              className="px-4 py-1 rounded-full text-sm font-medium text-white relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              <span className="relative z-10">Achievements</span>
            </span>
          </div>
          <p className="text-lg md:text-xl text-gray-300">
            proof I actually finished something...
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Display - Triangle Layout */}
          <div
            className={`flex items-center justify-center mb-12 min-h-[400px] relative overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {certificates.map((cert, certIdx) => {
              let relativePosition = certIdx - currentIndex;

              if (relativePosition > 3) {
                relativePosition -= certificates.length;
              } else if (relativePosition < -3) {
                relativePosition += certificates.length;
              }

              const isVisible = Math.abs(relativePosition) <= 2;
              const isCenter = relativePosition === 0;
              const isInner = Math.abs(relativePosition) === 1;
              const isOuter = Math.abs(relativePosition) === 2;

              if (!isVisible) return null;

              return (
                <div
                  key={certIdx}
                  className={`absolute cursor-pointer ${
                    isCenter ? "z-30" : isInner ? "z-20" : "z-10"
                  }`}
                  style={{
                    left: `${50 + relativePosition * 20}%`,
                    top: isCenter ? "5%" : isInner ? "15%" : "25%",
                    transform: `translateX(-50%) scale(${
                      isCenter ? 1 : isInner ? 0.85 : 0.7
                    })`,
                    filter: isCenter
                      ? "none"
                      : `blur(${isInner ? "1px" : "2px"})`,
                    opacity: isCenter ? 1 : isInner ? 0.8 : 0.6,
                    transition:
                      "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrentIndex(certIdx);
                      setIsAutoPlay(false);
                    }
                  }}
                >
                  <div className="group relative transform transition-all duration-700 hover:scale-105">
                    {/* Glow Background */}
                    <div
                      className="absolute -inset-1 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-60"
                      style={{
                        background: `linear-gradient(135deg, ${cert.color}, transparent)`,
                        opacity: isCenter ? 0.3 : undefined,
                      }}
                    />

                    {/* Glass Card */}
                    <div
                      className="relative rounded-2xl border shadow-2xl transition-all duration-700 group-hover:border-white/20"
                      style={{
                        width: "280px",
                        padding: isCenter ? "32px" : "24px",
                        background: isCenter
                          ? "rgba(20, 20, 20, 0.8)"
                          : "rgba(20, 20, 20, 0.6)",
                        backdropFilter: isCenter ? "blur(40px)" : "blur(20px)",
                        WebkitBackdropFilter: isCenter
                          ? "blur(40px)"
                          : "blur(20px)",
                        borderColor: isCenter
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {/* Top shine line */}
                      <div
                        className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                        }}
                      />

                      {/* Icon */}
                      <div
                        className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110"
                        style={{
                          filter: `drop-shadow(0 4px 12px ${cert.color}60)`,
                        }}
                      >
                        {cert.icon}
                      </div>

                      {/* Certificate Info */}
                      <h3
                        className={`font-bold text-white mb-2 tracking-tight ${
                          isCenter ? "text-xl" : "text-lg"
                        }`}
                      >
                        {cert.title}
                      </h3>
                      <p
                        className="text-gray-400"
                        style={{
                          fontSize: isCenter ? "14px" : "12px",
                        }}
                      >
                        {cert.issuer}
                      </p>

                      {/* Accent line */}
                      {isCenter && (
                        <div
                          className="mt-4 h-1 w-16 rounded-full transition-all duration-500"
                          style={{
                            background: `linear-gradient(90deg, ${cert.color}, transparent)`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={() => {
              const newIndex =
                (currentIndex - 1 + certificates.length) % certificates.length;
              setCurrentIndex(newIndex);
              setIsAutoPlay(false);
            }}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
            aria-label="Previous certificate"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              const newIndex = (currentIndex + 1) % certificates.length;
              setCurrentIndex(newIndex);
              setIsAutoPlay(false);
            }}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
            aria-label="Next certificate"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-16">
          <GlassButton onClick={() => navigate("/certificates")}>
            <span>View All Certificates</span>
            <FaCode className="text-white/80 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
          </GlassButton>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socials = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com",
      color: "#FFFFFF",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://linkedin.com",
      color: "#0A66C2",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 relative z-10"
    >
      <div className="w-full max-w-4xl text-center">
        <div
          className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
            Contact Me
          </h2>
          <p
            className={`text-lg md:text-xl text-gray-300 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            Let's collaborate on your next project. I'm always open to
            discussing new opportunities and ideas.
          </p>

          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <GlassButton onClick={() => navigate("/contact")} size="large">
              <span>Get In Touch</span>
            </GlassButton>
          </div>

          <div
            className={`flex justify-center gap-6 pt-8 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {socials.map((social, index) => {
              const Icon = social.icon;
              const isHovered = hoveredSocial === index;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl relative overflow-hidden transition-all duration-500"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: isHovered
                      ? `0 20px 60px ${social.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                      : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                    transform: isHovered
                      ? "translateY(-8px) scale(1.1)"
                      : "translateY(0) scale(1)",
                  }}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {/* Top shine line */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${isHovered ? social.color : "rgba(255, 255, 255, 0.3)"}, transparent)`,
                      transition: "all 0.5s",
                    }}
                  />
                  {/* Glass shine gradient */}
                  <div
                    className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${social.color}40 50%, transparent 60%)`,
                      transform: isHovered
                        ? "translateX(200%)"
                        : "translateX(-200%)",
                      transition: "transform 0.8s ease-in-out",
                    }}
                  />
                  <Icon
                    className="w-8 h-8 relative z-10 transition-all duration-300"
                    style={{
                      color: isHovered ? social.color : "#FFFFFF",
                      filter: isHovered
                        ? `drop-shadow(0 4px 12px ${social.color}60)`
                        : "none",
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Galaxy Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      {/* Dark Overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />

        <ExperienceSection />
        <SkillsSection />
        <FeaturedProjects />
        <CertificatesSection />
        <Footer />
      </div>
    </div>
  );
}
