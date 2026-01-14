
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { Message, Role } from './types';
import { startGitaChat } from './services/geminiService';
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
    <div className="flex flex-col h-screen max-h-screen bg-[#120521] text-[#F8F5F2] selection:bg-[#D4AF37]/20">
      {/* Background radial glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-[#4C1D95]/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-[#7E22CE]/5 blur-[100px] rounded-full"></div>
      </div>

      <Header />
      
      <main className="relative flex-1 flex flex-col overflow-hidden z-10">
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          onSelectSuggestion={handleSendMessage}
        />
      </main>

      <div className="relative z-10">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isTyping} 
        />
      </div>
    </div>
  );
};

export default App;
