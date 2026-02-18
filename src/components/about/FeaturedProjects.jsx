import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { GlassButton } from "../ui/GlassButton";
import { projects } from "../../data/portfolio-data";

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

const FeaturedProjects = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [hoveredProject, setHoveredProject] = useState(null);

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

export default FeaturedProjects;
