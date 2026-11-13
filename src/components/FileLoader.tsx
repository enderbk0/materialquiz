import { useRef, useState } from 'react';
import { Button, Icon } from '@kyralabs/m3exp-web/react';

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
        <Icon name="upload_file" />
        <p>Kéo và thả tệp <strong>.json</strong> vào đây</p>

        <input
          ref={inputRef}
          className="file-input"
          type="file"
          accept=".json,application/json"
          onChange={(event) => handleFiles(event.target.files)}
          aria-label="Chọn tệp bài kiểm tra JSON"
        />

        <Button
          variant="filled"
          size="m"
          icon={<Icon name="folder_open" />}
          onPress={() => inputRef.current?.click()}
          isDisabled={isLoading}
        >
          Chọn tệp bài kiểm tra
        </Button>
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
