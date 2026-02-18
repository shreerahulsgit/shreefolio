import { useState, useEffect } from 'react';
import { Phone, Send, ArrowUpRight, Github, Linkedin, Twitter, Radio, Zap, Satellite } from 'lucide-react';

const Starfield = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  }));

  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 8 + Math.random() * 5,
    duration: 1.5 + Math.random(),
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      {[...Array(5)].map((_, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 30}%`,
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            background: `radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animation: `nebulaDrift ${15 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const HoloCard = ({ children, className = '', delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-500 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(180deg, rgba(20,20,25,0.95) 0%, rgba(10,10,15,0.98) 100%)',
        border: `1px solid ${isHovered ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isHovered 
          ? '0 0 40px rgba(139,92,246,0.15), 0 8px 32px rgba(0,0,0,0.4)' 
          : '0 8px 32px rgba(0,0,0,0.3)',
        animationDelay: `${delay}ms`,
        minHeight: '558px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @keyframes scanLine {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>

      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
          animation: 'scanLine 4s linear infinite',
        }}
      />

      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-white/20" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-white/20" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-white/20" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-white/20" />

      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }}
      />

      <div className="relative z-0 py-10 px-10">
        {children}
      </div>
    </div>
  );
};

const ContactMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '29f306d4-9742-4713-a4be-e903f21eb3a8',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Transmission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Signal lost. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const contactDetails = [
    { icon: Radio, label: 'FREQUENCY', value: 'shreerahul3636@email.com', href: 'mailto:shreerahul3636@email.com' },
    { icon: Phone, label: 'DIRECT LINE', value: '+91 6382543212', href: 'tel:+916382543212' },
    { icon: Satellite, label: 'COORDINATES', value: 'Bengaluru, India', href: null },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const energyColor = '#8B5CF6';

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Starfield />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #22C55E; }
          50% { opacity: 0.5; box-shadow: 0 0 20px #22C55E; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(139,92,246,0.3); box-shadow: 0 0 10px rgba(139,92,246,0.1); }
          50% { border-color: rgba(139,92,246,0.6); box-shadow: 0 0 20px rgba(139,92,246,0.3); }
        }
        @keyframes transmitPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .input-focus {
          animation: borderGlow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-0">
        <div 
          className={`mb-16 md:mb-16 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">ESTABLISH</span><br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>COMMUNICATION</span>
          </h1>
          <p className="font-mono text-sm text-white/40 max-w-md tracking-wide">
            // TRANSMIT YOUR SIGNAL THROUGH THE VOID...<br />
            // AWAITING INCOMING TRANSMISSION
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <HoloCard delay={200}>
              <div className="flex items-center gap-2 mb-8">
                <Satellite className="w-5 h-5 text-violet-400" />
                <span className="font-mono text-xs tracking-widest text-white/50">STATION DATA</span>
              </div>

              <div className="space-y-6">
                {contactDetails.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`group flex items-start gap-4 p-4 -mx-4 rounded-lg transition-all duration-300 ${
                      item.href ? 'hover:bg-white/[0.03] cursor-pointer' : ''
                    }`}
                  >
                    <div 
                      className="p-3 rounded-lg transition-all duration-300"
                      style={{
                        background: 'rgba(139,92,246,0.1)',
                        border: '1px solid rgba(139,92,246,0.2)',
                      }}
                    >
                      <item.icon size={18} className="text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-xs text-white/40 mb-1">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-violet-300 transition-colors">
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <ArrowUpRight 
                        size={16} 
                        className="text-white/0 group-hover:text-violet-400 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      />
                    )}
                  </a>
                ))}
              </div>

              <div className="my-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

              <div>
                <p className="font-mono text-xs text-white/40 tracking-widest mb-4">EXTERNAL LINKS</p>
                <div className="flex gap-3">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg transition-all duration-300 group"
                      style={{
                        background: 'rgba(139,92,246,0.05)',
                        border: '1px solid rgba(139,92,246,0.15)',
                      }}
                      aria-label={social.label}
                    >
                      <social.icon 
                        size={18} 
                        className="text-white/50 group-hover:text-violet-400 transition-colors" 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </HoloCard>
          </div>

          <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <HoloCard delay={400}>
              <div className="flex items-center gap-2 mb-8">
                <Radio className="w-5 h-5 text-violet-400" />
                <span className="font-mono text-xs tracking-widest text-white/50">TRANSMISSION CONSOLE</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs text-white/40 mb-2 tracking-wider">CALLSIGN</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="Your identifier"
                      className={`w-full px-4 py-4 rounded-lg text-white placeholder:text-white/20 focus:outline-none transition-all duration-300 ${focusedField === 'name' ? 'input-focus' : ''}`}
                      style={{
                        background: 'rgba(139,92,246,0.05)',
                        border: `1px solid ${focusedField === 'name' ? energyColor : 'rgba(139,92,246,0.15)'}`,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/40 mb-2 tracking-wider">RETURN FREQUENCY</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="your@signal.com"
                      className={`w-full px-4 py-4 rounded-lg text-white placeholder:text-white/20 focus:outline-none transition-all duration-300 ${focusedField === 'email' ? 'input-focus' : ''}`}
                      style={{
                        background: 'rgba(139,92,246,0.05)',
                        border: `1px solid ${focusedField === 'email' ? energyColor : 'rgba(139,92,246,0.15)'}`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wider">SIGNAL TYPE</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Transmission category"
                    className={`w-full px-4 py-4 rounded-lg text-white placeholder:text-white/20 focus:outline-none transition-all duration-300 ${focusedField === 'subject' ? 'input-focus' : ''}`}
                    style={{
                      background: 'rgba(139,92,246,0.05)',
                      border: `1px solid ${focusedField === 'subject' ? energyColor : 'rgba(139,92,246,0.15)'}`,
                    }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wider">TRANSMISSION DATA</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={3}
                    placeholder="Enter your message..."
                    className={`w-full px-4 py-4 rounded-lg text-white placeholder:text-white/20 focus:outline-none transition-all duration-300 resize-none ${focusedField === 'message' ? 'input-focus' : ''}`}
                    style={{
                      background: 'rgba(139,92,246,0.05)',
                      border: `1px solid ${focusedField === 'message' ? energyColor : 'rgba(139,92,246,0.15)'}`,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-4 px-6 rounded-lg font-mono text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  style={{
                    background: isSubmitting ? 'rgba(139,92,246,0.2)' : 'linear-gradient(180deg, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.15) 100%)',
                    border: '1px solid rgba(139,92,246,0.5)',
                    boxShadow: '0 0 30px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                      <span className="text-violet-300">TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-violet-400 group-hover:text-white transition-colors" />
                      <span className="text-white">TRANSMIT</span>
                      <Send size={16} className="text-violet-400 group-hover:text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </>
                  )}
                </button>
              </form>

              {submitted && (
                <div 
                  className="mt-6 p-4 rounded-lg flex items-center gap-3"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: 'pulse 1s ease-in-out infinite' }} />
                  <span className="font-mono text-sm text-emerald-400">TRANSMISSION RECEIVED • RESPONSE INCOMING</span>
                </div>
              )}
            </HoloCard>
          </div>
        </div>

        <div 
          className={`mt-24 text-center transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-mono text-xs text-white/20 tracking-wider">
            // "ACROSS THE VOID, SIGNALS FIND THEIR WAY"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
