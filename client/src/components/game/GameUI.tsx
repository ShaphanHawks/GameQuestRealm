import { useHackingGame } from '@/lib/stores/useHackingGame';
import { useAudio } from '@/lib/stores/useAudio';
import { Volume2, VolumeX } from 'lucide-react';

export default function GameUI() {
  const { money, traceLevel, setCurrentScreen } = useHackingGame();
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="bg-gray-900 border-b border-green-400 p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-8">
          <div className="text-green-400">
            <span className="text-cyan-400">FUNDS:</span> ${money.toLocaleString()}
          </div>
          
          <div className="text-green-400">
            <span className="text-cyan-400">TRACE:</span> 
            <span className={`ml-2 ${traceLevel > 75 ? 'text-red-400' : traceLevel > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
              {traceLevel}%
            </span>
          </div>

          {/* Trace Level Bar */}
          <div className="flex items-center space-x-2">
            <div className="w-32 h-2 bg-gray-700 border border-green-400">
              <div 
                className={`h-full transition-all duration-300 ${
                  traceLevel > 75 ? 'bg-red-500' : 
                  traceLevel > 50 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${traceLevel}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="text-green-400 hover:text-cyan-400 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={() => setCurrentScreen('main')}
            className="px-3 py-1 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 transition-colors text-sm"
          >
            MAIN
          </button>
        </div>
      </div>
    </div>
  );
}
