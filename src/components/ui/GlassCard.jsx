import React from "react";

export const GlassCard = ({
  children,
  className = "",
  isHovered = false,
  style = {},
  ...props
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
      {...props}
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
