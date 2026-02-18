import React, { useMemo } from "react";

// Starfield Background Component
const Starfield = () => {
  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  })), []);

  const shootingStars = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 8 + Math.random() * 5,
    duration: 1.5 + Math.random(),
  })), []);

  const nebulaClouds = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: 10 + i * 20,
    top: 20 + (i % 3) * 30,
    width: 200 + i * 50,
    height: 200 + i * 50,
    duration: 15 + i * 3,
    delay: i * 2,
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
      {nebulaClouds.map((cloud) => (
        <div
          key={`nebula-${cloud.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            background: `radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animation: `nebulaDrift ${cloud.duration}s ease-in-out infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
