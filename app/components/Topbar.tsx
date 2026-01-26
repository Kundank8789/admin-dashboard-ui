"use client";

import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Topbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border bg-white/60 backdrop-blur-xl px-4 py-3 dark:bg-zinc-950/50 dark:border-zinc-800">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search..."
          className="w-52 rounded-xl dark:bg-zinc-950 dark:border-zinc-800"
        />

        <ThemeToggle />

        <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
          <Bell size={18} />
        </button>
      </div>
    </div>
  );
}
