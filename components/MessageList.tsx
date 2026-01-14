
import React, { useRef, useEffect } from 'react';
import { Message, Role } from '../types';
import { getAudioResponse, decodeAudioData } from '../services/geminiService';
import { SUGGESTED_QUESTIONS } from '../constants';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onSelectSuggestion?: (text: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, onSelectSuggestion }) => {
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
    <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#120521] scroll-smooth px-4">
      <div className="max-w-4xl mx-auto py-8 md:py-12 space-y-8 min-h-full flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-1000">
            <div className="text-center space-y-6 max-w-lg">
              <div className="relative inline-block animate-float">
                 <div className="absolute inset-0 bg-[#D4AF37]/10 blur-2xl rounded-full scale-150"></div>
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-[#1D0A33] rounded-full flex items-center justify-center border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    <span className="text-3xl md:text-5xl text-[#D4AF37] font-cinzel">ॐ</span>
                 </div>
              </div>
              <div className="space-y-2">
                <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-[#F8F5F2] tracking-[0.25em] uppercase">Seek Inner Truth</h2>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto"></div>
                <p className="font-lora text-lg text-[#A8A29E] italic leading-relaxed">
                  "Arise, O conqueror of foes, and realize thy divine potential."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-0">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSuggestion?.(q)}
                  className="group bg-[#1D0A33] hover:bg-[#2D124D] text-[#F8F5F2]/80 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 p-5 rounded-2xl text-sm md:text-base font-lora font-bold transition-all duration-300 shadow-lg text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                  <span className="text-[#D4AF37] opacity-30 group-hover:opacity-100 mr-3 font-cinzel text-xl transition-opacity">ॐ</span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div 
                className={`max-w-[90%] md:max-w-[80%] relative group ${
                  msg.role === Role.USER 
                    ? 'bg-[#3B185F] text-[#F8F5F2] rounded-3xl rounded-tr-none shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
                    : 'bg-[#1D0A33] text-[#F8F5F2] border border-[#D4AF37]/20 rounded-3xl rounded-tl-none shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                } p-5 md:p-7 transition-all duration-300`}
              >
                <div className={`flex items-center justify-between mb-4 border-b border-[#D4AF37]/10 pb-2`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${msg.role === Role.USER ? 'bg-[#A8A29E]' : 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]'}`}></div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${msg.role === Role.USER ? 'text-[#A8A29E]' : 'text-[#D4AF37]'}`}>
                      {msg.role === Role.USER ? 'Seeker' : 'Krishna AI'}
                    </span>
                  </div>
                  {msg.role === Role.KRISHNA && (
                    <button 
                      onClick={() => handlePlayAudio(msg.content, msg.id)}
                      className="p-1.5 text-[#D4AF37]/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-all duration-300"
                      title="Play Audio"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className={`font-lora font-bold text-base md:text-lg leading-[1.8] whitespace-pre-wrap selection:bg-[#D4AF37]/30 ${msg.role === Role.USER ? 'opacity-90' : 'text-[#F8F5F2]'}`}>
                  {msg.content}
                </div>
                <div className={`text-[9px] mt-4 font-bold flex justify-end items-center space-x-2 opacity-30`}>
                   <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1D0A33] border border-[#D4AF37]/10 rounded-2xl rounded-tl-none px-6 py-4 shadow-xl flex space-x-3 items-center">
              <span className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest">Divine Reflection</span>
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
