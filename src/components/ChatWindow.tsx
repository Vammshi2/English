'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/lib/types';
import MessageBubble from './MessageBubble';

interface Props {
  messages: Message[];
  isLoading: boolean;
  onExplainSimpler: (content: string) => void;
}

export default function ChatWindow({ messages, isLoading, onExplainSimpler }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Welcome to English Learning!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Start typing to practice English. I&apos;m your friendly teacher!
            <br /><br />
            Try saying:
          </p>
          <div className="mt-3 space-y-2">
            {[
              '"Tell me a story"',
              '"Practice communication"',
              '"Explain what is API"',
              '"I want to learn C#"',
            ].map((hint) => (
              <div
                key={hint}
                className="text-sm text-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1.5 rounded-full inline-block mx-1"
              >
                {hint}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onExplainSimpler={onExplainSimpler} />
      ))}
      {isLoading && messages[messages.length - 1]?.content === '' && (
        <div className="flex justify-start mb-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
