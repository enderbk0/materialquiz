interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);

  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Tiến trình bài kiểm tra"
    >
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
