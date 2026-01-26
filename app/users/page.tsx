"use client";

import DribbbleShell from "@/app/components/DribbbleShell";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import UsersTablePaginated from "@/app/components/UsersTablePaginated";

export default function UsersPage() {
  return (
    <DribbbleShell>
      <div className="flex gap-6">
        <Sidebar />

        <main className="flex-1 space-y-6">
          <Topbar title="Users" />

          <div>
            <UsersTablePaginated />
          </div>
        </main>
      </div>
    </DribbbleShell>
  );
}
