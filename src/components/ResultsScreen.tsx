import type { Quiz, QuizScore } from "../types/quiz";

interface ResultsScreenProps {
  quiz: Quiz;
  score: QuizScore;
  onReview: () => void;
  onRestart: () => void;
  onChooseAnother: () => void;
}

export function ResultsScreen({
  quiz,
  score,
  onReview,
  onRestart,
  onChooseAnother
}: ResultsScreenProps) {
  return (
    <main className="page">
      <section className="surface results" aria-live="polite">
        <span className="material-symbols-rounded hero-icon" aria-hidden="true">
          emoji_events
        </span>
        <h1>Kết quả</h1>
        <p className="description">{quiz.title}</p>

        <div className="score-circle" role="status">
          <strong>{score.percentage}%</strong>
          <span>{score.correct}/{score.total} câu đúng</span>
        </div>

        <dl className="result-grid">
          <div>
            <dt>Tổng câu hỏi</dt>
            <dd>{score.total}</dd>
          </div>
          <div>
            <dt>Trả lời đúng</dt>
            <dd>{score.correct}</dd>
          </div>
          <div>
            <dt>Trả lời sai</dt>
            <dd>{score.incorrect}</dd>
          </div>
          <div>
            <dt>Chưa trả lời</dt>
            <dd>{score.unanswered}</dd>
          </div>
        </dl>

        <div className="actions">
          <button type="button" className="filled-button" onClick={onReview}>
            Xem lại bài làm
          </button>
          <button type="button" className="outlined-button" onClick={onRestart}>
            Làm lại
          </button>
          <button type="button" className="text-button" onClick={onChooseAnother}>
            Chọn tệp khác
          </button>
        </div>
      </section>
    </main>
  );
}
