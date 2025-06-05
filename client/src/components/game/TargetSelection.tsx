import { useHackingGame } from '@/lib/stores/useHackingGame';
import { targets } from '@/lib/gameData';

export default function TargetSelection() {
  const { setCurrentTarget, setCurrentScreen, computerSpecs } = useHackingGame();

  const handleTargetSelect = (target: any) => {
    setCurrentTarget(target);
    setCurrentScreen('methods');
  };

  const getTargetAccessibility = (target: any) => {
    const totalSpecs = computerSpecs.cpuLevel + computerSpecs.ramLevel + computerSpecs.networkLevel + computerSpecs.osLevel;
    return totalSpecs >= target.requiredSpecs;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-cyan-400 text-xl font-bold">TARGET SELECTION</div>
        <button
          onClick={() => setCurrentScreen('main')}
          className="px-4 py-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 text-sm"
        >
          &lt; BACK
        </button>
      </div>

      <div className="space-y-4">
        {targets.map((target, index) => {
          const isAccessible = getTargetAccessibility(target);
          
          return (
            <div 
              key={index}
              className={`border p-4 ${
                isAccessible 
                  ? 'border-green-400 hover:bg-green-900 hover:bg-opacity-20 cursor-pointer' 
                  : 'border-gray-600 bg-gray-800 bg-opacity-50'
              } transition-colors`}
              onClick={isAccessible ? () => handleTargetSelect(target) : undefined}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className={`text-lg font-bold ${isAccessible ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {target.name}
                  </div>
                  <div className={`text-sm ${isAccessible ? 'text-green-300' : 'text-gray-400'}`}>
                    {target.description}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${isAccessible ? 'text-green-400' : 'text-gray-500'}`}>
                    ${target.payout.toLocaleString()}
                  </div>
                  <div className={`text-sm ${isAccessible ? getDifficultyColor(target.difficulty) : 'text-gray-500'}`}>
                    {target.difficulty}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <div className={isAccessible ? 'text-green-300' : 'text-gray-400'}>
                  Security Level: {target.securityLevel}/10
                </div>
                <div className={isAccessible ? 'text-green-300' : 'text-gray-400'}>
                  Required Specs: {target.requiredSpecs}/20
                </div>
              </div>

              {!isAccessible && (
                <div className="mt-2 text-red-400 text-xs">
                  [ACCESS DENIED] - Insufficient hardware specifications
                </div>
              )}

              {target.vulnerabilities && target.vulnerabilities.length > 0 && isAccessible && (
                <div className="mt-2 text-xs text-yellow-400">
                  Known Vulnerabilities: {target.vulnerabilities.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case 'low': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'high': return 'text-orange-400';
    case 'extreme': return 'text-red-400';
    default: return 'text-gray-400';
  }
}
