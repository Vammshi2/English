'use client';

import { useState } from 'react';
import { techCategories, getTopicsByCategory, getTopicById } from '@/lib/techTopics';
import { TechCategory } from '@/lib/types';

interface Props {
  selectedTopic?: string;
  onSelectTopic: (topicId: string, subTopic?: string) => void;
  onClose: () => void;
}

export default function TechTopicSelector({ selectedTopic, onSelectTopic, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('languages');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(selectedTopic || null);

  const topics = getTopicsByCategory(activeCategory);
  const expanded = expandedTopic ? getTopicById(expandedTopic) : null;

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 animate-slideDown">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Choose a Technology
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex overflow-x-auto scrollbar-hide px-2 py-2 gap-1 border-b border-gray-100 dark:border-gray-800">
        {techCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setExpandedTopic(null);
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Topic grid or sub-topic list */}
      <div className="px-3 py-2 max-h-60 overflow-y-auto">
        {!expanded ? (
          <div className="grid grid-cols-3 gap-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setExpandedTopic(topic.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-center ${
                  selectedTopic === topic.id
                    ? 'bg-purple-100 dark:bg-purple-900/40 border-2 border-purple-500'
                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <span className="text-2xl">{topic.icon}</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {topic.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setExpandedTopic(null)}
              className="flex items-center gap-1 text-xs text-blue-500 mb-2 hover:text-blue-600"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to topics
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{expanded.icon}</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                {expanded.name}
              </span>
            </div>
            <button
              onClick={() => onSelectTopic(expanded.id)}
              className="w-full text-left px-3 py-2 mb-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Start from Basics
            </button>
            <div className="space-y-1">
              {expanded.subTopics.map((sub) => (
                <button
                  key={sub}
                  onClick={() => onSelectTopic(expanded.id, sub)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
