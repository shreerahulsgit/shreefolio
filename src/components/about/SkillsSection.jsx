import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { GlassButton } from "../ui/GlassButton";
import { skills } from "../../data/portfolio-data";

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

const SkillsSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);

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

export default SkillsSection;
