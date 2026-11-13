import { useCallback, useMemo, useState } from 'react';
import { Quiz, QuizLoadResult } from './types/quiz';
import { parseQuizFile } from './lib/validateQuiz';
import { useTheme } from './hooks/useTheme';
import { useQuizSession } from './hooks/useQuizSession';
import FileLoader from './components/FileLoader';
import QuizOverview from './components/QuizOverview';
import QuizRunner from './components/QuizRunner';
import ResultsScreen from './components/ResultsScreen';
import ReviewScreen from './components/ReviewScreen';
import ThemeControl from './components/ThemeControl';

type Screen = 'load' | 'overview' | 'running' | 'results' | 'review';

export default function App() {
  const { theme, setTheme } = useTheme();
  const [screen, setScreen] = useState<Screen>('load');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useQuizSession();

  const handleFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const result: QuizLoadResult = await parseQuizFile(file);
      setQuiz(result.quiz);
      session.reset(result.quiz.questions.length);
      setScreen('overview');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Không thể đọc tệp bài kiểm tra.');
      setQuiz(null);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const score = useMemo(() => {
    if (!quiz) return null;
    return session.getScore(quiz.questions);
  }, [quiz, session]);

  const restart = useCallback(() => {
    if (!quiz) return;
    session.reset(quiz.questions.length);
    setScreen('running');
  }, [quiz, session]);

  const backToFiles = useCallback(() => {
    setQuiz(null);
    setLoadError(null);
    session.reset(0);
    setScreen('load');
  }, [session]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="material-symbols-rounded brand-icon" aria-hidden="true">quiz</span>
          <span>MaterialQuiz</span>
        </div>
        <ThemeControl theme={theme} onChange={setTheme} />
      </header>

      <main className="app-main">
        {screen === 'load' && (
          <FileLoader
            isLoading={isLoading}
            error={loadError}
            onFile={handleFile}
          />
        )}

        {screen === 'overview' && quiz && (
          <QuizOverview
            quiz={quiz}
            onStart={() => {
              session.reset(quiz.questions.length);
              setScreen('running');
            }}
            onBack={backToFiles}
          />
        )}

        {screen === 'running' && quiz && (
          <QuizRunner
            quiz={quiz}
            session={session}
            onSubmit={() => setScreen('results')}
            onExit={backToFiles}
          />
        )}

        {screen === 'results' && quiz && score && (
          <ResultsScreen
            quiz={quiz}
            score={score}
            onReview={() => setScreen('review')}
            onRestart={restart}
            onNewQuiz={backToFiles}
          />
        )}

        {screen === 'review' && quiz && score && (
          <ReviewScreen
            quiz={quiz}
            answers={session.answers}
            onBack={() => setScreen('results')}
          />
        )}
      </main>
    </div>
  );
}
