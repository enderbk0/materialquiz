import { Quiz, QuizScore } from '../types/quiz';

interface ResultsScreenProps {
  quiz: Quiz;
  score: QuizScore;
  onReview: () => void;
  onRestart: () => void;
  onNewQuiz: () => void;
}

export default function ResultsScreen({ quiz, score, onReview, onRestart, onNewQuiz }: ResultsScreenProps) {
  return (
    <section className="surface" aria-labelledby="results-title">
      <h1 id="results-title" className="title">Kết quả</h1>
      <p className="subtitle">{quiz.title}</p>

      <div className="score-card" aria-live="polite">
        <span className="score-value">{score.percentage}%</span>
        <span className="score-detail">
          {score.correct}/{score.total} câu đúng
        </span>
      </div>

      <ul className="result-list">
        <li><span className="material-symbols-rounded" aria-hidden="true">check_circle</span> Đúng: {score.correct}</li>
        <li><span className="material-symbols-rounded" aria-hidden="true">cancel</span> Sai: {score.incorrect}</li>
        <li><span className="material-symbols-rounded" aria-hidden="true">help</span> Chưa trả lời: {score.unanswered}</li>
      </ul>

      <div className="actions">
        <button type="button" className="button button-tonal" onClick={onReview}>
          <span className="material-symbols-rounded" aria-hidden="true">visibility</span>
          Xem lại bài làm
        </button>
        <button type="button" className="button button-filled" onClick={onRestart}>
          <span className="material-symbols-rounded" aria-hidden="true">refresh</span>
          Làm lại
        </button>
        <button type="button" className="button button-text" onClick={onNewQuiz}>
          Chọn tệp khác
        </button>
      </div>
    </section>
  );
}
