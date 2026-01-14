
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#8b4513] text-white py-4 px-6 shadow-xl flex items-center justify-between border-b-4 border-[#d4af37]">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#8b4513] fill-current">
            <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-cinzel font-bold tracking-wider">Gita GPT</h1>
          <p className="text-[10px] md:text-xs font-lora italic opacity-80 uppercase tracking-widest">Timeless Wisdom of the Gita</p>
        </div>
      </div>
      <div className="hidden md:block text-right">
        <span className="text-xs font-medium bg-[#d4af37]/20 px-3 py-1 rounded-full border border-[#d4af37]/30">
          Divine Presence Enabled
        </span>
      </div>
    </header>
  );
};

export default Header;
