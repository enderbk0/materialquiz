import { useCallback, useState } from 'react';
import { AnswerKey, Quiz, QuizAnswers, QuizScore } from '../types/quiz';
import { scoreQuiz } from '../lib/scoreQuiz';

export function useQuizSession() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = useCallback((questionCount: number) => {
    setAnswers(Object.fromEntries(Array.from({ length: questionCount }, (_, index) => [`q${index + 1}`, undefined])));
    setCurrentIndex(0);
    setIsSubmitted(false);
  }, []);

  const selectAnswer = useCallback((questionId: string, answer: AnswerKey) => {
    setAnswers((previous) => ({ ...previous, [questionId]: answer }));
  }, []);

  const goTo = useCallback((index: number, total: number) => {
    setCurrentIndex(Math.min(Math.max(index, 0), Math.max(total - 1, 0)));
  }, []);

  const next = useCallback((total: number) => {
    setCurrentIndex((current) => Math.min(current + 1, Math.max(total - 1, 0)));
  }, []);

  const previous = useCallback(() => {
    setCurrentIndex((current) => Math.max(current - 1, 0));
  }, []);

  const submit = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  const getScore = useCallback(
    (questions: Quiz['questions']): QuizScore => scoreQuiz(questions, answers),
    [answers],
  );

  return {
    answers,
    currentIndex,
    isSubmitted,
    reset,
    selectAnswer,
    goTo,
    next,
    previous,
    submit,
    getScore,
  };
}
