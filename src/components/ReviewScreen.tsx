import type { AnswerKey, Quiz } from "../types/quiz";

interface ReviewScreenProps {
  quiz: Quiz;
  answers: Record<string, AnswerKey | undefined>;
  onBack: () => void;
  onRestart: () => void;
}

export function ReviewScreen({ quiz, answers, onBack, onRestart }: ReviewScreenProps) {
  return (
    <main className="page">
      <section className="surface review">
        <h1>Xem lại bài làm</h1>

        <div className="review-list">
          {quiz.questions.map((question, index) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.correctAnswer;
            const state = !selected ? "unanswered" : isCorrect ? "correct" : "incorrect";
            const stateLabel =
              state === "unanswered" ? "Chưa trả lời" : state === "correct" ? "Đúng" : "Sai";

            return (
              <article key={question.id} className={`review-item ${state}`}>
                <header>
                  <span className="review-number">{index + 1}</span>
                  <h2>{question.question}</h2>
                  <span className={`state-chip ${state}`}>
                    <span className="material-symbols-rounded" aria-hidden="true">
                      {state === "correct" ? "check_circle" : state === "incorrect" ? "cancel" : "help"}
                    </span>
                    {stateLabel}
                  </span>
                </header>

                <ul>
                  {(Object.keys(question.options) as AnswerKey[]).map((key) => {
                    const isUserAnswer = selected === key;
                    const isCorrectAnswer = question.correctAnswer === key;
                    const className = [
                      "review-option",
                      isCorrectAnswer ? "correct-answer" : "",
                      isUserAnswer && !isCorrectAnswer ? "incorrect-answer" : ""
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <li key={key} className={className}>
                        <strong>{key}.</strong> {question.options[key]}
                        {isUserAnswer && <span className="tag">Bạn chọn</span>}
                        {isCorrectAnswer && <span className="tag">Đáp án đúng</span>}
                      </li>
                    );
                  })}
                </ul>

                {question.explanation && <p className="explanation">{question.explanation}</p>}
              </article>
            );
          })}
        </div>

        <div className="actions">
          <button type="button" className="outlined-button" onClick={onBack}>
            Quay lại kết quả
          </button>
          <button type="button" className="filled-button" onClick={onRestart}>
            Làm lại
          </button>
        </div>
      </section>
    </main>
  );
}
