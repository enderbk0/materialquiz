import { Button, Icon } from '@kyralabs/m3exp-web/react';
import { AnswerKey, Quiz, QuizAnswers } from '../types/quiz';

interface ReviewScreenProps {
  quiz: Quiz;
  answers: QuizAnswers;
  onBack: () => void;
}

const ANSWER_KEYS: AnswerKey[] = ['A', 'B', 'C', 'D'];

export default function ReviewScreen({ quiz, answers, onBack }: ReviewScreenProps) {
  return (
    <section className="surface" aria-labelledby="review-title">
      <h1 id="review-title" className="title">Xem lại bài làm</h1>
      <p className="subtitle">Kiểm tra đáp án đã chọn, đáp án đúng và giải thích của từng câu hỏi.</p>

      <ol className="review-list">
        {quiz.questions.map((question, index) => {
          const selected = answers[question.id];
          const isCorrect = selected === question.correctAnswer;
          const state = !selected ? 'unanswered' : isCorrect ? 'correct' : 'incorrect';

          return (
            <li key={question.id} className={`review-item ${state}`}>
              <h2>
                Câu {index + 1}: {question.question}
              </h2>

              <p className="review-status">
                {!selected && 'Chưa trả lời'}
                {selected && isCorrect && 'Chính xác'}
                {selected && !isCorrect && 'Chưa chính xác'}
              </p>

              <ul>
                {ANSWER_KEYS.map((key) => {
                  const isCorrectAnswer = key === question.correctAnswer;
                  const isSelected = selected === key;

                  return (
                    <li
                      key={key}
                      className={
                        isCorrectAnswer ? 'correct-answer' : isSelected ? 'selected-answer' : ''
                      }
                    >
                      <strong>{key}.</strong> {question.options[key]}
                      {isCorrectAnswer && ' — Đáp án đúng'}
                      {isSelected && !isCorrectAnswer && ' — Bạn đã chọn'}
                    </li>
                  );
                })}
              </ul>

              {question.explanation && <p className="explanation">Giải thích: {question.explanation}</p>}
            </li>
          );
        })}
      </ol>

      <div className="actions">
        <Button variant="filled" size="m" icon={<Icon name="arrow_back" />} onPress={onBack}>
          Quay lại kết quả
        </Button>
      </div>
    </section>
  );
}
