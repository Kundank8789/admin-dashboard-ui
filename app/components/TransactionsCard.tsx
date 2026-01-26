"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { id: "#TX1021", user: "User 14", amount: "$120", status: "Success" },
  { id: "#TX1022", user: "User 9", amount: "$89", status: "Pending" },
  { id: "#TX1023", user: "User 2", amount: "$240", status: "Success" },
  { id: "#TX1024", user: "User 31", amount: "$45", status: "Failed" },
];

export default function TransactionsCard() {
  return (
    <Card className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)] dark:border-zinc-800/70 dark:bg-zinc-950/40">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Recent Transactions
            </h2>
            <p className="text-sm text-zinc-500">Payments activity</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/40 px-4 py-3 dark:border-zinc-800/70 dark:bg-zinc-950/20"
            >
              <div>
                <p className="font-medium">{t.id}</p>
                <p className="text-xs text-zinc-500">{t.user}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{t.amount}</p>
                <Badge
                  variant={
                    t.status === "Success"
                      ? "default"
                      : t.status === "Failed"
                      ? "destructive"
                      : "secondary"
                  }
                  className="mt-1"
                >
                  {t.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
