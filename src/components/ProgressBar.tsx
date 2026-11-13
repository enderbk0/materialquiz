interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Tiến trình bài kiểm tra: câu ${current} trên ${total}`}
    >
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
