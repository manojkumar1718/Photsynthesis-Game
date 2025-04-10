
import { create } from 'zustand';

interface Question {
  level: number;
  question: string;
  options: {
    emoji: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface GameState {
  level: number;
  score: number;
  currentStage: 'seed' | 'sprout' | 'sapling' | 'tree';
  questions: Question[];
  currentQuestion: Question | null;
  increaseLevel: () => void;
  increaseScore: () => void;
  setStage: (stage: 'seed' | 'sprout' | 'sapling' | 'tree') => void;
  setCurrentQuestion: (level: number) => void;
  resetGame: () => void;
}

const questions: Question[] = [
  {
    level: 1,
    question: "What does a seed need to start growing?",
    options: [
      { emoji: "💧", text: "Water", isCorrect: true },
      { emoji: "🌞", text: "Sunlight", isCorrect: true },
      { emoji: "🍬", text: "Candy", isCorrect: false },
      { emoji: "❄️", text: "Ice", isCorrect: false },
    ],
  },
  {
    level: 2,
    question: "What does a plant need for photosynthesis?",
    options: [
      { emoji: "☀️", text: "Sunlight", isCorrect: true },
      { emoji: "🌫️", text: "Smoke", isCorrect: false },
      { emoji: "🌬️", text: "Carbon Dioxide", isCorrect: true },
      { emoji: "🌑", text: "Darkness", isCorrect: false },
    ],
  },
];

export const useGameStore = create<GameState>()((set) => ({
  level: 1,
  score: 0,
  currentStage: 'seed',
  questions: questions,
  currentQuestion: questions[0],
  
  increaseLevel: () => set((state) => ({ 
    level: state.level + 1,
    currentQuestion: questions.find(q => q.level === state.level + 1) || null
  })),
  
  increaseScore: () => set((state) => ({ 
    score: state.score + 1 
  })),
  
  setStage: (stage) => set({ 
    currentStage: stage 
  }),
  
  setCurrentQuestion: (level) => set((state) => ({
    currentQuestion: state.questions.find(q => q.level === level) || null
  })),
  
  resetGame: () => set({
    level: 1,
    score: 0,
    currentStage: 'seed',
    currentQuestion: questions[0]
  })
}));