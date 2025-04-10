import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

const QuestionPanel: React.FC = () => {
  const { 
    currentQuestion, 
    increaseScore, 
    increaseLevel, 
    setStage,
    level 
  } = useGameStore();

  const handleAnswer = (isCorrect: boolean) => {
    console.log("hello" , isCorrect)
    if (isCorrect) {
      increaseScore();
      increaseLevel();
      // Update tree stage based on level
      if (level === 1) setStage('sprout');
      else if (level === 2) setStage('sapling');
      else setStage('tree');
    }
  };

  if (!currentQuestion) return <div>Game Complete! 🎉</div>;

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl font-game text-green-800 mb-6">
        Level {level}: {currentQuestion.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white text-2xl flex items-center gap-3 hover:from-green-500 hover:to-green-600"
            onClick={() => handleAnswer(option.isCorrect)}
          >
            <span className="text-4xl">{option.emoji}</span>
            <span>{option.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;