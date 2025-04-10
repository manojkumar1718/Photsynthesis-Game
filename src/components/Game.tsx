import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';

interface Question {
  id: number;
  text: string;
  options: {
    emoji: string;
    text: string;
    isCorrect: boolean;
  }[];
  level: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What does a seed need to start growing?",
    options: [
      { emoji: "💧", text: "Water", isCorrect: true },
      { emoji: "🌞", text: "Sunlight", isCorrect: true },
      { emoji: "🍬", text: "Candy", isCorrect: false },
      { emoji: "❄️", text: "Ice", isCorrect: false },
    ],
    level: 1
  },
  {
    id: 2,
    text: "What does a plant need for photosynthesis?",
    options: [
      { emoji: "☀️", text: "Sunlight", isCorrect: true },
      { emoji: "🌫️", text: "Smoke", isCorrect: false },
      { emoji: "🌬️", text: "Carbon Dioxide", isCorrect: true },
      { emoji: "🌑", text: "Darkness", isCorrect: false },
    ],
    level: 2
  },
  {
    id: 3,
    text: "What does photosynthesis produce?",
    options: [
      { emoji: "🌿", text: "Glucose", isCorrect: true },
      { emoji: "💨", text: "Oxygen", isCorrect: true },
      { emoji: "🌫️", text: "Smoke", isCorrect: false },
      { emoji: "🌊", text: "Saltwater", isCorrect: false },
    ],
    level: 3
  }
];

const Game: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [treeStage, setTreeStage] = useState('seed');
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(new Set());

  const currentQuestion = questions[currentQuestionIndex];

  const treeEmojis = {
    seed: "🌱",
    sprout: "🌿",
    sapling: "🌳",
    tree: "🌲"
  };

  const handleAnswer = (isCorrect: boolean, index: number) => {
    const newSelectedAnswers = new Set(selectedAnswers);
    newSelectedAnswers.add(index);
    setSelectedAnswers(newSelectedAnswers);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      setFeedbackMessage('🎉 Excellent! Keep growing!');
      
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswers(new Set());
        setFeedbackMessage('');
        
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          updateTreeStage(currentQuestionIndex + 1);
        }
      }, 2000);
    } else {
      setIsCorrect(false);
      setFeedbackMessage('❌ Try again! Plants need different nutrients.');
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswers(new Set());
        setFeedbackMessage('');
      }, 2000);
    }
    setShowFeedback(true);
  };

  const updateTreeStage = (questionIndex: number) => {
    if (questionIndex === 1) setTreeStage('sprout');
    else if (questionIndex === 2) setTreeStage('sapling');
    else if (questionIndex === 3) setTreeStage('tree');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-green-100 to-green-200">
      <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: showFeedback ? 1.2 : 1,
            rotate: showFeedback && isCorrect ? 360 : 0 
          }}
          transition={{ duration: 0.5 }}
          className="text-7xl md:text-9xl flex flex-col items-center"
        >
          {treeEmojis[treeStage as keyof typeof treeEmojis]}
          <div className="text-xl md:text-2xl mt-4 font-game text-green-800">
            Score: {score} / {questions.length}
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            exit={{ 
              y: -20, 
              opacity: 0, 
              scale: 0.95,
              transition: { duration: 0.3 }
            }}
            className="bg-white rounded-xl p-4 md:p-8 shadow-2xl relative"
          >
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 text-lg md:text-2xl font-game ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                } bg-white px-4 md:px-6 py-1 md:py-2 rounded-full shadow-lg`}
              >
                {feedbackMessage}
              </motion.div>
            )}

            <h2 className="text-2xl md:text-3xl font-game text-green-800 mb-4 md:mb-8">
              Level {currentQuestion.level}: {currentQuestion.text}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 md:p-6 rounded-xl text-lg md:text-xl font-game flex items-center justify-center gap-3 transition-all
                    ${selectedAnswers.has(index) 
                      ? option.isCorrect 
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200'
                    } shadow-lg`}
                  onClick={() => !showFeedback && handleAnswer(option.isCorrect, index)}
                  disabled={showFeedback}
                >
                  <span className="text-3xl md:text-4xl">{option.emoji}</span>
                  <span>{option.text}</span>
                </motion.button>
              ))}
            </div>

            {currentQuestionIndex === questions.length - 1 && score === questions.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 md:mt-8 text-center text-xl md:text-2xl text-green-600 font-game bg-green-100 p-4 md:p-6 rounded-xl shadow-inner"
              >
                🎉 Amazing! You've mastered the art of photosynthesis! 🌟
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Game;