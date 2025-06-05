import { useState, useEffect } from 'react';

const loadingMessages = [
  "Initializing Network Protocols...",
  "Compiling Exploits...",
  "Establishing Connection to the Matrix...",
  "Loading Crypto Libraries...",
  "Bypassing Firewalls...",
  "Encrypting Communication Channels...",
  "Synchronizing with Dark Web...",
  "Calibrating Hacking Tools...",
  "Ready for Operation..."
];

export default function LoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 5, 100));
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center font-mono">
      <div className="text-center space-y-8">
        {/* ASCII Art Logo */}
        <div className="text-2xl md:text-4xl font-bold text-cyan-400 whitespace-pre-line">
{`
██████╗ ██╗   ██╗████████╗███████╗    ██╗  ██╗███████╗██╗███████╗████████╗
██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝    ██║  ██║██╔════╝██║██╔════╝╚══██╔══╝
██████╔╝ ╚████╔╝    ██║   █████╗      ███████║█████╗  ██║███████╗   ██║   
██╔══██╗  ╚██╔╝     ██║   ██╔══╝      ██╔══██║██╔══╝  ██║╚════██║   ██║   
██████╔╝   ██║      ██║   ███████╗    ██║  ██║███████╗██║███████║   ██║   
╚═════╝    ╚═╝      ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝   ╚═╝   
`}
        </div>

        {/* Loading Message */}
        <div className="text-lg md:text-xl text-green-400 h-8">
          {loadingMessages[currentMessage]}
        </div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 mx-auto">
          <div className="bg-gray-800 h-2 rounded">
            <div 
              className="bg-green-400 h-2 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm mt-2 text-center">{Math.floor(progress)}%</div>
        </div>

        {/* System Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>[SYSTEM] Kernel: Linux 5.15.0-hackOS</div>
          <div>[SYSTEM] User: anonymous@darknet</div>
          <div>[SYSTEM] Status: READY FOR INFILTRATION</div>
        </div>
      </div>
    </div>
  );
}
