import React, { useState, useEffect } from 'react';
import {
    SiExpress, SiNodedotjs, SiHtml5, SiCss3, SiBootstrap, SiTailwindcss, SiFigma, SiCplusplus, 
    SiPython, SiJavascript, SiMysql, SiMongodb, SiAmazon, SiGit, SiGithub, SiAndroid, SiApple, SiLinux,
} from 'react-icons/si';
import {
    FaPenNib, FaRulerCombined, FaCode, FaPalette, FaGlobe, FaDatabase, FaTools,
} from 'react-icons/fa';
import GalaxyBackground from '../../lib/components/backgrounds/galaxy-background.jsx';

const skillCategories = [
    {
        category: 'Programming Languages',
        icon: FaCode,
        gradient: 'from-blue-400 to-purple-500',
        skills: [
            {
                name: 'C++',
                icon: SiCplusplus,
                description:
                    'Powerful general-purpose language for system programming.',
                fluency: 75,
                url: 'https://isocpp.org',
                color: '#00599C',
            },
            {
                name: 'Python',
                icon: SiPython,
                description:
                    'Versatile language for web, data science, and automation.',
                fluency: 87,
                url: 'https://python.org',
                color: '#3776AB',
            },
            {
                name: 'JavaScript',
                icon: SiJavascript,
                description:
                    'Dynamic scripting language powering modern web experiences.',
                fluency: 93,
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                color: '#F7DF1E',
            },
        ],
    },
    {
        category: 'UI / UX Design',
        icon: FaPalette,
        gradient: 'from-pink-400 to-rose-500',
        skills: [
            {
                name: 'Figma',
                icon: SiFigma,
                description:
                    'Collaborative interface design tool for modern teams.',
                fluency: 82,
                url: 'https://figma.com',
                color: '#F24E1E',
            },
            {
                name: 'Wireframing',
                icon: FaRulerCombined,
                description:
                    'Creating blueprint layouts for user interface structure.',
                fluency: 85,
                url: 'https://www.nngroup.com/articles/wireflows/',
                color: '#64748B',
            },
            {
                name: 'Prototyping',
                icon: FaPenNib,
                description:
                    'Building interactive mockups to test user experience flows.',
                fluency: 83,
                url: 'https://www.interaction-design.org/literature/topics/prototyping',
                color: '#A855F7',
            },
        ],
    },
    {
        category: 'Web Development',
        icon: FaGlobe,
        gradient: 'from-green-400 to-emerald-500',
        skills: [
            {
                name: 'Express.js',
                icon: SiExpress,
                description:
                    'Fast, minimalist web framework for Node.js applications.',
                fluency: 85,
                url: 'https://expressjs.com',
                color: '#FFFFFF',
            },
            {
                name: 'Node.js',
                icon: SiNodedotjs,
                description:
                    "JavaScript runtime built on Chrome's V8 engine for scalable apps.",
                fluency: 88,
                url: 'https://nodejs.org',
                color: '#339933',
            },
            {
                name: 'HTML',
                icon: SiHtml5,
                description:
                    'The standard markup language for creating web pages.',
                fluency: 95,
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
                color: '#E34F26',
            },
            {
                name: 'CSS',
                icon: SiCss3,
                description:
                    'Style sheet language for designing beautiful web interfaces.',
                fluency: 92,
                url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                color: '#1572B6',
            },
            {
                name: 'Bootstrap',
                icon: SiBootstrap,
                description:
                    'Popular CSS framework for responsive, mobile-first design.',
                fluency: 80,
                url: 'https://getbootstrap.com',
                color: '#7952B3',
            },
            {
                name: 'Tailwind CSS',
                icon: SiTailwindcss,
                description:
                    'Utility-first CSS framework for rapid UI development.',
                fluency: 90,
                url: 'https://tailwindcss.com',
                color: '#06B6D4',
            },
        ],
    },
    {
        category: 'Database Management',
        icon: FaDatabase,
        gradient: 'from-cyan-400 to-blue-500',
        skills: [
            {
                name: 'MySQL',
                icon: SiMysql,
                description:
                    'Reliable open-source relational database management system.',
                fluency: 81,
                url: 'https://mysql.com',
                color: '#4479A1',
            },
            {
                name: 'MongoDB',
                icon: SiMongodb,
                description:
                    'Flexible NoSQL database for modern application development.',
                fluency: 84,
                url: 'https://mongodb.com',
                color: '#47A248',
            },
        ],
    },
    {
        category: 'Tools & Platforms',
        icon: FaTools,
        gradient: 'from-orange-400 to-red-500',
        skills: [
            {
                name: 'AWS',
                icon: SiAmazon,
                description:
                    'Comprehensive cloud platform with scalable computing services.',
                fluency: 72,
                url: 'https://aws.amazon.com',
                color: '#FF9900',
            },
            {
                name: 'Git',
                icon: SiGit,
                description:
                    'Distributed version control for tracking code changes.',
                fluency: 88,
                url: 'https://git-scm.com',
                color: '#F05032',
            },
            {
                name: 'GitHub',
                icon: SiGithub,
                description:
                    'Platform for hosting and collaborating on Git repositories.',
                fluency: 90,
                url: 'https://github.com',
                color: '#FFFFFF',
            },
            {
                name: 'Android',
                icon: SiAndroid,
                description:
                    'Open-source mobile OS powering billions of devices.',
                fluency: 78,
                url: 'https://developer.android.com',
                color: '#3DDC84',
            },
            {
                name: 'iOS',
                icon: SiApple,
                description:
                    "Apple's mobile operating system for iPhone and iPad.",
                fluency: 70,
                url: 'https://developer.apple.com/ios',
                color: '#FFFFFF',
            },
            {
                name: 'Linux',
                icon: SiLinux,
                description:
                    'Open-source Unix-like OS for servers and development.',
                fluency: 80,
                url: 'https://kernel.org',
                color: '#FCC624',
            },
        ],
    },
];

