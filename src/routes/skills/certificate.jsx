import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Award, Code, Database, Cloud, Network, Zap, BookOpen, Sparkles } from 'lucide-react';

const CertificationsShowcase = () => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Scroll progress for timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const timelineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Main certifications data for 3D carousel
  const mainCertifications = [
    {
      id: 1,
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Feb 2025",
      icon: Cloud,
      color: "from-orange-500 to-yellow-500",
      glow: "shadow-orange-500/50"
    },
    {
      id: 2,
      name: "Cloud Computing",
      issuer: "NPTEL",
      date: "Nov 2024",
      icon: Cloud,
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50"
    },
    {
      id: 3,
      name: "Database Management Systems",
      issuer: "NPTEL",
      date: "Mar 2024",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/50"
    },
    {
      id: 4,
      name: "Parallel Computing Architecture",
      issuer: "NPTEL",
      date: "Apr 2025",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/50"
    },
    {
      id: 5,
      name: "Data Structures and Algorithms",
      issuer: "Coursera",
      date: "2024",
      icon: Code,
      color: "from-indigo-500 to-blue-500",
      glow: "shadow-indigo-500/50"
    },
    {
      id: 6,
      name: "Networking",
      issuer: "Cisco",
      date: "2023",
      icon: Network,
      color: "from-teal-500 to-cyan-500",
      glow: "shadow-teal-500/50"
    }
  ];

  // Training courses data
  const trainingCourses = [
    { name: "Building Static Websites", provider: "NxtWave", icon: Code },
    { name: "Responsive Website Design", provider: "NxtWave", icon: Code },
    { name: "Dynamic Web Development", provider: "NxtWave", icon: Code },
    { name: "SQL Database", provider: "NxtWave", icon: Database },
    { name: "Python Programming", provider: "NxtWave", icon: Code },
    { name: "XPM 4.0", provider: "NxtWave", icon: Sparkles }
  ];

  // Workshops data
  const workshops = [
    { name: "AWS Cloud Computing", provider: "NxtWave", icon: Cloud },
    { name: "GEN AI 2.0", provider: "NxtWave", icon: Sparkles },
    { name: "UI/UX Designing", provider: "NxtWave", icon: Award }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % mainCertifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mainCertifications.length]);

  // Calculate 3D carousel positions
  const getCarouselTransform = (index) => {
    const total = mainCertifications.length;
    const angle = ((index - activeCard) * 360) / total;
    const radius = 400; // Carousel radius
    
    // 3D transformation
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;
    const scale = 0.7 + (z + radius) / (radius * 2) * 0.3;
    const opacity = 0.3 + (z + radius) / (radius * 2) * 0.7;
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(z)
    };
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Certifications & Learning
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
              A journey of continuous growth through industry-recognized certifications and hands-on training
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Rotating Carousel */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative h-[500px] perspective-[2000px]"
            style={{ perspective: '2000px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md h-96 preserve-3d">
                {mainCertifications.map((cert, index) => {
                  const style = getCarouselTransform(index);
                  const Icon = cert.icon;
                  
                  return (
                    <motion.div
                      key={cert.id}
                      className="absolute top-1/2 left-1/2 w-80 -ml-40 -mt-48 cursor-pointer"
                      style={style}
                      onClick={() => setActiveCard(index)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Glass card with hover glow */}
                      <div className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 
                                      hover:border-white/40 transition-all duration-500 group
                                      shadow-2xl ${cert.glow} hover:shadow-2xl overflow-hidden`}>
                        {/* Animated gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 
                                        group-hover:opacity-20 transition-opacity duration-500`} />
                        
                        {/* Light reflection sweep on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                          -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} 
                                          flex items-center justify-center mb-6 shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent 
                                         group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 
                                         group-hover:bg-clip-text transition-all">
                            {cert.name}
                          </h3>
                          
                          <p className="text-gray-400 mb-4 font-medium">{cert.issuer}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{cert.date}</span>
                            <Award className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>

                        {/* Corner accent */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${cert.color} 
                                        opacity-20 blur-2xl rounded-full`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {mainCertifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeCard 
                    ? 'bg-white w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8" ref={timelineRef}>
        <div className="max-w-5xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
              style={{ scaleY: timelineHeight }}
            />
          </div>

          {/* Training Courses Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full 
                              bg-blue-500 shadow-lg shadow-blue-500/50 z-10" />
              
              {/* Content */}
              <div className="md:text-right md:pr-12">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 
                               bg-clip-text text-transparent">
                  Training Courses
                </h2>
                <p className="text-gray-400 mb-8">Comprehensive development programs from NxtWave</p>
              </div>
              
              {/* Cards */}
              <div className="space-y-4 md:pl-12">
                {trainingCourses.map((course, index) => {
                  const Icon = course.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 
                                 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 
                                 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 
                                        flex items-center justify-center flex-shrink-0 shadow-lg
                                        group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                            {course.name}
                          </h3>
                          <p className="text-sm text-gray-400">{course.provider}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Workshops Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full 
                              bg-purple-500 shadow-lg shadow-purple-500/50 z-10" />
              
              {/* Cards (on left for alternating layout) */}
              <div className="space-y-4 md:pr-12 md:text-right order-2 md:order-1">
                {workshops.map((workshop, index) => {
                  const Icon = workshop.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: -10 }}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 
                                 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 
                                 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 md:flex-row-reverse md:justify-end">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 
                                        flex items-center justify-center flex-shrink-0 shadow-lg
                                        group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
                            {workshop.name}
                          </h3>
                          <p className="text-sm text-gray-400">{workshop.provider}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Content */}
              <div className="md:pl-12 order-1 md:order-2 mb-8 md:mb-0">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 
                               bg-clip-text text-transparent">
                  Workshops & Hands-On Learning
                </h2>
                <p className="text-gray-400">Practical experience in cutting-edge technologies</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating particles animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-32" />
    </div>
  );
};

export default CertificationsShowcase;