import { Button, Icon } from '@kyralabs/m3exp-web/react';
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
        <Button variant="text" size="m" icon={<Icon name="arrow_back" />} onPress={onBack}>
          Chọn tệp khác
        </Button>
        <Button variant="filled" size="m" icon={<Icon name="play_arrow" />} onPress={onStart}>
          Bắt đầu
        </Button>
      </div>
    </section>
  );
}