const SkillCard = ({ skill, delay }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const Icon = skill.icon;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                background: 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                    ? `0 20px 60px ${skill.color}40, 0 0 40px ${skill.color}30`
                    : '0 8px 32px rgba(0, 0, 0, 0.4)',
                transform: isVisible
                    ? (isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)')
                    : 'translateY(20px) scale(0.95)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(circle at 30% 50%, ${skill.color}15, transparent 70%)`,
                }}
            />

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                    background: `linear-gradient(120deg, transparent, ${skill.color}20, transparent)`,
                    animation: isHovered ? 'shimmer 2s infinite' : 'none',
                }}
            />

            <div className="p-6 h-full flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="text-4xl transition-all duration-500 ease-out relative"
                        style={{
                            color: skill.color,
                            transform: isHovered
                                ? 'scale(1.2) rotate(5deg) translateY(-4px)'
                                : 'scale(1)',
                            filter: isHovered
                                ? `drop-shadow(0 8px 16px ${skill.color}60) brightness(1.2)`
                                : `drop-shadow(0 2px 4px ${skill.color}30)`,
                        }}
                    >
                        <Icon />
                        {isHovered && (
                            <div
                                className="absolute inset-0 blur-2xl"
                                style={{
                                    backgroundColor: skill.color,
                                    opacity: 0.4,
                                    animation: 'pulse 2s infinite',
                                }}
                            />
                        )}
                    </div>
                    <h3
                        className="text-xl font-semibold transition-all duration-300"
                        style={{
                            color: isHovered ? skill.color : '#E5E7EB',
                        }}
                    >
                        {skill.name}
                    </h3>
                </div>

                <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                    {skill.description}
                </p>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                            Fluency
                        </span>
                        <span
                            className="text-sm font-bold transition-all duration-300"
                            style={{
                                color: skill.color,
                                opacity: isHovered ? 1 : 0.8,
                                transform: isHovered
                                    ? 'scale(1.15)'
                                    : 'scale(1)',
                                textShadow: isHovered
                                    ? `0 0 10px ${skill.color}80`
                                    : 'none',
                            }}
                        >
                            {skill.fluency}%
                        </span>
                    </div>

                    <div
                        className="h-2.5 rounded-full overflow-hidden relative transition-opacity duration-300"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            opacity: isHovered ? 1 : 0,
                        }}
                    >
                        {isHovered && (
                            <div
                                className="absolute inset-0 blur-md"
                                style={{
                                    background: `linear-gradient(90deg, ${skill.color}50, ${skill.color}70)`,
                                }}
                            />
                        )}

                        <div
                            className="h-full rounded-full transition-all duration-1000 ease-out relative"
                            style={{
                                width: isHovered ? `${skill.fluency}%` : '0%',
                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                                boxShadow: isHovered
                                    ? `0 0 20px ${skill.color}80`
                                    : 'none',
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                    animation: isHovered
                                        ? 'shine 2s infinite'
                                        : 'none',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `inset 0 0 30px ${skill.color}25`,
                }}
            />

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(200%);
                    }
                }
                @keyframes shine {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(200%);
                    }
                }
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 0.4;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }
            `}</style>
        </div>
    );
};

const CategorySection = ({ category, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const CategoryIcon = category.icon;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 150);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div
            className={`mb-16 transition-all duration-1000 ${
                isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-12'
            }`}
        >
            <div
                className="relative overflow-hidden rounded-2xl mb-8 group cursor-default"
                style={{
                    background: 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                }}
            >
                <div className="p-6 flex items-center gap-4">
                    <div
                        className="text-3xl text-white/70 transition-transform duration-500 group-hover:scale-110"
                    >
                        <CategoryIcon />
                    </div>
                    <h2
                        className="text-3xl font-bold text-white"
                    >
                        {category.category}
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-gray-600 to-transparent ml-4" />
                    <span className="text-sm font-medium text-gray-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                        {category.skills.length} skills
                    </span>
                </div>

                <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(to right, transparent, ${category.skills[0]?.color}90, transparent)`,
                    }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, idx) => (
                    <SkillCard
                        key={idx}
                        skill={skill}
                        delay={index * 200 + idx * 100}
                    />
                ))}
            </div>
        </div>
    );
};

