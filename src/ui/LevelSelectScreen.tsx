/**
 * SOURCE: Custom implementation
 * PURPOSE: Level selection screen for choosing game difficulty
 * MODIFICATIONS: Wooden box aesthetic with smooth macOS-like animations
 */

import { useState, useEffect } from 'react';

interface LevelSelectScreenProps {
  onClose: () => void;
  onSelectLevel: (difficulty: 'EASY' | 'MEDIUM' | 'HARD') => void;
}

export const LevelSelectScreen = ({ onClose, onSelectLevel }: LevelSelectScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSelectLevel = (difficulty: 'EASY' | 'MEDIUM' | 'HARD') => {
    setIsAnimating(false);
    setTimeout(() => {
      onSelectLevel(difficulty);
    }, 300);
  };

  const levels = [
    {
      difficulty: 'EASY' as const,
      name: 'Easy',
      icon: '🌴',
      stars: 1,
      description: 'Perfect for beginners',
      color: 'from-green-400 to-green-600'
    },
    {
      difficulty: 'MEDIUM' as const,
      name: 'Medium',
      icon: '🌋',
      stars: 2,
      description: 'For experienced players',
      color: 'from-orange-400 to-orange-600'
    },
    {
      difficulty: 'HARD' as const,
      name: 'Hard',
      icon: '🏔️',
      stars: 3,
      description: 'Ultimate challenge',
      color: 'from-red-400 to-red-600'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blur overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-all duration-300 ${
          isAnimating ? 'backdrop-blur-md opacity-100' : 'backdrop-blur-none opacity-0'
        }`}
        onClick={handleClose} 
      />
      
      {/* Level Select Box Container */}
      <div className={`relative w-full max-w-2xl transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        
        {/* Title Image - Half outside box at top */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
          <img 
            src="/PNG/level_select/header.png" 
            alt="Select Level" 
            className="h-40 w-auto drop-shadow-2xl"
            style={{ transform: 'scaleX(1.15)' }}
          />
        </div>

        {/* Level Select Box */}
        <div className="relative mt-8">
          {/* Wooden box background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/PNG/menu/bgloginbox.png)',
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Content */}
          <div className="relative px-12 pt-20 pb-12">
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/level_select/close_2.png" 
                alt="Close" 
                className="w-10 h-10 drop-shadow-lg"
              />
            </button>

            {/* Level Cards */}
            <div className="space-y-4">
              {levels.map((level) => (
                <div
                  key={level.difficulty}
                  className="relative group"
                >
                  {/* Level Card */}
                  <button
                    onClick={() => handleSelectLevel(level.difficulty)}
                    className="w-full bg-white/90 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-100"
                  >
                    <div className="flex items-center justify-between">
                      
                      {/* Left side - Icon and Info */}
                      <div className="flex items-center gap-4">
                        {/* Level Icon */}
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl shadow-lg`}>
                          {level.icon}
                        </div>
                        
                        {/* Level Info */}
                        <div className="text-left">
                          <h3 
                            className="text-2xl font-black text-gray-800"
                            style={{ 
                              fontFamily: '"Fredoka One", "Lilita One", "Baloo 2", "Bubblegum Sans", Rounded, cursive, sans-serif'
                            }}
                          >
                            {level.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-semibold">{level.description}</p>
                        </div>
                      </div>

                      {/* Right side - Animated Fire Emojis */}
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-3xl ${
                              i < level.stars 
                                ? 'animate-fire-pulse' 
                                : 'opacity-20 grayscale'
                            }`}
                            style={{
                              animationDelay: `${i * 0.15}s`,
                              display: 'inline-block'
                            }}
                          >
                            🔥
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

