import { useState, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Footer from "../../lib/components/footer-main.jsx";
import { FaCloud, FaDatabase, FaMicrochip, FaShieldAlt } from "react-icons/fa";

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

const SkillSignalBar = ({ label, value, maxValue = 8, isVisible, delay = 0 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const energyColor = '#8B5CF6';

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
                ? energyColor
                : "rgba(139, 92, 246, 0.15)",
              transitionDelay: `${idx * 50}ms`,
              boxShadow: idx < animatedValue ? `0 0 8px ${energyColor}80` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TimelineCard = ({ course, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = index % 2 === 0;

  const cardContent = (
    <div
      className="max-w-md w-full p-6 rounded-2xl cursor-default relative overflow-hidden"
      style={{
        background: isHovered 
          ? "rgba(25, 25, 25, 0.9)" 
          : "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isHovered 
          ? "1px solid rgba(255, 255, 255, 0.2)" 
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isHovered
          ? "0 25px 80px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(139, 92, 246, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
          transition: "all 0.5s ease",
        }}
      />

      <div
        className="absolute -inset-1 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 60%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      
      <div className="relative z-10">
        <h3 
          className="text-lg font-semibold mb-2 transition-colors duration-300"
          style={{ color: isHovered ? "#ffffff" : "#e5e7eb" }}
        >
          {course.name}
        </h3>
        <p 
          className="text-sm leading-relaxed transition-colors duration-300"
          style={{ color: isHovered ? "#d1d5db" : "#9ca3af" }}
        >
          {course.takeaway}
        </p>
        <div
          className="grid"
          style={{
            gridTemplateRows: isHovered ? "1fr" : "0fr",
            opacity: isHovered ? 1 : 0,
            transition: "grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="overflow-hidden min-h-[0px]">
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              {course.points?.map((point, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                    transition: `all 0.4s ease ${idx * 60 + 100}ms`,
                  }}
                >
                  <span className="text-white/40 text-xs mt-0.5">→</span>
                  <p className="text-xs text-white/60">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <SkillSignalBar label="Skill Signal" value={course.skillSignal} isVisible={isHovered} delay={200} />
              <SkillSignalBar label="Chaos Level" value={course.chaosLevel} isVisible={isHovered} delay={280} />
              <SkillSignalBar label="Confidence" value={course.confidence} isVisible={isHovered} delay={360} />
            </div>
          </div>
        </div>

        <div 
          className="mt-4 text-center transition-all duration-300"
          style={{
            opacity: isHovered ? 0 : 0.4,
            height: isHovered ? "0px" : "auto",
          }}
        >
          <span className="text-xs text-gray-500">hover to explore</span>
        </div>
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
            {cardContent}
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div
              className="w-4 h-4 rounded-full transition-all duration-500"
              style={{
                background: isHovered ? "rgba(139, 92, 246, 0.9)" : "rgba(139, 92, 246, 0.4)",
                boxShadow: isHovered ? "0 0 20px rgba(139, 92, 246, 0.8)" : "0 0 8px rgba(139, 92, 246, 0.3)",
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
            {cardContent}
          </div>
        </>
      )}
    </div>
  );
};

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
        
        <div className="space-y-2">
          <SkillSignalBar label="Skill Signal" value={course.skillSignal} isVisible={isVisible} delay={index * 150 + 200} />
          <SkillSignalBar label="Chaos Level" value={course.chaosLevel} isVisible={isVisible} delay={index * 150 + 300} />
          <SkillSignalBar label="Confidence" value={course.confidence} isVisible={isVisible} delay={index * 150 + 400} />
        </div>
      </div>
    </div>
  );
};

const NPTELConstellation = ({ certs, isVisible }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    let rafId;
    let lastTime = 0;
    
    const animate = (timestamp) => {
      if (timestamp - lastTime >= 50) {
        setRotation(prev => (prev + 0.3) % 360);
        lastTime = timestamp;
      }
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);
  
  const getOrbPosition = (index, total) => {
    const baseAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const animatedAngle = baseAngle + (rotation * Math.PI / 180);
    const radius = 220;
    return {
      x: Math.cos(animatedAngle) * radius,
      y: Math.sin(animatedAngle) * radius,
    };
  };

  return (
    <div 
      className={`relative transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ minHeight: "650px" }}
    >
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          width: "140px",
          height: "140px",
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 80px rgba(139,92,246,0.2), inset 0 0 40px rgba(139,92,246,0.1)",
        }}
      >
        <span className="text-violet-400 text-2xl font-bold tracking-widest">NPTEL</span>
      </div>

      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "440px",
          height: "440px",
          border: "1px dashed rgba(139,92,246,0.2)",
        }}
      />

      {certs.map((cert, index) => {
        const pos = activeIndex === index 
          ? getOrbPosition(index, certs.length)
          : getOrbPosition(index, certs.length);
        const isActive = activeIndex === index;
        const IconComponent = cert.Icon;
        
        return (
          <div
            key={cert.name}
            className="absolute left-1/2 top-1/2 cursor-pointer"
            style={{
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${isActive ? 1.3 : 1})`,
              zIndex: isActive ? 20 : 5,
              transition: isActive ? "transform 0.3s ease-out" : "none",
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                width: isActive ? "110px" : "90px",
                height: isActive ? "110px" : "90px",
                background: isActive 
                  ? "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.15) 60%, transparent 100%)"
                  : "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.06) 60%, transparent 100%)",
                borderRadius: "50%",
                border: isActive ? "2px solid rgba(139,92,246,0.6)" : "1px solid rgba(139,92,246,0.3)",
                boxShadow: isActive 
                  ? "0 0 50px rgba(139,92,246,0.5), 0 0 100px rgba(139,92,246,0.2)"
                  : "0 0 25px rgba(139,92,246,0.15)",
              }}
            >
              <IconComponent 
                className="transition-all duration-300"
                style={{ 
                  fontSize: isActive ? "2.5rem" : "2rem",
                  color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                }} 
              />
            </div>

            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 transition-all duration-300 pointer-events-none"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateX(-50%) translateY(${isActive ? "0" : "-10px"})`,
                width: "300px",
              }}
            >
              <div
                className="p-5 rounded-xl text-center"
                style={{
                  background: "rgba(15, 15, 15, 0.98)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
                }}
              >
                <h4 className="text-white font-semibold text-lg mb-1">{cert.name}</h4>
                <p className="text-gray-500 text-sm mb-3">{cert.focus}</p>
                
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {cert.tags?.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Depth</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-1.5 h-3 rounded-sm"
                          style={{
                            background: idx < cert.depth ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.15)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Theory</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-1.5 h-3 rounded-sm"
                          style={{
                            background: idx < cert.theory ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.15)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const WorkshopCard = ({ workshop, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl transition-all duration-700 cursor-pointer overflow-hidden group ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
      style={{
        background: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 25px 70px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(139, 92, 246, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transitionDelay: `${index * 120}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold mb-1 group-hover:text-violet-300 transition-colors" style={{ color: '#A78BFA' }}>{workshop.name}</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                {workshop.platform}
            </span>
          </div>
          <div 
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              background: isHovered ? "rgba(139, 92, 246, 0.9)" : "rgba(255, 255, 255, 0.3)",
              boxShadow: isHovered ? "0 0 12px rgba(139, 92, 246, 0.8)" : "none",
            }}
          />
        </div>
        
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">{workshop.shortDesc}</p>

        <div className="flex flex-wrap gap-2 mb-4">
            {workshop.tags.map((tag, idx) => (
                <span 
                    key={idx}
                    className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400 transition-colors duration-300"
                    style={{
                        borderColor: isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                        color: isHovered ? "#E5E7EB" : "#9CA3AF"
                    }}
                >
                    {tag}
                </span>
            ))}
        </div>

        <div
          className="grid"
          style={{
            gridTemplateRows: isHovered ? "1fr" : "0fr",
            opacity: isHovered ? 1 : 0,
            transition: "grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
            <div className="overflow-hidden min-h-[0px]">
                <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-semibold mb-1" style={{ color: '#A78BFA' }}>Key Outcome</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {workshop.outcome}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, badge, subtitle, isVisible }) => (
  <div className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
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
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
          }}
        />
        <span className="relative z-10">{badge}</span>
      </span>
    </div>
    <p className="text-lg" style={{ color: '#A78BFA' }}>{subtitle}</p>
  </div>
);

const trainingCourses = [
  {
    name: "Building Static Websites",
    takeaway: "where syntax stopped looking like alien code.",
    points: ["HTML structure became second nature", "CSS layouts clicked after painful hours", "First portfolio site was ugly but mine"],
    skillSignal: 7, chaosLevel: 5, confidence: 6,
  },
  {
    name: "Responsive Website Design",
    takeaway: "learned that websites should not break on phones.",
    points: ["Flexbox changed everything", "Media queries are actually elegant", "Mobile-first is the way"],
    skillSignal: 7, chaosLevel: 6, confidence: 7,
  },
  {
    name: "Dynamic Web Development",
    takeaway: "made things click, animate, and occasionally crash.",
    points: ["DOM manipulation is powerful", "Event listeners everywhere", "Async/await saved my sanity"],
    skillSignal: 8, chaosLevel: 7, confidence: 6,
  },
  {
    name: "SQL Database",
    takeaway: "talked to databases without making them angry.",
    points: ["JOINs are still humbling", "Indexing matters more than expected", "Data normalization is an art"],
    skillSignal: 6, chaosLevel: 5, confidence: 5,
  },
  {
    name: "Python Programming",
    takeaway: "automated boring stuff. felt like a wizard.",
    points: ["List comprehensions are beautiful", "Libraries for everything", "Clean syntax, happy brain"],
    skillSignal: 7, chaosLevel: 4, confidence: 7,
  },
  {
    name: "XPM 4.0",
    takeaway: "pressure-cooker that built real resilience.",
    points: ["Debugging under stress", "Time management is a skill", "Collaboration beats solo grind"],
    skillSignal: 8, chaosLevel: 8, confidence: 6,
  },
];

const nptelCerts = [
  { 
    name: "Cloud Computing", 
    platform: "NPTEL", 
    Icon: FaCloud, 
    focus: "Infrastructure & Virtualization", 
    tags: ["EC2", "VMs", "Containers", "Orchestration"],
    why: "Understood how the cloud actually works. VMs, containers, and why everything is 'someone else's computer'.", 
    depth: 7, 
    theory: 6 
  },
  { 
    name: "Database Management Systems", 
    platform: "NPTEL", 
    Icon: FaDatabase, 
    focus: "RDBMS & Transactions", 
    tags: ["SQL", "ACID", "Normalization", "Indexing"],
    why: "Deep dive into how databases think. ACID properties, normalization, and the art of not losing data.", 
    depth: 8, 
    theory: 7 
  },
  { 
    name: "Parallel Computing Architecture", 
    platform: "NPTEL", 
    Icon: FaMicrochip, 
    focus: "Concurrency & Performance", 
    tags: ["Threads", "SIMD", "GPU", "Pipelines"],
    why: "Learned why more cores = more power (sometimes). Understanding parallelism changed how I think about performance.", 
    depth: 6, 
    theory: 8 
  },
  { 
    name: "Ethical Hacking", 
    platform: "NPTEL", 
    Icon: FaShieldAlt, 
    focus: "Security & Penetration Testing", 
    tags: ["Pen Testing", "Exploits", "Firewalls", "OWASP"],
    why: "Learned to think like an attacker to become a better defender. Security is a mindset, not just a checkbox.", 
    depth: 7, 
    theory: 5 
  },
];

const workshops = [
  { 
    name: "AWS Cloud Computing", 
    platform: "NxtWave Workshop", 
    shortDesc: "deployed stuff to the cloud and it actually worked.", 
    tags: ["EC2", "S3", "IAM", "VPC"],
    outcome: "Deployed a highly available web application with load balancing and auto-scaling."
  },
  { 
    name: "GEN AI 2.0", 
    platform: "NxtWave Workshop", 
    shortDesc: "explored the AI revolution. prompt engineering is an art form.", 
    tags: ["LLMs", "Prompt Eng", "Fine-tuning", "APIs"],
    outcome: "Built a custom chatbot integrated with external knowledge bases."
  },
  { 
    name: "UI/UX Designing", 
    platform: "NxtWave Workshop", 
    shortDesc: "learned that pixels matter and white space is not empty space.", 
    tags: ["Figma", "Wireframing", "Prototyping", "User Flow"],
    outcome: "Designed a complete mobile app interface from user research to hi-fi prototype."
  },
  { 
    name: "MCP", 
    platform: "NxtWave Workshop", 
    shortDesc: "model context protocol. understanding how AI systems talk.", 
    tags: ["Protocol Design", "AI Agents", "System Arch", "JSON-RPC"],
    outcome: "Implemented a custom MCP server to expose local tools to an AI assistant."
  },
];

export const CertificatesContent = () => {
  const [trainingRef, trainingVisible] = useScrollAnimation(0.1);
  const [nptelRef, nptelVisible] = useScrollAnimation(0.1);
  const [workshopRef, workshopVisible] = useScrollAnimation(0.1);

  return (
    <div className="space-y-20">
      <section ref={trainingRef}>
        <SectionHeader
          title="Training Courses"
          badge="Core Skill Unlocks"
          subtitle="the foundation. where the real learning happened."
          isVisible={trainingVisible}
        />
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
      </section>

      <section ref={nptelRef}>
        <SectionHeader
          title="NPTEL Certifications"
          badge="Academic XP"
          subtitle="the serious stuff. university-level learning."
          isVisible={nptelVisible}
        />
        <NPTELConstellation certs={nptelCerts} isVisible={nptelVisible} />
      </section>

      <section ref={workshopRef}>
        <SectionHeader
          title="Workshops & Hands-On"
          badge="Touched Real Tech"
          subtitle="learned by doing. breaking. fixing."
          isVisible={workshopVisible}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 mb-24 gap-6">
          {workshops.map((workshop, index) => (
            <WorkshopCard key={workshop.name} workshop={workshop} index={index} isVisible={workshopVisible} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default function CertificatesPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [heroRef, heroVisible] = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      />

      <div className="relative z-10">
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
                color: "#E5E7EB",
              }}
            >
              <span className="relative z-10">proof I didn't just watch tutorials</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
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
          </div>
        </section>

        <div className="px-6 md:px-12 lg:px-24 py-20">
          <div className="max-w-6xl mx-auto">
            <CertificatesContent />
          </div>
        </div>

        <div className="text-center py-20 px-6">
          <p className="text-gray-500 text-lg">
            still learning. this page will age well.
          </p>
        </div>

        <Footer />
      </div>

      {!splineLoaded && (
        <div
          className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(34, 34, 34, 0.5)" }}
        >
          <div
            className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(248, 248, 248, 0.025)",
              border: "1px solid rgba(248, 248, 248, 0.2)",
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
