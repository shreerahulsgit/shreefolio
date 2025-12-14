import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const ProfileImage = () => {
        const [imageError, setImageError] = useState(false);

        return (
            <div className="w-full h-full bg-black overflow-hidden">
                {!imageError ? (
                    <img
                        src="/img/developer.png"
                        alt="Profile"
                        className="w-full h-full object-cover object-center transition-all duration-700"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-9xl font-bold text-gray-400">
                            S
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundColor: '#070707',
                fontFamily:
                    'Aeonik Trial, system-ui, -apple-system, sans-serif',
            }}
        >
            <div className="absolute top-8 left-8 flex flex-col items-center z-40">
                <span className="text-2xl lg:text-3xl font-bold text-[#dddddd] mb-2">
                    Developer
                </span>
                <div
                    className="w-1 h-[calc(100vh-120px)] bg-[#dddddd]"
                    style={{ minHeight: '200px' }}
                ></div>
            </div>

            <div className="absolute bottom-8 left-8 z-40">
                <span className="text-lg lg:text-xl font-bold text-[#848484]">
                    2024
                </span>
            </div>

            <div className="relative min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div
                            className={`space-y-12 transition-all duration-1000 ease-out ${
                                isVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-8'
                            }`}
                        >
                            <div className="flex space-x-12 text-sm">
                                <div>
                                    <div
                                        className="text-4xl font-bold mb-1"
                                        style={{ color: '#dddddd' }}
                                    >
                                        +200
                                    </div>
                                    <div
                                        className="text-sm font-medium"
                                        style={{ color: '#848484' }}
                                    >
                                        Project completed
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="text-4xl font-bold mb-1"
                                        style={{ color: '#dddddd' }}
                                    >
                                        +50
                                    </div>
                                    <div
                                        className="text-sm font-medium"
                                        style={{ color: '#848484' }}
                                    >
                                        Startup raised
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h1
                                    className="text-[8rem] lg:text-[15rem] font-black leading-none tracking-tight"
                                    style={{
                                        color: '#eeeeee',
                                        lineHeight: '0.9',
                                    }}
                                >
                                    Hello
                                </h1>
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-12 h-px"
                                        style={{ backgroundColor: '#dddddd' }}
                                    ></div>
                                    <p
                                        className="text-lg font-medium"
                                        style={{ color: '#848484' }}
                                    >
                                        I'm a developer, a design wizard
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`relative transition-all duration-1000 ease-out ${
                                isVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-8'
                            }`}
                        >
                            <div className="w-full max-w-[415px] ml-auto">
                                <ProfileImage />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                        <div className="flex flex-col items-center space-y-2 animate-bounce">
                            <span
                                className="text-sm font-medium"
                                style={{ color: '#848484' }}
                            >
                                Scroll down
                            </span>
                            <svg
                                className="w-4 h-4"
                                style={{ color: '#848484' }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-25 space-y-2">
                <div>
                    <div className="bg-black p-16 shadow-[0_-6px_0px_rgba(255,255,255,0.12)] flex flex-col justify-center">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-0 items-center">
                                <div className="space-y-6 ml-2 lg:ml-4">
                                    <div className="max-w-[225px] rounded-2xl overflow-hidden bg-black p-2">
                                        <img
                                            src="/img/work.png"
                                            alt="Development process"
                                            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <div className="ml-2 lg:ml-4">
                                    <h2
                                        className="text-4xl lg:text-5xl font-bold mb-6"
                                        style={{ color: '#dddddd' }}
                                    >
                                        About Me
                                    </h2>
                                    <p
                                        className="text-xl lg:text-2x1 leading-relaxed"
                                        style={{ color: '#848484' }}
                                    >
                                        Caffeine-powered full-stack developer
                                        fluent in MERN and Cloud Computing.
                                        Passionate about designing intuitive
                                        user experiences, engineering efficient
                                        server logic, and making cloud services
                                        behave — with just the right dose of
                                        humor. I thrive on turning complex
                                        problems into simple, elegant solutions
                                        and enjoy building projects that make a
                                        difference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-black p-16 flex flex-col justify-center">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2
                                        className="text-4xl lg:text-5xl font-bold mb-6"
                                        style={{ color: '#dddddd' }}
                                    >
                                        Education
                                    </h2>
                                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-black transition-colors duration-300">
                                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                            <span className="text-black text-lg font-bold">
                                                1
                                            </span>
                                        </div>
                                        <div>
                                            <h3
                                                className="text-xl font-bold mb-1"
                                                style={{ color: '#dddddd' }}
                                            >
                                                Chennai Institute of Technology
                                            </h3>
                                            <p
                                                className="text-lg leading-relaxed"
                                                style={{ color: '#848484' }}
                                            >
                                                Bachelor of Technology in
                                                Computer Science and Business
                                                Systems
                                                <br />
                                                CGPA: 8.3
                                                <br />
                                                2023 – 2027
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 flex justify-center">
                                    <div className="w-1/2 rounded-2xl overflow-hidden">
                                        <img
                                            src="/img/read.png"
                                            alt="Education reading illustration"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-black p-20 shadow-[0_-6px_0px_rgba(255,255,255,0.12)] flex flex-col justify-center">
                        <div className="max-w-4xl mx-auto">
                            <h2
                                className="text-4xl lg:text-5xl font-bold mb-10"
                                style={{ color: '#dddddd' }}
                            >
                                Experience
                            </h2>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-black transition-colors duration-300">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-black text-lg font-bold">
                                            1
                                        </span>
                                    </div>
                                    <div>
                                        <h3
                                            className="text-xl font-bold mb-2"
                                            style={{ color: '#dddddd' }}
                                        >
                                            Web Development Intern | Smart Qart,
                                            Bengaluru
                                        </h3>
                                        <p
                                            className="text-lg leading-relaxed"
                                            style={{ color: '#848484' }}
                                        >
                                            Nov 2024 – Dec 2024
                                            <br />
                                            Collaborated with the development
                                            team on building and maintaining an
                                            e-commerce platform. Applied version
                                            control (Git), responsive UI design
                                            principles, and agile workflows.
                                            Strengthened problem-solving and
                                            debugging skills through hands-on
                                            project contributions.
                                        </p>
                                    </div>
                                </div>

                                {/* Research Intern */}
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-black transition-colors duration-300">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-black text-lg font-bold">
                                            2
                                        </span>
                                    </div>
                                    <div>
                                        <h3
                                            className="text-xl font-bold mb-2"
                                            style={{ color: '#dddddd' }}
                                        >
                                            Research Intern | Chennai Institute
                                            of Technology, Chennai
                                        </h3>
                                        <p
                                            className="text-lg leading-relaxed"
                                            style={{ color: '#848484' }}
                                        >
                                            Apr 2025 – May 2025
                                            <br />
                                            Conducted research on
                                            energy-efficient cloud computing
                                            techniques including VM migration,
                                            energy-aware scheduling, forecasting
                                            models, and renewable energy
                                            integration. Explored multi-cloud
                                            resource allocation using a
                                            Kubernetes-based Multi-Objective
                                            Reinforcement Learning (MORL)
                                            framework for cost-efficient,
                                            SLA-aware deployments across AWS,
                                            Azure, and GCP. Gained practical
                                            exposure to research methodologies
                                            and technical documentation in cloud
                                            computing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-black p-20 shadow-[0_-6px_0px_rgba(255,255,255,0.12)] flex flex-col justify-center">
                        <div className="max-w-7xl mx-auto w-full">
                            <h2
                                className="text-4xl lg:text-5xl font-bold mb-12 text-center"
                                style={{ color: '#dddddd' }}screen
                            >
                                Certifications
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                <div className="group bg-black rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col text-center items-center overflow-hidden">
                                    <div className="w-full aspect-video bg-gray-200">
                                        <img
                                            src="https://res.cloudinary.com/dqqrrgdwd/image/upload/c_scale,w_600/v1758553490/SHREE_RAHUL_AWS_Certified_Cloud_Practitioner_certificate__page-0001_sieyqs.jpg"
                                            alt="AWS Cloud Practitioner Certificate"
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col items-center flex-grow w-full">
                                        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 -mt-16 border-4 border-white z-10">
                                            <img
                                                src="https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto/v1688759801/integ-AWS-logo_whiteAWS"
                                                alt="AWS Logo"
                                                className="h-10 w-10 object-cover"
                                            />
                                        </div>
                                        <h3
                                            className="text-xl font-bold mb-4"
                                            style={{ color: '#dddddd' }}
                                        >
                                            AWS Cloud Practitioner
                                        </h3>
                                        <a
                                            href="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1758553490/SHREE_RAHUL_AWS_Certified_Cloud_Practitioner_certificate__page-0001_sieyqs.jpg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full mt-auto px-6 py-3 font-semibold text-black bg-white rounded-full transition-all duration-300 hover:bg-gray-400 active:scale-95"
                                        >
                                            View Certificate
                                        </a>
                                    </div>
                                </div>

                                <div className="group bg-black rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col text-center items-center overflow-hidden">
                                    <div className="w-full aspect-video bg-gray-200">
                                        <img
                                            src="https://res.cloudinary.com/dqqrrgdwd/image/upload/c_scale,w_600/v1758553504/SHREE_RAHUL_S_RESPONSIVE_WEBSITE_page-0001_tvwvuy.jpg"
                                            alt="Dynamic Web Development Certificate"
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col items-center flex-grow w-full">
                                        <div className="w-20 h-20 bg-black text-black rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 -mt-16 border-4 border-white z-10">
                                            <Globe className="h-10 w-10 text-white" />
                                        </div>
                                        <h3
                                            className="text-xl font-bold mb-4"
                                            style={{ color: '#dddddd' }}
                                        >
                                            Dynamic Web Development
                                        </h3>
                                        <a
                                            href="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1758553504/SHREE_RAHUL_S_RESPONSIVE_WEBSITE_page-0001_tvwvuy.jpg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full mt-auto px-6 py-3 font-semibold text-black bg-white rounded-full transition-all duration-300 hover:bg-gray-400 active:scale-95"
                                        >
                                            View Certificate
                                        </a>
                                    </div>
                                </div>

                                <div className="group bg-black rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col text-center items-center overflow-hidden">
                                    <div className="w-full aspect-video bg-gray-200">
                                        <img
                                            src="https://res.cloudinary.com/dqqrrgdwd/image/upload/c_scale,w_600/v1758553481/python_page-0001_gjzsq9.jpg"
                                            alt="Python Programming Certificate"
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col items-center flex-grow w-full">
                                        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 -mt-16 border-4 border-white z-10">
                                            <img
                                                src="https://img.icons8.com/?size=96&id=13441&format=png"
                                                alt="Python Logo"
                                                className="h-10 w-10"
                                            />
                                        </div>
                                        <h3
                                            className="text-xl font-bold mb-4"
                                            style={{ color: '#dddddd' }}
                                        >
                                            Python Programming
                                        </h3>
                                        <a
                                            href="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1758553481/python_page-0001_gjzsq9.jpg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full mt-auto px-6 py-3 font-semibold text-black bg-white rounded-full transition-all duration-300 hover:bg-gray-400 active:scale-95"
                                        >
                                            View Certificate
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 text-center">
                            <button
                                className="px-8 py-4 font-semibold text-white bg-black border-2 border-gray-300 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                                onClick={() => navigate('/skills/certificates') }
                            >
                                View All Certifications
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gradient-to-br from-gray-900 to-black p-48 shadow-lg flex flex-col justify-center text-white">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
                                Let's Work Together
                            </h2>
                            <p className="text-xl lg:text-2xl leading-relaxed mb-12 text-gray-300">
                                Ready to bring your ideas to life? I'd love to
                                hear about your project and discuss how we can
                                create something amazing together.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                                <button
                                    className="px-10 py-5 font-semibold text-black bg-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                                    onClick={() => navigate('/contact')}
                                >
                                    Start a Project
                                </button>

                                <button
                                    className="px-10 py-5 font-semibold border-2 border-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-95"
                                    onClick={() => navigate('/projects')}
                                >
                                    View My Work
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        4+
                                    </h3>
                                    <p className="text-gray-400">
                                        Years Experience
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        200+
                                    </h3>
                                    <p className="text-gray-400">
                                        Projects Completed
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        50+
                                    </h3>
                                    <p className="text-gray-400">
                                        Happy Clients
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
