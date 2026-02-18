import React, { useState, useRef, useEffect } from "react";
import { experiences } from "../../data/portfolio-data";

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

const ExperienceSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [expandedIndex, setExpandedIndex] = useState(null);

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

export default ExperienceSection;
