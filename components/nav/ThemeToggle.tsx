"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "ad-theme";
type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (localStorage.getItem(STORAGE_KEY) as Theme | null)) ||
      null;
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors duration-500 hover:border-gilt hover:text-gilt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
    >
      {/* Avoid hydration mismatch by rendering after mount */}
      {mounted &&
        (theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        ))}
    </button>
  );
}

// Pre-hydration script — sets the html.light class from localStorage BEFORE
// React mounts, so the first paint matches the user's stored preference and
// there's no light-to-dark flash. Inject via <Script strategy="beforeInteractive">.
export const themeBootScript = `
(function(){
  try {
    var t = localStorage.getItem('${STORAGE_KEY}');
    if (t === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;
