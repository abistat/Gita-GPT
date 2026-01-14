
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
    <div className="p-4 md:p-6 bg-white border-t-2 border-[#d4af37]/20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
      <form onSubmit={handleSubmit} className="flex space-x-3 max-w-5xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Lord Krishna for guidance..."
          disabled={isLoading}
          className="flex-1 bg-[#fdfaf1] border-2 border-[#d4af37]/30 rounded-xl px-6 py-4 text-[#1a0f00] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#8b4513] focus:border-transparent disabled:opacity-50 transition-all font-lora placeholder-[#8b4513]/40"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-[#3d1f06] text-[#d4af37] px-6 py-4 rounded-xl hover:bg-[#2a1504] transition-all disabled:opacity-50 flex items-center justify-center shadow-lg border-b-4 border-[#1a0f00] min-w-fit"
        >
          <span className="font-cinzel font-bold tracking-widest text-xs md:text-sm whitespace-nowrap">Ask Krishna</span>
          <svg className="w-5 h-5 ml-2 transform rotate-90 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
      <p className="text-[11px] text-center mt-3 text-[#5c2e0c] font-lora italic font-medium opacity-80">
        "I am the sapidity in water, O son of Kunti; I am the light in the moon and the sun..."
      </p>
    </div>
  );
};

export default MessageInput;
