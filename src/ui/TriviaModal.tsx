/**
 * SOURCE: Custom implementation
 * PURPOSE: Simple trivia modal for heart counting question
 * MODIFICATIONS: Show image, get answer, check if correct
 */

import { useState } from 'react';

interface TriviaModalProps {
  imageUrl: string;
  correctAnswer: number;
  onCorrect: () => void;
  onWrong: () => void;
  onClose: () => void;
}

export const TriviaModal = ({ 
  imageUrl, 
  correctAnswer, 
  onCorrect, 
  onWrong,
  onClose 
}: TriviaModalProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const answer = parseInt(userAnswer);
    
    // Check if answer is correct
    setTimeout(() => {
      if (answer === correctAnswer) {
        onCorrect();
      } else {
        onWrong();
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-lg">
        {/* Wooden box background */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/PNG/you_lose/table.png)',
            backgroundSize: '100% 100%'
          }}
        />
        
        {/* Content */}
        <div className="relative px-8 py-12">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 transform hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            <img 
              src="/PNG/btn/close_2.png" 
              alt="Close" 
              className="w-10 h-10 drop-shadow-lg"
            />
          </button>

          {/* Title */}
          <h2 
            className="text-3xl font-black text-center mb-6"
            style={{
              fontFamily: '"Fredoka One", "Lilita One", cursive',
              color: '#FFFFFF',
              textShadow: '3px 3px 0px rgba(0,0,0,0.5)'
            }}
          >
            SECOND CHANCE!
          </h2>

          <p 
            className="text-lg font-bold text-center mb-4"
            style={{
              fontFamily: '"Fredoka One", "Lilita One", cursive',
              color: '#FFD700',
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
            }}
          >
            Count the hearts:
          </p>

          {/* Question Image */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-xl">
            <img 
              src={imageUrl} 
              alt="Heart Question" 
              className="w-full h-auto rounded"
            />
          </div>

          {/* Answer Input */}
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="w-full px-6 py-4 text-2xl font-bold text-center rounded-lg mb-6 border-4 border-yellow-600"
            style={{
              fontFamily: '"Fredoka One", "Lilita One", cursive',
            }}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter' && userAnswer) {
                handleSubmit();
              }
            }}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!userAnswer || isLoading}
            className="w-full transform hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div 
              className="bg-green-600 hover:bg-green-700 rounded-xl py-4 px-8 shadow-xl border-4 border-green-800"
            >
              <span 
                className="text-2xl font-black text-white"
                style={{
                  fontFamily: '"Fredoka One", "Lilita One", cursive',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
                }}
              >
                {isLoading ? 'CHECKING...' : 'SUBMIT'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

