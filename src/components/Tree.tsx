import React from 'react';
import { useGameStore } from '../store/gameStore';

const Tree: React.FC = () => {
  const { currentStage } = useGameStore();

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={currentStage === 'seed' ? 'brown' : 'green'} />
    </mesh>
  );
};

export default Tree;