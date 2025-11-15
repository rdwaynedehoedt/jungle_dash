/**
 * SOURCE: Custom implementation
 * PURPOSE: Display leaderboard with all player scores
 * MODIFICATIONS: Simple modal showing ranked players
 */

import { useEffect } from 'react';
import { useLeaderboardStore } from '../state/useLeaderboardStore';

export const LeaderboardModal = () => {
  const { entries, isLoading, error, closeLeaderboard, fetchScores } = useLeaderboardStore();

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        
        {/* Header */}
        <div className="relative mb-4">
          <div 
            className="bg-contain bg-center bg-no-repeat px-12 py-8"
            style={{ 
              backgroundImage: 'url(/PNG/bubble/table.png)',
              backgroundSize: '100% 100%'
            }}
          >
            <h2 className="text-5xl font-black text-white text-center" style={{
              fontFamily: '"Fredoka One", "Lilita One", cursive',
              textShadow: '3px 3px 0px rgba(0,0,0,0.5)'
            }}>
              🏆 Leaderboard
            </h2>
          </div>
          
          {/* Close Button */}
          <button
            onClick={closeLeaderboard}
            className="absolute -top-2 -right-2 transform hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            <img 
              src="/PNG/btn/close_2.png" 
              alt="Close" 
              className="w-12 h-12 drop-shadow-xl"
            />
          </button>
        </div>

        {/* Content */}
        <div 
          className="bg-gradient-to-b from-yellow-600/90 to-yellow-700/90 rounded-3xl p-6 overflow-y-auto shadow-2xl border-4 border-yellow-800"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#92400e #fbbf24'
          }}
        >
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              <p className="text-white text-xl font-bold mt-4">Loading scores...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-200 text-xl font-bold">⚠️ {error}</p>
              <button 
                onClick={fetchScores}
                className="mt-4 bg-white text-yellow-700 px-6 py-2 rounded-full font-bold hover:bg-yellow-100 transition"
              >
                Try Again
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white text-2xl font-bold">🎮 No scores yet!</p>
              <p className="text-yellow-200 text-lg mt-2">Be the first to play!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => {
                const rank = index + 1;
                const medals = ['🥇', '🥈', '🥉'];
                const medal = rank <= 3 ? medals[rank - 1] : '';
                
                return (
                  <div 
                    key={entry.id || index}
                    className={`
                      flex items-center justify-between p-4 rounded-xl transition-all
                      ${rank <= 3 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg' 
                        : 'bg-white/90 hover:bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`
                        text-2xl font-black w-12 text-center
                        ${rank <= 3 ? 'text-white' : 'text-gray-600'}
                      `}>
                        {medal || `#${rank}`}
                      </span>
                      
                      <span className={`
                        text-xl font-bold
                        ${rank <= 3 ? 'text-white' : 'text-gray-800'}
                      `}>
                        {entry.username}
                      </span>
                    </div>
                    
                    <span className={`
                      text-2xl font-black
                      ${rank <= 3 ? 'text-white' : 'text-yellow-700'}
                    `}>
                      {entry.score}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

