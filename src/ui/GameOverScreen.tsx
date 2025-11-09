/**
 * SOURCE: Custom implementation
 * PURPOSE: Game Over screen when player loses
 * MODIFICATIONS: Wooden box aesthetic matching Shop/Settings screens EXACTLY
 */

import { useState, useEffect } from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const GameOverScreen = ({ score, onRestart, onMainMenu }: GameOverScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger open animation
    setIsAnimating(true);
  }, []);

  const handleRestart = () => {
    // Trigger close animation
    setIsAnimating(false);
    setTimeout(() => {
      onRestart();
    }, 300);
  };

  const handleMainMenu = () => {
    // Trigger close animation
    setIsAnimating(false);
    setTimeout(() => {
      onMainMenu();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blur overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-all duration-300 ${
          isAnimating ? 'backdrop-blur-md opacity-100' : 'backdrop-blur-none opacity-0'
        }`}
        onClick={handleMainMenu} 
      />
      
      {/* Game Over Box Container */}
      <div className={`relative w-full max-w-2xl transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        
        {/* Title Image - Half outside box at top */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
          <img 
            src="/PNG/you_lose/header.png" 
            alt="You Lose" 
            className="h-40 w-auto drop-shadow-2xl"
            style={{ transform: 'scaleX(1.15)' }}
          />
        </div>

        {/* Game Over Box */}
        <div className="relative mt-8">
          {/* Wooden box background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/PNG/you_lose/table.png)',
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Content */}
          <div className="relative px-12 pt-16 pb-12">
            
            {/* Close button */}
            <button
              onClick={handleMainMenu}
              className="absolute top-4 right-4 transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/btn/close_2.png" 
                alt="Close" 
                className="w-10 h-10 drop-shadow-lg"
              />
            </button>

            {/* Score Display with bg1 background */}
            <div className="relative rounded-3xl overflow-hidden mb-6">
              {/* bg1.png background */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/PNG/you_lose/bg1.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Content */}
              <div className="relative flex flex-col items-center gap-4 py-8 px-6">
                {/* Dead Character Image */}
                <img 
                  src="/PNG/game character/game character died lost.PNG" 
                  alt="Dead Character" 
                  className="w-40 h-40 object-contain"
                />
                
                {/* Score Label */}
                <p 
                  className="text-3xl font-black"
                  style={{
                    fontFamily: '"Fredoka One", "Lilita One", cursive',
                    color: '#FFFFFF',
                    textShadow: '3px 3px 0px rgba(0,0,0,0.5)'
                  }}
                >
                  YOUR SCORE
                </p>
                
                {/* Score Value */}
                <p 
                  className="text-7xl font-black -mt-2"
                  style={{
                    fontFamily: '"Fredoka One", "Lilita One", cursive',
                    color: '#FFFFFF',
                    textShadow: '4px 4px 0px rgba(0,0,0,0.5)'
                  }}
                >
                  {score}
                </p>

                {/* Motivational Text */}
                <p 
                  className="text-xl font-bold -mt-2"
                  style={{
                    fontFamily: '"Fredoka One", "Lilita One", cursive',
                    color: '#FFFFFF',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.4)'
                  }}
                >
                  Better luck next time!
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleRestart}
                className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <img 
                  src="/PNG/btn/restart.png" 
                  alt="Restart" 
                  className="w-16 h-16 drop-shadow-xl"
                />
              </button>

              <button
                onClick={handleMainMenu}
                className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <img 
                  src="/PNG/btn/menu.png" 
                  alt="Main Menu" 
                  className="w-16 h-16 drop-shadow-xl"
                />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

