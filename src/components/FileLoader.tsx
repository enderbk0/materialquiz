import { useRef, useState } from "react";
import { validateQuiz } from "../lib/validateQuiz";
import type { Quiz } from "../types/quiz";

interface FileLoaderProps {
  onQuizLoaded: (quiz: Quiz) => void;
}

export function FileLoader({ onQuizLoaded }: FileLoaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFile = async (file: File) => {
    setError(null);

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Vui lòng chọn một tệp có đuôi .json.");
      return;
    }

    setIsLoading(true);

    try {
      const text = await file.text();
      const quiz = validateQuiz(text);
      onQuizLoaded(quiz);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Không thể đọc tệp bài kiểm tra.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="hero surface">
        <span className="material-symbols-rounded hero-icon" aria-hidden="true">
          quiz
        </span>
        <h1>MaterialQuiz</h1>
        <p>
          Tải tệp bài kiểm tra JSON từ thiết bị của bạn và làm trắc nghiệm A, B, C, D ngay trong trình duyệt.
          Tệp của bạn không được tải lên bất kỳ máy chủ nào.
        </p>

        <div
          className={`dropzone${isDragging ? " is-dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            const file = event.dataTransfer.files[0];
            if (file) void readFile(file);
          }}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            upload_file
          </span>
          <p>Kéo và thả tệp `.json` vào đây</p>
          <button type="button" className="filled-button" onClick={() => inputRef.current?.click()}>
            Chọn tệp bài kiểm tra
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".json,application/json"
            className="visually-hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void readFile(file);
              event.target.value = "";
            }}
          />
        </div>

        {isLoading && (
          <div className="loading" role="status">
            <span className="spinner" aria-hidden="true" />
            Đang đọc và kiểm tra tệp...
          </div>
        )}

        {error && (
          <p className="error" role="alert">
            <span className="material-symbols-rounded" aria-hidden="true">
              error
            </span>
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
