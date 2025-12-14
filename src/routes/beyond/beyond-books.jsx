import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, Star } from 'lucide-react';
import '../../lib/styles/beyond-books.css';

const books = [
    {
        id: 1,
        title: 'Atomic Habits',
        author: 'James Clear',
        quote: 'Tiny habits build empires of change.',
        coverUrl:
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
        accent: 'from-blue-400 to-cyan-400',
        bgGlow: 'bg-blue-500/20',
        rating: 5,
    },
    {
        id: 2,
        title: 'Ikigai',
        author: 'Héctor García',
        quote: 'Purpose is the rhythm of a simple day well lived.',
        coverUrl:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
        accent: 'from-purple-400 to-pink-400',
        bgGlow: 'bg-purple-500/20',
        rating: 5,
    },
    {
        id: 3,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        quote: 'When you move with faith, the universe listens.',
        coverUrl:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
        accent: 'from-amber-400 to-orange-400',
        bgGlow: 'bg-amber-500/20',
        rating: 5,
    },
    {
        id: 4,
        title: "Can't Hurt Me",
        author: 'David Goggins',
        quote: 'The limits are only where you stop pushing.',
        coverUrl:
            'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
        accent: 'from-red-400 to-rose-400',
        bgGlow: 'bg-red-500/20',
        rating: 5,
    },
    {
        id: 5,
        title: 'The Subtle Art of Not Giving a F',
        author: 'Mark Manson',
        quote: "Peace isn't in control, it's in letting go.",
        coverUrl:
            'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
        accent: 'from-teal-400 to-emerald-400',
        bgGlow: 'bg-teal-500/20',
        rating: 5,
    },
];

const BeyondBooks = () => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-x-hidden">
            <div className="fixed inset-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/5 via-transparent to-transparent" />
            </div>

            <div
                className="fixed inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
                }}
            />

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            opacity: Math.random() * 0.4 + 0.1,
                            animation: `float ${
                                10 + Math.random() * 20
                            }s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
            <div
                className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
                style={{ animationDelay: '2s' }}
            />

            <header className="relative z-10 text-center pt-16 pb-16 px-4">
                <div className="inline-flex items-center gap-3 mb-6 animate-fadeIn">
                    <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                    <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-light">
                        Personal Library
                    </span>
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                </div>

                <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-thin text-white tracking-tight mb-6 animate-fadeIn"
                    style={{ animationDelay: '0.2s' }}
                >
                    Beyond the Shelf
                </h1>

                <p
                    className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed animate-fadeIn"
                    style={{ animationDelay: '0.4s' }}
                >
                    A curated collection of stories that transformed my<br/>
                    perspective on life, work, and creativity
                </p>
            </header>

            <div className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-24 pb-16">
                <div className="max-w-7xl mx-auto space-y-8">
                    {books.map((book, index) => (
                        <div
                            key={book.id}
                            className="animate-slideUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setActiveCard(book.id)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            <div className="group relative w-full rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.01]">
                                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]" />

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </div>

                                <div
                                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${book.accent} p-[1px]`}
                                >
                                    <div className="w-full h-full bg-gray-900/90 backdrop-blur-xl rounded-2xl" />
                                </div>

                                <div
                                    className={`absolute -inset-1 ${book.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700`}
                                />

                                <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-7 md:gap-9">
                                    <div className="w-full md:w-2/5 lg:w-1/3 h-56 md:h-64 relative overflow-hidden rounded-xl group-hover:scale-[1.02] transition-transform duration-700">
                                        <div
                                            className={`absolute inset-0 ${book.bgGlow} blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700`}
                                        />
                                        <img
                                            src={book.coverUrl}
                                            alt={book.title}
                                            className="relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                                            style={{
                                                filter: 'brightness(0.9) contrast(1.1) saturate(1.2)',
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-2">
                                            <div className="flex items-center gap-1">
                                                {[...Array(book.rating)].map(
                                                    (_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-3 h-3 text-yellow-400 fill-yellow-400"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-3 md:space-y-4">
                                        <div>
                                            <h3 className="text-2xl lg:text-3xl text-white font-light tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
                                                {book.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm md:text-base mt-1 group-hover:text-gray-300 transition-colors duration-500">
                                                by {book.author}
                                            </p>
                                        </div>

                                        <div className="w-12 h-px bg-gradient-to-r from-white/20 to-transparent group-hover:w-24 transition-all duration-700" />

                                        <blockquote className="text-gray-300 text-sm md:text-base italic leading-relaxed group-hover:text-white transition-colors duration-500">
                                            "{book.quote}"
                                        </blockquote>

                                        <div className="pt-2 inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                                            <span
                                                className={`bg-gradient-to-r ${book.accent} bg-clip-text text-transparent font-medium text-sm md:text-base`}
                                            >
                                                Explore insights
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={`relative z-20 flex flex-col items-center justify-center px-4 transition-all duration-1000`}
            >
                <div className="text-center pb-24 space-y-10 max-w-5xl relative">
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
                    <div
                        className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
                        style={{ animationDelay: '1s' }}
                    />

                    <div className="relative space-y-8">
                        <div className="flex items-center justify-center gap-3">
                            <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
                            <BookOpen
                                className="w-10 h-10 text-purple-400 animate-pulse"
                                style={{ animationDelay: '0.5s' }}
                            />
                            <Sparkles
                                className="w-10 h-10 text-pink-400 animate-pulse"
                                style={{ animationDelay: '1s' }}
                            />
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-thin text-white leading-[1.3] tracking-tight">
                            These stories shaped
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                how I think, create, and dream
                            </span>
                        </h3>

                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-8" />

                        <p className="text-xl lg:text-2xl italic text-gray-300 font-light leading-relaxed">
                            "Stories aren't just read —
                            <br className="hidden md:block" />
                            they're lived in pieces."
                        </p>

                        <div className="pt-6">
                            <button
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }
                                className="group relative px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white font-light text-base md:text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-500 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_48px_rgba(255,255,255,0.1)] cursor-pointer"
                            >
                                <span className="flex items-center gap-3">
                                    Back to Top
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeyondBooks;
