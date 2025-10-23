/**
 * SOURCE: Custom implementation
 * PURPOSE: Shop screen for purchasing items, power-ups, and upgrades
 * MODIFICATIONS: Wooden box aesthetic with smooth macOS-like animations
 */

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ShopScreenProps {
  onClose: () => void;
}

export const ShopScreen = ({ onClose }: ShopScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [coins, setCoins] = useState(1000); // User's current coins

  useEffect(() => {
    // Trigger open animation
    setIsAnimating(true);
  }, []);

  const handleClose = () => {
    // Trigger close animation
    setIsAnimating(false);
    // Wait for animation to finish before actually closing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handlePurchase = (itemName: string, cost: number) => {
    if (coins >= cost) {
      setCoins(coins - cost);
      toast.success(`${itemName} purchased!`);
    } else {
      toast.error('Not enough coins!');
    }
  };

  const shopItems = [
    { id: 1, name: 'Shield', cost: 100, icon: '🛡️', description: 'Protect from 1 hit' },
    { id: 2, name: 'Magnet', cost: 150, icon: '🧲', description: 'Attract coins' },
    { id: 3, name: '2x Score', cost: 200, icon: '⭐', description: 'Double your points' },
    { id: 4, name: 'Extra Life', cost: 250, icon: '❤️', description: 'One more chance' },
    { id: 5, name: 'Speed Boost', cost: 180, icon: '⚡', description: 'Run faster' },
    { id: 6, name: 'Coin Pack', cost: 500, icon: '💰', description: '+500 coins' },
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
      
      {/* Shop Box Container */}
      <div className={`relative w-full max-w-3xl transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        
        {/* Title Image - Half outside box at top */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
          <img 
            src="/PNG/shop/header.png" 
            alt="Shop" 
            className="h-40 w-auto drop-shadow-2xl"
            style={{ transform: 'scaleX(1.15)' }}
          />
        </div>

        {/* Shop Box */}
        <div className="relative mt-8">
          {/* Table background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/PNG/shop/table.png)',
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
                src="/PNG/btn/close_2.png" 
                alt="Close" 
                className="w-10 h-10 drop-shadow-lg"
              />
            </button>

            {/* Coins Display */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3 bg-yellow-400 px-8 py-3 rounded-full shadow-lg border-4 border-yellow-500">
                <svg className="w-8 h-8 text-yellow-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12.5 7H11v5l4.25 2.52.77-1.28-3.52-2.09z"/>
                </svg>
                <span className="font-black text-2xl text-gray-800">{coins}</span>
              </div>
            </div>

            {/* Shop Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto px-2">
              {shopItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/90 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {/* Item Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="text-5xl">{item.icon}</div>
                  </div>
                  
                  {/* Item Name */}
                  <h3 className="font-black text-gray-800 text-center text-lg mb-2">
                    {item.name}
                  </h3>
                  
                  {/* Item Description */}
                  <p className="text-xs text-gray-600 text-center mb-3">
                    {item.description}
                  </p>
                  
                  {/* Price & Buy Button */}
                  <button
                    onClick={() => handlePurchase(item.name, item.cost)}
                    className={`w-full py-2 px-4 rounded-xl font-bold text-white transition-all duration-200 ${
                      coins >= item.cost
                        ? 'bg-[#4A972C] hover:bg-[#3d7d24] active:scale-95'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                      <span>{item.cost}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={handleClose}
                className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <img 
                  src="/PNG/btn/ok.png" 
                  alt="Close" 
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

