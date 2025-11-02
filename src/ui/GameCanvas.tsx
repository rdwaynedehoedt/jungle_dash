/**
 * SOURCE: Custom implementation with HTML5 Canvas
 * PURPOSE: Main game screen - renders player and handles controls
 * MODIFICATIONS: UP/DOWN movement endless runner with jungle background
 */

import { useEffect, useRef, useState } from 'react';
import { Player } from '../core/Player';

interface GameCanvasProps {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  onGameOver: () => void;
  onBack: () => void;
}

export const GameCanvas = ({ difficulty, onGameOver, onBack }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    playerRef.current = new Player(canvas.width, canvas.height);

    const runningImage = new Image();
    runningImage.src = '/PNG/game character/game character runing.PNG';
    
    const jumpingImage = new Image();
    jumpingImage.src = '/PNG/game character/game character jumping .PNG';

    let gameRunning = true;
    let lastTime = performance.now();
    let scoreAccumulator = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
        return;
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        playerRef.current?.jump();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameLoop = (currentTime: number) => {
      if (!gameRunning) return;

      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      playerRef.current?.update();

      scoreAccumulator += deltaTime;
      if (scoreAccumulator >= 0.1) {
        setScore(prev => prev + 1);
        scoreAccumulator = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const player = playerRef.current?.getBounds();
      const isOnGround = playerRef.current?.isOnGround();
      
      if (player) {
        const currentImage = isOnGround ? runningImage : jumpingImage;
        
        if (currentImage.complete) {
          ctx.drawImage(
            currentImage,
            player.x,
            player.y,
            player.width,
            player.height
          );
        } else {
          ctx.fillStyle = '#4A972C';
          ctx.fillRect(player.x, player.y, player.width, player.height);
        }
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      gameRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [difficulty, onBack, onGameOver]);

  return (
    <div className="fixed inset-0 z-50">
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

      {/* Hidden video for canvas drawing */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      >
        <source src="/PNG/menu/Stylized_Jungle_Game_Background_Animation.mp4" type="video/mp4" />
      </video>

      {/* Game Canvas - Fullscreen, transparent background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute top-8 left-0 right-0 flex items-center justify-center z-10">
        <div 
          className="bg-contain bg-center bg-no-repeat px-12 py-4"
          style={{ 
            backgroundImage: 'url(/PNG/bubble/table.png)',
            backgroundSize: '100% 100%'
          }}
        >
          <p className="text-4xl font-black text-white text-center" style={{
            fontFamily: '"Fredoka One", "Lilita One", cursive',
            textShadow: '3px 3px 0px rgba(0,0,0,0.5)'
          }}>
            {score}
          </p>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={onBack}
          className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <img 
            src="/PNG/btn/close_2.png" 
            alt="Close" 
            className="w-12 h-12 drop-shadow-xl"
          />
        </button>
      </div>


      <div className="absolute top-8 left-8 z-10">
        <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-bold">
          Difficulty: {difficulty}
        </div>
      </div>
    </div>
  );
};

