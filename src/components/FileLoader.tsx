import { useRef, useState } from 'react';

interface FileLoaderProps {
  isLoading: boolean;
  error: string | null;
  onFile: (file: File) => void;
}

export default function FileLoader({ isLoading, error, onFile }: FileLoaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  return (
    <section className="surface" aria-labelledby="loader-title">
      <h1 id="loader-title" className="title">Chào mừng đến MaterialQuiz</h1>
      <p className="subtitle">
        Chọn hoặc kéo-thả một tệp JSON chứa câu hỏi trắc nghiệm A, B, C, D. Tệp chỉ được xử lý ngay trên thiết bị của bạn.
      </p>

      <div
        className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <span className="material-symbols-rounded" aria-hidden="true">upload_file</span>
        <p>Kéo và thả tệp <strong>.json</strong> vào đây</p>

        <input
          ref={inputRef}
          className="file-input"
          type="file"
          accept=".json,application/json"
          onChange={(event) => handleFiles(event.target.files)}
          aria-label="Chọn tệp bài kiểm tra JSON"
        />

        <button
          type="button"
          className="button button-filled"
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
        >
          <span className="material-symbols-rounded" aria-hidden="true">folder_open</span>
          Chọn tệp bài kiểm tra
        </button>
      </div>

      {isLoading && (
        <div role="status">
          <div className="loading-ring" aria-hidden="true" />
          <p className="subtitle">Đang đọc và kiểm tra tệp…</p>
        </div>
      )}

      {error && (
        <p className="error-text" role="alert">{error}</p>
      )}
    </section>
  );
}
