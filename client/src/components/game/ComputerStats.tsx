import { useHackingGame } from '@/lib/stores/useHackingGame';

export default function ComputerStats() {
  const { computerSpecs } = useHackingGame();

  return (
    <div className="border border-green-400 p-4">
      <div className="text-cyan-400 text-lg font-bold mb-3">HACKING RIG SPECIFICATIONS</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-green-300">CPU: {computerSpecs.cpu}</div>
          <div className="text-gray-400">Processing Power: {computerSpecs.cpuLevel}/5</div>
        </div>
        <div>
          <div className="text-green-300">RAM: {computerSpecs.ram}</div>
          <div className="text-gray-400">Memory: {computerSpecs.ramLevel}/5</div>
        </div>
        <div>
          <div className="text-green-300">Network: {computerSpecs.network}</div>
          <div className="text-gray-400">Speed: {computerSpecs.networkLevel}/5</div>
        </div>
        <div>
          <div className="text-green-300">OS: {computerSpecs.os}</div>
          <div className="text-gray-400">Security: {computerSpecs.osLevel}/5</div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        Higher specs = Better success rates, Lower trace increase, Access to advanced targets
      </div>
    </div>
  );
}
