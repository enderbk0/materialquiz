import type { AnswerKey, Quiz } from "../types/quiz";
import { AnswerOption } from "./AnswerOption";
import { ProgressBar } from "./ProgressBar";

interface QuizRunnerProps {
  quiz: Quiz;
  currentIndex: number;
  answers: Record<string, AnswerKey | undefined>;
  onSelect: (questionId: string, answer: AnswerKey) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onChooseAnother: () => void;
}

export function QuizRunner({
  quiz,
  currentIndex,
  answers,
  onSelect,
  onPrevious,
  onNext,
  onSubmit,
  onChooseAnother
}: QuizRunnerProps) {
  const question = quiz.questions[currentIndex];
  const selected = answers[question.id];
  const isLast = currentIndex === quiz.questions.length - 1;

  return (
    <main className="page">
      <section className="surface quiz-runner" aria-live="polite">
        <header className="quiz-header">
          <div>
            <p className="eyebrow">{quiz.title}</p>
            <h2>
              Câu {currentIndex + 1} / {quiz.questions.length}
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Chọn tệp bài kiểm tra khác"
            onClick={onChooseAnother}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              swap_horiz
            </span>
          </button>
        </header>

        <ProgressBar value={currentIndex + 1} max={quiz.questions.length} />

        <p className="question-text">{question.question}</p>

        <div className="answer-list">
          {(Object.keys(question.options) as AnswerKey[]).map((key) => (
            <AnswerOption
              key={key}
              answerKey={key}
              text={question.options[key]}
              selected={selected === key}
              onSelect={(answer) => onSelect(question.id, answer)}
            />
          ))}
        </div>

        <div className="question-dots" aria-label="Điều hướng câu hỏi">
          {quiz.questions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`question-dot${index === currentIndex ? " is-current" : ""}${
                answers[item.id] ? " is-answered" : ""}`}
              aria-label={`Đến câu ${index + 1}`}
              aria-current={index === currentIndex ? "step" : undefined}
              onClick={() => {
                const event = new CustomEvent("goto-question", { detail: index });
                window.dispatchEvent(event);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <footer className="quiz-actions">
          <button type="button" className="outlined-button" onClick={onPrevious} disabled={currentIndex === 0}>
            Trước
          </button>
          {isLast ? (
            <button type="button" className="filled-button" onClick={onSubmit}>
              Nộp bài
            </button>
          ) : (
            <button type="button" className="filled-button" onClick={onNext}>
              Tiếp
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}
