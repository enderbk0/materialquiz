import { useEffect, useState } from "react";
import { FileLoader } from "./components/FileLoader";
import { QuizOverview } from "./components/QuizOverview";
import { QuizRunner } from "./components/QuizRunner";
import { SubmitDialog } from "./components/SubmitDialog";
import { ResultsScreen } from "./components/ResultsScreen";
import { ReviewScreen } from "./components/ReviewScreen";
import { ThemeControl } from "./components/ThemeControl";
import { useQuizSession } from "./hooks/useQuizSession";
import { useTheme } from "./hooks/useTheme";
import type { Quiz } from "./types/quiz";

export default function App() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { preference, changeTheme } = useTheme();

  const session = quiz ? useQuizSession(quiz) : null;

  useEffect(() => {
    if (!session) return;
    const handler = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      session.goToQuestion(index);
    };
    window.addEventListener("goto-question", handler);
    return () => window.removeEventListener("goto-question", handler);
  }, [session]);

  if (!quiz || !session) {
    return (
      <div className="app">
        <header className="top-bar">
          <span className="brand">MaterialQuiz</span>
          <ThemeControl preference={preference} onChange={changeTheme} />
        </header>
        <FileLoader onQuizLoaded={setQuiz} />
      </div>
    );
  }

  const chooseAnother = () => {
    setQuiz(null);
    setConfirmOpen(false);
  };

  const requestSubmit = () => {
    if (session.unansweredCount > 0) {
      setConfirmOpen(true);
      return;
    }
    session.submitQuiz();
  };

  return (
    <div className="app">
      <header className="top-bar">
        <span className="brand">MaterialQuiz</span>
        <ThemeControl preference={preference} onChange={changeTheme} />
      </header>

      {session.screen === "overview" && (
        <QuizOverview
          quiz={quiz}
          onStart={session.startQuiz}
          onChooseAnother={chooseAnother}
        />
      )}

      {session.screen === "running" && (
        <QuizRunner
          quiz={quiz}
          currentIndex={session.currentIndex}
          answers={session.answers}
          onSelect={session.selectAnswer}
          onPrevious={session.goToPrevious}
          onNext={session.goToNext}
          onSubmit={requestSubmit}
          onChooseAnother={chooseAnother}
        />
      )}

      {session.screen === "results" && (
        <ResultsScreen
          quiz={quiz}
          score={session.score}
          onReview={() => session.setScreen("review")}
          onRestart={session.restartQuiz}
          onChooseAnother={chooseAnother}
        />
      )}

      {session.screen === "review" && (
        <ReviewScreen
          quiz={quiz}
          answers={session.answers}
          onBack={() => session.setScreen("results")}
          onRestart={session.restartQuiz}
        />
      )}

      <SubmitDialog
        open={confirmOpen}
        unansweredCount={session.unansweredCount}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          session.submitQuiz();
        }}
      />
    </div>
  );
}
