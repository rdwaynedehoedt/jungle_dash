/**
 * SOURCE: Custom implementation
 * PURPOSE: Countdown screen before game starts (3-2-1-GO)
 * MODIFICATIONS: Smooth animations with number PNGs
 */

import { useState, useEffect } from 'react';

interface CountdownScreenProps {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  onCountdownComplete: () => void;
}

export const CountdownScreen = ({ difficulty, onCountdownComplete }: CountdownScreenProps) => {
  const [count, setCount] = useState<number | 'GO' | 'READY'>("READY");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Countdown sequence: READY -> 3 -> 2 -> 1 -> GO -> Start Game
    const sequence = [
      { value: "READY", duration: 1000 },
      { value: 3, duration: 1000 },
      { value: 2, duration: 1000 },
      { value: 1, duration: 1000 },
      { value: "GO", duration: 800 },
    ];

    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let cumulativeDelay = 0;

    sequence.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCount(step.value as any);
        
        // Start game after GO
        if (index === sequence.length - 1) {
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onCountdownComplete();
            }, 300);
          }, step.duration);
        }
      }, cumulativeDelay);
      
      timeoutIds.push(timeout);
      cumulativeDelay += step.duration;
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [difficulty, onCountdownComplete]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Jungle Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.18)',
          width: '100%',
          height: '100%'
        }}
      >
        <source src="/PNG/menu/Stylized_Jungle_Game_Background_Animation.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">

        {/* Countdown Display */}
        <div className="relative">
          {count === "READY" && (
            <div className="animate-scale-in">
              <h1 
                className="text-8xl font-black text-white drop-shadow-2xl"
                style={{ 
                  fontFamily: '"Fredoka One", "Lilita One", "Baloo 2", "Bubblegum Sans", Rounded, cursive, sans-serif',
                  textShadow: '4px 4px 0px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.5)',
                  WebkitTextStroke: '3px #4A972C'
                }}
              >
                GET READY!
              </h1>
            </div>
          )}

          {typeof count === 'number' && (
            <div className="animate-bounce-in" key={count}>
              {/* Cool styled number */}
              <div className="countdown-number">
                {count}
              </div>
            </div>
          )}

          {count === "GO" && (
            <div className="animate-explode">
              <div className="countdown-number">
                GO!
              </div>
            </div>
          )}
        </div>

        {/* Instruction hint */}
        {count === "READY" && (
          <div className="mt-12 animate-fade-in-delayed">
            <p className="text-white text-xl font-bold drop-shadow-lg">
              Press <span className="bg-white text-gray-800 px-3 py-1 rounded-lg mx-1">SPACE</span> to jump!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

