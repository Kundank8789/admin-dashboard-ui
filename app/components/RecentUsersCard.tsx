"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentUsers = [
  { name: "Kundan Kumar", email: "kundan@gmail.com", status: "Active" },
  { name: "Aman Singh", email: "aman@gmail.com", status: "Pending" },
  { name: "Neha Verma", email: "neha@gmail.com", status: "Active" },
  { name: "Ravi Sharma", email: "ravi@gmail.com", status: "Blocked" },
];

export default function RecentUsersCard() {
  return (
    <Card className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)] dark:border-zinc-800/70 dark:bg-zinc-950/40">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Recent Users
            </h2>
            <p className="text-sm text-zinc-500">New registrations</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {recentUsers.map((u) => (
            <div
              key={u.email}
              className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/40 px-4 py-3 dark:border-zinc-800/70 dark:bg-zinc-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center font-semibold text-indigo-600 dark:text-indigo-300">
                  {u.name.charAt(0)}
                </div>

                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-zinc-500">{u.email}</p>
                </div>
              </div>

              <Badge
                variant={
                  u.status === "Active"
                    ? "default"
                    : u.status === "Blocked"
                    ? "destructive"
                    : "secondary"
                }
              >
                {u.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
