import { useState, useEffect } from 'react';
import { Phone, MapPin, MessageCircle, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import LoadingOverlay from '../lib/components/loading-overlay.jsx';
import SplineMasking from '../lib/components/spline-masking.jsx';
import Spline from '@splinetool/react-spline';
import Footer from '../lib/components/footer.jsx';

// Glass Card Component with Apple-style shine
const GlassCard = ({ children, className = '', isHovered, onMouseEnter, onMouseLeave, delay = 0, isLoaded }) => {
    return (
        <div
            className={`group relative overflow-hidden backdrop-blur-xl rounded-3xl p-8 md:p-10 transition-all duration-700 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            } ${className}`}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                    ? '0 25px 80px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                transitionDelay: `${delay}ms`,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Top shine line */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                }}
            />
            {/* Glass shine gradient */}
            <div
                className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
                    borderRadius: '24px 24px 0 0',
                }}
            />
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                    transform: isHovered ? 'translateX(200%)' : 'translateX(-200%)',
                    transition: 'transform 1s ease-in-out',
                }}
            />
            {children}
        </div>
    );
};

// Glass Input Component
const GlassInput = ({ type = 'text', id, name, value, onChange, placeholder, required, rows, isTextarea }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const commonProps = {
        id,
        name,
        value,
        onChange,
        placeholder,
        required,
        className: 'w-full px-4 py-3 rounded-2xl backdrop-blur-md outline-none transition-all duration-300 relative z-10',
        style: {
            background: isFocused || isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${isFocused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: isFocused
                ? '0 0 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            color: '#FFFFFF',
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return (
        <div className="relative overflow-hidden rounded-2xl">
            {/* Top shine line */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
                style={{
                    background: isFocused 
                        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'all 0.3s',
                }}
            />
            {isTextarea ? (
                <textarea {...commonProps} rows={rows} className={`${commonProps.className} resize-none`} />
            ) : (
                <input {...commonProps} type={type} />
            )}
        </div>
    );
};

// Glass Button Component
const GlassButton = ({ onClick, children, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full relative overflow-hidden backdrop-blur-md font-semibold px-6 py-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
            style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: isHovered
                    ? '0 20px 60px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
            }}
        >
            {/* Top shine gradient */}
            <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
                    borderRadius: '16px 16px 0 0',
                }}
            />
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)',
                    transform: isHovered ? 'translateX(200%)' : 'translateX(-200%)',
                    transition: 'transform 0.8s ease-in-out',
                }}
            />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// Glass Social Icon Component
const GlassSocialIcon = ({ social }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = social.icon;

    return (
        <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden p-3 backdrop-blur-md rounded-2xl transition-all duration-500"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                    ? '0 15px 40px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transform: isHovered ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)',
                color: isHovered ? '#FFFFFF' : '#9CA3AF',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={social.name}
        >
            {/* Top shine line */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                    background: isHovered
                        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'all 0.3s',
                }}
            />
            {/* Glass shine gradient */}
            <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
                    borderRadius: '16px 16px 0 0',
                }}
            />
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                    transform: isHovered ? 'translateX(200%)' : 'translateX(-200%)',
                    transition: 'transform 0.6s ease-in-out',
                }}
            />
            <Icon
                size={20}
                className="relative z-10 transition-all duration-300"
                style={{
                    filter: isHovered ? 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.3))' : 'none',
                }}
            />
        </a>
    );
};

// Glass Icon Box Component
const GlassIconBox = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative overflow-hidden p-3 rounded-xl transition-all duration-300"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                    ? '0 8px 24px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Top shine */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                }}
            />
            <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                    borderRadius: '12px 12px 0 0',
                }}
            />
            {children}
        </div>
    );
};

