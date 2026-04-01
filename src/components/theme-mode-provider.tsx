"use client";

import * as React from "react";

type ThemeMode = "auto" | "light" | "dark";
type EffectiveThemeMode = "light" | "dark";

type ThemeModeContextValue = {
  mode: ThemeMode;
  effectiveMode: EffectiveThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const STORAGE_KEY = "theme-mode";

const ThemeModeContext = React.createContext<ThemeModeContextValue | null>(
  null,
);

function getSystemMode(): EffectiveThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveEffectiveMode(mode: ThemeMode): EffectiveThemeMode {
  if (mode === "auto") {
    return getSystemMode();
  }

  return mode;
}

function applyThemeClass(effectiveMode: EffectiveThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", effectiveMode === "dark");
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<ThemeMode>("auto");
  const [effectiveMode, setEffectiveMode] =
    React.useState<EffectiveThemeMode>("dark");

  const setMode = React.useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
  }, []);

  React.useEffect(() => {
    const savedMode = window.localStorage.getItem(STORAGE_KEY);

    if (savedMode === "auto" || savedMode === "light" || savedMode === "dark") {
      setModeState(savedMode);
      return;
    }

    setModeState("auto");
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateEffectiveMode = () => {
      const nextEffectiveMode = resolveEffectiveMode(mode);
      setEffectiveMode(nextEffectiveMode);
      applyThemeClass(nextEffectiveMode);
    };

    updateEffectiveMode();

    mediaQuery.addEventListener("change", updateEffectiveMode);
    return () => {
      mediaQuery.removeEventListener("change", updateEffectiveMode);
    };
  }, [mode]);

  const contextValue = React.useMemo(
    () => ({
      mode,
      effectiveMode,
      setMode,
    }),
    [effectiveMode, mode, setMode],
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = React.useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }

  return context;
}
