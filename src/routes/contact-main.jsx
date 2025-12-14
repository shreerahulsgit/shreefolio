import { useState, useEffect } from 'react';
import { Phone, MapPin, MessageCircle, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const ContactMain = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
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
                        <h1
                            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transform transition-all duration-1000 ease-out ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-12 opacity-0'
                            }`}
                            style={{ color: '#FFFFFF' }}
                        >
                            Let's Connect
                        </h1>
                        <p
                            className={`text-xl mb-8 transform transition-all duration-1000 delay-300 ease-out ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-8 opacity-0'
                            }`}
                            style={{ color: '#7B7B7B' }}
                        >
                            Ready to bring your ideas to life? Let's start a
                            conversation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div
                            className={`group relative backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-16 opacity-0'
                            }`}
                            style={{
                                backgroundColor: 'rgba(248, 248, 248, 0.08)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(248, 248, 248, 0.15)',
                                transitionDelay: '400ms',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    'rgba(248, 248, 248, 0.12)';
                                e.currentTarget.style.borderColor =
                                    'rgba(248, 248, 248, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    'rgba(248, 248, 248, 0.08)';
                                e.currentTarget.style.borderColor =
                                    'rgba(248, 248, 248, 0.15)';
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(248, 248, 248, 0.05) 0%, transparent 100%)',
                                }}
                            ></div>

                            <div className="relative z-10">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-7"
                                    style={{ color: '#FFFFFF' }}
                                >
                                    Contact Details
                                </h2>

                                <div className="space-y-2">
                                    <div
                                        className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 group/item cursor-pointer"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                'rgba(248, 248, 248, 0.05)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                'transparent')
                                        }
                                    >
                                        <div
                                            className="p-3 rounded-xl transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    'rgba(123, 123, 123, 0.2)',
                                            }}
                                        >
                                            <MapPin
                                                className="w-6 h-6"
                                                style={{ color: '#F8F8F8' }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3
                                                className="text-xl font-semibold mb-1 transition-colors duration-300"
                                                style={{ color: '#FFFFFF' }}
                                            >
                                                Visit us
                                            </h3>
                                            <p
                                                className="mb-1"
                                                style={{ color: '#7B7B7B' }}
                                            >
                                                {
                                                    contactInfo.visitUs
                                                        .description
                                                }
                                            </p>
                                            <p
                                                className="font-medium"
                                                style={{ color: '#F8F8F8' }}
                                            >
                                                {contactInfo.visitUs.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 group/item cursor-pointer"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                'rgba(248, 248, 248, 0.05)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                'transparent')
                                        }
                                    >
                                        <div
                                            className="p-3 rounded-xl transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    'rgba(123, 123, 123, 0.2)',
                                            }}
                                        >
                                            <MessageCircle
                                                className="w-6 h-6"
                                                style={{ color: '#F8F8F8' }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3
                                                className="text-xl font-semibold mb-1 transition-colors duration-300"
                                                style={{ color: '#FFFFFF' }}
                                            >
                                                Chat to us
                                            </h3>
                                            <p
                                                className="mb-1"
                                                style={{ color: '#7B7B7B' }}
                                            >
                                                {
                                                    contactInfo.chatToUs
                                                        .description
                                                }
                                            </p>
                                            <a
                                                href={`mailto:${contactInfo.chatToUs.email}`}
                                                className="font-medium transition-colors duration-300 hover:underline"
                                                style={{ color: '#F8F8F8' }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.color =
                                                        '#FFFFFF')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.color =
                                                        '#F8F8F8')
                                                }
                                            >
                                                {contactInfo.chatToUs.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 group/item cursor-pointer"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                'rgba(248, 248, 248, 0.05)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                'transparent')
                                        }
                                    >
                                        <div
                                            className="p-3 rounded-xl transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    'rgba(123, 123, 123, 0.2)',
                                            }}
                                        >
                                            <Phone
                                                className="w-6 h-6"
                                                style={{ color: '#F8F8F8' }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3
                                                className="text-xl font-semibold mb-1 transition-colors duration-300"
                                                style={{ color: '#FFFFFF' }}
                                            >
                                                Call us
                                            </h3>
                                            <p
                                                className="mb-1"
                                                style={{ color: '#7B7B7B' }}
                                            >
                                                {contactInfo.callUs.hours}
                                            </p>
                                            <a
                                                href={`tel:${contactInfo.callUs.phone}`}
                                                className="font-medium transition-colors duration-300 hover:underline"
                                                style={{ color: '#F8F8F8' }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.color =
                                                        '#FFFFFF')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.color =
                                                        '#F8F8F8')
                                                }
                                            >
                                                {contactInfo.callUs.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="p-2 rounded-2xl">
                                        <h3
                                            className="text-xl font-semibold mb-6"
                                            style={{ color: '#FFFFFF' }}
                                        >
                                            Social Media
                                        </h3>
                                        <div className="flex gap-4">
                                            {contactInfo.socialMedia.map(
                                                (social) => (
                                                    <a
                                                        key={social.name}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-3 backdrop-blur-md rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 group/social"
                                                        style={{
                                                            backgroundColor:
                                                                'rgba(248, 248, 248, 0.1)',
                                                            borderWidth: '1px',
                                                            borderStyle:
                                                                'solid',
                                                            borderColor:
                                                                'rgba(248, 248, 248, 0.2)',
                                                            color: '#7B7B7B',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor =
                                                                'rgba(248, 248, 248, 0.2)';
                                                            e.currentTarget.style.borderColor =
                                                                'rgba(248, 248, 248, 0.3)';
                                                            e.currentTarget.style.color =
                                                                '#FFFFFF';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor =
                                                                'rgba(248, 248, 248, 0.1)';
                                                            e.currentTarget.style.borderColor =
                                                                'rgba(248, 248, 248, 0.2)';
                                                            e.currentTarget.style.color =
                                                                '#7B7B7B';
                                                        }}
                                                        aria-label={social.name}
                                                    >
                                                        <social.icon
                                                            size={20}
                                                            className="group-hover/social:drop-shadow-lg"
                                                        />
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`group relative backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-16 opacity-0'
                            }`}
                            style={{
                                backgroundColor: 'rgba(248, 248, 248, 0.08)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(248, 248, 248, 0.15)',
                                transitionDelay: '600ms',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    'rgba(248, 248, 248, 0.12)';
                                e.currentTarget.style.borderColor =
                                    'rgba(248, 248, 248, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    'rgba(248, 248, 248, 0.08)';
                                e.currentTarget.style.borderColor =
                                    'rgba(248, 248, 248, 0.15)';
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(248, 248, 248, 0.05) 0%, transparent 100%)',
                                }}
                            ></div>

                            <div className="relative z-10">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-7"
                                    style={{ color: '#FFFFFF' }}
                                >
                                    Send Message
                                </h2>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: '#F8F8F8' }}
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-2xl backdrop-blur-md outline-none transition-all duration-300"
                                                style={{
                                                    backgroundColor:
                                                        'rgba(248, 248, 248, 0.1)',
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid',
                                                    borderColor:
                                                        'rgba(248, 248, 248, 0.2)',
                                                    color: '#FFFFFF',
                                                }}
                                                placeholder="First Name"
                                                onFocus={(e) => {
                                                    e.target.style.borderColor =
                                                        'rgba(248, 248, 248, 0.4)';
                                                    e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.15)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor =
                                                        'rgba(248, 248, 248, 0.2)';
                                                    e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.1)';
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.15)')
                                                }
                                                onMouseLeave={(e) => {
                                                    if (
                                                        document.activeElement !==
                                                        e.target
                                                    ) {
                                                        e.target.style.backgroundColor =
                                                            'rgba(248, 248, 248, 0.1)';
                                                    }
                                                }}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: '#F8F8F8' }}
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-2xl backdrop-blur-md outline-none transition-all duration-300"
                                                style={{
                                                    backgroundColor:
                                                        'rgba(248, 248, 248, 0.1)',
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid',
                                                    borderColor:
                                                        'rgba(248, 248, 248, 0.2)',
                                                    color: '#FFFFFF',
                                                }}
                                                placeholder="Last Name"
                                                onFocus={(e) => {
                                                    e.target.style.borderColor =
                                                        'rgba(248, 248, 248, 0.4)';
                                                    e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.15)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor =
                                                        'rgba(248, 248, 248, 0.2)';
                                                    e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.1)';
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.15)')
                                                }
                                                onMouseLeave={(e) => {
                                                    if (
                                                        document.activeElement !==
                                                        e.target
                                                    ) {
                                                        e.target.style.backgroundColor =
                                                            'rgba(248, 248, 248, 0.1)';
                                                    }
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: '#F8F8F8' }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-2xl backdrop-blur-md outline-none transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    'rgba(248, 248, 248, 0.1)',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor:
                                                    'rgba(248, 248, 248, 0.2)',
                                                color: '#FFFFFF',
                                            }}
                                            placeholder="you@company.com"
                                            onFocus={(e) => {
                                                e.target.style.borderColor =
                                                    'rgba(248, 248, 248, 0.4)';
                                                e.target.style.backgroundColor =
                                                    'rgba(248, 248, 248, 0.15)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor =
                                                    'rgba(248, 248, 248, 0.2)';
                                                e.target.style.backgroundColor =
                                                    'rgba(248, 248, 248, 0.1)';
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.target.style.backgroundColor =
                                                    'rgba(248, 248, 248, 0.15)')
                                            }
                                            onMouseLeave={(e) => {
                                                if (
                                                    document.activeElement !==
                                                    e.target
                                                ) {
                                                    e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.1)';
                                                }
                                            }}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: '#F8F8F8' }}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-2xl backdrop-blur-md resize-none outline-none transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    'rgba(248, 248, 248, 0.1)',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor:
                                                    'rgba(248, 248, 248, 0.2)',
                                                color: '#FFFFFF',
                                            }}
                                            placeholder="Tell us what we can help you with"
                                            onFocus={(e) => {
                                                e.target.style.borderColor =
                                                    'rgba(248, 248, 248, 0.4)';
                                                e.target.style.backgroundColor =
                                                    'rgba(248, 248, 248, 0.15)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor =
                                                    'rgba(248, 248, 248, 0.2)';
                                                e.target.style.backgroundColor =
                                                    'rgba(248, 248, 248, 0.1)';
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.target.style.backgroundColor =
                                                    'rgba(248, 248, 248, 0.15)')
                                            }
                                            onMouseLeave={(e) => {
                                                if (
                                                    document.activeElement !==
                                                    e.target
                                                ) {
                                                    e.target.style.backgroundColor =
                                                        'rgba(248, 248, 248, 0.1)';
                                                }
                                            }}
                                            required
                                        ></textarea>
                                    </div>

                                    <div
                                        className="flex items-start gap-3 p-3 px-5 rounded-2xl"
                                        style={{
                                            backgroundColor:
                                                'rgba(248, 248, 248, 0.05)',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            id="agreePrivacy"
                                            name="agreePrivacy"
                                            checked={formData.agreePrivacy}
                                            onChange={handleChange}
                                            className="mt-1 h-5 w-5 rounded transition-all duration-200"
                                            style={{
                                                backgroundColor:
                                                    'rgba(248, 248, 248, 0.1)',
                                                borderColor:
                                                    'rgba(248, 248, 248, 0.3)',
                                            }}
                                            required
                                        />
                                        <label
                                            htmlFor="agreePrivacy"
                                            className="text-sm leading-relaxed"
                                            style={{ color: '#F8F8F8' }}
                                        >
                                            I agree to the{' '}
                                            <a
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                className="hover:underline transition-colors duration-200"
                                                style={{ color: '#7B7B7B' }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.color =
                                                        '#FFFFFF')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.color =
                                                        '#7B7B7B')
                                                }
                                            >
                                                Privacy Policy
                                            </a>
                                            .
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full backdrop-blur-md font-semibold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group/button"
                                        style={{
                                            backgroundColor:
                                                'rgba(248, 248, 248, 0.2)',
                                            borderWidth: '1px',
                                            borderStyle: 'solid',
                                            borderColor:
                                                'rgba(248, 248, 248, 0.3)',
                                            color: '#FFFFFF',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor =
                                                'rgba(248, 248, 248, 0.3)';
                                            e.target.style.borderColor =
                                                'rgba(248, 248, 248, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor =
                                                'rgba(248, 248, 248, 0.2)';
                                            e.target.style.borderColor =
                                                'rgba(248, 248, 248, 0.3)';
                                        }}
                                    >
                                        <span className="group-hover/button:drop-shadow-md transition-all duration-200">
                                            Send Message
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

            <div
                className={`absolute bottom-4 right-4 z-30 transition-all duration-0 ${
                    isLoaded
                        ? 'opacity-100'
                        : 'opacity-0'
                }`}
            >
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 shadow-2xl">
                    <p className="text-white text-sm font-medium">
                        @ Code by Shree Rahul
                    </p>
                </div>
            </div>

            {!splineLoaded && (
                <div
                    className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 34, 34, 0.5)' }}
                >
                    <div
                        className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
                        style={{
                            backgroundColor: 'rgba(248, 248, 248, 0.1)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'rgba(248, 248, 248, 0.2)',
                        }}
                    >
                        <div
                            className="w-16 h-16 border-2 rounded-full animate-spin mb-6"
                            style={{
                                borderColor: 'rgba(248, 248, 248, 0.2)',
                                borderTopColor: 'rgba(248, 248, 248, 0.8)',
                            }}
                        ></div>
                        <p
                            className="text-lg font-medium mb-2"
                            style={{ color: '#F8F8F8' }}
                        >
                            Loading Interactive Experience...
                        </p>
                        <p className="text-sm" style={{ color: '#7B7B7B' }}>
                            Preparing your immersive contact experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactMain;
