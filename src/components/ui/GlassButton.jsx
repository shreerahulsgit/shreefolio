import React, { useState } from "react";

const GLASS_BUTTON_SIZE_CLASSES = {
  default: "px-8 py-4",
  large: "px-10 py-5",
};

export const GlassButton = ({
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
