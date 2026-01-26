"use client";

import PageTransition from "@/app/components/PageTransition";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import DribbbleShell from "@/app/components/DribbbleShell";

import PremiumStatCard from "@/app/components/PremiumStatCard";
import PremiumChartCard from "@/app/components/PremiumChartCard";
import RecentUsersCard from "@/app/components/RecentUsersCard";
import TransactionsCard from "@/app/components/TransactionsCard";

import { Users, DollarSign, ShieldCheck, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageTransition>
      <DribbbleShell>
        <div className="flex gap-6">
          <Sidebar />

          <main className="flex-1 space-y-6">
            <Topbar title="Dashboard" />

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <PremiumStatCard
                title="Total Users"
                value={42920}
                change="+12% this week"
                icon={Users}
              />
              <PremiumStatCard
                title="Revenue"
                value={42920}
                change="+8% this week"
                icon={DollarSign}
              />
              <PremiumStatCard
                title="Admins"
                value="24"
                change="+2 new admins"
                icon={ShieldCheck}
              />
              <PremiumStatCard
                title="Growth"
                value="+18.2%"
                change="stable performance"
                icon={TrendingUp}
              />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <PremiumChartCard />
              </div>

              <RecentUsersCard />
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <TransactionsCard />

              <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(0,0,0,0.25)] dark:border-zinc-800/70 dark:bg-zinc-950/40 p-6">
                <h2 className="text-lg font-semibold tracking-tight">
                  Admin Notes
                </h2>
                <p className="text-sm text-zinc-500 mt-2">
                  Add announcements, reminders, and system alerts here.
                </p>
              </div>
            </div>
          </main>
        </div>
      </DribbbleShell>
    </PageTransition>
  );
}
