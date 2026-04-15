'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import ModeSelector from '@/components/ModeSelector';
import TechTopicSelector from '@/components/TechTopicSelector';
import ProgressPanel from '@/components/ProgressPanel';

export default function Home() {
  const {
    messages,
    isLoading,
    mode,
    techTopic,
    sendMessage,
    clearChat,
    changeMode,
    selectTechTopic,
  } = useChat();

  const [showTechSelector, setShowTechSelector] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleModeChange = (newMode: typeof mode) => {
    changeMode(newMode);
    if (newMode === 'tech') {
      setShowTechSelector(true);
    } else {
      setShowTechSelector(false);
    }
  };

  const handleTechSelect = (topicId: string, subTopic?: string) => {
    selectTechTopic(topicId, subTopic);
    setShowTechSelector(false);
    const topicLabel = subTopic ? `${subTopic}` : 'basics';
    sendMessage(`I want to learn ${topicId === 'csharp' ? 'C#' : topicId === 'cpp' ? 'C++' : topicId}. Start with ${topicLabel}.`);
  };

  const handleExplainSimpler = (content: string) => {
    sendMessage('I didn\'t understand. Please explain that in Telugu and simpler English.');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950 safe-top safe-bottom">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              English Learning AI
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              {mode === 'tech' && techTopic
                ? `Tech: ${techTopic.toUpperCase()}`
                : mode.charAt(0).toUpperCase() + mode.slice(1) + ' Mode'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProgress(true)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Progress"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors"
              title="Clear chat"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mode Selector */}
      <ModeSelector currentMode={mode} onModeChange={handleModeChange} />

      {/* Tech Topic Selector (conditional) */}
      {mode === 'tech' && showTechSelector && (
        <TechTopicSelector
          selectedTopic={techTopic}
          onSelectTopic={handleTechSelect}
          onClose={() => setShowTechSelector(false)}
        />
      )}

      {/* Tech topic indicator when topic is selected */}
      {mode === 'tech' && techTopic && !showTechSelector && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border-b border-purple-200 dark:border-purple-800 px-4 py-1.5 flex items-center justify-between">
          <span className="text-xs text-purple-700 dark:text-purple-400 font-medium">
            Learning: {techTopic.toUpperCase()}
          </span>
          <button
            onClick={() => setShowTechSelector(true)}
            className="text-xs text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
          >
            Change Topic
          </button>
        </div>
      )}

      {/* Chat Area */}
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onExplainSimpler={handleExplainSimpler}
      />

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />

      {/* Progress Panel */}
      <ProgressPanel isOpen={showProgress} onClose={() => setShowProgress(false)} />
    </div>
  );
}
