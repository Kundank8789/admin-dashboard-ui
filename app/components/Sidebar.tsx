"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  ChevronLeft,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Roles", href: "/roles", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      layout
      className={`hidden md:flex sticky top-6 h-[calc(100vh-48px)]
        ${collapsed ? "w-20" : "w-72"}
        flex-col rounded-3xl border border-white/60 bg-white/55 backdrop-blur-xl
        shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)]
        dark:border-zinc-800/70 dark:bg-zinc-950/40 transition-all`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5">
        {!collapsed && (
          <div>
            <div className="text-lg font-bold tracking-tight">
              Admin<span className="text-indigo-500">Pro</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">Premium UI</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-10 w-10 rounded-2xl border border-white/60 bg-white/40 hover:bg-white/70 transition dark:border-zinc-800/70 dark:bg-zinc-950/30 dark:hover:bg-zinc-900/50 flex items-center justify-center"
        >
          <ChevronLeft
            size={18}
            className={`${collapsed ? "rotate-180" : ""} transition`}
          />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 px-3 space-y-2">
        {links.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition
              ${
                active
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-indigo-500" />
              )}

              <item.icon size={18} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <div className="rounded-2xl border border-white/60 bg-white/40 px-4 py-3 text-xs text-zinc-500 dark:border-zinc-800/70 dark:bg-zinc-950/20">
          {!collapsed ? "Build with Next.js + shadcn" : "⚡"}
        </div>
      </div>
    </motion.aside>
  );
}
