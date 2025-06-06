import { useState, useEffect } from 'react';
import { useHackingGame } from '@/lib/stores/useHackingGame';
import { useAudio } from '@/lib/stores/useAudio';
import { generateFakeData, generateFakeCredentials } from '@/lib/fakeDataGenerator';

// --- NEW COMPONENT: FirewallBypassGame ---
const FirewallBypassGame = ({ gameData, onComplete }: { gameData: any, onComplete: (success: boolean) => void }) => {
  const [sequence, setSequence] = useState(gameData.sequence);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isDisplaying, setIsDisplaying] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsDisplaying(false), 3000); // Display sequence for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userSequence.length === sequence.length) {
      const success = JSON.stringify(userSequence) === JSON.stringify(sequence);
      onComplete(success);
    }
  }, [userSequence, sequence, onComplete]);

  const handleButtonClick = (index: number) => {
    if (!isDisplaying) {
      setUserSequence(prev => [...prev, index]);
    }
  };

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div>
      <div className="text-cyan-400 mb-2">
        {isDisplaying ? 'Memorize the sequence...' : 'Enter the sequence:'}
      </div>
      <div className="flex justify-center gap-4 my-4">
        {isDisplaying ? (
          sequence.map((val: number, i: number) => (
            <div key={i} className={`w-12 h-12 rounded ${colors[val]}`}></div>
          ))
        ) : (
          userSequence.map((val, i) => (
            <div key={i} className={`w-12 h-12 rounded ${colors[val]}`}></div>
          ))
        )}
      </div>
      {!isDisplaying && (
        <div className="flex justify-center gap-4">
          {colors.map((color, i) => (
            <button key={i} onClick={() => handleButtonClick(i)} className={`w-16 h-16 rounded ${color} hover:opacity-80`}></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MiniGames() {
  const {
    currentMethod,
    currentTarget,
    executeHack,
    setCurrentScreen,
  } = useHackingGame();

  const { playSuccess, playHit } = useAudio();
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [gameData, setGameData] = useState<any>(null);
  const [userInput, setUserInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState(''); // For phishing
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState<'success' | 'failure' | null>(null);

  useEffect(() => {
    if (currentMethod && gameState === 'ready') {
      initializeGame();
    }
  }, [currentMethod, gameState]);

  const initializeGame = () => {
    if (!currentMethod) return;

    let data;
    switch (currentMethod.id) {
      // --- UPDATED: Random PIN Generation ---
      case 'pin_guess':
        data = {
          type: 'pin',
          targetPin: Math.floor(1000 + Math.random() * 9000).toString(),
          maxAttempts: 3,
          hints: []
        };
        break;

      // --- NEW: Phishing Minigame Logic ---
      case 'phishing':
        const credentials = generateFakeCredentials();
        data = {
          type: 'phishing',
          targetEmail: credentials.email,
          targetPassword: credentials.password,
          maxAttempts: 1,
        }
        break;

      case 'cipher_decode':
        const words = ['SECURE', 'ACCESS', 'BREACH', 'SYSTEM', 'CRYPTO'];
        const word = words[Math.floor(Math.random() * words.length)];
        const shift = Math.floor(2 + Math.random() * 5);
        data = {
          type: 'cipher',
          encoded: caesarCipher(word, shift),
          original: word,
          shift: shift,
          hint: `Caesar cipher with shift of ${shift}`
        };
        break;

      case 'account_match':
        const fakeData = generateFakeData();
        const correctIndex = Math.floor(Math.random() * 4);
        const optionsArray = Array.from({ length: 4 }, () => generateFakeData().accountNumber);
        optionsArray[correctIndex] = fakeData.accountNumber;
        data = {
          type: 'account',
          partial: fakeData.accountNumber.substring(0, 6) + 'XXXX',
          options: optionsArray,
          correct: correctIndex
        };
        break;

      // --- UPDATED: Firewall Bypass Logic ---
      case 'firewall_bypass':
        const sequence = Array.from({ length: 6 }, () => Math.floor(Math.random() * 4));
        data = {
          type: 'firewall',
          sequence: sequence,
        };
        break;

      default:
        data = { type: 'simple', success: Math.random() > 0.5 };
    }

    setGameData(data);
    setGameState('playing');
    setAttempts(0);
    setUserInput('');
    setUserPasswordInput('');
    setResult(null);
  };

  const caesarCipher = (text: string, shift: number) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const completeGame = (success: boolean) => {
    setResult(success ? 'success' : 'failure');
    setGameState('completed');

    if (success) playSuccess();
    else playHit();

    setTimeout(() => {
      executeHack(success);
      setCurrentScreen('main');
    }, 2000);
  };

  const handleSubmit = () => {
    if (!gameData) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    let success = false;
    switch (gameData.type) {
      case 'pin':
        success = userInput === gameData.targetPin;
        break;
      case 'cipher':
        success = userInput.toUpperCase() === gameData.original;
        break;
      case 'account':
        success = parseInt(userInput) === gameData.correct;
        break;
      case 'phishing':
        success = userInput === gameData.targetEmail && userPasswordInput === gameData.targetPassword;
        break;
      default:
        success = gameData.success;
    }
    if (success || newAttempts >= (gameData.maxAttempts || 3)) {
      completeGame(success);
    } else {
      setUserInput('');
    }
  };

  if (!currentMethod || !currentTarget) {
    return <div>No method or target selected</div>;
  }

  const renderGameContent = () => {
    if (gameState !== 'playing' || !gameData) return null;

    switch (gameData.type) {
      case 'pin':
        return (
          <>
            <div className="text-cyan-400 mb-2">Enter 4-digit PIN:</div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="bg-black border border-green-400 text-green-400 p-2 font-mono"
              placeholder="XXXX"
              maxLength={4} autoFocus
            />
            <button onClick={handleSubmit} disabled={userInput.length !== 4} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold border-2 border-green-400 disabled:opacity-50 ml-2">EXECUTE</button>
          </>
        );
      case 'phishing':
        return (
          <>
             <div className="text-cyan-400 mb-2">Enter stolen credentials:</div>
             <input type="email" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="bg-black border border-green-400 text-green-400 p-2 font-mono w-full mb-2" placeholder="Email Address" autoFocus />
             <input type="password" value={userPasswordInput} onChange={(e) => setUserPasswordInput(e.target.value)} className="bg-black border border-green-400 text-green-400 p-2 font-mono w-full" placeholder="Password" />
             <button onClick={handleSubmit} disabled={!userInput || !userPasswordInput} className="px-4 py-2 mt-4 bg-green-600 hover:bg-green-500 text-black font-bold border-2 border-green-400 disabled:opacity-50">EXECUTE</button>
          </>
        );
      case 'cipher':
         return (
          <>
            <div className="text-cyan-400 mb-2">Decode the cipher:</div>
            <div className="text-2xl font-mono text-yellow-400 mb-2">{gameData.encoded}</div>
            <div className="text-sm text-gray-400 mb-2">Hint: {gameData.hint}</div>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value.toUpperCase())} className="bg-black border border-green-400 text-green-400 p-2 font-mono" placeholder="DECODED MESSAGE" autoFocus />
            <button onClick={handleSubmit} disabled={!userInput} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold border-2 border-green-400 disabled:opacity-50 ml-2">EXECUTE</button>
          </>
        );
      case 'account':
        return (
          <>
            <div className="text-cyan-400 mb-2">Match the account number:</div>
            <div className="text-lg font-mono text-yellow-400 mb-4">Partial: {gameData.partial}</div>
            <div className="space-y-2">
              {gameData.options.map((option: string, i: number) => (
                <button key={i} onClick={() => { setUserInput(i.toString()); handleSubmit(); }}
                  className={`block w-full text-left p-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 font-mono`}>
                  {i}: {option}
                </button>
              ))}
            </div>
          </>
        );
      // --- NEW: FirewallBypassGame Render ---
      case 'firewall':
        return <FirewallBypassGame gameData={gameData} onComplete={completeGame} />;
      default:
        return <p>Executing...</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-cyan-400 text-xl font-bold">{currentMethod.name.toUpperCase()}</div>
        <button onClick={() => setCurrentScreen('methods')} className="px-4 py-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 text-sm">&lt; ABORT</button>
      </div>
      <div className="border border-green-400 p-4">
        <div className="text-lg font-bold text-cyan-400">Attacking: {currentTarget.name}</div>
        <div className="text-green-300">Method: {currentMethod.name}</div>
        <div className="text-yellow-400">Attempts: {attempts}/{gameData?.maxAttempts || 1}</div>
      </div>
      <div className="border border-green-400 p-4 space-y-4">
        {gameState === 'playing' && renderGameContent()}
        {gameState === 'completed' && (
          <div className={`text-xl font-bold ${result === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {result === 'success' ? 'HACK SUCCESSFUL!' : 'HACK FAILED!'}
            <div className="text-sm text-yellow-400 mt-2">Returning to main terminal...</div>
          </div>
        )}
      </div>
    </div>
  );
}  
