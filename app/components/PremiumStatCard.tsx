"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import CountUp from "@/app/components/CountUp";

type PremiumStatCardProps = {
  title: string;
  value: number;          // numeric (for animation)
  displayValue?: string;  // formatted text (optional)
  change: string;
  icon: LucideIcon;
};

export default function PremiumStatCard({
  title,
  value,
  displayValue,
  change,
  icon: Icon,
}: PremiumStatCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_60px_-20px_rgba(0,0,0,0.30)] transition dark:border-zinc-800/70 dark:bg-zinc-950/40">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">{title}</p>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {displayValue ? displayValue : <CountUp value={value} />}
              </h3>

              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                {change}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <Icon size={20} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
