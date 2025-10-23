/**
 * SOURCE: Custom implementation
 * PURPOSE: Settings screen with volume controls and preferences
 * MODIFICATIONS: Wooden box aesthetic with PNG assets for cute UI + macOS-like animations
 */

import { useState, useEffect } from 'react';

interface SettingsScreenProps {
  onClose: () => void;
}

export const SettingsScreen = ({ onClose }: SettingsScreenProps) => {
  const [musicVolume, setMusicVolume] = useState(7);
  const [sfxVolume, setSfxVolume] = useState(8);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const increaseVolume = (current: number, setter: (val: number) => void) => {
    if (current < 10) setter(current + 1);
  };

  const decreaseVolume = (current: number, setter: (val: number) => void) => {
    if (current > 0) setter(current - 1);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={handleClose} />
      
      {/* Settings Box Container */}
      <div className={`relative w-full max-w-2xl transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        
        {/* Title Image - Half outside box at top */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
          <img 
            src="/PNG/settings/Settings topic_center.png" 
            alt="Settings" 
            className="h-40 w-auto drop-shadow-2xl"
            style={{ transform: 'scaleX(1.15)' }}
          />
        </div>

        {/* Settings Box */}
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
          <div className="relative px-12 pt-16 pb-12">
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/settings/close_2.png" 
                alt="Close" 
                className="w-10 h-10 drop-shadow-lg"
              />
            </button>

          {/* Settings Options */}
          <div className="space-y-6">
            
            {/* Background Music */}
            <div className="bg-white/70 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-800 text-xl">Background Music</span>
                </div>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                >
                  <img 
                    src={musicEnabled ? "/PNG/settings/on.png" : "/PNG/settings/off.png"}
                    alt={musicEnabled ? "On" : "Off"}
                    className="h-12 w-auto drop-shadow-md"
                  />
                </button>
              </div>
              
              {/* Volume Control */}
              {musicEnabled && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={() => decreaseVolume(musicVolume, setMusicVolume)}
                    className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                    disabled={musicVolume === 0}
                  >
                    <img 
                      src="/PNG/settings/voluem -.png" 
                      alt="Volume Down" 
                      className="w-10 h-10 drop-shadow-md"
                      style={{ opacity: musicVolume === 0 ? 0.3 : 1 }}
                    />
                  </button>
                  
                  {/* Volume Bars */}
                  <div className="flex items-center gap-1">
                    {[...Array(10)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-8 rounded-full transition-all duration-200 ${
                          index < musicVolume 
                            ? 'bg-[#4A972C] shadow-md' 
                            : 'bg-gray-300'
                        }`}
                        style={{
                          height: `${20 + (index * 3)}px`
                        }}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => increaseVolume(musicVolume, setMusicVolume)}
                    className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                    disabled={musicVolume === 10}
                  >
                    <img 
                      src="/PNG/settings/voluem +.png" 
                      alt="Volume Up" 
                      className="w-10 h-10 drop-shadow-md"
                      style={{ opacity: musicVolume === 10 ? 0.3 : 1 }}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Sound Effects */}
            <div className="bg-white/70 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-800 text-xl">Sound Effects</span>
                </div>
                <button
                  onClick={() => setSfxEnabled(!sfxEnabled)}
                  className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                >
                  <img 
                    src={sfxEnabled ? "/PNG/settings/on.png" : "/PNG/settings/off.png"}
                    alt={sfxEnabled ? "On" : "Off"}
                    className="h-12 w-auto drop-shadow-md"
                  />
                </button>
              </div>
              
              {/* Volume Control */}
              {sfxEnabled && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={() => decreaseVolume(sfxVolume, setSfxVolume)}
                    className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                    disabled={sfxVolume === 0}
                  >
                    <img 
                      src="/PNG/settings/voluem -.png" 
                      alt="Volume Down" 
                      className="w-10 h-10 drop-shadow-md"
                      style={{ opacity: sfxVolume === 0 ? 0.3 : 1 }}
                    />
                  </button>
                  
                  {/* Volume Bars */}
                  <div className="flex items-center gap-1">
                    {[...Array(10)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-8 rounded-full transition-all duration-200 ${
                          index < sfxVolume 
                            ? 'bg-yellow-500 shadow-md' 
                            : 'bg-gray-300'
                        }`}
                        style={{
                          height: `${20 + (index * 3)}px`
                        }}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => increaseVolume(sfxVolume, setSfxVolume)}
                    className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                    disabled={sfxVolume === 10}
                  >
                    <img 
                      src="/PNG/settings/voluem +.png" 
                      alt="Volume Up" 
                      className="w-10 h-10 drop-shadow-md"
                      style={{ opacity: sfxVolume === 10 ? 0.3 : 1 }}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={handleClose}
                className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <img 
                  src="/PNG/btn/ok.png" 
                  alt="Save" 
                  className="w-16 h-16 drop-shadow-xl"
                />
              </button>
            </div>

          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

