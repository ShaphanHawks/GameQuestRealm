import { useState, useEffect } from 'react';
import { useHackingGame } from '@/lib/stores/useHackingGame';
import { useAudio } from '@/lib/stores/useAudio';
import { generateFakeData } from '@/lib/fakeDataGenerator';

export default function MiniGames() {
  const {
    currentMethod,
    currentTarget,
    executeHack,
    setCurrentScreen,
    computerSpecs
  } = useHackingGame();

  const { playSuccess, playHit } = useAudio();
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [gameData, setGameData] = useState<any>(null);
  const [userInput, setUserInput] = useState('');
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
      case 'pin_guess':
        data = {
          type: 'pin',
          // Hardcoding the PIN to 5566 as requested by the user.
          // Original: Math.floor(1000 + Math.random() * 9000).toString(),
          targetPin: '5566', // Updated to 5566
          maxAttempts: 3,
          hints: []
        };
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
        const correctIndex = Math.floor(Math.random() * 4); // Keep this as the *correct* index
        const optionsArray = [
            generateFakeData().accountNumber,
            generateFakeData().accountNumber,
            generateFakeData().accountNumber,
            generateFakeData().accountNumber
        ];
        optionsArray[correctIndex] = fakeData.accountNumber; // Place the correct answer at the chosen index

        data = {
          type: 'account',
          partial: fakeData.accountNumber.substring(0, 6) + 'XXXX',
          options: optionsArray,
          correct: correctIndex // Now `correct` directly refers to the index of the correct answer
        };
        break;

      case 'firewall_bypass':
        data = {
          type: 'firewall',
          sequence: [],
          userSequence: [],
          length: 6,
          timeLimit: 5000
        };
        // Generate random sequence
        for (let i = 0; i < data.length; i++) {
          data.sequence.push(Math.floor(Math.random() * 4));
        }
        break;

      default:
        data = { type: 'simple', success: Math.random() > 0.5 };
    }

    setGameData(data);
    setGameState('playing');
    setAttempts(0);
    setUserInput('');
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

  const handleSubmit = () => {
    if (!gameData) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let success = false;

    switch (gameData.type) {
      case 'pin':
        success = userInput === gameData.targetPin;
        if (!success && newAttempts < gameData.maxAttempts) {
          // Provide hint
          const targetDigits = gameData.targetPin.split('');
          const userDigits = userInput.split('');
          const hints = [];
          for (let i = 0; i < 4; i++) {
            if (userDigits[i] === targetDigits[i]) {
              hints.push(`Position ${i + 1}: Correct`);
            } else if (targetDigits.includes(userDigits[i])) {
              hints.push(`Position ${i + 1}: Wrong position`);
            }
          }
          setGameData({...gameData, hints});
        }
        break;

      case 'cipher':
        success = userInput.toUpperCase() === gameData.original;
        break;

      case 'account':
        success = parseInt(userInput) === gameData.correct;
        break;

      default:
        success = gameData.success;
    }

    if (success || newAttempts >= (gameData.maxAttempts || 3)) {
      setResult(success ? 'success' : 'failure');
      setGameState('completed');

      if (success) {
        playSuccess();
      } else {
        playHit();
      }

      // Execute the hack after a short delay
      setTimeout(() => {
        executeHack(success);
        setCurrentScreen('main');
      }, 2000);
    } else {
      setUserInput('');
    }
  };

  if (!currentMethod || !currentTarget) {
    return <div>No method or target selected</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-cyan-400 text-xl font-bold">
          {currentMethod.name.toUpperCase()}
        </div>
        <button
          onClick={() => setCurrentScreen('methods')}
          className="px-4 py-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 text-sm"
        >
          &lt; ABORT
        </button>
      </div>

      <div className="border border-green-400 p-4">
        <div className="text-lg font-bold text-cyan-400">
          Attacking: {currentTarget.name}
        </div>
        <div className="text-green-300">Method: {currentMethod.name}</div>
        <div className="text-yellow-400">Attempts: {attempts}/{gameData?.maxAttempts || 3}</div>
      </div>

      {gameState === 'playing' && gameData && (
        <div className="border border-green-400 p-4 space-y-4">
          {gameData.type === 'pin' && (
            <div>
              <div className="text-cyan-400 mb-2">Enter 4-digit PIN:</div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.slice(0, 4))}
                className="bg-black border border-green-400 text-green-400 p-2 font-mono"
                placeholder="XXXX"
                maxLength={4}
                autoFocus
              />
              {gameData.hints.length > 0 && (
                <div className="mt-2 text-yellow-400 text-sm">
                  {gameData.hints.map((hint: string, i: number) => (
                    <div key={i}>{hint}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {gameData.type === 'cipher' && (
            <div>
              <div className="text-cyan-400 mb-2">Decode the cipher:</div>
              <div className="text-2xl font-mono text-yellow-400 mb-2">{gameData.encoded}</div>
              <div className="text-sm text-gray-400 mb-2">Hint: {gameData.hint}</div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className="bg-black border border-green-400 text-green-400 p-2 font-mono"
                placeholder="DECODED MESSAGE"
                autoFocus
              />
            </div>
          )}

          {gameData.type === 'account' && (
            <div>
              <div className="text-cyan-400 mb-2">Match the account number:</div>
              <div className="text-lg font-mono text-yellow-400 mb-4">
                Partial: {gameData.partial}
              </div>
              <div className="space-y-2">
                {gameData.options.map((option: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setUserInput(i.toString())}
                    className={`block w-full text-left p-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 font-mono ${
                      userInput === i.toString() ? 'bg-green-900 bg-opacity-30' : ''
                    }`}
                  >
                    {i}: {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!userInput}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold border-2 border-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            EXECUTE
          </button>
        </div>
      )}

      {gameState === 'completed' && (
        <div className="border border-green-400 p-4">
          <div className={`text-xl font-bold ${result === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {result === 'success' ? 'HACK SUCCESSFUL!' : 'HACK FAILED!'}
          </div>
          <div className="text-green-300 mt-2">
            {result === 'success'
              ? `Gained $${currentTarget.payout.toLocaleString()}`
              : 'Trace level increased'}
          </div>
          <div className="text-yellow-400 text-sm mt-2">
            Returning to main terminal...
          </div>
        </div>
      )}
    </div>
  );
}
  