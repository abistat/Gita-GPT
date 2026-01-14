
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { Message, Role } from './types';
import { startGitaChat } from './services/geminiService';
import { SUGGESTED_QUESTIONS } from './constants';
import { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatRef.current = startGitaChat();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      if (!chatRef.current) {
        chatRef.current = startGitaChat();
      }

      const response = await chatRef.current.sendMessageStream({ message: text });
      
      let krishnaContent = '';
      const krishnaId = (Date.now() + 1).toString();
      
      // Add empty message initially
      setMessages((prev) => [...prev, {
        id: krishnaId,
        role: Role.KRISHNA,
        content: '',
        timestamp: new Date(),
      }]);

      for await (const chunk of response) {
        const chunkText = chunk.text || '';
        krishnaContent += chunkText;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === krishnaId ? { ...msg, content: krishnaContent } : msg
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, {
        id: 'err-' + Date.now(),
        role: Role.KRISHNA,
        content: "My dear seeker, the path seems momentarily obscured. Let us reflect and try again shortly.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#fdfaf1] text-[#1a0f00]">
      <Header />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <MessageList messages={messages} isTyping={isTyping} />
        
        {messages.length === 0 && (
          <div className="absolute bottom-28 left-0 right-0 px-4 pointer-events-none">
            <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="pointer-events-auto bg-white hover:bg-[#8b4513] hover:text-[#d4af37] border-2 border-[#d4af37]/40 px-5 py-2.5 rounded-full text-sm font-lora font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 text-[#3d1f06]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <MessageInput 
        onSendMessage={handleSendMessage} 
        isLoading={isTyping} 
      />
    </div>
  );
};

export default App;
