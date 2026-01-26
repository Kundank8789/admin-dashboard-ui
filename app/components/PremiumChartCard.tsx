"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", value: 18 },
  { name: "Tue", value: 28 },
  { name: "Wed", value: 22 },
  { name: "Thu", value: 38 },
  { name: "Fri", value: 45 },
  { name: "Sat", value: 41 },
  { name: "Sun", value: 55 },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl px-3 py-2 text-sm shadow-md dark:border-zinc-800/70 dark:bg-zinc-950/60">
      <p className="font-medium">Value: {payload[0].value}</p>
    </div>
  );
}

export default function PremiumChartCard() {
  return (
    <Card className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)] dark:border-zinc-800/70 dark:bg-zinc-950/40">
      <CardContent className="p-5 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Performance Overview
            </h2>
            <p className="text-sm text-zinc-500">Weekly growth analytics</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-zinc-500">This week</p>
            <p className="text-lg font-semibold">+18.2%</p>
          </div>
        </div>

        {/* ✅ FIXED */}
        <div className="mt-5 w-full min-w-0">
          <ResponsiveContainer width="100%" aspect={2.2}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopOpacity={0.35} />
                  <stop offset="95%" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                strokeWidth={2.5}
                fill="url(#fillGradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
