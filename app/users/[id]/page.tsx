"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DribbbleShell from "@/app/components/DribbbleShell";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type User = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Blocked";
  role: "Admin" | "User";
};

export default function UserDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?id=${id}`);
      const json = await res.json();
      setUser(json.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <DribbbleShell>
      <div className="flex gap-6">
        <Sidebar />

        <main className="flex-1 space-y-6">
          <Topbar title="User Details" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition dark:bg-zinc-950/60 dark:border-zinc-800">
              <CardContent className="p-6">
                {loading ? (
                  <p className="text-zinc-500">Loading user...</p>
                ) : !user ? (
                  <p className="text-red-500">User not found</p>
                ) : (
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold">{user.name}</h2>

                    <p className="text-sm text-zinc-500">{user.email}</p>

                    <div className="flex gap-2">
                      <Badge
                        variant={
                          user.status === "Active"
                            ? "default"
                            : user.status === "Blocked"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>

                      <Badge variant="outline">{user.role}</Badge>
                    </div>

                    <div className="pt-4 text-sm text-zinc-500">
                      User ID: <span className="font-semibold">{user.id}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </DribbbleShell>
  );
}
