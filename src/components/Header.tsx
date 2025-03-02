import React, { useState, useEffect } from 'react';
import { Recycle, Cpu } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Pulse animation for AI badge
    const interval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, 10000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      isScrolled ? 'bg-green-700 shadow-md' : 'bg-green-600'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Recycle size={32} className={`mr-2 transition-transform duration-300 ${isScrolled ? 'rotate-180' : ''}`} />
          <h1 className="text-xl font-bold text-white">EcoScan</h1>
        </div>
        <div className="flex items-center">
          <Cpu size={16} className={`mr-1 ${showPulse ? 'animate-pulse' : ''}`} />
          <span className={`text-sm bg-green-700 px-2 py-1 rounded transition-all duration-300 ${
            isScrolled ? 'bg-green-800' : ''
          } ${showPulse ? 'animate-pulse' : ''}`}>
            AI Powered
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;