
import React, { useState, useRef } from 'react';
import { PaperclipIcon, SendIcon, XIcon } from './icons';

interface ChatInputProps {
  onSend: (text: string, image: string | null) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!text.trim() && !imagePreview) || isLoading) return;
    onSend(text, imagePreview);
    setText('');
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  const removeImage = () => {
      setImagePreview(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
      <form onSubmit={handleSend} className="max-w-4xl mx-auto">
        {imagePreview && (
          <div className="relative w-32 h-32 mb-2 rounded-lg overflow-hidden border border-gray-300">
            <img src={imagePreview} alt="Ingredient preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 transition-colors"
              aria-label="Remove image"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-1 shadow-inner">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-green-600 disabled:text-gray-300 transition-colors"
            aria-label="Attach image"
          >
            <PaperclipIcon className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="List your ingredients or ask a question..."
            className="flex-grow bg-transparent focus:outline-none px-4 text-gray-800 disabled:text-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={(!text.trim() && !imagePreview) || isLoading}
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
