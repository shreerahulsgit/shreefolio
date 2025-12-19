import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SiExpress, SiNodedotjs, SiHtml5, SiCss3, SiBootstrap, SiTailwindcss, SiFigma, SiCplusplus, 
    SiPython, SiJavascript, SiMysql, SiMongodb, SiAmazon, SiGit, SiGithub, SiAndroid, SiApple, SiLinux,
} from 'react-icons/si';
import {
    FaPenNib, FaRulerCombined, FaCode, FaPalette, FaGlobe, FaDatabase, FaTools, FaCertificate,
} from 'react-icons/fa';
import LoadingOverlay from '../../lib/components/loading-overlay.jsx';
import SplineMasking from '../../lib/components/spline-masking.jsx';
import Spline from '@splinetool/react-spline';

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

    const handleClick = () => {
        window.open(skill.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out group ${
                isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{
                background: 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                    ? `0 20px 60px ${skill.color}40, 0 0 40px ${skill.color}30`
                    : '0 8px 32px rgba(0, 0, 0, 0.4)',
                transform: isHovered
                    ? 'translateY(-8px) scale(1.02)'
                    : 'translateY(0) scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(circle at 30% 50%, ${skill.color}15, transparent 70%)`,
                }}
            />

            {/* Shimmer effect */}
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
                        {/* Background glow */}
                        {isHovered && (
                            <div
                                className="absolute inset-0 blur-md"
                                style={{
                                    background: `linear-gradient(90deg, ${skill.color}50, ${skill.color}70)`,
                                }}
                            />
                        )}

                        {/* Progress bar */}
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
                        className={`text-3xl bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent transition-transform duration-500 group-hover:scale-110`}
                    >
                        <CategoryIcon />
                    </div>
                    <h2
                        className={`text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
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

const SkillsMain = () => {
    const navigate = useNavigate();
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [splineError, setSplineError] = useState(false);

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                {!splineError ? (
                    <Spline
                        scene="https://prod.spline.design/G37RxiKQ-OEWy4XU/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                        onError={() => setSplineError(true)}
                    />
                ) : (
                    <div
                        style={{
                            background:
                                'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                )}
            </div>

            <div
                className="fixed inset-0 z-1 pointer-events-none"
                style={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div
                        className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-medium"
                        style={{
                            background: 'rgba(40, 40, 40, 0.8)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
                            color: '#E5E7EB',
                        }}
                    >
                        ✨ Explore My Expertise
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
                        Technical Skills
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Hover over each skill to see proficiency levels and
                        click to explore official documentation.
                        <br />
                        <span className="text-base text-gray-400 mt-2 inline-block">
                            Organized by expertise domain for easy navigation
                        </span>
                    </p>
                </div>

                {skillCategories.map((category, index) => (
                    <CategorySection
                        key={index}
                        category={category}
                        index={index}
                    />
                ))}

                {/* Certificate Button */}
                <div className="text-center mt-16 mb-24">
                    <button
                        onClick={() => navigate('/skills/certificates')}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                                style={{
                                    color: '#3B82F6',
                                    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
                                }}
                            >
                                <FaCertificate className="text-xl" />
                            </div>
                            <span className="text-white font-semibold text-lg group-hover:text-blue-200 transition-colors duration-300">
                                View Certificates
                            </span>
                        </div>

                        {/* Glow effect on hover */}
                        <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                                filter: 'blur(8px)',
                            }}
                        />
                    </button>
                </div>
            </div>

            {!splineLoaded && (
                <LoadingOverlay message="Preparing your skills experience" />
            )}
        </div>
    );
};

export default SkillsMain;
