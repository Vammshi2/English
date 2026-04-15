'use client';

import { useProgress } from '@/hooks/useProgress';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgressPanel({ isOpen, onClose }: Props) {
  const { progress, techProgress, totalWords, isLoading, getLevel, getDailyGoal } = useProgress();
  const level = getLevel();
  const dailyGoal = getDailyGoal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Progress</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {/* Level & Points */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs opacity-80">Current Level</p>
                  <p className="text-lg font-bold">{level.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">Points</p>
                  <p className="text-2xl font-bold">{progress.points}</p>
                </div>
              </div>
              {level.next && (
                <div>
                  <div className="flex justify-between text-xs opacity-80 mb-1">
                    <span>Progress to next level</span>
                    <span>{Math.round(level.progress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all"
                      style={{ width: `${level.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-orange-500">{progress.streakDays}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Day Streak 🔥</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-green-500">{totalWords}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Words Learned 📚</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-500">{progress.mistakesCorrected}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mistakes Fixed ✏️</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-purple-500">
                  {dailyGoal.isActiveToday ? '✅' : '⬜'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Today</p>
              </div>
            </div>

            {/* Tech Progress */}
            {techProgress.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Tech Topics Progress
                </h3>
                <div className="space-y-2">
                  {techProgress.map((tp) => (
                    <div
                      key={tp.topic}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                          {tp.topic}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tp.lessonsCompleted} lessons · {tp.quizzesPassed} quizzes
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          tp.currentLevel === 'advanced'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                            : tp.currentLevel === 'intermediate'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        }`}
                      >
                        {tp.currentLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
