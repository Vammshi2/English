'use client';

import { LearningMode } from '@/lib/types';

interface Props {
  currentMode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
}

const modes: { id: LearningMode; label: string; icon: string; shortLabel: string }[] = [
  { id: 'chat', label: 'Chat', icon: '💬', shortLabel: 'Chat' },
  { id: 'story', label: 'Story', icon: '📖', shortLabel: 'Story' },
  { id: 'practice', label: 'Practice', icon: '🗣️', shortLabel: 'Practice' },
  { id: 'tech', label: 'Tech', icon: '💻', shortLabel: 'Tech' },
  { id: 'interview', label: 'Interview', icon: '🎯', shortLabel: 'Interview' },
  { id: 'communication', label: 'Comm', icon: '✉️', shortLabel: 'Comm' },
];

export default function ModeSelector({ currentMode, onModeChange }: Props) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-2 py-1.5 gap-1">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            currentMode === mode.id
              ? 'bg-blue-500 text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span>{mode.icon}</span>
          <span>{mode.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
