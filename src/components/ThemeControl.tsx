import { ThemePreference } from '../hooks/useTheme';

interface ThemeControlProps {
  theme: ThemePreference;
  onChange: (theme: ThemePreference) => void;
}

const OPTIONS: Array<{ value: ThemePreference; label: string; icon: string }> = [
  { value: 'system', label: 'Theo hệ thống', icon: 'brightness_auto' },
  { value: 'light', label: 'Sáng', icon: 'light_mode' },
  { value: 'dark', label: 'Tối', icon: 'dark_mode' },
];

export default function ThemeControl({ theme, onChange }: ThemeControlProps) {
  return (
    <div className="theme-control" role="group" aria-label="Chọn giao diện">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`theme-button ${theme === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={theme === option.value}
          title={option.label}
        >
          <span className="material-symbols-rounded" aria-hidden="true">{option.icon}</span>
          <span className="sr-only">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
