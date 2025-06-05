import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type GamePhase = 'ready' | 'playing' | 'ended';
export type Screen = 'main' | 'targets' | 'methods' | 'minigame' | 'market';

interface ComputerSpecs {
  cpu: string;
  cpuLevel: number;
  ram: string;
  ramLevel: number;
  network: string;
  networkLevel: number;
  os: string;
  osLevel: number;
}

interface GameState {
  gamePhase: GamePhase;
  currentScreen: Screen;
  money: number;
  traceLevel: number;
  computerSpecs: ComputerSpecs;
  unlockedMethods: string[];
  currentTarget: any;
  currentMethod: any;
  gameOver: boolean;
  victory: boolean;

  // Actions
  startGame: () => void;
  setCurrentScreen: (screen: Screen) => void;
  setCurrentTarget: (target: any) => void;
  setCurrentMethod: (method: any) => void;
  executeHack: (success: boolean) => void;
  purchaseUpgrade: (item: any) => void;
  endGame: (victory: boolean) => void;
}

const initialComputerSpecs: ComputerSpecs = {
  cpu: 'Basic Processor (2.5 GHz)',
  cpuLevel: 1,
  ram: '4 GB DDR3',
  ramLevel: 1,
  network: '100 Mbps Ethernet',
  networkLevel: 1,
  os: 'Linux Kernel 3.x',
  osLevel: 1,
};

export const useHackingGame = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    gamePhase: 'ready',
    currentScreen: 'main',
    money: 5000, // Starting money for basic upgrades
    traceLevel: 0,
    computerSpecs: initialComputerSpecs,
    unlockedMethods: ['phishing', 'brute_force'], // Start with basic methods
    currentTarget: null,
    currentMethod: null,
    gameOver: false,
    victory: false,

    startGame: () => {
      set({ gamePhase: 'playing' });
    },

    setCurrentScreen: (screen) => {
      set({ currentScreen: screen });
    },

    setCurrentTarget: (target) => {
      set({ currentTarget: target });
    },

    setCurrentMethod: (method) => {
      set({ currentMethod: method });
    },

    executeHack: (success) => {
      const state = get();
      
      if (success && state.currentTarget) {
        const newMoney = state.money + state.currentTarget.payout;
        
        // Check for victory
        if (newMoney >= 1000000) {
          set({ 
            money: newMoney,
            victory: true,
            gamePhase: 'ended'
          });
          return;
        }
        
        set({ money: newMoney });
      }
      
      // Increase trace level based on method and success
      const traceIncrease = success 
        ? (state.currentMethod?.traceIncrease || 5) * 0.5 
        : (state.currentMethod?.traceIncrease || 5);
      
      // Computer specs reduce trace increase
      const specReduction = (state.computerSpecs.cpuLevel + state.computerSpecs.osLevel) * 0.5;
      const finalTraceIncrease = Math.max(1, traceIncrease - specReduction);
      
      const newTraceLevel = Math.min(100, state.traceLevel + finalTraceIncrease);
      
      // Check for game over
      if (newTraceLevel >= 100) {
        set({ 
          traceLevel: 100,
          gameOver: true,
          gamePhase: 'ended'
        });
        return;
      }
      
      set({ traceLevel: newTraceLevel });
    },

    purchaseUpgrade: (item) => {
      const state = get();
      
      if (state.money >= item.price) {
        const newMoney = state.money - item.price;
        
        if (item.type === 'software') {
          // Unlock new hacking method
          set({ 
            money: newMoney,
            unlockedMethods: [...state.unlockedMethods, item.id]
          });
        } else {
          // Hardware upgrade
          const specs = { ...state.computerSpecs };
          const levelKey = `${item.type}Level` as keyof ComputerSpecs;
          const nameKey = item.type as keyof ComputerSpecs;
          
          const currentLevel = specs[levelKey] as number;
          if (currentLevel < 5) {
            specs[levelKey] = (currentLevel + 1) as any;
            specs[nameKey] = item.upgrades[currentLevel] as any;
          }
          
          set({ 
            money: newMoney,
            computerSpecs: specs
          });
        }
      }
    },

    endGame: (victory) => {
      set({ 
        gamePhase: 'ended',
        victory,
        gameOver: !victory
      });
    }
  }))
);

// Subscribe to money changes to check for victory
useHackingGame.subscribe(
  (state) => state.money,
  (money) => {
    if (money >= 1000000) {
      useHackingGame.getState().endGame(true);
    }
  }
);

// Subscribe to trace level changes to check for game over
useHackingGame.subscribe(
  (state) => state.traceLevel,
  (traceLevel) => {
    if (traceLevel >= 100) {
      useHackingGame.getState().endGame(false);
    }
  }
);
