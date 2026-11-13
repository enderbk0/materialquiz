import { Quiz } from '../types/quiz';

interface QuizOverviewProps {
  quiz: Quiz;
  onStart: () => void;
  onBack: () => void;
}

export default function QuizOverview({ quiz, onStart, onBack }: QuizOverviewProps) {
  return (
    <section className="surface" aria-labelledby="overview-title">
      <h1 id="overview-title" className="title">{quiz.title}</h1>
      {quiz.description && <p className="subtitle">{quiz.description}</p>}

      <p>
        Bài kiểm tra gồm <strong>{quiz.questions.length}</strong> câu hỏi trắc nghiệm, mỗi câu có bốn lựa chọn A, B, C và D.
      </p>

      <div className="actions">
        <button type="button" className="button button-text" onClick={onBack}>
          <span className="material-symbols-rounded" aria-hidden="true">arrow_back</span>
          Chọn tệp khác
        </button>
        <button type="button" className="button button-filled" onClick={onStart}>
          <span className="material-symbols-rounded" aria-hidden="true">play_arrow</span>
          Bắt đầu
        </button>
      </div>
    </section>
  );
}
