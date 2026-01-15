export interface Challenge {
  type: 'multiple-choice' | 'matching';
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  pairs: [string, string][];
}

export interface Level {
  title: string;
  description: string;
  story: string;
  challenges: Challenge[];
}
