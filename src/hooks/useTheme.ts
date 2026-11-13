import { useCallback, useEffect, useState } from "react";
import type { ThemePreference } from "../types/quiz";

const STORAGE_KEY = "materialquiz.theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readSavedTheme(): ThemePreference {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readSavedTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemTheme(getSystemTheme());
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const resolved = preference === "system" ? systemTheme : preference;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  }, [preference, systemTheme]);

  const changeTheme = useCallback((next: ThemePreference) => {
    setPreference(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return { preference, changeTheme };
}
