import type { Level } from '../types/game';

export const levels: Level[] = [
  {
    title: 'Introduction to Learning',
    description: 'Begin your journey by understanding the fundamentals of effective learning.',
    story: 'Welcome, young learner! Your quest begins in the Library of Knowledge, where ancient wisdom awaits. Master these foundational concepts to unlock your potential.',
    challenges: [
      {
        type: 'multiple-choice',
        question: 'What is the most effective way to retain new information?',
        choices: [
          'Reading it once quickly',
          'Active recall and spaced repetition',
          'Highlighting everything',
          'Listening to music while studying'
        ],
        correctAnswer: 'Active recall and spaced repetition',
        explanation: 'Research shows that actively recalling information and reviewing it at spaced intervals significantly improves long-term retention. This technique strengthens neural pathways and helps move information from short-term to long-term memory.',
        pairs: []
      },
      {
        type: 'multiple-choice',
        question: 'Which learning strategy helps you understand concepts more deeply?',
        choices: [
          'Memorizing definitions word-for-word',
          'Teaching the concept to someone else',
          'Copying notes repeatedly',
          'Watching videos passively'
        ],
        correctAnswer: 'Teaching the concept to someone else',
        explanation: 'Teaching others forces you to organize your thoughts, identify gaps in your understanding, and explain concepts in your own words. This active engagement deepens comprehension and reveals areas that need more study.',
        pairs: []
      },
      {
        type: 'matching',
        question: 'Match each learning technique with its benefit:',
        choices: [],
        correctAnswer: '',
        explanation: 'Each learning technique serves a specific purpose. Mind mapping helps visualize connections, practice tests identify weak areas, breaks prevent mental fatigue, and note-taking engages active processing.',
        pairs: [
          ['Mind Mapping', 'Visualizes connections between ideas'],
          ['Practice Tests', 'Identifies knowledge gaps'],
          ['Taking Breaks', 'Prevents mental fatigue'],
          ['Note-Taking', 'Engages active processing']
        ]
      },
      {
        type: 'multiple-choice',
        question: 'What is the optimal study session length for maximum focus?',
        choices: [
          '10-15 minutes',
          '25-50 minutes with breaks',
          '2-3 hours without breaks',
          '5-10 minutes'
        ],
        correctAnswer: '25-50 minutes with breaks',
        explanation: 'Studies show that focused study sessions of 25-50 minutes, followed by short breaks, optimize concentration and prevent burnout. This technique, similar to the Pomodoro method, helps maintain high-quality attention throughout your study time.',
        pairs: []
      }
    ]
  },
  {
    title: 'Memory and Retention',
    description: 'Discover powerful techniques to improve your memory and retain information longer.',
    story: 'You have entered the Memory Palace, a mystical place where information transforms into lasting knowledge. Learn the secrets of memory masters to enhance your cognitive abilities.',
    challenges: [
      {
        type: 'multiple-choice',
        question: 'What is the "forgetting curve" in learning?',
        choices: [
          'A graph showing how quickly we forget information over time',
          'A method for organizing study materials',
          'A type of memory exercise',
          'A learning disability'
        ],
        correctAnswer: 'A graph showing how quickly we forget information over time',
        explanation: 'The forgetting curve, discovered by Hermann Ebbinghaus, shows that we forget approximately 50% of new information within an hour and up to 90% within a week without review. Understanding this helps us plan effective review schedules.',
        pairs: []
      },
      {
        type: 'multiple-choice',
        question: 'Which memory technique uses vivid mental images to remember information?',
        choices: [
          'Rote memorization',
          'The Method of Loci (Memory Palace)',
          'Speed reading',
          'Passive review'
        ],
        correctAnswer: 'The Method of Loci (Memory Palace)',
        explanation: 'The Method of Loci, also known as the Memory Palace technique, involves associating information with specific locations in a familiar place. By creating vivid mental images and placing them in these locations, you can dramatically improve recall.',
        pairs: []
      },
      {
        type: 'matching',
        question: 'Match each memory type with its characteristics:',
        choices: [],
        correctAnswer: '',
        explanation: 'Understanding different memory types helps you choose the right study strategies. Short-term memory is temporary, long-term memory is permanent, working memory processes information, and procedural memory handles skills.',
        pairs: [
          ['Short-term Memory', 'Holds information for seconds to minutes'],
          ['Long-term Memory', 'Stores information permanently'],
          ['Working Memory', 'Actively processes current information'],
          ['Procedural Memory', 'Remembers how to perform tasks']
        ]
      },
      {
        type: 'multiple-choice',
        question: 'What is the best time to review new material to combat the forgetting curve?',
        choices: [
          'Once, right after learning',
          'Multiple times at increasing intervals',
          'Only before the test',
          'Never review, just learn once'
        ],
        correctAnswer: 'Multiple times at increasing intervals',
        explanation: 'Spaced repetition—reviewing material at increasing intervals (e.g., after 1 day, 3 days, 1 week, 2 weeks)—is the most effective way to combat the forgetting curve and move information into long-term memory.',
        pairs: []
      },
      {
        type: 'multiple-choice',
        question: 'Which factor most significantly improves memory consolidation?',
        choices: [
          'Studying late at night',
          'Getting adequate sleep',
          'Drinking coffee',
          'Studying in complete silence'
        ],
        correctAnswer: 'Getting adequate sleep',
        explanation: 'Sleep plays a crucial role in memory consolidation. During sleep, particularly during REM and deep sleep stages, the brain processes and strengthens memories formed during the day. Adequate sleep (7-9 hours) significantly improves learning and retention.',
        pairs: []
      }
    ]
  }
];
