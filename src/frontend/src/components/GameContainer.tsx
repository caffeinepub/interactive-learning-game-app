import { useState, useEffect } from 'react';
import { useGetPersistentLevelProgress, useCompleteLevel } from '../hooks/useQueries';
import LevelSelector from './LevelSelector';
import LevelView from './LevelView';
import { levels } from '../data/levels';

export default function GameContainer() {
  const { data: persistentProgress } = useGetPersistentLevelProgress();
  const { mutate: completeLevel } = useCompleteLevel();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState<number>(0);

  useEffect(() => {
    if (persistentProgress !== undefined) {
      setLocalProgress(Number(persistentProgress));
    }
  }, [persistentProgress]);

  const handleLevelComplete = (levelIndex: number) => {
    const newProgress = Math.max(localProgress, levelIndex + 1);
    setLocalProgress(newProgress);
    completeLevel(levelIndex);
  };

  const handleSelectLevel = (levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
  };

  const handleBackToLevels = () => {
    setCurrentLevelIndex(-1);
  };

  if (currentLevelIndex === -1 || currentLevelIndex >= levels.length) {
    return (
      <LevelSelector
        levels={levels}
        currentProgress={localProgress}
        onSelectLevel={handleSelectLevel}
      />
    );
  }

  return (
    <LevelView
      level={levels[currentLevelIndex]}
      levelIndex={currentLevelIndex}
      onComplete={handleLevelComplete}
      onBack={handleBackToLevels}
      isUnlocked={currentLevelIndex <= localProgress}
    />
  );
}
