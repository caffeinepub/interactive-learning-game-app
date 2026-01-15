import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import ChallengeView from './ChallengeView';
import type { Level } from '../types/game';
import { toast } from 'sonner';

interface LevelViewProps {
  level: Level;
  levelIndex: number;
  onComplete: (levelIndex: number) => void;
  onBack: () => void;
  isUnlocked: boolean;
}

export default function LevelView({ level, levelIndex, onComplete, onBack, isUnlocked }: LevelViewProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());

  if (!isUnlocked) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Level Locked</CardTitle>
            <CardDescription>Complete previous levels to unlock this one.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onBack}>Back to Levels</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = (completedChallenges.size / level.challenges.length) * 100;
  const allChallengesCompleted = completedChallenges.size === level.challenges.length;

  const handleChallengeComplete = (challengeIndex: number) => {
    const newCompleted = new Set(completedChallenges);
    newCompleted.add(challengeIndex);
    setCompletedChallenges(newCompleted);

    if (newCompleted.size === level.challenges.length) {
      toast.success('Level completed! 🎉', {
        description: 'Great job! You can now move to the next level.',
      });
      onComplete(levelIndex);
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < level.challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    }
  };

  const handlePreviousChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(currentChallengeIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Levels
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{level.title}</CardTitle>
              <CardDescription className="text-base">{level.description}</CardDescription>
            </div>
            {allChallengesCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <Trophy className="w-6 h-6" />
                <span className="font-semibold">Completed!</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Level Progress</span>
              <span className="text-muted-foreground">
                {completedChallenges.size} / {level.challenges.length} challenges
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Challenge {currentChallengeIndex + 1} of {level.challenges.length}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousChallenge}
                disabled={currentChallengeIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextChallenge}
                disabled={currentChallengeIndex === level.challenges.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChallengeView
            challenge={level.challenges[currentChallengeIndex]}
            challengeIndex={currentChallengeIndex}
            isCompleted={completedChallenges.has(currentChallengeIndex)}
            onComplete={handleChallengeComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
