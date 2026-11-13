import { useState } from 'react';
import { AnswerKey, Quiz } from '../types/quiz';
import { useQuizSession } from '../hooks/useQuizSession';
import AnswerOption from './AnswerOption';
import ProgressBar from './ProgressBar';
import SubmitDialog from './SubmitDialog';

interface QuizRunnerProps {
  quiz: Quiz;
  session: ReturnType<typeof useQuizSession>;
  onSubmit: () => void;
  onExit: () => void;
}

const ANSWER_KEYS: AnswerKey[] = ['A', 'B', 'C', 'D'];

export default function QuizRunner({ quiz, session, onSubmit, onExit }: QuizRunnerProps) {
  const [showDialog, setShowDialog] = useState(false);
  const question = quiz.questions[session.currentIndex];
  const answeredCount = quiz.questions.filter((item) => session.answers[item.id]).length;
  const unansweredCount = quiz.questions.length - answeredCount;
  const isLast = session.currentIndex === quiz.questions.length - 1;

  const requestSubmit = () => {
    if (unansweredCount > 0) {
      setShowDialog(true);
      return;
    }
    session.submit();
    onSubmit();
  };

  const confirmSubmit = () => {
    setShowDialog(false);
    session.submit();
    onSubmit();
  };

  return (
    <section className="surface" aria-labelledby="quiz-title">
      <div className="quiz-topline">
        <h1 id="quiz-title" className="quiz-title">{quiz.title}</h1>
        <button type="button" className="button button-text" onClick={onExit}>
          Thoát
        </button>
      </div>

      <ProgressBar current={session.currentIndex + 1} total={quiz.questions.length} />

      <p className="question-counter">
        Câu {session.currentIndex + 1} / {quiz.questions.length}
      </p>

      <h2 className="question-text">{question.question}</h2>

      <div className="answers" role="radiogroup" aria-label="Các lựa chọn trả lời">
        {ANSWER_KEYS.map((key) => (
          <AnswerOption
            key={key}
            answerKey={key}
            label={question.options[key]}
            selected={session.answers[question.id] === key}
            onSelect={() => session.selectAnswer(question.id, key)}
          />
        ))}
      </div>

      <div className="actions">
        <button
          type="button"
          className="button button-tonal"
          onClick={session.previous}
          disabled={session.currentIndex === 0}
        >
          <span className="material-symbols-rounded" aria-hidden="true">arrow_back</span>
          Trước
        </button>

        {isLast ? (
          <button type="button" className="button button-filled" onClick={requestSubmit}>
            <span className="material-symbols-rounded" aria-hidden="true">check_circle</span>
            Nộp bài
          </button>
        ) : (
          <button type="button" className="button button-filled" onClick={() => session.next(quiz.questions.length)}>
            Sau
            <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </button>
        )}
      </div>

      <p className="subtitle">
        Đã trả lời {answeredCount}/{quiz.questions.length} câu.
      </p>

      {showDialog && (
        <SubmitDialog
          unansweredCount={unansweredCount}
          onCancel={() => setShowDialog(false)}
          onConfirm={confirmSubmit}
        />
      )}
    </section>
  );
}
