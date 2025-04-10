import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-nature-100 to-nature-200">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <h1 className="text-5xl font-game text-green-800 font-bold">
            Photosynthesis Learning Game
          </h1>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-green-500 text-white rounded-full text-3xl font-game shadow-lg hover:bg-green-600 transition-colors"
          onClick={() => navigate('/game')}
        >
          Play Now! 🌱
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartPage;