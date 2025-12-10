/**
 * SOURCE: Custom implementation
 * PURPOSE: Game Over screen when player loses
 * MODIFICATIONS: Wooden box aesthetic with second chance feature + motivational quotes
 * INTEROPERABILITY: Integrates with Quotable API for motivational quotes
 */

import { useState, useEffect, useRef } from 'react';
import { fetchHeartQuestion, HeartQuestion } from '../services/heartApi';
import { fetchMotivationalQuote, Quote } from '../services/quotesApi';
import { TriviaModal } from './TriviaModal';
import { useAuthStore } from '../state/useAuthStore';
import { useLeaderboardStore } from '../state/useLeaderboardStore';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onMainMenu: () => void;
  onSecondChance?: () => void;  // Resume game from same score
}

export const GameOverScreen = ({ score, onRestart, onMainMenu, onSecondChance }: GameOverScreenProps) => {
  const { userProfile } = useAuthStore();
  const { submitScore } = useLeaderboardStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [triviaQuestion, setTriviaQuestion] = useState<HeartQuestion | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [hasUsedSecondChance, setHasUsedSecondChance] = useState(false);
  const hasSubmittedScore = useRef(false); // Track if score was already submitted
  
  // STATE: Motivational quote (demonstrates LOW COUPLING - UI state separate from service)
  const [motivationalQuote, setMotivationalQuote] = useState<Quote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);

  useEffect(() => {
    // Trigger open animation
    setIsAnimating(true);

    // Auto-save score to leaderboard (only once, even in React StrictMode)
    if (userProfile?.username && score > 0 && !hasSubmittedScore.current) {
      hasSubmittedScore.current = true;
      submitScore(userProfile.username, score);
    }

    // INTEROPERABILITY: Fetch motivational quote from external API
    // This demonstrates integration with third-party services
    const loadQuote = async () => {
      try {
        const quote = await fetchMotivationalQuote();
        setMotivationalQuote(quote);
      } catch (error) {
        console.error('Failed to load quote:', error);
        // Fallback is handled in the service layer (HIGH COHESION)
      } finally {
        setIsLoadingQuote(false);
      }
    };

    loadQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

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

  const handleSecondChance = async () => {
    setIsLoadingQuestion(true);
    try {
      const question = await fetchHeartQuestion();
      setTriviaQuestion(question);
      setShowTrivia(true);
    } catch (error) {
      console.error('Failed to load question:', error);
      alert('Failed to load question. Please try again.');
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleTriviaCorrect = () => {
    setShowTrivia(false);
    setHasUsedSecondChance(true);
    if (onSecondChance) {
      onSecondChance();
    }
  };

  const handleTriviaWrong = () => {
    setShowTrivia(false);
    setHasUsedSecondChance(true);
    alert('Wrong answer! Game Over.');
  };

  const handleTriviaClose = () => {
    setShowTrivia(false);
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

            {/* Motivational Quote Section - INTEROPERABILITY SHOWCASE */}
            <div className="mb-6 px-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                {isLoadingQuote ? (
                  // Loading state
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-600 border-t-transparent" />
                    <p className="text-amber-700 font-semibold text-sm">
                      Loading inspiration...
                    </p>
                  </div>
                ) : motivationalQuote ? (
                  // Quote display
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-3xl text-amber-600 leading-none mt-1">💡</span>
                      <p 
                        className="text-base font-semibold text-gray-800 italic leading-relaxed flex-1"
                        style={{ fontFamily: '"Fredoka One", "Lilita One", cursive' }}
                      >
                        "{motivationalQuote.content}"
                      </p>
                    </div>
                    <p 
                      className="text-sm font-bold text-amber-700 text-right"
                      style={{ fontFamily: '"Fredoka One", "Lilita One", cursive' }}
                    >
                      — {motivationalQuote.author}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4">
              {/* Second Chance Button - Only show if not used yet */}
              {!hasUsedSecondChance && onSecondChance && (
                <button
                  onClick={handleSecondChance}
                  disabled={isLoadingQuestion}
                  className="transform hover:scale-110 active:scale-95 transition-transform duration-200 disabled:opacity-50"
                  title="Second Chance"
                >
                  <div className="bg-yellow-500 hover:bg-yellow-600 rounded-xl p-4 shadow-xl border-4 border-yellow-700">
                    <span 
                      className="text-xl font-black text-white whitespace-nowrap"
                      style={{
                        fontFamily: '"Fredoka One", "Lilita One", cursive',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
                      }}
                    >
                      {isLoadingQuestion ? '⏳' : '🎯 2nd Chance'}
                    </span>
                  </div>
                </button>
              )}

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

      {/* Trivia Modal */}
      {showTrivia && triviaQuestion && (
        <TriviaModal
          imageUrl={triviaQuestion.question}
          correctAnswer={triviaQuestion.solution}
          onCorrect={handleTriviaCorrect}
          onWrong={handleTriviaWrong}
          onClose={handleTriviaClose}
        />
      )}
    </div>
  );
};

