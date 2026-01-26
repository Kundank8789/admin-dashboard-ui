"use client";

export default function DribbbleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-24 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />

      {/* grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18]
        bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
        bg-[size:60px_60px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 py-6">
        {children}
      </div>
    </div>
  );
}
