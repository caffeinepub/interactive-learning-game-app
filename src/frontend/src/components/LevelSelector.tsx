import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { useResetProgress } from '../hooks/useQueries';
import type { Level } from '../types/game';

interface LevelSelectorProps {
  levels: Level[];
  currentProgress: number;
  onSelectLevel: (levelIndex: number) => void;
}

export default function LevelSelector({ levels, currentProgress, onSelectLevel }: LevelSelectorProps) {
  const { mutate: resetProgress, isPending: isResetting } = useResetProgress();
  const progressPercentage = (currentProgress / levels.length) * 100;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Learning Journey
          </CardTitle>
          <CardDescription className="text-center text-base">
            Complete challenges to unlock new levels and expand your knowledge!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">
                {currentProgress} / {levels.length} levels completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          {currentProgress > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isResetting}
              className="w-full"
            >
              {isResetting ? 'Resetting...' : 'Reset Progress'}
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {levels.map((level, index) => {
          const isCompleted = index < currentProgress;
          const isUnlocked = index <= currentProgress;
          const isCurrent = index === currentProgress;

          return (
            <Card
              key={index}
              className={`transition-all hover:shadow-lg ${
                isUnlocked ? 'cursor-pointer border-2' : 'opacity-60'
              } ${isCurrent ? 'border-primary' : ''}`}
              onClick={() => isUnlocked && onSelectLevel(index)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={isCompleted ? 'default' : isCurrent ? 'secondary' : 'outline'}>
                        Level {index + 1}
                      </Badge>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {!isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <CardTitle className="text-xl">{level.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {level.challenges.length} challenges
                  </span>
                  {isUnlocked && (
                    <Button size="sm" variant={isCurrent ? 'default' : 'outline'}>
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Replay' : isCurrent ? 'Continue' : 'Start'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
