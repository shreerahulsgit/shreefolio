import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import CircularGallery from '../../lib/components/circular-gallery';

// ============================================
// STARFIELD BACKGROUND
// ============================================
const Starfield = () => {
  const stars = useMemo(() => Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    twinkleDelay: Math.random() * 5,
  })), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div style={{ position: "absolute", inset: 0, background: "#000000" }} />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity})`,
            animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// LYRIC CLOUDS - BURST LIKE SMOKE
// ============================================
const LyricClouds = () => {
  const lyrics = useMemo(() => [
    "save your tears",
    "look at the stars",
    "one more time",
    "shake it off",
    "slow dancing",
    "blinding lights",
    "yellow",
    "around the world",
    "moonlight",
    "lost in rhythm",
    "hopeless place",
    "just the way you are",
  ], []);

  const clouds = useMemo(() => lyrics.map((lyric, i) => ({
    id: i,
    text: lyric,
    x: 5 + Math.random() * 85,
    y: 10 + Math.random() * 75,
    delay: i * 3,
    duration: 8 + Math.random() * 6,
    size: 16 + Math.random() * 12,
    blur: 2 + Math.random() * 4,
  })), [lyrics]);

  return (
    <div className="fixed inset-0 z-2 pointer-events-none overflow-hidden">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute font-extralight tracking-widest"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            fontSize: `${cloud.size}px`,
            color: 'rgba(255, 255, 255, 0.4)',
            textShadow: `0 0 ${cloud.blur * 8}px rgba(139, 92, 246, 0.6), 0 0 ${cloud.blur * 16}px rgba(59, 130, 246, 0.4)`,
            filter: `blur(${cloud.blur * 0.3}px)`,
            animation: `cloudBurst ${cloud.duration}s ease-in-out infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          {cloud.text}
        </div>
      ))}
      <style>{`
        @keyframes cloudBurst {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); filter: blur(8px); }
          20% { opacity: 0.5; transform: scale(1.1) translateY(-5px); filter: blur(2px); }
          40% { opacity: 0.4; transform: scale(1) translateY(0); filter: blur(1px); }
          60% { opacity: 0.35; transform: scale(1.05) translateY(-3px); filter: blur(1.5px); }
          80% { opacity: 0.3; transform: scale(0.95) translateY(5px); filter: blur(3px); }
          100% { opacity: 0; transform: scale(0.6) translateY(15px); filter: blur(6px); }
        }
      `}</style>
    </div>
  );
};

