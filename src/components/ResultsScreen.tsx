import { Button, Icon } from '@kyralabs/m3exp-web/react';
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
        <li><Icon name="check_circle" /> Đúng: {score.correct}</li>
        <li><Icon name="cancel" /> Sai: {score.incorrect}</li>
        <li><Icon name="help" /> Chưa trả lời: {score.unanswered}</li>
      </ul>

      <div className="actions">
        <Button variant="tonal" size="m" icon={<Icon name="visibility" />} onPress={onReview}>
          Xem lại bài làm
        </Button>
        <Button variant="filled" size="m" icon={<Icon name="refresh" />} onPress={onRestart}>
          Làm lại
        </Button>
        <Button variant="text" size="m" onPress={onNewQuiz}>
          Chọn tệp khác
        </Button>
      </div>
    </section>
  );
}
