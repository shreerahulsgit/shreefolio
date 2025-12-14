import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Sample project data with rich information
const projects = [
    {
        id: 1,
        title: 'AI-Powered Analytics Dashboard',
        description:
            'A sophisticated real-time analytics platform with machine learning insights and predictive modeling capabilities. Features include custom data visualization, anomaly detection, and automated reporting.',
        techStack: ['React', 'TypeScript', 'TensorFlow.js', 'D3.js', 'Node.js'],
        images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
        ],
        liveDemo: '#',
        github: '#',
        year: 'June 2024',
    },
    {
        id: 2,
        title: 'Blockchain DeFi Platform',
        description:
            'Decentralized finance application with smart contract integration, wallet management, and token swapping features. Built with security-first architecture and optimized gas efficiency.',
        techStack: [
            'Next.js',
            'Web3.js',
            'Solidity',
            'Tailwind CSS',
            'Ethers.js',
        ],
        images: [
            'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop',
        ],
        liveDemo: '#',
        github: '#',
        year: 'February 2024',
    },
    {
        id: 3,
        title: 'Social Media Management Suite',
        description:
            'Comprehensive tool for scheduling posts, analyzing engagement metrics, and managing multiple social platforms from one dashboard. Supports team collaboration and advanced analytics.',
        techStack: ['Vue.js', 'Firebase', 'Chart.js', 'Express', 'Redis'],
        images: [
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop',
        ],
        liveDemo: '#',
        github: '#',
        year: 'September 2023',
    },
    {
        id: 4,
        title: 'E-Commerce AR Experience',
        description:
            'Revolutionary shopping platform with augmented reality features allowing customers to visualize products in their space. Includes real-time 3D rendering and spatial mapping.',
        techStack: ['React Native', 'AR.js', 'Three.js', 'MongoDB', 'AWS'],
        images: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
        ],
        liveDemo: '#',
        github: '#',
        year: 'April 2023',
    },
];