// ============================================
// AUDIO VISUALIZER - NEBULA WAVE
// ============================================
const AudioVisualizer = ({ isPlaying }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isPlaying) {
      setParticles([]);
      return;
    }

    // Generate flowing particles - using RAF for smooth animation and throttling
    let rafId;
    let lastUpdate = 0;
    let startTime = null;
    const throttleMs = 100; // Update every 100ms for better performance
    
    const animate = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      
      if (timestamp - lastUpdate >= throttleMs) {
        const elapsedSeconds = (timestamp - startTime) / 1000;
        const currentWave = elapsedSeconds % (Math.PI * 2);
        
        setParticles(Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const wobble = Math.sin(currentWave + i * 0.5) * 15;
          const radius = 70 + wobble + Math.random() * 20;
          return {
            id: i,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            scale: 0.5 + Math.random() * 1,
            opacity: 0.3 + Math.random() * 0.5,
            hue: 250 + i * 5,
          };
        }));
        lastUpdate = timestamp;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  return (
    <div className="relative flex items-center justify-center h-48">
      {/* Nebula Core */}
      <div 
        className="absolute w-32 h-32 rounded-full transition-all duration-700"
        style={{
          background: isPlaying 
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(100, 100, 100, 0.1) 0%, transparent 70%)',
          boxShadow: isPlaying 
            ? '0 0 60px rgba(139, 92, 246, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)'
            : 'none',
          animation: isPlaying ? 'nebulaPulse 3s ease-in-out infinite' : 'none',
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full transition-all duration-150"
          style={{
            width: `${8 * p.scale}px`,
            height: `${8 * p.scale}px`,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            transform: 'translate(-50%, -50%)',
            background: `hsla(${p.hue}, 80%, 60%, ${p.opacity})`,
            boxShadow: `0 0 ${12 * p.scale}px hsla(${p.hue}, 80%, 60%, 0.6)`,
          }}
        />
      ))}

      {/* Orbit Rings */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full border transition-all duration-500"
          style={{
            width: `${60 + ring * 40}px`,
            height: `${60 + ring * 40}px`,
            borderColor: isPlaying 
              ? `rgba(139, 92, 246, ${0.3 - ring * 0.08})` 
              : 'rgba(100, 100, 100, 0.1)',
            animation: isPlaying ? `orbitSpin ${8 + ring * 4}s linear infinite ${ring % 2 ? '' : 'reverse'}` : 'none',
          }}
        />
      ))}

      <style>{`
        @keyframes nebulaPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ============================================
// VINYL RECORD PLAYER
// ============================================
const VinylPlayer = ({ album, isPlaying, onTogglePlay, currentTime, duration, onSeek, volume, onVolumeChange }) => {
  const [armPosition, setArmPosition] = useState(0);

  useEffect(() => {
    setArmPosition(isPlaying ? 25 : 0);
  }, [isPlaying]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative flex flex-col items-center">
      {/* Turntable Base */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Outer Glow */}
        <div 
          className="absolute -inset-4 rounded-full blur-2xl transition-all duration-1000"
          style={{
            background: isPlaying 
              ? `radial-gradient(circle, ${album?.accentColor || 'rgba(139, 92, 246, 0.3)'} 0%, transparent 70%)`
              : 'transparent',
            opacity: isPlaying ? 0.6 : 0,
          }}
        />

        {/* Turntable Platter */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-black border-4 border-gray-800"
          style={{
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8), 0 20px 60px rgba(0,0,0,0.5)',
          }}
        />

        {/* Vinyl Record */}
        <div 
          className="absolute inset-4 rounded-full overflow-hidden cursor-pointer"
          onClick={onTogglePlay}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)',
            animation: isPlaying ? 'spin 3s linear infinite' : 'none',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
          }}
        >
          {/* Vinyl Grooves */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-gray-800/30"
              style={{
                inset: `${15 + i * 8}%`,
              }}
            />
          ))}

          {/* Album Art in Center */}
          <div className="absolute inset-1/4 rounded-full overflow-hidden border-4 border-gray-900">
            <img 
              src={album?.cover || 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36'} 
              alt="Album"
              className="w-full h-full object-cover"
            />
            {/* Center Hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-900 border border-gray-700" />
          </div>

          {/* Vinyl Shine */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
            }}
          />
        </div>

        {/* Tonearm */}
        <div 
          className="absolute -right-8 top-4 w-32 h-4 origin-left transition-transform duration-1000"
          style={{
            transform: `rotate(${armPosition}deg)`,
          }}
        >
          {/* Arm Base */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-600" />
          {/* Arm */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-24 h-1.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" />
          {/* Headshell */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-3 bg-gray-500 rounded-sm transform rotate-45" />
        </div>
      </div>

      {/* Controls Below */}
      <div className="mt-8 w-full max-w-md space-y-4">
        {/* Song Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{album?.title || 'Select an Album'}</h3>
          <p className="text-gray-400">{album?.artist || ''}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="tabular-nums w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 relative h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={onSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="tabular-nums w-10">{formatTime(duration)}</span>
        </div>

        {/* Play Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onTogglePlay}
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all hover:scale-105"
          >
            {isPlaying ? (
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <div className="w-24 relative h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white/50 rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ============================================
// MOOD GRADIENT OVERLAY
// ============================================
const MoodGradient = ({ accentColor }) => {
  return (
    <div 
      className="fixed inset-0 z-1 pointer-events-none transition-all duration-2000"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${accentColor || 'rgba(139, 92, 246, 0.15)'} 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, ${accentColor || 'rgba(59, 130, 246, 0.1)'} 0%, transparent 50%)`,
      }}
    />
  );
};