const ContactMain = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        message: '',
        agreePrivacy: false,
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setSplineLoaded(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
            messageBox.style.display = 'block';
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 3000);
        }
        setFormData({
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            phoneNumber: '',
            message: '',
            agreePrivacy: false,
        });
    };

    const contactInfo = {
        visitUs: {
            address: '67 Wisteria Way Croydon South VIC 3156 AU',
            description: 'Come say hello at our office HQ.',
        },
        chatToUs: {
            email: 'hello@yourportfolio.com',
            description: 'Our friendly team is here to help.',
        },
        callUs: {
            phone: '(+995) 555-55-55-55',
            hours: 'Mon-Fri from 8am to 5pm',
        },
        socialMedia: [
            {
                name: 'Github',
                icon: Github,
                url: 'https://github.com/your-username',
            },
            {
                name: 'Linkedin',
                icon: Linkedin,
                url: 'https://linkedin.com/in/your-profile',
            },
            {
                name: 'Twitter',
                icon: Twitter,
                url: 'https://twitter.com/your-handle',
            },
            {
                name: 'Dribbble',
                icon: Dribbble,
                url: 'https://dribbble.com/your-profile',
            },
        ],
    };

    return (
        <div
            className="relative min-h-screen overflow-x-hidden"
            style={{ backgroundColor: '#111111', minHeight: '100vh' }}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: '#111111', zIndex: -1 }}
            ></div>
            <div className="fixed inset-0 z-0">
                <div className="w-full h-full mt-16">
                    <Spline
                        scene="https://prod.spline.design/jH0R0xalzSLTmfC5/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                        className="w-full h-full"
                    />
                </div>
            </div>

            <div className="relative z-20 px-6 pt-16 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div
                            className={`inline-block mb-6 px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                color: '#E5E7EB',
                            }}
                        >
                            <div
                                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
                                }}
                            />
                            <span className="relative z-10">💬 Get In Touch</span>
                        </div>
                        <h1
                            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transform transition-all duration-1000 ease-out bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-12 opacity-0'
                            }`}
                        >
                            Let's Connect
                        </h1>
                        <p
                            className={`text-xl mb-8 transform transition-all duration-1000 delay-300 ease-out ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-8 opacity-0'
                            }`}
                            style={{ color: '#9CA3AF' }}
                        >
                            Ready to bring your ideas to life? Let's start a
                            conversation.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <GlassCard
                            isHovered={hoveredCard === 'form'}
                            onMouseEnter={() => setHoveredCard('form')}
                            onMouseLeave={() => setHoveredCard(null)}
                            delay={400}
                            isLoaded={isLoaded}
                        >
                            <div className="relative z-10">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-7 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300"
                                >
                                    Send Message
                                </h2>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="block text-sm font-medium mb-2 text-gray-200"
                                            >
                                                First Name
                                            </label>
                                            <GlassInput
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="First Name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="block text-sm font-medium mb-2 text-gray-200"
                                            >
                                                Last Name
                                            </label>
                                            <GlassInput
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Last Name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium mb-2 text-gray-200"
                                        >
                                            Email
                                        </label>
                                        <GlassInput
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium mb-2 text-gray-200"
                                        >
                                            Message
                                        </label>
                                        <GlassInput
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us what we can help you with"
                                            required
                                            isTextarea
                                            rows={4}
                                        />
                                    </div>

                                    <div
                                        className="flex items-start gap-3 p-3 px-5 rounded-2xl relative overflow-hidden"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            id="agreePrivacy"
                                            name="agreePrivacy"
                                            checked={formData.agreePrivacy}
                                            onChange={handleChange}
                                            className="mt-1 h-5 w-5 rounded transition-all duration-200 accent-white"
                                            required
                                        />
                                        <label
                                            htmlFor="agreePrivacy"
                                            className="text-sm leading-relaxed text-gray-200"
                                        >
                                            I agree to the{' '}
                                            <a
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                                className="text-gray-400 hover:text-white hover:underline transition-colors duration-200"
                                            >
                                                Privacy Policy
                                            </a>
                                            .
                                        </label>
                                    </div>

                                    <GlassButton onClick={handleSubmit}>
                                        Send Message
                                    </GlassButton>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>

            <Footer />

            <div
                id="message-box"
                style={{
                    display: 'none',
                    backgroundColor: 'rgba(123, 123, 123, 0.2)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(248, 248, 248, 0.3)',
                    color: '#FFFFFF',
                }}
                className="fixed bottom-6 right-6 backdrop-blur-xl py-4 px-6 rounded-2xl shadow-2xl z-50 transform transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: '#F8F8F8' }}
                    ></div>
                    <span className="font-medium">
                        Thank you for your message!
                    </span>
                </div>
            </div>

            {!splineLoaded && (
                <LoadingOverlay message="Preparing your contact experience" />
            )}
        </div>
    );
};

export default ContactMain;
