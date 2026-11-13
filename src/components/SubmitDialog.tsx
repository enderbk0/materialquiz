interface SubmitDialogProps {
  unansweredCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function SubmitDialog({ unansweredCount, onCancel, onConfirm }: SubmitDialogProps) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="submit-dialog-title"
        aria-describedby="submit-dialog-description"
      >
        <h2 id="submit-dialog-title">Nộp bài kiểm tra?</h2>
        <p id="submit-dialog-description">
          Bạn còn {unansweredCount} câu chưa trả lời. Các câu chưa trả lời sẽ được tính là sai.
        </p>

        <div className="actions">
          <button type="button" className="button button-text" onClick={onCancel} autoFocus>
            Tiếp tục làm bài
          </button>
          <button type="button" className="button button-filled" onClick={onConfirm}>
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}
