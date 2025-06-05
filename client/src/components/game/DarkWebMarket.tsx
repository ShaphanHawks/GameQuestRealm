import { useHackingGame } from '@/lib/stores/useHackingGame';
import { marketItems } from '@/lib/gameData';

export default function DarkWebMarket() {
  const { 
    money, 
    computerSpecs, 
    unlockedMethods, 
    purchaseUpgrade, 
    setCurrentScreen 
  } = useHackingGame();

  const handlePurchase = (item: any) => {
    if (money >= item.price) {
      purchaseUpgrade(item);
    }
  };

  const canAfford = (price: number) => money >= price;
  const isMaxLevel = (currentLevel: number) => currentLevel >= 5;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-cyan-400 text-xl font-bold">DARK WEB MARKET</div>
        <button
          onClick={() => setCurrentScreen('main')}
          className="px-4 py-2 border border-green-400 hover:bg-green-900 hover:bg-opacity-20 text-sm"
        >
          &lt; BACK
        </button>
      </div>

      <div className="border border-green-400 p-4">
        <div className="text-lg font-bold text-cyan-400">Available Funds: ${money.toLocaleString()}</div>
        <div className="text-sm text-gray-400 mt-1">
          Purchases are final. Choose wisely.
        </div>
      </div>

      <div className="space-y-6">
        {/* Hardware Upgrades */}
        <div>
          <div className="text-cyan-400 text-lg font-bold mb-4">HARDWARE UPGRADES</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketItems.hardware.map((item, index) => {
              const currentLevel = computerSpecs[`${item.type}Level` as keyof typeof computerSpecs] as number;
              const maxed = isMaxLevel(currentLevel);
              const affordable = canAfford(item.price);

              return (
                <div 
                  key={index}
                  className={`border p-4 ${
                    maxed 
                      ? 'border-gray-600 bg-gray-800 bg-opacity-50' 
                      : affordable 
                        ? 'border-green-400 hover:bg-green-900 hover:bg-opacity-20 cursor-pointer' 
                        : 'border-red-400 bg-red-900 bg-opacity-10'
                  } transition-colors`}
                  onClick={!maxed && affordable ? () => handlePurchase(item) : undefined}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`font-bold ${maxed ? 'text-gray-500' : 'text-cyan-400'}`}>
                        {item.name}
                      </div>
                      <div className={`text-sm ${maxed ? 'text-gray-400' : 'text-green-300'}`}>
                        {item.description}
                      </div>
                      <div className="text-xs text-yellow-400 mt-1">
                        Current Level: {currentLevel}/5
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {maxed ? (
                        <div className="text-green-400 font-bold">MAXED</div>
                      ) : (
                        <div className={`font-bold ${affordable ? 'text-green-400' : 'text-red-400'}`}>
                          ${item.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {!maxed && (
                    <div className="mt-2 text-xs text-gray-400">
                      {item.benefits}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Software/Tools */}
        <div>
          <div className="text-cyan-400 text-lg font-bold mb-4">HACKING TOOLS</div>
          <div className="space-y-4">
            {marketItems.software.map((item, index) => {
              const owned = unlockedMethods.includes(item.id);
              const affordable = canAfford(item.price);

              return (
                <div 
                  key={index}
                  className={`border p-4 ${
                    owned 
                      ? 'border-gray-600 bg-gray-800 bg-opacity-50' 
                      : affordable 
                        ? 'border-green-400 hover:bg-green-900 hover:bg-opacity-20 cursor-pointer' 
                        : 'border-red-400 bg-red-900 bg-opacity-10'
                  } transition-colors`}
                  onClick={!owned && affordable ? () => handlePurchase(item) : undefined}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`font-bold ${owned ? 'text-gray-500' : 'text-cyan-400'}`}>
                        {item.name}
                      </div>
                      <div className={`text-sm ${owned ? 'text-gray-400' : 'text-green-300'}`}>
                        {item.description}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {owned ? (
                        <div className="text-green-400 font-bold">OWNED</div>
                      ) : (
                        <div className={`font-bold ${affordable ? 'text-green-400' : 'text-red-400'}`}>
                          ${item.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-400">
                    Success Rate: {item.baseSuccessRate}% | Trace Increase: +{item.traceIncrease}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
