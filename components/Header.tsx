
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative z-50 glass border-b border-[#D4AF37]/20 py-3 md:py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-md rounded-full group-hover:bg-[#D4AF37]/30 transition-all duration-500"></div>
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#1A120B] rounded-full flex items-center justify-center border border-[#D4AF37]/30 shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-[#D4AF37] fill-current animate-pulse">
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-cinzel font-bold tracking-[0.2em] text-[#F8F5F2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-none uppercase">
              Learn <span className="text-[#D4AF37]">Gita</span>
            </h1>
            <p className="text-[10px] font-jakarta font-medium uppercase tracking-[0.3em] text-[#D4AF37]/50 mt-1">
              Divine Presence
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center bg-[#D4AF37]/5 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 shadow-inner">
            <div className="w-1.5 h-1.5 bg-[#D97706] rounded-full animate-pulse mr-2 shadow-[0_0_8px_#D97706]"></div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Enlightened State</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
