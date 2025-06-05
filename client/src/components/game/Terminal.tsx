import { useState } from 'react';
import { useHackingGame } from '@/lib/stores/useHackingGame';
import GameUI from './GameUI';
import TargetSelection from './TargetSelection';
import HackingMethods from './HackingMethods';
import MiniGames from './MiniGames';
import DarkWebMarket from './DarkWebMarket';
import ComputerStats from './ComputerStats';

export default function Terminal() {
  const { 
    gamePhase, 
    money, 
    traceLevel, 
    startGame, 
    currentScreen,
    setCurrentScreen,
    gameOver,
    victory
  } = useHackingGame();

  const handleStartHacking = () => {
    startGame();
    setCurrentScreen('main');
  };

  if (gamePhase === 'ready') {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center font-mono">
        <div className="text-center space-y-8 p-8">
          <div className="text-3xl md:text-5xl font-bold text-cyan-400 mb-8">
            BYTE HEIST
          </div>
          
          <div className="text-lg text-green-300 space-y-2">
            <div>Welcome to the underground, hacker.</div>
            <div>Your mission: Accumulate $1,000,000 through cyber operations.</div>
            <div>But be careful - one wrong move and you'll be traced.</div>
          </div>

          <div className="border border-green-400 p-6 max-w-lg mx-auto text-left text-sm space-y-2">
            <div className="text-cyan-400 font-bold">OBJECTIVE:</div>
            <div>• Accumulate $1,000,000 in digital currency</div>
            <div>• Keep Trace Level below 100%</div>
            <div>• Upgrade your rig for better success rates</div>
            <div>• Choose targets and methods wisely</div>
          </div>

          <button
            onClick={handleStartHacking}
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold text-xl border-2 border-green-400 transition-colors duration-200"
          >
            &gt; START HACKING &lt;
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'ended') {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center font-mono">
        <div className="text-center space-y-8 p-8">
          {victory ? (
            <>
              <div className="text-4xl text-cyan-400 font-bold">MISSION ACCOMPLISHED</div>
              <div className="text-2xl text-green-400">You've successfully accumulated $1,000,000!</div>
              <div className="text-lg">The funds have been transferred to your secure accounts.</div>
            </>
          ) : (
            <>
              <div className="text-4xl text-red-400 font-bold">TRACE DETECTED</div>
              <div className="text-2xl text-red-300">SYSTEM LOCKED OUT</div>
              <div className="text-lg">Your activities have been detected. Connection terminated.</div>
            </>
          )}
          
          <div className="border border-green-400 p-4">
            <div>Final Stats:</div>
            <div>Money Accumulated: ${money.toLocaleString()}</div>
            <div>Final Trace Level: {traceLevel}%</div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold border-2 border-green-400"
          >
            &gt; RESTART &lt;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <GameUI />
      
      <div className="container mx-auto p-4">
        {currentScreen === 'main' && (
          <div className="space-y-6">
            <div className="border border-green-400 p-4">
              <div className="text-cyan-400 text-xl font-bold mb-4">HACKER TERMINAL v2.1.3</div>
              <div className="space-y-2 text-sm">
                <div>&gt; System Status: OPERATIONAL</div>
                <div>&gt; Connection: ENCRYPTED</div>
                <div>&gt; Location: UNTRACEABLE</div>
                <div>&gt; Objective: $1,000,000 TARGET</div>
              </div>
            </div>

            <ComputerStats />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentScreen('targets')}
                className="p-4 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 transition-colors"
              >
                <div className="text-cyan-400 font-bold">SELECT TARGET</div>
                <div className="text-sm">Choose your next mark</div>
              </button>

              <button
                onClick={() => setCurrentScreen('market')}
                className="p-4 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 transition-colors"
              >
                <div className="text-cyan-400 font-bold">DARK WEB MARKET</div>
                <div className="text-sm">Upgrade your rig</div>
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'targets' && <TargetSelection />}
        {currentScreen === 'methods' && <HackingMethods />}
        {currentScreen === 'minigame' && <MiniGames />}
        {currentScreen === 'market' && <DarkWebMarket />}
      </div>
    </div>
  );
}
