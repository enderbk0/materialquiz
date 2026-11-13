import type { AnswerKey, Quiz, QuizScore } from "../types/quiz";

export function scoreQuiz(quiz: Quiz, answers: Record<string, AnswerKey | undefined>): QuizScore {
  const total = quiz.questions.length;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (const question of quiz.questions) {
    const answer = answers[question.id];

    if (!answer) {
      unanswered += 1;
    } else if (answer === question.correctAnswer) {
      correct += 1;
    } else {
      incorrect += 1;
    }
  }

  return {
    total,
    correct,
    incorrect,
    unanswered,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100)
  };
}
