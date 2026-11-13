import type { AnswerKey } from "../types/quiz";

interface AnswerOptionProps {
  answerKey: AnswerKey;
  text: string;
  selected: boolean;
  onSelect: (answer: AnswerKey) => void;
}

export function AnswerOption({ answerKey, text, selected, onSelect }: AnswerOptionProps) {
  return (
    <button
      type="button"
      className={`answer-option${selected ? " is-selected" : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(answerKey)}
    >
      <span className="answer-key" aria-hidden="true">
        {answerKey}
      </span>
      <span className="answer-text">{text}</span>
      <span className="material-symbols-rounded answer-check" aria-hidden="true">
        {selected ? "check_circle" : "radio_button_unchecked"}
      </span>
    </button>
  );
}
