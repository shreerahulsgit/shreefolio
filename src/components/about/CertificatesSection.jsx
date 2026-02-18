import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { GlassButton } from "../ui/GlassButton";
import { certificates } from "../../data/portfolio-data";

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

const CertificatesSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, certificates.length]);

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

export default CertificatesSection;
