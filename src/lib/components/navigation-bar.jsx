import { useState } from "react";
import { Home, User, Briefcase, Mail, FileText, Wrench } from "lucide-react";
import "../styles/navigation-bar.css";

const NavigationBar = ({
  isLoaded = true,
  currentPage = "Home",
  onHomeClick,
  onAboutClick,
  onProjectsClick,
  onResumeClick,
  onContactClick,
  onSpecialClick,
  onSkillsClick,
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const navigationIcons = [
    { icon: Home, label: "Home", hideOnMobile: false },
    { icon: User, label: "About", hideOnMobile: false },
    { icon: Briefcase, label: "Projects", hideOnMobile: false },
    {
      icon: "custom-image",
      label: "Infinite Void",
      special: true,
      hideOnMobile: true,
    },
    { icon: FileText, label: "Resume", hideOnMobile: false },
    { icon: Mail, label: "Contact", hideOnMobile: false },
    { icon: Wrench, label: "Skills", hideOnMobile: false },
  ];

  const getActiveIconIndex = () => {
    const pageToIndex = {
      Home: 0,
      About: 1,
      Projects: 2,
      Special: 3,
      Resume: 4,
      Contact: 5,
      Skills: 6,
      
    };
    return pageToIndex[currentPage] ?? 0;
  };

  const activeIcon = getActiveIconIndex();

  const getButtonStyle = (index, isActive, isSpecial) => {
    let rotateY = isActive ? "0deg" : "5deg";
    let rotateX = isActive ? "0deg" : "5deg";
    let translateZ = isActive ? "20px" : isSpecial ? "15px" : "0px";
    let scale = isActive ? 1.1 : 1;

    if (hoverIndex === index && !isActive) {
      rotateY = "-10deg";
      rotateX = "-5deg";
      translateZ = "30px";
      scale = 1.15;
    }

    return {
      transform: `perspective(1000px) rotateY(${rotateY}) rotateX(${rotateX}) translateZ(${translateZ}) scale(${scale})`,
      transformStyle: "preserve-3d",
      transition: "transform 420ms cubic-bezier(.2,.9,.3,1)",
      boxShadow: isActive
        ? "0 10px 25px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
        : isSpecial
          ? undefined // Handled by CSS class .infinite-void-glow
          : "0 4px 10px rgba(0,0,0,0.08)",
    };
  };

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-1000 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      aria-hidden={false}
    >
      <div
        className="relative bg-white/6 backdrop-blur-xl rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 border border-white/10 shadow-2xl"
        style={{
          backdropFilter: "blur(40px) saturate(180%)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          transform: "perspective(1000px) rotateX(5deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          {navigationIcons.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = index === activeIcon;
            const isSpecial = !!item.special;

            // Hide on mobile if hideOnMobile is true
            if (item.hideOnMobile) {
              return (
                <div key={index} className="relative hidden sm:block">
                  <button
                    onClick={() => {
                      if (
                        item.label === "Infinite Void" &&
                        typeof onSpecialClick === "function"
                      )
                        onSpecialClick();
                    }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className={`relative transition-all duration-300 group outline-none border-none focus:outline-none p-2.5 sm:p-3 rounded-xl ${
                      isSpecial && !isActive ? "infinite-void-glow" : ""
                    }`}
                    style={getButtonStyle(index, isActive, isSpecial)}
                    title={item.label}
                    aria-pressed={isActive}
                  >
                    <img
                      src="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1758292953/Skuyxz_-_Collection___OpenSea_zgtikn.png"
                      alt="Special Icon"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-lg"
                      style={{
                        transform: "translateZ(10px)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-xl opacity-30 blur-xl special-glow"
                      aria-hidden
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(138,43,226,0.3), rgba(138,43,226,0.2))",
                        transform: "translateZ(0px)",
                      }}
                    />

                    {hoverIndex === index && !isActive && (
                      <div
                        className="absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap transition-all duration-300 shadow-2xl border border-white/10"
                        style={{
                          transform:
                            "translateX(-50%) translateZ(50px) rotateX(-8deg)",
                        }}
                      >
                        {item.label}
                        <div
                          className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 -mt-1 border-r border-b border-white/10"
                          aria-hidden
                        />
                      </div>
                    )}
                  </button>
                </div>
              );
            }

            return (
              <div key={index} className="relative">
                <button
                  onClick={() => {
                    if (
                      item.label === "Home" &&
                      typeof onHomeClick === "function"
                    )
                      onHomeClick();
                    if (
                      item.label === "About" &&
                      typeof onAboutClick === "function"
                    )
                      onAboutClick();
                    if (
                      item.label === "Projects" &&
                      typeof onProjectsClick === "function"
                    )
                      onProjectsClick();
                    if (
                      item.label === "Resume" &&
                      typeof onResumeClick === "function"
                    )
                      onResumeClick();
                    if (
                      item.label === "Contact" &&
                      typeof onContactClick === "function"
                    )
                      onContactClick();
                    if (
                      item.label === "Skills" &&
                      typeof onSkillsClick === "function"
                    )
                      onSkillsClick();
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="relative transition-all duration-300 group outline-none border-none focus:outline-none p-2.5 sm:p-3 rounded-xl"
                  style={getButtonStyle(index, isActive, isSpecial)}
                  title={item.label}
                  aria-pressed={isActive}
                >
                  <IconComponent
                    className={`w-5 h-5 sm:w-5 sm:h-5 transition-all duration-300 ${
                      isActive
                        ? "text-white drop-shadow-lg"
                        : "text-white/85 group-hover:text-white"
                    }`}
                    style={{
                      transform: "translateZ(5px)",
                      filter: isActive
                        ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                        : "none",
                    }}
                  />

                  {isActive && (
                    <div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                      style={{
                        transform: "translateX(-50%) translateZ(15px)",
                      }}
                      aria-hidden
                    >
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
                        style={{
                          background: "linear-gradient(90deg,#fff,#93c5fd)",
                          boxShadow:
                            "0 0 10px rgba(255,255,255,0.8),0 0 20px rgba(255,255,255,0.35)",
                        }}
                      />
                    </div>
                  )}
                </button>

                {hoverIndex === index && !isActive && (
                  <div
                    className="absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap transition-all duration-300 shadow-2xl border border-white/10 hidden sm:block"
                    style={{
                      transform:
                        "translateX(-50%) translateZ(50px) rotateX(-8deg)",
                    }}
                  >
                    {item.label}
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 -mt-1 border-r border-b border-white/10"
                      aria-hidden
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            transform: "translateZ(5px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
          }}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
