export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export interface QuizQuestion {
  id: string;
  question: string;
  options: Record<AnswerKey, string>;
  correctAnswer: AnswerKey;
  explanation?: string;
}

export interface Quiz {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export type QuizAnswers = Record<string, AnswerKey | undefined>;

export interface QuizScore {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  percentage: number;
}

export type QuizLoadResult = { quiz: Quiz };