const RadialSkillTree = ({ categories }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSkill, setActiveSkill] = useState(null);
    const [rotation, setRotation] = useState(0);

    const primaryColor = "#8B5CF6";
    const secondaryColor = "#FFFFFF";

    useEffect(() => {
        const interval = setInterval(() => {
            if (!activeCategory && !activeSkill) {
                setRotation(prev => (prev + 0.08) % 360);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [activeCategory, activeSkill]);

    const getCategoryPosition = (index, total) => {
        const baseAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const animatedAngle = baseAngle + (rotation * Math.PI / 180);
        const radius = 280;
        return {
            x: Math.cos(animatedAngle) * radius,
            y: Math.sin(animatedAngle) * radius,
            angle: animatedAngle,
        };
    };

    const getSkillPosition = (skillIndex, totalSkills, categoryAngle) => {
        const spreadAngle = Math.PI * 0.6;
        const startAngle = categoryAngle - spreadAngle / 2;
        const angleStep = totalSkills > 1 ? spreadAngle / (totalSkills - 1) : 0;
        const skillAngle = startAngle + (skillIndex * angleStep);
        const radius = 160;
        return {
            x: Math.cos(skillAngle) * radius,
            y: Math.sin(skillAngle) * radius,
        };
    };

    return (
        <div 
            className="relative"
            style={{ minHeight: "1000px" }}
        >
            <style>{`
                @keyframes energyPulse {
                    0%, 20% { 
                        stroke-width: 2.5;
                        stroke: rgba(255,255,255,0.75);
                        filter: drop-shadow(0 0 4px rgba(255,255,255,0.5));
                    }
                    35% { 
                        stroke-width: 6;
                        stroke: #8B5CF6;
                        filter: drop-shadow(0 0 18px #8B5CF6);
                    }
                    50%, 100% { 
                        stroke-width: 2.5;
                        stroke: rgba(255,255,255,0.75);
                        filter: drop-shadow(0 0 4px rgba(255,255,255,0.5));
                    }
                }
                @keyframes energyPulseSkill {
                    0%, 35% { 
                        stroke-width: 2;
                        stroke: rgba(255,255,255,0.65);
                        filter: drop-shadow(0 0 3px rgba(255,255,255,0.4));
                    }
                    50% { 
                        stroke-width: 5;
                        stroke: #8B5CF6;
                        filter: drop-shadow(0 0 14px #8B5CF6);
                    }
                    65%, 100% { 
                        stroke-width: 2;
                        stroke: rgba(255,255,255,0.65);
                        filter: drop-shadow(0 0 3px rgba(255,255,255,0.4));
                    }
                }
                @keyframes pulseGlow {
                    0%, 100% { 
                        box-shadow: 0 0 80px rgba(139,92,246,0.2), inset 0 0 40px rgba(139,92,246,0.1);
                        transform: translate(-50%, -50%) scale(1);
                    }
                    15% { 
                        box-shadow: 0 0 200px rgba(139,92,246,0.8), inset 0 0 100px rgba(139,92,246,0.4);
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                    30%, 100% { 
                        box-shadow: 0 0 80px rgba(139,92,246,0.2), inset 0 0 40px rgba(139,92,246,0.1);
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                @keyframes categoryPulse {
                    0%, 25% {
                        box-shadow: 0 0 25px rgba(255,255,255,0.2);
                        border-color: rgba(255,255,255,0.5);
                    }
                    40% {
                        box-shadow: 0 0 60px rgba(139,92,246,0.7), 0 0 30px rgba(139,92,246,0.5);
                        border-color: #8B5CF6;
                    }
                    55%, 100% {
                        box-shadow: 0 0 25px rgba(255,255,255,0.2);
                        border-color: rgba(255,255,255,0.5);
                    }
                }
                @keyframes skillNodePulse {
                    0%, 40% {
                        box-shadow: 0 0 15px rgba(255,255,255,0.15);
                        border-color: rgba(255,255,255,0.45);
                    }
                    55% {
                        box-shadow: 0 0 40px rgba(139,92,246,0.7), 0 0 20px rgba(139,92,246,0.5);
                        border-color: #8B5CF6;
                    }
                    70%, 100% {
                        box-shadow: 0 0 15px rgba(255,255,255,0.15);
                        border-color: rgba(255,255,255,0.45);
                    }
                }
                .energy-line {
                    animation: energyPulse 2.5s ease-in-out infinite;
                }
                .energy-line-skill {
                    animation: energyPulseSkill 2.5s ease-in-out infinite;
                }
                .category-node {
                    animation: categoryPulse 2.5s ease-in-out infinite;
                }
                .skill-node {
                    animation: skillNodePulse 2.5s ease-in-out infinite;
                }
            `}</style>

            <div 
                className="absolute left-1/2 top-1/2 z-20"
                style={{
                    width: "160px",
                    height: "160px",
                    background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 120px rgba(139,92,246,0.4), inset 0 0 60px rgba(139,92,246,0.1)",
                    border: "2px solid rgba(139,92,246,0.3)",
                    transform: "translate(-50%, -50%)",
                    animation: "pulseGlow 2.5s ease-in-out infinite",
                }}
            >
                <span className="text-white/80 text-2xl font-bold tracking-widest">SKILLS</span>
            </div>

            <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: "560px",
                    height: "560px",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            />
            <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: "320px",
                    height: "320px",
                    border: "1px dashed rgba(255,255,255,0.06)",
                }}
            />

            {categories.map((category, catIndex) => {
                const catPos = getCategoryPosition(catIndex, categories.length);
                const CategoryIcon = category.icon;
                const isActiveCategory = activeCategory === catIndex;

                return (
                    <div key={category.category}>
                        <svg 
                            className="absolute left-1/2 top-1/2 pointer-events-none"
                            style={{
                                width: "1px",
                                height: "1px",
                                overflow: "visible",
                            }}
                        >
                            <line
                                className="energy-line"
                                x1="0"
                                y1="0"
                                x2={catPos.x}
                                y2={catPos.y}
                                stroke={isActiveCategory ? secondaryColor : `${primaryColor}90`}
                                strokeWidth={isActiveCategory ? "3" : "2.5"}
                                style={{ 
                                    filter: `drop-shadow(0 0 ${isActiveCategory ? '8' : '4'}px ${primaryColor})`,
                                }}
                            />
                        </svg>

                        <div
                            className="absolute left-1/2 top-1/2 cursor-pointer z-10"
                            style={{
                                transform: `translate(calc(-50% + ${catPos.x}px), calc(-50% + ${catPos.y}px)) scale(${isActiveCategory ? 1.2 : 1})`,
                                transition: activeCategory !== null || activeSkill !== null ? "transform 0.3s ease" : "none",
                            }}
                            onMouseEnter={() => setActiveCategory(catIndex)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <div
                                className="relative flex items-center justify-center transition-all duration-300 category-node"
                                style={{
                                    width: isActiveCategory ? "100px" : "85px",
                                    height: isActiveCategory ? "100px" : "85px",
                                    background: isActiveCategory 
                                        ? `radial-gradient(circle, ${primaryColor}50 0%, ${primaryColor}20 60%, transparent 100%)`
                                        : "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)",
                                    borderRadius: "50%",
                                    border: isActiveCategory ? `3px solid ${secondaryColor}` : "2px solid rgba(255,255,255,0.5)",
                                    boxShadow: isActiveCategory 
                                        ? `0 0 60px ${primaryColor}70, inset 0 0 25px ${primaryColor}30`
                                        : "0 0 25px rgba(255,255,255,0.2)",
                                }}
                            >
                                <CategoryIcon 
                                    style={{ 
                                        fontSize: isActiveCategory ? "2.2rem" : "1.8rem",
                                        color: isActiveCategory ? secondaryColor : "rgba(255,255,255,0.8)",
                                        transition: "all 0.3s ease",
                                        filter: isActiveCategory ? `drop-shadow(0 0 10px ${primaryColor})` : "drop-shadow(0 0 3px rgba(255,255,255,0.3))",
                                    }} 
                                />
                            </div>

                            <div 
                                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300"
                                style={{
                                    top: "100%",
                                    marginTop: "8px",
                                    opacity: isActiveCategory ? 1 : 0.6,
                                }}
                            >
                                <span className="text-xs text-white/80 font-medium">{category.category}</span>
                            </div>

                            {category.skills.map((skill, skillIndex) => {
                                const skillPos = getSkillPosition(skillIndex, category.skills.length, catPos.angle);
                                const SkillIcon = skill.icon;
                                const isActiveSkillNode = activeSkill?.catIndex === catIndex && activeSkill?.skillIndex === skillIndex;
                                
                                return (
                                    <div key={skill.name}>
                                        <svg 
                                            className="absolute left-1/2 top-1/2 pointer-events-none"
                                            style={{
                                                width: "1px",
                                                height: "1px",
                                                overflow: "visible",
                                                opacity: isActiveCategory ? 1 : 0.6,
                                                transition: "opacity 0.3s ease",
                                            }}
                                        >
                                            <line
                                                className="energy-line-skill"
                                                x1="0"
                                                y1="0"
                                                x2={skillPos.x}
                                                y2={skillPos.y}
                                                stroke={isActiveSkillNode ? secondaryColor : primaryColor}
                                                strokeWidth={isActiveSkillNode ? "2" : "1.5"}
                                                style={{
                                                    filter: `drop-shadow(0 0 ${isActiveSkillNode ? '5' : '3'}px ${primaryColor})`,
                                                }}
                                            />
                                        </svg>

                                        <div
                                            className="absolute left-1/2 top-1/2 cursor-pointer"
                                            style={{
                                                transform: `translate(calc(-50% + ${skillPos.x}px), calc(-50% + ${skillPos.y}px)) scale(${isActiveSkillNode ? 1.25 : 1})`,
                                                opacity: isActiveCategory ? 1 : 0.5,
                                                transition: "all 0.3s ease",
                                                zIndex: isActiveSkillNode ? 30 : 5,
                                            }}
                                            onMouseEnter={() => setActiveSkill({ catIndex, skillIndex })}
                                            onMouseLeave={() => setActiveSkill(null)}
                                        >
                                            <div
                                                className="flex items-center justify-center transition-all duration-300 skill-node"
                                                style={{
                                                    width: isActiveSkillNode ? "60px" : "50px",
                                                    height: isActiveSkillNode ? "60px" : "50px",
                                                    background: isActiveSkillNode 
                                                        ? `radial-gradient(circle, ${primaryColor}60 0%, ${primaryColor}25 60%, transparent 100%)`
                                                        : "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)",
                                                    borderRadius: "50%",
                                                    border: isActiveSkillNode 
                                                        ? `2px solid ${secondaryColor}`
                                                        : "1.5px solid rgba(255,255,255,0.45)",
                                                    boxShadow: isActiveSkillNode 
                                                        ? `0 0 35px ${primaryColor}80`
                                                        : "0 0 15px rgba(255,255,255,0.15)",
                                                }}
                                            >
                                                <SkillIcon 
                                                    style={{ 
                                                        fontSize: isActiveSkillNode ? "1.5rem" : "1.2rem",
                                                        color: isActiveSkillNode ? secondaryColor : "rgba(255,255,255,0.75)",
                                                        transition: "all 0.3s ease",
                                                        filter: isActiveSkillNode ? `drop-shadow(0 0 6px ${primaryColor})` : "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
                                                    }} 
                                                />
                                            </div>

                                            {isActiveSkillNode && (
                                                <div
                                                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                                                    style={{
                                                        top: "100%",
                                                        marginTop: "10px",
                                                        width: "200px",
                                                        zIndex: 50,
                                                    }}
                                                >
                                                    <div
                                                        className="p-3 rounded-lg text-center"
                                                        style={{
                                                            background: "rgba(10, 10, 10, 0.95)",
                                                            backdropFilter: "blur(20px)",
                                                            border: `1px solid ${primaryColor}40`,
                                                            boxShadow: `0 15px 40px rgba(0,0,0,0.5), 0 0 20px ${primaryColor}20`,
                                                        }}
                                                    >
                                                        <h4 className="text-white font-semibold text-sm mb-1">{skill.name}</h4>
                                                        <p className="text-gray-500 text-xs mb-2">{skill.description}</p>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="text-xs text-gray-600">Fluency</span>
                                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                                <div 
                                                                    className="h-full rounded-full"
                                                                    style={{
                                                                        width: `${skill.fluency}%`,
                                                                        background: primaryColor,
                                                                        boxShadow: `0 0 8px ${primaryColor}`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-white">{skill.fluency}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const SkillsMain = () => {
    const [activeTab, setActiveTab] = useState('skills');

    const CertificatesContent = React.lazy(() => 
        import('./certificates-page.jsx').then(module => ({ default: module.CertificatesContent }))
    );

    return (
        <div className="min-h-screen pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <GalaxyBackground variant={activeTab === 'skills' ? 'tilted' : 'default'} />

            <div
                className="fixed inset-0 z-1 pointer-events-none"
                style={{ background: 'rgba(0, 0, 0, 0.2)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                        {activeTab === 'skills' ? 'Technical Skills' : 'Certificates'}
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        {activeTab === 'skills' 
                            ? 'Technologies and tools I work with, organized by domain.'
                            : 'Courses completed and skills validated through structured learning.'
                        }
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <div 
                        className="inline-flex p-1 rounded-xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                activeTab === 'skills'
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/50 hover:text-white/80'
                            }`}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => setActiveTab('certificates')}
                            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                activeTab === 'certificates'
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/50 hover:text-white/80'
                            }`}
                        >
                            Certificates
                        </button>
                    </div>
                </div>

                {activeTab === 'skills' ? (
                    <RadialSkillTree categories={skillCategories} />
                ) : (
                    <React.Suspense fallback={
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                        </div>
                    }>
                        <CertificatesContent />
                    </React.Suspense>
                )}
            </div>
        </div>
    );
};

export default SkillsMain;

