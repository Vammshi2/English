export type LearningMode = 'chat' | 'story' | 'practice' | 'tech' | 'interview' | 'communication';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode: LearningMode;
  techTopic?: string;
  createdAt: Date;
}

export interface TechTopic {
  id: string;
  name: string;
  icon: string;
  category: TechCategory;
  subTopics: string[];
}

export type TechCategory = 'languages' | 'frameworks' | 'databases' | 'devops' | 'concepts';

export interface Progress {
  wordsLearned: number;
  mistakesCorrected: number;
  streakDays: number;
  points: number;
  lastActive: string;
}

export interface TechProgress {
  topic: string;
  lessonsCompleted: number;
  quizzesPassed: number;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  lastStudied: string;
}

export interface ChatRequest {
  messages: { role: 'user' | 'assistant'; content: string }[];
  mode: LearningMode;
  techTopic?: string;
  subTopic?: string;
}
