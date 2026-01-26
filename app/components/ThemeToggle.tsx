"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl border bg-white/60 backdrop-blur-md hover:bg-white/80 transition
      dark:bg-zinc-950/50 dark:border-zinc-800 dark:hover:bg-zinc-900/60"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
