import type { ThemePreference } from "../types/quiz";

interface ThemeControlProps {
  preference: ThemePreference;
  onChange: (theme: ThemePreference) => void;
}

const OPTIONS: Array<{ value: ThemePreference; label: string; icon: string }> = [
  { value: "system", label: "Hệ thống", icon: "brightness_auto" },
  { value: "light", label: "Sáng", icon: "light_mode" },
  { value: "dark", label: "Tối", icon: "dark_mode" }
];

export function ThemeControl({ preference, onChange }: ThemeControlProps) {
  return (
    <div className="theme-control" role="group" aria-label="Chọn giao diện">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`theme-button${preference === option.value ? " is-selected" : ""}`}
          aria-pressed={preference === option.value}
          onClick={() => onChange(option.value)}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            {option.icon}
          </span>
          {option.label}
        </button>
      ))}
    </div>
  );
}
