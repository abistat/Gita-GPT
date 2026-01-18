
import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-[#1A120B] border-t border-[#D4AF37]/20 pb-safe">
      <div className="max-w-4xl mx-auto px-6 py-5 md:py-8">
        <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"></div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What seeks your soul?..."
              disabled={isLoading}
              className="w-full bg-[#271E14] border border-[#D4AF37]/20 rounded-2xl px-6 py-4 text-[#F8F5F2] text-sm md:text-base font-bold focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 disabled:opacity-50 transition-all duration-300 font-lora placeholder-[#A8A29E]/30 shadow-inner"
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="group relative bg-[#3C2A21] text-[#D4AF37] p-4 md:px-8 md:py-4 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#4D3B32] active:scale-95 transition-all duration-300 disabled:opacity-20 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative font-cinzel font-bold tracking-[0.2em] text-xs md:text-sm uppercase whitespace-nowrap">Ask Krishna</span>
            <svg className="relative w-4 h-4 ml-3 hidden md:block transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
        
        <div className="flex flex-col items-center justify-center mt-5 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/20"></div>
            <p className="text-[10px] md:text-xs text-center text-[#A8A29E]/50 font-jakarta font-medium italic tracking-[0.15em] uppercase">
              Divine wisdom for the modern seeker
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/20"></div>
          </div>
          <p className="text-[9px] font-bold text-[#D4AF37]/40 tracking-widest uppercase">
            Developed by Abinash Adhikari
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
