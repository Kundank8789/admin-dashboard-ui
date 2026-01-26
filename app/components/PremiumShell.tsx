"use client";

export default function PremiumShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_60%)]" />

      {/* grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 dark:opacity-20" />

      <div className="relative">{children}</div>
    </div>
  );
}
