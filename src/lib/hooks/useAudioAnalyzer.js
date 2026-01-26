import { useEffect, useRef, useState } from 'react';

export const useAudioAnalyzer = (audioElementRef) => {
  const [analyser, setAnalyser] = useState(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (!audioElementRef.current) return;

    // Initialize AudioContext on user interaction (handled by browser usually, but good to be safe)
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create source
        if (!sourceRef.current) {
            // Check if source already exists for this element to avoid reassignment errors
             try {
                sourceRef.current = audioContextRef.current.createMediaElementSource(audioElementRef.current);
             } catch (e) {
                 console.warn("MediaElementSource already attached", e);
                 return; 
             }
        }

        // Create analyser
        const analyserNode = audioContextRef.current.createAnalyser();
        analyserNode.fftSize = 256; // Good balance for performance/detail
        
        sourceRef.current.connect(analyserNode);
        analyserNode.connect(audioContextRef.current.destination);
        
        setAnalyser(analyserNode);
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    // Attach to play event to ensure context resumes
    const audio = audioElementRef.current;
    audio.addEventListener('play', initAudio);

    return () => {
      audio.removeEventListener('play', initAudio);
      // We generally don't close the context here if we want to reuse it, 
      // but if the component unmounts we might want to clean up.
      // For now, let's keep it simple.
    };
  }, [audioElementRef]);

  return analyser;
};
