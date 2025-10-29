import React, { useState, useEffect, useRef } from 'react';
import { Role } from './types';
import type { ChatMessage } from './types';
import { generateRecipe } from './services/geminiService';
import ChatInput from './components/ChatInput';
import ChatMessageComponent from './components/ChatMessage';
import { ChefHatIcon } from './components/icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: Role.MODEL,
      text: "Hello! I'm your personal cooking assistant. Show me a picture of your ingredients, or tell me what you have, and I'll help you find a delicious recipe!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string, image: string | null) => {
    const userMessage: ChatMessage = { role: Role.USER, text, image };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = await generateRecipe(userMessage);
      const modelMessage: ChatMessage = { role: Role.MODEL, text: responseText };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: Role.MODEL,
        text: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-start my-4 flex-row">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 mr-3">
        <ChefHatIcon />
      </div>
      <div className="px-4 py-3 rounded-2xl max-w-sm bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-md">
        <div className="flex items-center justify-center space-x-1">
            <span className="text-sm text-gray-500">Chef is thinking</span>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
        className="flex flex-col h-screen font-sans bg-gray-50"
    >
      <header className="bg-white border-b border-gray-200 shadow-sm p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <ChefHatIcon />
            </div>
            <h1 className="text-xl font-bold text-gray-800 ml-3">Saucy AI</h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessageComponent key={index} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default App;