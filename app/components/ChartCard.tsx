"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 180 },
  { name: "Wed", value: 150 },
  { name: "Thu", value: 250 },
  { name: "Fri", value: 320 },
  { name: "Sat", value: 280 },
  { name: "Sun", value: 350 },
];

export default function ChartCard() {
  return (
    <Card className="rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition dark:bg-zinc-950/60 dark:border-zinc-800">
      <CardContent className="p-5 min-w-0">
        <h2 className="text-lg font-semibold">Weekly Activity</h2>

        {/* IMPORTANT: min-w-0 + fixed height */}
        <div className="mt-4 h-64 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Line type="monotone" dataKey="value" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
