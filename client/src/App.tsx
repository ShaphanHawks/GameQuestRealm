import { useState, useEffect } from 'react';
import LoadingScreen from './components/game/LoadingScreen';
import Terminal from './components/game/Terminal';
import { useHackingGame } from './lib/stores/useHackingGame';
import { useAudio } from './lib/stores/useAudio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { gamePhase } = useHackingGame();
  // --- UPDATED LOGIC ---
  // Get isMuted state to control music playback
  const { isMuted, backgroundMusic, setBackgroundMusic } = useAudio();

  useEffect(() => {
    const audio = new Audio('/sounds/background.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    setBackgroundMusic(audio);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setBackgroundMusic]);

  // --- UPDATED LOGIC ---
  // This effect now correctly handles playing and pausing the music
  // based on the game phase and the mute state.
  useEffect(() => {
    if (!isLoading && backgroundMusic) {
      if (gamePhase === 'playing' && !isMuted) {
        backgroundMusic.play().catch(console.log);
      } else {
        backgroundMusic.pause();
      }
    }
  }, [isLoading, backgroundMusic, gamePhase, isMuted]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden">
      <Terminal />
    </div>
  );
}  
