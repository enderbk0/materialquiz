import { AnswerKey, Quiz, QuizAnswers, QuizScore } from '../types/quiz';

export function scoreQuiz(questions: Quiz['questions'], answers: QuizAnswers): QuizScore {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (const question of questions) {
    const answer = answers[question.id];

    if (!answer) {
      unanswered += 1;
      continue;
    }

    if (answer === question.correctAnswer) {
      correct += 1;
    } else {
      incorrect += 1;
    }
  }

  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return { total, correct, incorrect, unanswered, percentage };
}

export function isAnswerKey(value: unknown): value is AnswerKey {
  return value === 'A' || value === 'B' || value === 'C' || value === 'D';
}
