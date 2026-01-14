
import React, { useRef, useEffect } from 'react';
import { Message, Role } from '../types';
import { getAudioResponse, decodeAudioData } from '../services/geminiService';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handlePlayAudio = async (text: string, msgId: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    
    const ctx = audioContextRef.current;
    const audioData = await getAudioResponse(text);
    
    if (audioData) {
      const buffer = await decodeAudioData(audioData, ctx);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    }
  };

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
          <div className="w-28 h-28 bg-[#d4af37]/10 rounded-full flex items-center justify-center border-2 border-[#d4af37]/30 shadow-lg">
            <svg className="w-14 h-14 text-[#8b4513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.232.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-[#5c2e0c] tracking-wide">Enter the Sacred Dialogue</h2>
          <p className="font-lora max-w-md text-lg italic text-[#4a3728] leading-relaxed">
            "Abandon all varieties of dharma and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
        >
          <div 
            className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-5 shadow-md border-b-2 ${
              msg.role === Role.USER 
                ? 'bg-[#3d1f06] text-white border-[#2a1504] rounded-tr-none' 
                : 'bg-white text-[#1a0f00] border-[#d4af37] rounded-tl-none ring-1 ring-[#d4af37]/10'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${msg.role === Role.USER ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                {msg.role === Role.USER ? 'Arjuna' : 'Krishna AI'}
              </span>
              {msg.role === Role.KRISHNA && (
                <button 
                  onClick={() => handlePlayAudio(msg.content, msg.id)}
                  className="p-1.5 hover:bg-[#d4af37]/20 rounded-full transition-all text-[#8b4513] hover:scale-110"
                  title="Listen to Divine Wisdom"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            <div className={`font-lora text-base md:text-lg leading-relaxed whitespace-pre-wrap ${msg.role === Role.USER ? 'font-normal' : 'font-medium'}`}>
              {msg.content}
            </div>
            <div className={`text-[10px] mt-4 font-medium opacity-70 flex justify-end items-center space-x-1 ${msg.role === Role.USER ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-[#d4af37] rounded-2xl rounded-tl-none px-5 py-3 shadow-sm flex space-x-2 items-center">
            <span className="text-[10px] font-bold text-[#8b4513] uppercase tracking-widest mr-2">Krishna is reflecting</span>
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
