import { useHackingGame } from '@/lib/stores/useHackingGame';
import { hackingMethods } from '@/lib/gameData';

export default function HackingMethods() {
  const { 
    currentTarget, 
    setCurrentMethod, 
    setCurrentScreen, 
    computerSpecs,
    unlockedMethods 
  } = useHackingGame();

  const handleMethodSelect = (method: any) => {
    setCurrentMethod(method);
    setCurrentScreen('minigame');
  };

  const calculateSuccessRate = (method: any) => {
    if (!currentTarget) return 0;
    
    const baseRate = method.baseSuccessRate;
    const specBonus = (computerSpecs.cpuLevel + computerSpecs.ramLevel + computerSpecs.networkLevel + computerSpecs.osLevel) * 2;
    const securityPenalty = currentTarget.securityLevel * 3;
    
    return Math.max(10, Math.min(95, baseRate + specBonus - securityPenalty));
  };

  if (!currentTarget) {
    return <div>No target selected</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-cyan-400 text-xl font-bold">HACKING METHODS</div>
        <button
          onClick={() => setCurrentScreen('targets')}
          className="px-4 py-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 text-sm"
        >
          &lt; BACK
        </button>
      </div>

      <div className="border border-green-400 p-4">
        <div className="text-lg font-bold text-cyan-400">Target: {currentTarget.name}</div>
        <div className="text-green-300">Potential Payout: ${currentTarget.payout.toLocaleString()}</div>
        <div className="text-yellow-400">Security Level: {currentTarget.securityLevel}/10</div>
      </div>

      <div className="space-y-4">
        {hackingMethods.map((method, index) => {
          const isUnlocked = unlockedMethods.includes(method.id);
          const successRate = calculateSuccessRate(method);
          
          return (
            <div 
              key={index}
              className={`border p-4 ${
                isUnlocked 
                  ? 'border-green-400 hover:bg-green-900 hover:bg-opacity-20 cursor-pointer' 
                  : 'border-gray-600 bg-gray-800 bg-opacity-50'
              } transition-colors`}
              onClick={isUnlocked ? () => handleMethodSelect(method) : undefined}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className={`text-lg font-bold ${isUnlocked ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {method.name}
                  </div>
                  <div className={`text-sm ${isUnlocked ? 'text-green-300' : 'text-gray-400'}`}>
                    {method.description}
                  </div>
                </div>
                
                <div className="text-right">
                  {isUnlocked ? (
                    <>
                      <div className="text-green-400">Success: {successRate}%</div>
                      <div className="text-yellow-400">Trace: +{method.traceIncrease}%</div>
                    </>
                  ) : (
                    <div className="text-red-400">[LOCKED]</div>
                  )}
                </div>
              </div>

              {!isUnlocked && (
                <div className="mt-2 text-red-400 text-xs">
                  Available in Dark Web Market
                </div>
              )}

              {method.requiredData && isUnlocked && (
                <div className="mt-2 text-xs text-yellow-400">
                  Required: {method.requiredData.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