const ProjectsShowcase = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Ref for scroll-linked timeline animation
    const timelineRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Track scroll progress for timeline fill animation
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start center', 'end center'],
    });

    // Transform scroll progress to height percentage for timeline fill
    const timelineHeight = useTransform(
        scrollYProgress,
        [0, 1],
        ['0%', '100%']
    );

    // Carousel navigation functions
    const nextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) =>
                prev === selectedProject.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedProject.images.length - 1 : prev - 1
            );
        }
    };

    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const closeModal = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            {/* Animated gradient background with subtle glow */}
            <div className="absolute inset-0 opacity-40">
                <motion.div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 150, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -150, 0],
                        scale: [1, 1.4, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Floating particles for depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-30, -150],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>

            {/* Header Section with Apple-style glassmorphism */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 pt-16 pb-16 text-center"
            >
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="inline-block mb-6"
                >
                    <Sparkles className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                </motion.div>
                <h1 className="text-6xl font-extralight text-white mb-4 tracking-tight">
                    Featured Projects
                </h1>
                <p className="text-gray-400 text-xl font-light max-w-2.5xl mx-auto leading-relaxed">
                    A curated collection of innovative solutions crafted with
                    precision and creativity
                </p>
            </motion.div>

            {/* Timeline Container with scroll-linked animation */}
            <div
                ref={timelineRef}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32"
            >
                {/* Background timeline line (dim/unfilled) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-32 w-[2px] bg-white/10" />

                {/* Animated timeline fill - grows with scroll progress */}
                <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    style={{ height: timelineHeight }}
                />

                {/* Project Timeline Nodes */}
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        // Scroll-triggered entrance animation
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.15,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className={`relative mb-24 ${
                            index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                    >
                        {/* Timeline Node (circle on the line) */}
                        <motion.div
                            className="absolute left-1/2 -ml-[13.75px] transform -translate-x-1/2 top-1 z-20"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.15 + 0.3,
                                type: 'spring',
                            }}
                        >
                            {/* Outer glow ring */}
                            <motion.div
                                className="absolute inset-0 w-7 h-7 bg-cyan-400 rounded-full opacity-40 blur-sm"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            {/* Main node */}
                            <div className="relative w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-4 border-[#0a0a0a] shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                        </motion.div>

                        {/* Year Badge above timeline node */}
                        <motion.div
                            className={`absolute z-30 top-0 ${
                                index % 2 === 0
                                    ? 'md:left-[52.75%] left-1/2 -translate-x-1/2'
                                    : 'md:right-[52.75%] right-1/2 translate-x-1/2'
                            }`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + 0.4 }}
                        >
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 text-gray-300 text-sm font-light shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                                {project.year}
                            </div>
                        </motion.div>

                        {/* Project Card - Apple Glassmorphism Style */}
                        <motion.div
                            className={`inline-block w-full md:w-[47%] ${
                                index % 2 === 0 ? 'md:mr-[53%]' : 'md:ml-[53%]'
                            }`}
                            // Hover animation with scale and glow
                            whileHover={{
                                scale: 1.03,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1],
                                },
                            }}
                            onHoverStart={() => setHoveredCard(project.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            onClick={() => openModal(project)}
                        >
                            <div
                                className={`
                relative bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-3xl p-8 cursor-pointer group overflow-hidden
                shadow-[0_0_25px_rgba(255,255,255,0.1)]
                transition-all duration-300
                ${hoveredCard === project.id ? 'border-cyan-400/60 shadow-[0_0_35px_rgba(34,211,238,0.3)]' : ''}
              `}
                            >
                                {/* Animated glow sweep effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{
                                        x:
                                            hoveredCard === project.id
                                                ? '100%'
                                                : '-100%',
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Corner accent glow */}
                                <motion.div
                                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-br-3xl"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity:
                                            hoveredCard === project.id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Project preview image with glass overlay */}
                                <div className="relative mb-6 rounded-2xl overflow-hidden h-52 bg-black/40 border border-white/10">
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 ease-out"
                                    />
                                    {/* Dark gradient overlay for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Floating tech count badge */}
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-xs text-white font-light">
                                        {project.techStack.length} Technologies
                                    </div>
                                </div>

                                {/* Project title with hover color transition */}
                                <h3 className="text-3xl font-extralight text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                                    {project.title}
                                </h3>

                                {/* Project description */}
                                <p className="text-gray-400 text-sm font-light mb-6 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.techStack
                                        .slice(0, 4)
                                        .map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay:
                                                        index * 0.15 +
                                                        0.5 +
                                                        i * 0.05,
                                                }}
                                                className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-300 font-light"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    {project.techStack.length > 4 && (
                                        <span className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-300 font-light">
                                            +{project.techStack.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* View Details CTA */}
                                <motion.div
                                    className="flex items-center gap-2 text-cyan-400 text-sm font-light"
                                    animate={{
                                        x: hoveredCard === project.id ? 8 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span>Explore Project</span>
                                    <ExternalLink className="w-4 h-4" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Modal with 3D Carousel - Apple Glassmorphism */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        // Backdrop fade-in animation
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl"
                        onClick={closeModal}
                    >
                        {/* Modal content with scale + opacity animation */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 300,
                                duration: 0.5,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-10 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                        >
                            {/* 3D Image Carousel */}
                            <div className="relative h-[400px] mb-8 rounded-2xl overflow-hidden bg-black/40 border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={
                                            selectedProject.images[
                                                currentImageIndex
                                            ]
                                        }
                                        alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                                        // 3D carousel transition effect
                                        initial={{
                                            opacity: 0,
                                            x: 300,
                                            rotateY: 45,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            rotateY: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -300,
                                            rotateY: -45,
                                            scale: 0.8,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Carousel navigation arrows */}
                                <motion.button
                                    onClick={prevImage}
                                    whileHover={{ scale: 1.1, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    <ChevronLeft className="w-7 h-7 text-white" />
                                </motion.button>
                                <motion.button
                                    onClick={nextImage}
                                    whileHover={{ scale: 1.1, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    <ChevronRight className="w-7 h-7 text-white" />
                                </motion.button>

                                {/* Image position indicators */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                    {selectedProject.images.map((_, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() =>
                                                setCurrentImageIndex(i)
                                            }
                                            whileHover={{ scale: 1.2 }}
                                            className={`h-2 rounded-full transition-all ${
                                                i === currentImageIndex
                                                    ? 'bg-cyan-400 w-10 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                                                    : 'bg-white/30 hover:bg-white/50 w-2'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Project detailed information */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-5xl font-extralight text-white mb-5"
                            >
                                {selectedProject.title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-300 text-lg font-light mb-8 leading-relaxed"
                            >
                                {selectedProject.description}
                            </motion.p>

                            {/* Full tech stack display */}
                            <div className="mb-10">
                                <h3 className="text-sm text-gray-400 font-light mb-4 uppercase tracking-widest">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProject.techStack.map(
                                        (tech, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                    y: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: 0.4 + i * 0.05,
                                                }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    y: -2,
                                                }}
                                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-2.5 text-sm text-white font-light shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                            >
                                                {tech}
                                            </motion.span>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Action buttons with glass effect */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.a
                                    href={selectedProject.liveDemo}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl px-6 py-4 flex items-center justify-center gap-3 font-light transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    <span>View Live Demo</span>
                                </motion.a>
                                <motion.a
                                    href={selectedProject.github}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white rounded-xl px-6 py-4 flex items-center justify-center gap-3 font-light transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>View Source Code</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsShowcase;
