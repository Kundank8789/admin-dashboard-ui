"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const users = [
  { name: "Kundan Kumar", email: "kundan@gmail.com", status: "Active" },
  { name: "Aman Singh", email: "aman@gmail.com", status: "Blocked" },
  { name: "Ravi Sharma", email: "ravi@gmail.com", status: "Active" },
  { name: "Neha Verma", email: "neha@gmail.com", status: "Pending" },
];

export default function UsersTable() {
  return (
    <Card className="rounded-2xl shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold">Recent Users</h2>

        <div className="mt-4 overflow-hidden rounded-xl border dark:border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-zinc-500">{u.email}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
