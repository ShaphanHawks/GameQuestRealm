import { useState, useEffect } from 'react';
import LoadingScreen from './components/game/LoadingScreen';
import Terminal from './components/game/Terminal';
import { useHackingGame } from './lib/stores/useHackingGame';
import { useAudio } from './lib/stores/useAudio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { gamePhase } = useHackingGame();
  const { backgroundMusic, setBackgroundMusic } = useAudio();

  useEffect(() => {
    // Setup background music
    const audio = new Audio('/sounds/background.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    setBackgroundMusic(audio);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setBackgroundMusic]);

  // Start background music when game starts
  useEffect(() => {
    if (!isLoading && backgroundMusic && gamePhase === 'playing') {
      backgroundMusic.play().catch(console.log);
    }
  }, [isLoading, backgroundMusic, gamePhase]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden">
      <Terminal />
    </div>
  );
}
