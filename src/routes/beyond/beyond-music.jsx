import { useState, useEffect, useRef } from 'react';
import { Music, Headphones } from 'lucide-react';
import CircularGallery from '../../lib/components/circular-gallery';
import ChromaGrid from '../../lib/components/chroma-grid';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const audioRef = useRef(null);
    const audioSrc = '/mp3/loml-taylor-swift.mp3';

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => {
            if (!isNaN(audio.duration) && isFinite(audio.duration)) {
                setDuration(audio.duration);
            }
        };
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
                audioRef.current.currentTime + 15,
                duration
            );
        }
    };

    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(
                audioRef.current.currentTime - 15,
                0
            );
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

    return (
        <div className="bg-black flex items-center justify-center p-16 pb-20">
            {/* Glassmorphic Player Card - Horizontal Layout */}
            <div className="relative w-full max-w-2xl">
                {/* Neon Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl blur-2xl opacity-60"></div>
                {/* Glass Card */}
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                    {/* Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex gap-6">
                        {/* Left: Album Art */}
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl relative group">
                                <img
                                    src="https://i.scdn.co/image/ab67616d00001e028ecc33f195df6aa257c39eaa"
                                    alt="Album Cover"
                                    className={`w-full h-full object-cover transition-all duration-700 ${
                                        isPlaying
                                            ? 'scale-110 brightness-110'
                                            : 'scale-100'
                                    }`}
                                />
                                {/* Overlay Glow */}
                                {isPlaying && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        {/* Right: Controls Section */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                            {/* Top: Song Info */}
                            <div className="mb-4">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-white truncate mb-1">
                                            loml
                                        </h3>
                                        <p className="text-sm text-gray-300 truncate">
                                            Taylor Swift — The Tortured Poets
                                            Department
                                        </p>
                                    </div>
                                    {/* AirPlay Icon */}
                                    <button className="ml-3 text-gray-400 hover:text-white transition-colors p-1 hover:scale-110 transform duration-200">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 22h12l-6-6-6 6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Time Progress */}
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                                    <span className="tabular-nums">
                                        {formatTime(currentTime)}
                                    </span>
                                    <div className="flex-1 relative h-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer">
                                        {/* Progress Fill */}
                                        <div
                                            className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-100"
                                            style={{
                                                width: `${progressPercent}%`,
                                            }}
                                        ></div>
                                        {/* Slider Input */}
                                            <input
                                            type="range"
                                            min="0"
                                                max={duration || 0}
                                            value={currentTime}
                                            onChange={handleSeek}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <span className="tabular-nums">
                                        {formatTime(duration)}
                                    </span>
                                </div>
                            </div>
                            {/* Middle: Playback Controls */}
                            <div className="flex items-center justify-center gap-6 mb-4">
                                {/* Previous */}
                                <button
                                    onClick={skipBackward}
                                    className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95 duration-200"
                                >
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                                    </svg>
                                </button>
                                {/* Play/Pause */}
                                <button
                                    onClick={togglePlay}
                                    className="w-14 h-14 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg group"
                                >
                                    {isPlaying ? (
                                        <svg
                                            className="w-6 h-6 text-gray-900"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-6 h-6 text-gray-900 ml-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                                {/* Next */}
                                <button
                                    onClick={skipForward}
                                    className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95 duration-200"
                                >
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                                    </svg>
                                </button>
                            </div>
                            {/* Bottom: Volume Control */}
                            <div className="flex items-center gap-3">
                                {/* Volume Icon */}
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    {volume === 0 ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                        </svg>
                                    ) : volume < 0.5 ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                        </svg>
                                    )}
                                </button>
                                {/* Volume Slider */}
                                <div className="flex-1 relative h-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer max-w-32">
                                    {/* Volume Fill */}
                                    <div
                                        className="absolute inset-y-0 left-0 bg-white/70 rounded-full transition-all duration-100"
                                        style={{ width: `${volume * 100}%` }}
                                    ></div>
                                    {/* Slider Input */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={audioSrc}
                onEnded={() => setIsPlaying(false)}
                preload="auto"
                onLoadedMetadata={() => {
                    const audio = audioRef.current;
                    if (audio && !isNaN(audio.duration) && isFinite(audio.duration)) {
                        setDuration(audio.duration);
                    }
                }}
            />
        </div>
    );
};

const MusicPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const albums = [
        {
            title: 'After Hours',
            artist: 'The Weeknd',
            cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
            spotify: 'https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj',
            accent: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Parachutes',
            artist: 'Coldplay',
            cover: 'https://i.scdn.co/image/ab67616d0000b273df55e326ed144ab4f5cecf95',
            spotify: 'https://open.spotify.com/album/6ZG5lRT77aJ3btmArcykra',
            accent: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Discovery',
            artist: 'Daft Punk',
            cover: 'https://i.scdn.co/image/ab67616d00001e022c25dad9f8fd54652f7ba5df',
            spotify: 'https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc',
            accent: 'from-yellow-500 to-orange-500',
        },
        {
            title: "1989 (Taylor's Version)",
            artist: 'Taylor Swift',
            cover: 'https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac',
            spotify: 'https://open.spotify.com/album/64LU4c1nfjz1t4VnGhagcg',
            accent: 'from-cyan-500 to-blue-500',
        },
        {
            title: 'Nectar',
            artist: 'Joji',
            cover: 'https://i.scdn.co/image/ab67616d00001e02e0b60c608586d88252b8fbc0',
            spotify: 'https://open.spotify.com/album/3lS1y25WAhcqJDATJK70Mq',
            accent: 'from-purple-500 to-blue-500',
        },
    ];

    const items = [
        {
            image: 'https://i.pravatar.cc/300?img=1',
            title: 'Sarah Johnson',
            subtitle: 'Frontend Developer',
            handle: '@sarahjohnson',
            borderColor: '#3B82F6',
            gradient: 'linear-gradient(145deg, #3B82F6, #000)',
            url: 'https://github.com/sarahjohnson',
        },
        {
            image: 'https://i.pravatar.cc/300?img=2',
            title: 'Mike Chen',
            subtitle: 'Backend Engineer',
            handle: '@mikechen',
            borderColor: '#10B981',
            gradient: 'linear-gradient(180deg, #10B981, #000)',
            url: 'https://linkedin.com/in/mikechen',
        },
    ];

    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % albums.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlay, albums.length]);

    const handleAlbumClick = (spotify) => {
        window.open(spotify, '_blank', 'noopener,noreferrer');
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlay(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br bg-black text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 opacity-5">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-4xl animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    >
                        ♪
                    </div>
                ))}
            </div>

            {/* Header Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Music className="w-8 h-8 text-purple-400" />
                        <h1 className="text-5xl font-thin tracking-wider">
                            My Music Universe
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg font-light">
                        Where sound becomes memory
                    </p>
                </div>
            </div>

            {/* Background Music Player */}
            <BackgroundMusic />

            {/* CircularGallery Section */}
            <div className="relative z-10 w-full mb-32 bg-black p-8">
                <h2 className="text-3xl font-thin mb-8 flex items-center gap-3 max-w-7xl mx-auto px-6">
                    <Headphones className="w-7 h-7 text-blue-400" />
                    Artists I Love
                </h2>
                <div
                    style={{
                        height: '500px',
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <CircularGallery
                        bend={4}
                        textColor="#ffffff"
                        borderRadius={0.1}
                        scrollEase={0.03}
                    />
                </div>
            </div>

            {/* Favorite Albums Section */}
            <div className="relative z-10 w-full bg-black p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                            My Favorite Albums
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative">
                        {/* Main Display - Triangle Layout */}
                        <div className="flex items-center justify-center mb-12 min-h-[600px] relative overflow-hidden">
                            {/* Render all albums with smooth positioning */}
                            {albums.map((album, albumIdx) => {
                                // Calculate the relative position of this album from the current center
                                let relativePosition = albumIdx - currentIndex;

                                // Normalize the position to be within [-2, 2] range for display
                                if (relativePosition > 2) {
                                    relativePosition -= albums.length;
                                } else if (relativePosition < -2) {
                                    relativePosition += albums.length;
                                }

                                const isVisible =
                                    Math.abs(relativePosition) <= 2;
                                const isCenter = relativePosition === 0;
                                const isInner =
                                    Math.abs(relativePosition) === 1;
                                const isOuter =
                                    Math.abs(relativePosition) === 2;

                                if (!isVisible) return null;

                                return (
                                    <div
                                        key={albumIdx}
                                        className={`absolute cursor-pointer ${
                                            isCenter
                                                ? 'z-30'
                                                : isInner
                                                  ? 'z-20'
                                                  : 'z-10'
                                        }`}
                                        style={{
                                            left: `${50 + relativePosition * 22}%`,
                                            top: isCenter
                                                ? '5%'
                                                : isInner
                                                  ? '20%'
                                                  : '30%',
                                            transform: `translateX(-50%) translateY(0px) scale(${
                                                isCenter
                                                    ? 1
                                                    : isInner
                                                      ? 0.8
                                                      : 0.65
                                            })`,
                                            filter: isCenter
                                                ? 'none'
                                                : `blur(${isInner ? '1.5px' : '3px'})`,
                                            opacity: isCenter
                                                ? 1
                                                : isInner
                                                  ? 0.85
                                                  : 0.7,
                                            transition:
                                                'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            willChange:
                                                'transform, opacity, filter, left, top',
                                        }}
                                        onClick={() => {
                                            if (!isCenter) {
                                                setCurrentIndex(albumIdx);
                                                setIsAutoPlay(false);
                                            } else {
                                                handleAlbumClick(album.spotify);
                                            }
                                        }}
                                    >
                                        <div className="group relative transform transition-all duration-1200 ease-out hover:scale-105">
                                            {/* Neon Glow Background */}
                                            <div
                                                className={`absolute -inset-1 bg-gradient-to-r ${album.accent} rounded-2xl blur-xl transition-all duration-1200 cubic-bezier(0.25, 0.46, 0.45, 0.94) opacity-0 group-hover:!opacity-70`}
                                                style={{
                                                    opacity: isCenter
                                                        ? 0.3
                                                        : undefined,
                                                }}
                                            ></div>

                                            {/* Glass Card */}
                                            <div
                                                className="relative rounded-2xl border shadow-2xl transition-all duration-1200 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:bg-white/8 group-hover:border-white/20"
                                                style={{
                                                    width: '300px',
                                                    maxWidth: '300px',
                                                    backgroundColor: isCenter
                                                        ? 'rgba(255, 255, 255, 0.05)'
                                                        : 'rgba(255, 255, 255, 0.03)',
                                                    backdropFilter: isCenter
                                                        ? 'blur(40px)'
                                                        : 'blur(20px)',
                                                    padding: isCenter
                                                        ? '24px'
                                                        : '16px',
                                                    borderColor: isCenter
                                                        ? 'rgba(255, 255, 255, 0.1)'
                                                        : 'rgba(255, 255, 255, 0.05)',
                                                    willChange:
                                                        'background-color, border-color, padding',
                                                }}
                                            >
                                                {/* Reflection Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:!opacity-30 transition-all duration-1200 cubic-bezier(0.25, 0.46, 0.45, 0.94)"></div>

                                                {/* Album Cover */}
                                                <div
                                                    className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-1200 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                                    style={{
                                                        marginBottom: isCenter
                                                            ? '16px'
                                                            : '12px',
                                                    }}
                                                >
                                                    <img
                                                        src={album.cover}
                                                        alt={`${album.title} by ${album.artist}`}
                                                        className="w-full aspect-square object-cover transform transition-all duration-1200 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-110"
                                                        style={{
                                                            willChange:
                                                                'transform',
                                                        }}
                                                    />
                                                    {/* Inner Glow on Hover */}
                                                    <div
                                                        className={`absolute inset-0 bg-gradient-to-t ${album.accent} opacity-0 group-hover:!opacity-30 transition-all duration-1200 cubic-bezier(0.25, 0.46, 0.45, 0.94)`}
                                                    ></div>
                                                </div>

                                                {/* Album Info - Full details only for center */}
                                                <div className="relative z-10">
                                                    <h3
                                                        className={`font-bold text-white mb-2 tracking-tight ${
                                                            isCenter
                                                                ? 'text-2xl'
                                                                : isInner
                                                                  ? 'text-lg'
                                                                  : 'text-base'
                                                        }`}
                                                    >
                                                        {album.title}
                                                    </h3>
                                                    <p
                                                        className={`text-gray-400 ${
                                                            isCenter
                                                                ? 'text-lg'
                                                                : isInner
                                                                  ? 'text-base'
                                                                  : 'text-sm'
                                                        }`}
                                                    >
                                                        {album.artist}
                                                    </p>

                                                    {/* Spotify Icon - Only for center */}
                                                    {isCenter && (
                                                        <div className="mt-4 flex items-center gap-2 text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                                                            <svg
                                                                className="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                                            </svg>
                                                            <span className="text-sm font-medium">
                                                                Play on Spotify
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex justify-center gap-3">
                            {albums.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === currentIndex
                                            ? 'w-8 bg-gradient-to-r from-purple-500 to-blue-500'
                                            : 'w-2 bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to album ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Arrow Navigation */}
                        <button
                            onClick={() => {
                                const newIndex =
                                    (currentIndex - 1 + albums.length) %
                                    albums.length;
                                setCurrentIndex(newIndex);
                                setIsAutoPlay(false);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-500 ease-out hover:scale-110 active:scale-95 shadow-2xl"
                            aria-label="Previous album"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => {
                                const newIndex =
                                    (currentIndex + 1) % albums.length;
                                setCurrentIndex(newIndex);
                                setIsAutoPlay(false);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-500 ease-out hover:scale-110 active:scale-95 shadow-2xl"
                            aria-label="Next album"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ChromaGrid Section */}
            <div className="relative z-10 w-full bg-black p-8 pb-28">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                            Connect With Artists
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                    </div>
                    <div style={{ height: '1000px', position: 'relative' }}>
                        <ChromaGrid
                            radius={300}
                            damping={0.45}
                            fadeOut={0.6}
                            ease="power3.out"
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MusicPage;
