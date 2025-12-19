import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

const Footer = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const contactInfo = {
    email: "shreerahul3636@gmail.com",
    phone: "+91 6382543212",
  };

  const socials = [
    {
      name: "github",
      icon: FaGithub,
      url: "https://github.com/shreerahulsgit",
    },
    {
      name: "linkedin",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/shreerahuls/",
    },
    {
      name: "email",
      icon: FaEnvelope,
      url: "mailto:shreerahul3636@gmail.com",
    },
  ];

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <footer
      ref={ref}
      className="relative z-20 pt-12 pb-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Content */}
        <div
          className={`flex flex-col items-center gap-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Get in touch badge */}
          <span
            className="px-5 py-2 rounded-full text-sm font-medium text-white relative overflow-hidden"
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
            <span className="relative z-10">get in touch</span>
          </span>

          {/* Description */}
          <p className="text-center text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed">
           what’s next? your friendly chaos shreeeee, is just a message away ... Let’s Connect!
          </p>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            {/* Email */}
            <div
              className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full justify-center cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
              onClick={() => copyToClipboard(contactInfo.email, "email")}
            >
              <FaEnvelope className="w-5 h-5 text-gray-400" />
              <span className="text-white text-lg font-medium tracking-wide">
                {contactInfo.email}
              </span>
              <button
                className="ml-auto text-gray-400 hover:text-white transition-colors duration-300"
                title="Copy email"
              >
                {copiedField === "email" ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Phone */}
            <div
              className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full justify-center cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
              onClick={() => copyToClipboard(contactInfo.phone, "phone")}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-white text-lg font-medium tracking-wide">
                {contactInfo.phone}
              </span>
              <button
                className="ml-auto text-gray-400 hover:text-white transition-colors duration-300"
                title="Copy phone"
              >
                {copiedField === "phone" ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Platform text */}
          <p className="text-gray-200 text-base mt-4">
            you may also find me on these platforms!
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {socials.map((social, index) => {
              const Icon = social.icon;
              const isHovered = hoveredIcon === index;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative transition-all duration-500 ease-out p-3 rounded-full"
                  style={{
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                    background: isHovered ? "rgba(255, 255, 255, 0.05)" : "transparent",
                  }}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <Icon
                    className="w-5 h-5 transition-all duration-500"
                    style={{
                      color: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="w-full max-w-xs h-px mt-8"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            }}
          />

          {/* Copyright */}
          <p
            className="text-center text-sm tracking-wide"
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            © 2025 | designed and coded with ❤️ by shree rahul
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
