"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition dark:bg-zinc-950/60 dark:border-zinc-800">
        <CardContent className="p-5">
          <p className="text-sm text-zinc-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold">{value}</h2>
        </CardContent>
      </Card>
    </motion.div>
  );
}
