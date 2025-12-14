import { useState, useEffect } from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const ResumeMain = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const downloadResume = () => {
        const googleDriveFileId = '1Oyv6Rxij87SRkI9SNGpOE4022jd53SUv';
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Shree_Rahul_S_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen relative bg-black">
            <div
                className="fixed inset-0 z-0"
                style={{ pointerEvents: 'auto' }}
            >
                <Spline
                    scene="https://prod.spline.design/O9HVvHLsw6yzQ9GT/scene.splinecode"
                    className="w-full h-full"
                    style={{
                        pointerEvents: 'auto',
                        width: '100vw',
                        height: '100vh',
                        touchAction: 'auto',
                    }}
                    onLoad={() => {
                        setIsLoaded(true);
                        setSplineLoaded(true);
                    }}
                />
            </div>

            <div className="relative z-10" style={{ pointerEvents: 'none' }}>
                <header className="py-6" style={{ pointerEvents: 'auto' }}>
                    <div className="flex justify-center px-6 mt-6">
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-6">
                            <div
                                className={`text-center transform transition-all duration-1000 ${
                                    isLoaded
                                        ? 'translate-y-0 opacity-100'
                                        : '-translate-y-4 opacity-0'
                                }`}
                            >
                                <div className="flex justify-center items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg backdrop-blur-xl bg-white/20 border border-white/30">
                                        <FileText className="w-8 h-8 text-white drop-shadow-lg" />
                                    </div>
                                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
                                        Resume
                                    </h1>
                                </div>
                                <p className="text-lg font-medium text-white/90 drop-shadow-md">
                                    Shree Rahul S - Full Stack Web Developer
                                </p>
                                <div className="flex justify-center items-center gap-2 mt-3">
                                    <Eye
                                        className={`w-4 h-4 transition-all duration-300 drop-shadow-md ${
                                            isHovering
                                                ? 'scale-125 text-white'
                                                : 'text-white/70'
                                        }`}
                                    />
                                    <span className="text-sm text-white/80 drop-shadow-md">
                                        Interactive PDF View
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main
                    className="flex-1 py-6 pb-12"
                    style={{ pointerEvents: 'auto' }}
                >
                    <div className="flex justify-center px-6">
                        <div className="w-full max-w-4xl">
                            <div
                                className={`transform transition-all duration-1000 delay-300 ${
                                    isLoaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-8 opacity-0'
                                }`}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <div
                                    className={`backdrop-blur-xl bg-white/10 rounded-xl shadow-2xl border border-white/20 p-6 transform transition-all duration-500 ${
                                        isHovering
                                            ? 'shadow-[0_0_50px_rgba(255,255,255,0.3)] scale-[1.02] border-white/40'
                                            : ''
                                    }`}
                                >
                                    <div className="relative">
                                        <div
                                            className="rounded-lg border border-white/30 bg-white/5"
                                            style={{ height: '135vh', overflow: 'hidden' }}
                                        >
                                            <iframe
                                                src="https://drive.google.com/file/d/1Oyv6Rxij87SRkI9SNGpOE4022jd53SUv/preview"
                                                className="w-full h-full"
                                                allow="autoplay"
                                                title="Shree Rahul S Resume"
                                            />
                                        </div>

                                        <div
                                            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md ${
                                                isHovering
                                                    ? 'opacity-100 transform scale-105 bg-white/90 text-gray-900 shadow-lg'
                                                    : 'opacity-70 bg-white/20 text-white border border-white/30'
                                            }`}
                                        >
                                            PDF Document
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer
                    className="backdrop-blur-md bg-white/10 border-t border-white/20 pt-10 pb-36"
                    style={{ pointerEvents: 'auto' }}
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <div
                            className={`flex justify-center gap-6 transform transition-all duration-1000 delay-500 ${
                                isLoaded
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-4 opacity-0'
                            }`}
                        >
                            <button
                                onClick={downloadResume}
                                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl backdrop-blur-xl bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60"
                            >
                                <Download className="w-5 h-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-90 drop-shadow-md" />
                                <span className="drop-shadow-md">
                                    Download Resume
                                </span>
                            </button>
                        </div>

                        <div className="text-center mt-8 space-y-2 ">
                            <p className="text-sm font-medium text-white/80 drop-shadow-md">
                                PDF Format • Mobile Optimized • Secure Download
                            </p>
                            <div className="flex justify-center items-center gap-4 text-xs text-white/70 drop-shadow-md ">
                                <span>Last Updated: January 2025</span>
                                <span>|</span>
                                <span>File Size: ~150KB</span>
                                <span>|</span>
                                <span>Version 2.0</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <div
                className={`fixed bottom-4 right-4 z-30 transition-all duration-0 ${
                    splineLoaded
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
                            backgroundColor: 'rgba(248, 248, 248, 0.025)',
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
                            Preparing your resume experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeMain;
