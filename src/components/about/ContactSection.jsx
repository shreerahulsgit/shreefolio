import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "../ui/GlassButton";
import { socials } from "../../data/portfolio-data";

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

const ContactSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [hoveredSocial, setHoveredSocial] = useState(null);

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

export default ContactSection;
