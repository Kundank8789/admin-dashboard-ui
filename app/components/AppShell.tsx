"use client";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_60%)]" />

      {/* Soft grid */}
      <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6">
        {children}
      </div>
    </div>
  );
}
