import { useCallback, useMemo, useState } from "react";
import type { AnswerKey, Quiz } from "../types/quiz";
import { scoreQuiz } from "../lib/scoreQuiz";

export type QuizScreen = "overview" | "running" | "results" | "review";

export function useQuizSession(quiz: Quiz) {
  const [screen, setScreen] = useState<QuizScreen>("overview");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerKey | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const score = useMemo(() => scoreQuiz(quiz, answers), [quiz, answers]);
  const unansweredCount = score.unanswered;

  const selectAnswer = useCallback((questionId: string, answer: AnswerKey) => {
    setAnswers((previous) => ({ ...previous, [questionId]: answer }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, quiz.questions.length - 1)));
  }, [quiz.questions.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, quiz.questions.length - 1));
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const startQuiz = useCallback(() => {
    setCurrentIndex(0);
    setScreen("running");
  }, []);

  const submitQuiz = useCallback(() => {
    setSubmitted(true);
    setScreen("results");
  }, []);

  const restartQuiz = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setScreen("overview");
  }, []);

  return {
    screen,
    setScreen,
    currentIndex,
    currentQuestion,
    answers,
    score,
    submitted,
    unansweredCount,
    selectAnswer,
    goToQuestion,
    goToNext,
    goToPrevious,
    startQuiz,
    submitQuiz,
    restartQuiz
  };
}
