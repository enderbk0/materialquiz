interface SubmitDialogProps {
  open: boolean;
  unansweredCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SubmitDialog({ open, unansweredCount, onCancel, onConfirm }: SubmitDialogProps) {
  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="dialog surface" role="dialog" aria-modal="true" aria-labelledby="submit-title">
        <span className="material-symbols-rounded dialog-icon" aria-hidden="true">
          help
        </span>
        <h2 id="submit-title">Nộp bài kiểm tra?</h2>
        <p>
          {unansweredCount > 0
            ? `Bạn còn ${unansweredCount} câu chưa trả lời. Những câu này sẽ được tính là chưa trả lời.`
            : "Bạn đã trả lời tất cả các câu hỏi. Bạn có muốn nộp bài không?"}
        </p>
        <div className="actions">
          <button type="button" className="text-button" onClick={onCancel}>
            Hủy
          </button>
          <button type="button" className="filled-button" onClick={onConfirm}>
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}
