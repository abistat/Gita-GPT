
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative z-50 bg-gradient-to-b from-[#5c2e0c] to-[#3d1f06] text-white shadow-2xl border-b-4 border-[#d4af37]">
      {/* Decorative top pattern */}
      <div className="h-1 w-full bg-[#d4af37] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#d4af37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border-2 border-white/20">
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-[#3d1f06] fill-current">
              <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold tracking-[0.2em] text-[#d4af37] drop-shadow-md">
          GITA GPT
        </h1>
        
        <div className="flex items-center space-x-3">
          <div className="h-[1px] w-8 md:w-16 bg-[#d4af37]/50"></div>
          <p className="text-xs md:text-sm font-lora italic font-medium uppercase tracking-[0.3em] text-white/90">
            Eternal Wisdom of Shri Krishna
          </p>
          <div className="h-[1px] w-8 md:w-16 bg-[#d4af37]/50"></div>
        </div>
      </div>

      {/* Subtle divine glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-gradient-to-b from-[#d4af37]/10 to-transparent pointer-events-none"></div>
    </header>
  );
};

export default Header;
