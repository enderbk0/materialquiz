import { AnswerKey } from '../types/quiz';

interface AnswerOptionProps {
  answerKey: AnswerKey;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function AnswerOption({ answerKey, label, selected, onSelect }: AnswerOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`answer-option ${selected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <span className="answer-key" aria-hidden="true">{answerKey}</span>
      <span className="answer-label">{label}</span>
      {selected && (
        <span className="material-symbols-rounded answer-check" aria-hidden="true">check_circle</span>
      )}
    </button>
  );
}
