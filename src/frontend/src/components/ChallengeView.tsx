import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import type { Challenge } from '../types/game';

interface ChallengeViewProps {
  challenge: Challenge;
  challengeIndex: number;
  isCompleted: boolean;
  onComplete: (challengeIndex: number) => void;
}

export default function ChallengeView({ challenge, challengeIndex, isCompleted, onComplete }: ChallengeViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = challenge.type === 'multiple-choice' 
      ? selectedAnswer === challenge.correctAnswer
      : true;

    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct && !isCompleted) {
      onComplete(challengeIndex);
    }
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setHasSubmitted(false);
    setIsCorrect(false);
    setMatches({});
  };

  const handleMatch = (left: string, right: string) => {
    setMatches({ ...matches, [left]: right });
  };

  const handleSubmitMatching = () => {
    const allCorrect = challenge.pairs.every(([left, right]) => matches[left] === right);
    setIsCorrect(allCorrect);
    setHasSubmitted(true);
    if (allCorrect && !isCompleted) {
      onComplete(challengeIndex);
    }
  };

  if (challenge.type === 'multiple-choice') {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{challenge.question}</h3>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={hasSubmitted}>
            <div className="space-y-3">
              {challenge.choices.map((choice, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedAnswer === choice ? 'border-primary border-2' : ''
                  } ${
                    hasSubmitted && choice === challenge.correctAnswer
                      ? 'border-green-500 border-2 bg-green-50 dark:bg-green-950'
                      : ''
                  } ${
                    hasSubmitted && selectedAnswer === choice && !isCorrect
                      ? 'border-red-500 border-2 bg-red-50 dark:bg-red-950'
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={choice} id={`choice-${index}`} />
                    <Label htmlFor={`choice-${index}`} className="flex-1 cursor-pointer">
                      {choice}
                    </Label>
                    {hasSubmitted && choice === challenge.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {hasSubmitted && selectedAnswer === choice && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>

        {hasSubmitted && (
          <Alert className={isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <img src="/assets/generated/correct-answer-lightbulb-transparent.dim_100x100.png" alt="Correct" className="w-12 h-12" />
              ) : (
                <img src="/assets/generated/incorrect-answer-x-transparent.dim_80x80.png" alt="Incorrect" className="w-10 h-10" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {isCorrect ? 'Correct! Well done!' : 'Not quite right'}
                </h4>
                <AlertDescription className="text-foreground/80">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 mt-1 shrink-0" />
                    <span>{challenge.explanation}</span>
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        {isCompleted && (
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
            <img src="/assets/generated/level-complete-badge-transparent.dim_128x128.png" alt="Completed" className="w-8 h-8" />
            <span>Challenge Completed!</span>
          </div>
        )}

        <div className="flex gap-3">
          {!hasSubmitted ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="flex-1">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (challenge.type === 'matching') {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{challenge.question}</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Match these:</h4>
              {challenge.pairs.map(([left], index) => (
                <Card key={index} className="p-3">
                  <p className="font-medium">{left}</p>
                </Card>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">With these:</h4>
              {challenge.pairs.map(([, right], index) => (
                <Card key={index} className="p-3">
                  <p>{right}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {hasSubmitted && (
          <Alert className={isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <img src="/assets/generated/correct-answer-lightbulb-transparent.dim_100x100.png" alt="Correct" className="w-12 h-12" />
              ) : (
                <img src="/assets/generated/incorrect-answer-x-transparent.dim_80x80.png" alt="Incorrect" className="w-10 h-10" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {isCorrect ? 'Perfect matching!' : 'Some matches are incorrect'}
                </h4>
                <AlertDescription className="text-foreground/80">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 mt-1 shrink-0" />
                    <span>{challenge.explanation}</span>
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <div className="flex gap-3">
          {!hasSubmitted ? (
            <Button onClick={handleSubmitMatching} className="flex-1">
              Check Matches
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
