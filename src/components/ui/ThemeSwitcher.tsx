"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "wd-theme";
const OPTIONS: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Light theme" },
  { value: "dark", label: "Dark theme" },
  { value: "system", label: "Device default" },
];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function resolvedTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolvedTheme(preference);
  const root = document.documentElement;
  root.dataset.theme = preference;
  root.dataset.colorScheme = resolved;
  root.style.colorScheme = resolved;
}

function ThemeIcon({ type }: { type: ThemePreference | "trigger" }) {
  if (type === "light") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>;
  }
  if (type === "dark") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.5A8.5 8.5 0 0 1 8.5 3.6 8.5 8.5 0 1 0 20.4 15.5Z"/></svg>;
  }
  if (type === "system") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><path d="M12 5a7 7 0 0 1 0 14Z"/></svg>;
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial = isThemePreference(stored) ? stored : "system";
    setTheme(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      const current = document.documentElement.dataset.theme;
      if (current === "system" || !isThemePreference(current ?? null)) applyTheme("system");
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = isThemePreference(event.newValue) ? event.newValue : "system";
      setTheme(next);
      applyTheme(next);
    };

    media.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectTheme = (preference: ThemePreference) => {
    setTheme(preference);
    applyTheme(preference);
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {}
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return <div ref={rootRef} className={styles.root}>
    <button
      ref={triggerRef}
      type="button"
      className={styles.trigger}
      aria-label="Choose colour theme"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      title="Theme"
      onClick={() => setOpen(value => !value)}
    >
      <span className={styles.triggerIcon}><ThemeIcon type="trigger"/></span>
      <span className={styles.srOnly}>Theme</span>
    </button>

    <div id={menuId} role="menu" aria-label="Colour theme" className={styles.panel} hidden={!open}>
      {OPTIONS.map(option => <button
        key={option.value}
        type="button"
        role="menuitemradio"
        aria-checked={theme === option.value}
        className={styles.option}
        onClick={() => selectTheme(option.value)}
      >
        <span className={styles.optionIcon}><ThemeIcon type={option.value}/></span>
        <span>{option.label}</span>
        <span className={styles.check} aria-hidden="true">{theme === option.value ? "✓" : ""}</span>
      </button>)}
    </div>
  </div>;
}