// ============================================
// ALBUM CARD WITH REFLECTION
// ============================================
const AlbumCard = ({ album, isActive, onClick }) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-500 ${isActive ? 'scale-110 z-20' : 'scale-100 opacity-70 hover:opacity-100'}`}
      onClick={onClick}
    >
      {/* Glow */}
      <div 
        className={`absolute -inset-2 rounded-2xl blur-xl transition-all duration-500 bg-gradient-to-r ${album.accent}`}
        style={{ opacity: isActive ? 0.4 : 0 }}
      />

      {/* Card */}
      <div className="relative w-48 rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl">
        {/* Vinyl Peek */}
        <div 
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gray-900 border border-gray-800 transition-transform duration-500"
          style={{
            transform: isActive ? 'translateX(-10px)' : 'translateX(0)',
          }}
        />

        {/* Album Art */}
        <img 
          src={album.cover} 
          alt={album.title}
          className="relative z-10 w-full aspect-square object-cover"
        />

        {/* Info */}
        <div className="relative z-10 p-3 bg-black/50">
          <h4 className="font-semibold text-white text-sm truncate">{album.title}</h4>
          <p className="text-gray-400 text-xs truncate">{album.artist}</p>
        </div>
      </div>

      {/* Reflection */}
      <div 
        className="w-full h-16 mt-2 rounded-xl overflow-hidden"
        style={{
          background: `url(${album.cover}) center top / cover`,
          transform: 'scaleY(-1)',
          opacity: 0.15,
          filter: 'blur(4px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
        }}
      />
    </div>
  );
};

// Memoize AlbumCard to prevent unnecessary re-renders
const MemoizedAlbumCard = memo(AlbumCard);

// ============================================
// MAIN MUSIC PAGE
// ============================================
const MusicPage = () => {
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  const albums = useMemo(() => [
    {
      title: 'After Hours',
      artist: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
      spotify: 'https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj',
      accent: 'from-purple-500 to-pink-500',
      accentColor: 'rgba(168, 85, 247, 0.2)',
    },
    {
      title: 'Parachutes',
      artist: 'Coldplay',
      cover: 'https://i.scdn.co/image/ab67616d0000b273df55e326ed144ab4f5cecf95',
      spotify: 'https://open.spotify.com/album/6ZG5lRT77aJ3btmArcykra',
      accent: 'from-blue-500 to-cyan-500',
      accentColor: 'rgba(59, 130, 246, 0.2)',
    },
    {
      title: 'Discovery',
      artist: 'Daft Punk',
      cover: 'https://i.scdn.co/image/ab67616d00001e022c25dad9f8fd54652f7ba5df',
      spotify: 'https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc',
      accent: 'from-yellow-500 to-orange-500',
      accentColor: 'rgba(251, 191, 36, 0.2)',
    },
    {
      title: "1989 (Taylor's Version)",
      artist: 'Taylor Swift',
      cover: 'https://i.scdn.co/image/ab67616d0000b273904445d70d04eb24d6bb79ac',
      spotify: 'https://open.spotify.com/album/64LU4c1nfjz1t4VnGhagcg',
      accent: 'from-cyan-500 to-blue-500',
      accentColor: 'rgba(6, 182, 212, 0.2)',
    },
    {
      title: 'Nectar',
      artist: 'Joji',
      cover: 'https://i.scdn.co/image/ab67616d00001e02e0b60c608586d88252b8fbc0',
      spotify: 'https://open.spotify.com/album/3lS1y25WAhcqJDATJK70Mq',
      accent: 'from-purple-500 to-blue-500',
      accentColor: 'rgba(139, 92, 246, 0.2)',
    },
  ], []);

  const currentAlbum = albums[currentAlbumIndex];

  // Audio handling
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

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleSeek = useCallback((e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  const handleVolumeChange = useCallback((e) => {
    setVolume(parseFloat(e.target.value));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Starfield */}
      <Starfield />

      {/* Mood Gradient */}
      <MoodGradient accentColor={currentAlbum.accentColor} />

      {/* Lyric Clouds */}
      <LyricClouds />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-8 px-6 text-center">
          <h1 className="text-5xl font-thin tracking-wider mb-4">My Music Universe</h1>
          <p className="text-gray-400 text-lg font-light">
            where sound becomes memory
          </p>
        </section>

        {/* Vinyl Player Section */}
        <section className="py-12 px-6 flex flex-col items-center">
          {/* Audio Visualizer */}
          <div className="mb-8 w-full max-w-md">
            <AudioVisualizer isPlaying={isPlaying} />
          </div>

          {/* Vinyl Player */}
          <VinylPlayer
            album={currentAlbum}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </section>

        {/* Album Selection */}
        <section className="py-16 px-6">
          <h2 className="text-2xl font-thin text-center mb-12 text-white/80">
            select album
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {albums.map((album, idx) => (
              <MemoizedAlbumCard
                key={album.title}
                album={album}
                isActive={idx === currentAlbumIndex}
                onClick={() => setCurrentAlbumIndex(idx)}
              />
            ))}
          </div>
        </section>

        {/* CircularGallery Section */}
        <section className="py-16 px-6 bg-black/50">
          <h2 className="text-3xl font-thin mb-8 text-white/80 max-w-7xl mx-auto">
            artists I love
          </h2>
          <div style={{ height: '500px', position: 'relative', width: '100%' }}>
            <CircularGallery
              bend={4}
              textColor="#ffffff"
              borderRadius={0.1}
              scrollEase={0.03}
            />
          </div>
        </section>

      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/mp3/golden-brown-slowed.mp3"
        onEnded={() => setIsPlaying(false)}
        preload="auto"
        onLoadedMetadata={() => {
          if (audioRef.current && !isNaN(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
    </div>
  );
};

export default MusicPage;
