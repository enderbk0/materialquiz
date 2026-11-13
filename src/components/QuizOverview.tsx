import type { Quiz } from "../types/quiz";

interface QuizOverviewProps {
  quiz: Quiz;
  onStart: () => void;
  onChooseAnother: () => void;
}

export function QuizOverview({ quiz, onStart, onChooseAnother }: QuizOverviewProps) {
  return (
    <main className="page">
      <section className="surface quiz-overview">
        <span className="material-symbols-rounded hero-icon" aria-hidden="true">
          assignment
        </span>
        <h1>{quiz.title}</h1>
        {quiz.description && <p className="description">{quiz.description}</p>}
        <p className="meta">
          <span className="material-symbols-rounded" aria-hidden="true">
            format_list_numbered
          </span>
          {quiz.questions.length} câu hỏi trắc nghiệm
        </p>

        <div className="actions">
          <button type="button" className="filled-button" onClick={onStart}>
            Bắt đầu
          </button>
          <button type="button" className="text-button" onClick={onChooseAnother}>
            Chọn tệp khác
          </button>
        </div>
      </section>
    </main>
  );
}
