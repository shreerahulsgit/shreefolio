import React, { useState, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Footer from "../lib/components/footer.jsx";

// Custom hook for scroll animation
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

// Skill Signal Bar Component (segmented blocks)
const SkillSignalBar = ({ label, value, maxValue = 8, isVisible, delay = 0 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setAnimatedValue(value);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, value, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-24 font-medium tracking-wide">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: maxValue }).map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-4 rounded-sm transition-all duration-500"
            style={{
              background: idx < animatedValue 
                ? "rgba(255, 255, 255, 0.7)" 
                : "rgba(255, 255, 255, 0.1)",
              transitionDelay: `${idx * 50}ms`,
              boxShadow: idx < animatedValue ? "0 0 8px rgba(255, 255, 255, 0.3)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Impact Meter Bar Component (solid continuous bar)
const ImpactMeterBar = ({ label, value, maxValue = 10, isVisible, delay = 0 }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setAnimatedWidth((value / maxValue) * 100);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, value, maxValue, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-20 font-medium tracking-wide">{label}</span>
      <div 
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255, 255, 255, 0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animatedWidth}%`,
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8))",
            boxShadow: "0 0 12px rgba(255, 255, 255, 0.3)",
          }}
        />
      </div>
    </div>
  );
};

// Timeline Card Component with Hover Points
const TimelineCard = ({ course, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = index % 2 === 0;

  const CardContent = () => (
    <div
      className="max-w-md w-full p-6 rounded-2xl transition-all duration-500 cursor-default relative"
      style={{
        background: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
          : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top shine line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none rounded-t-2xl"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />
      
      <h3 className="text-lg font-semibold text-white mb-2">{course.name}</h3>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">{course.takeaway}</p>
      
      {/* Hover Points */}
      <div 
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isHovered ? "100px" : "0px",
          opacity: isHovered ? 1 : 0,
          marginBottom: isHovered ? "16px" : "0px",
        }}
      >
        <div className="space-y-1">
          {course.points?.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-gray-500 text-xs mt-0.5">→</span>
              <p className="text-xs text-gray-400">{point}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Skill Signals */}
      <div className="space-y-2">
        <SkillSignalBar label="Skill Signal" value={course.skillSignal} isVisible={isVisible} delay={index * 150 + 200} />
        <SkillSignalBar label="Chaos Level" value={course.chaosLevel} isVisible={isVisible} delay={index * 150 + 300} />
        <SkillSignalBar label="Confidence" value={course.confidence} isVisible={isVisible} delay={index * 150 + 400} />
      </div>
    </div>
  );

  return (
    <div 
      className={`relative flex items-center w-full mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {isLeft ? (
        <>
          <div className="w-1/2 pr-12 flex justify-end">
            <CardContent />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div
              className="w-4 h-4 rounded-full transition-all duration-500"
              style={{
                background: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)",
                boxShadow: isHovered ? "0 0 20px rgba(255, 255, 255, 0.6)" : "0 0 8px rgba(255, 255, 255, 0.2)",
              }}
            />
          </div>
          <div className="w-1/2 pl-12" />
        </>
      ) : (
        <>
          <div className="w-1/2 pr-12" />
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div
              className="w-4 h-4 rounded-full transition-all duration-500"
              style={{
                background: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)",
                boxShadow: isHovered ? "0 0 20px rgba(255, 255, 255, 0.6)" : "0 0 8px rgba(255, 255, 255, 0.2)",
              }}
            />
          </div>
          <div className="w-1/2 pl-12">
            <CardContent />
          </div>
        </>
      )}
    </div>
  );
};

// Mobile Timeline Card 
const MobileTimelineCard = ({ course, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex items-start mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col items-center mr-6">
        <div
          className="w-3 h-3 rounded-full transition-all duration-500"
          style={{
            background: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)",
            boxShadow: isHovered ? "0 0 16px rgba(255, 255, 255, 0.6)" : "0 0 6px rgba(255, 255, 255, 0.2)",
          }}
        />
        <div className="w-px flex-1 mt-3" style={{ background: "rgba(255, 255, 255, 0.1)" }} />
      </div>

      <div
        className="flex-1 p-5 rounded-2xl transition-all duration-500 cursor-default relative"
        style={{
          background: "rgba(20, 20, 20, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isHovered
            ? "0 20px 60px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className="text-base font-semibold text-white mb-2">{course.name}</h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{course.takeaway}</p>
        
        {/* Hover Points - hidden by default */}
        <div 
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "100px" : "0px",
            opacity: isHovered ? 1 : 0,
            marginBottom: isHovered ? "16px" : "0px",
          }}
        >
          <div className="space-y-1">
            {course.points?.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-gray-500 text-xs mt-0.5">→</span>
                <p className="text-xs text-gray-400">{point}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <SkillSignalBar label="Skill Signal" value={course.skillSignal} isVisible={isVisible} delay={index * 150 + 200} />
          <SkillSignalBar label="Chaos Level" value={course.chaosLevel} isVisible={isVisible} delay={index * 150 + 300} />
          <SkillSignalBar label="Confidence" value={course.confidence} isVisible={isVisible} delay={index * 150 + 400} />
        </div>
      </div>
    </div>
  );
};

// NPTEL Card Component - Expandable with hover reveal
const NPTELCard = ({ cert, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl transition-all duration-700 cursor-pointer overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{
        background: "rgba(20, 20, 20, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 25px 70px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top shine line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl transition-all duration-500 pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          opacity: isHovered ? 0.6 : 0,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="text-3xl transition-all duration-500"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              filter: isHovered ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))" : "none",
            }}
          >
            {cert.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              {cert.platform}
            </span>
          </div>
        </div>

        {/* Focus area - always visible */}
        <p className="text-sm text-gray-400 mb-3">{cert.focus}</p>

        {/* Expanded content on hover */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "150px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{cert.why}</p>
          
          {/* Progress indicators */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">Depth</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-3 rounded-sm transition-all duration-300"
                    style={{
                      background: idx < cert.depth ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.1)",
                      transitionDelay: `${idx * 40}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">Theory</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-3 rounded-sm transition-all duration-300"
                    style={{
                      background: idx < cert.theory ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.1)",
                      transitionDelay: `${idx * 40}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div 
          className="flex justify-center mt-4 transition-all duration-300"
          style={{
            opacity: isHovered ? 0 : 0.5,
          }}
        >
          <span className="text-xs text-gray-500">hover to explore</span>
        </div>
      </div>
    </div>
  );
};

// Workshop Card Component - Updated with staggered slide animation
const WorkshopCard = ({ workshop, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl transition-all duration-700 cursor-pointer overflow-hidden ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
      style={{
        background: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 25px 70px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transitionDelay: `${index * 120}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top shine line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      {/* Subtle glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl transition-all duration-500 pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          opacity: isHovered ? 0.5 : 0,
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{workshop.name}</h3>
            <p className="text-xs text-gray-500">{workshop.platform}</p>
          </div>
          {/* Animated indicator */}
          <div 
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              background: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)",
              boxShadow: isHovered ? "0 0 12px rgba(255, 255, 255, 0.5)" : "none",
            }}
          />
        </div>
        
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">{workshop.shortDesc}</p>

        {/* Impact Meters - always visible, animate on scroll */}
        <div className="space-y-3">
          <ImpactMeterBar label="Impact" value={workshop.impact} isVisible={isVisible} delay={index * 120 + 200} />
          <ImpactMeterBar label="Complexity" value={workshop.complexity} isVisible={isVisible} delay={index * 120 + 300} />
          <ImpactMeterBar label="Hands-on" value={workshop.handsOn} isVisible={isVisible} delay={index * 120 + 400} />
        </div>
      </div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, badge, subtitle, isVisible }) => (
  <div className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
        {title}
      </h2>
      <span
        className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white relative overflow-hidden w-fit"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        <span className="relative z-10">{badge}</span>
      </span>
    </div>
    <p className="text-lg text-gray-400">{subtitle}</p>
  </div>
);

// Main Certificates Page
export default function CertificatesPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [trainingRef, trainingVisible] = useScrollAnimation(0.1);
  const [nptelRef, nptelVisible] = useScrollAnimation(0.1);
  const [workshopRef, workshopVisible] = useScrollAnimation(0.1);

  // Training Courses - NxtWave
  const trainingCourses = [
    {
      name: "Building Static Websites",
      takeaway: "where syntax stopped looking like alien code.",
      points: [
        "HTML structure became second nature",
        "CSS layouts clicked after painful hours",
        "First portfolio site was ugly but mine",
      ],
      skillSignal: 7,
      chaosLevel: 5,
      confidence: 6,
    },
    {
      name: "Responsive Website Design",
      takeaway: "learned that websites should not break on phones.",
      points: [
        "Flexbox changed everything",
        "Media queries are actually elegant",
        "Mobile-first is the way",
      ],
      skillSignal: 7,
      chaosLevel: 6,
      confidence: 7,
    },
    {
      name: "Dynamic Web Development",
      takeaway: "made things click, animate, and occasionally crash.",
      points: [
        "DOM manipulation is powerful",
        "Event listeners everywhere",
        "Async/await saved my sanity",
      ],
      skillSignal: 8,
      chaosLevel: 7,
      confidence: 6,
    },
    {
      name: "SQL Database",
      takeaway: "talked to databases without making them angry.",
      points: [
        "JOINs are still humbling",
        "Indexing matters more than expected",
        "Data normalization is an art",
      ],
      skillSignal: 6,
      chaosLevel: 5,
      confidence: 5,
    },
    {
      name: "Python Programming",
      takeaway: "automated boring stuff. felt like a wizard.",
      points: [
        "List comprehensions are beautiful",
        "Libraries for everything",
        "Clean syntax, happy brain",
      ],
      skillSignal: 7,
      chaosLevel: 4,
      confidence: 7,
    },
    {
      name: "XPM 4.0",
      takeaway: "pressure-cooker that built real resilience.",
      points: [
        "Debugging under stress",
        "Time management is a skill",
        "Collaboration beats solo grind",
      ],
      skillSignal: 8,
      chaosLevel: 8,
      confidence: 6,
    },
  ];

  // NPTEL Certifications
  const nptelCerts = [
    {
      name: "Cloud Computing",
      platform: "NPTEL",
      icon: "☁️",
      focus: "Infrastructure & Virtualization",
      why: "Understood how the cloud actually works. VMs, containers, and why everything is 'someone else's computer'.",
      depth: 7,
      theory: 6,
    },
    {
      name: "Database Management Systems",
      platform: "NPTEL",
      icon: "📊",
      focus: "RDBMS & Transactions",
      why: "Deep dive into how databases think. ACID properties, normalization, and the art of not losing data.",
      depth: 8,
      theory: 7,
    },
    {
      name: "Parallel Computing Architecture",
      platform: "NPTEL",
      icon: "⚡",
      focus: "Concurrency & Performance",
      why: "Learned why more cores = more power (sometimes). Understanding parallelism changed how I think about performance.",
      depth: 6,
      theory: 8,
    },
    {
      name: "Ethical Hacking",
      platform: "NPTEL",
      icon: "🔐",
      focus: "Security & Penetration Testing",
      why: "Learned to think like an attacker to become a better defender. Security is a mindset, not just a checkbox.",
      depth: 7,
      theory: 5,
    },
  ];

  // Workshops - NxtWave
  const workshops = [
    {
      name: "AWS Cloud Computing",
      platform: "NxtWave Workshop",
      shortDesc: "deployed stuff to the cloud and it actually worked.",
      impact: 8,
      complexity: 7,
      handsOn: 9,
    },
    {
      name: "GEN AI 2.0",
      platform: "NxtWave Workshop",
      shortDesc: "explored the AI revolution. prompt engineering is an art form.",
      impact: 9,
      complexity: 6,
      handsOn: 8,
    },
    {
      name: "UI/UX Designing",
      platform: "NxtWave Workshop",
      shortDesc: "learned that pixels matter and white space is not empty space.",
      impact: 7,
      complexity: 5,
      handsOn: 8,
    },
    {
      name: "MCP",
      platform: "NxtWave Workshop",
      shortDesc: "model context protocol. understanding how AI systems talk.",
      impact: 8,
      complexity: 8,
      handsOn: 7,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Spline Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {!splineError ? (
          <Spline
            scene="https://prod.spline.design/pX-RxNY-kD9Fb7ce/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            onError={() => setSplineError(true)}
          />
        ) : (
          <div
            style={{
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-24 pt-28 pb-12"
        >
          <div className="text-center max-w-4xl">
            <div
              className={`inline-block mb-6 px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                color: "#E5E7EB",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              <span className="relative z-10">proof I didn't just watch tutorials</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "200ms" }}
            >
              Receipts
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-400 mb-4 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              things I actually finished and learned from.
            </p>

            <p
              className={`text-sm text-gray-500 italic transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "600ms" }}
            >
              not ratings. just signals.
            </p>
          </div>
        </section>

        {/* Training Courses Section */}
        <section ref={trainingRef} className="px-6 md:px-12 lg:px-24 py-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Training Courses"
              badge="Core Skill Unlocks"
              subtitle="the foundation. where the real learning happened."
              isVisible={trainingVisible}
            />

            {/* Timeline */}
            <div className="relative">
              <div 
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2"
                style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))" }}
              />

              <div className="hidden md:block">
                {trainingCourses.map((course, index) => (
                  <TimelineCard key={course.name} course={course} index={index} isVisible={trainingVisible} />
                ))}
              </div>

              <div className="md:hidden">
                {trainingCourses.map((course, index) => (
                  <MobileTimelineCard key={course.name} course={course} index={index} isVisible={trainingVisible} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NPTEL Section */}
        <section ref={nptelRef} className="px-6 md:px-12 lg:px-24 py-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="NPTEL Certifications"
              badge="Academic XP"
              subtitle="the serious stuff. university-level learning."
              isVisible={nptelVisible}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nptelCerts.map((cert, index) => (
                <NPTELCard key={cert.name} cert={cert} index={index} isVisible={nptelVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section ref={workshopRef} className="px-6 md:px-12 lg:px-24 py-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Workshops & Hands-On"
              badge="Touched Real Tech"
              subtitle="learned by doing. breaking. fixing."
              isVisible={workshopVisible}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map((workshop, index) => (
                <WorkshopCard key={workshop.name} workshop={workshop} index={index} isVisible={workshopVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* Ending Line */}
        <div className="text-center py-20 px-6">
          <p className="text-gray-500 text-lg">
            still learning. this page will age well.
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Loading Screen */}
      {!splineLoaded && (
        <div
          className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(34, 34, 34, 0.5)" }}
        >
          <div
            className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(248, 248, 248, 0.025)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(248, 248, 248, 0.2)",
            }}
          >
            <div
              className="w-16 h-16 border-2 rounded-full animate-spin mb-6"
              style={{
                borderColor: "rgba(248, 248, 248, 0.2)",
                borderTopColor: "rgba(248, 248, 248, 0.8)",
              }}
            />
            <p className="text-white/80 text-lg font-medium">Loading receipts...</p>
          </div>
        </div>
      )}
    </div>
  );
}
