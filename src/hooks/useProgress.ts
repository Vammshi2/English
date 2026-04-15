'use client';

import { useState, useCallback, useEffect } from 'react';
import { Progress, TechProgress } from '@/lib/types';

interface ProgressState {
  progress: Progress;
  techProgress: TechProgress[];
  totalWords: number;
}

export function useProgress() {
  const [data, setData] = useState<ProgressState>({
    progress: {
      wordsLearned: 0,
      mistakesCorrected: 0,
      streakDays: 0,
      points: 0,
      lastActive: new Date().toISOString().split('T')[0],
    },
    techProgress: [],
    totalWords: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) return;
      const json = await res.json();
      setData({
        progress: {
          wordsLearned: json.progress?.words_learned || 0,
          mistakesCorrected: json.progress?.mistakes_corrected || 0,
          streakDays: json.progress?.streak_days || 0,
          points: json.progress?.points || 0,
          lastActive: json.progress?.last_active || new Date().toISOString().split('T')[0],
        },
        techProgress: (json.techProgress || []).map((tp: Record<string, unknown>) => ({
          topic: tp.topic,
          lessonsCompleted: tp.lessons_completed,
          quizzesPassed: tp.quizzes_passed,
          currentLevel: tp.current_level,
          lastStudied: tp.last_studied,
        })),
        totalWords: json.totalWords || 0,
      });
    } catch {
      // Silently fail - will use defaults
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const getLevel = useCallback(() => {
    const pts = data.progress.points;
    if (pts >= 500) return { name: 'Advanced', color: 'text-purple-500', next: null, progress: 100 };
    if (pts >= 100)
      return {
        name: 'Intermediate',
        color: 'text-blue-500',
        next: 500,
        progress: ((pts - 100) / 400) * 100,
      };
    return { name: 'Beginner', color: 'text-green-500', next: 100, progress: (pts / 100) * 100 };
  }, [data.progress.points]);

  const getDailyGoal = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const isActiveToday = data.progress.lastActive === today;
    return { target: 10, isActiveToday };
  }, [data.progress.lastActive]);

  return { ...data, isLoading, fetchProgress, getLevel, getDailyGoal };
}
