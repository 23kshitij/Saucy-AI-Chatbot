
import React from 'react';
import { Remarkable } from 'remarkable';
import { Role } from '../types';
import type { ChatMessage } from '../types';
import { UserIcon } from './icons';
import SaucyAiLogo from './SaucyAiLogo';

interface ChatMessageProps {
  message: ChatMessage;
}

const md = new Remarkable({
    html: true,
    breaks: true,
    linkify: true
});

const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
    const rawMarkup = md.render(content);
    
    return <div className="prose prose-sm sm:prose-base max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2" dangerouslySetInnerHTML={{ __html: rawMarkup }}></div>;
};

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, text, image } = message;
  const isUser = role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-green-500 text-white rounded-br-none'
    : 'bg-white/95 backdrop-blur-sm text-gray-800 rounded-bl-none border border-gray-200';
  const layoutClasses = isUser ? 'flex-row-reverse' : 'flex-row';

  const Avatar = () => (
    <div
      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-green-200 text-green-700 ml-3' : 'bg-gray-200 text-gray-800 mr-3'
      }`}
    >
      {isUser ? <UserIcon /> : <SaucyAiLogo className="w-7 h-7" />}
    </div>
  );

  return (
    <div className={`flex items-start my-4 ${layoutClasses}`}>
      <Avatar />
      <div
        className={`px-4 py-3 rounded-2xl max-w-md md:max-w-lg lg:max-w-2xl shadow-md ${bubbleClasses}`}
      >
        {image && (
          <img
            src={image}
            alt="User uploaded ingredient"
            className="rounded-lg mb-2 max-h-64 w-auto"
          />
        )}
        <MarkdownContent content={text} />
      </div>
    </div>
  );
};

export default ChatMessageComponent;