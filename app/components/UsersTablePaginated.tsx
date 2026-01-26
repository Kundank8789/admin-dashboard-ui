"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";


import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import UsersTableSkeleton from "@/app/components/UsersTableSkeleton";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
    id: number;
    name: string;
    email: string;
    status: "Active" | "Pending" | "Blocked";
    role: "Admin" | "User";
};

type ApiResponse = {
    data: User[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export default function UsersTablePaginated() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"All" | User["status"]>("All");
    const [role, setRole] = useState<"All" | User["role"]>("All");

    const [loading, setLoading] = useState(false);

    // edit modal state
    const [editUser, setEditUser] = useState<User | null>(null);
    const [editStatus, setEditStatus] = useState<User["status"]>("Active");
    const [editRole, setEditRole] = useState<User["role"]>("User");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/users?page=${page}&limit=${limit}&search=${encodeURIComponent(
                    search
                )}&status=${status}&role=${role}`
            );

            const json: ApiResponse = await res.json();
            setUsers(json.data);
            setTotalPages(json.meta.totalPages);
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUser = async () => {
        if (!editUser) return;

        await fetch("/api/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: editUser.id,
                status: editStatus,
                role: editRole,
            }),
        });
        toast.success("User updated successfully ✅");
        setEditUser(null);
        fetchUsers();
    };

    const handleDeleteUser = async (id: number) => {
        await fetch(`/api/users?id=${id}`, { method: "DELETE" });
        toast.success("User deleted successfully 🗑️");
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            fetchUsers();
        }, 350);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, status, role]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition dark:bg-zinc-950/60 dark:border-zinc-800">
                <CardContent className="p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">All Users</h2>
                            <p className="text-sm text-zinc-500">
                                Search, Filter, Edit, Delete + View
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search name/email..."
                                className="w-full md:w-64 rounded-xl dark:bg-zinc-950 dark:border-zinc-800"
                            />

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="rounded-xl border px-3 py-2 text-sm bg-white dark:bg-zinc-950 dark:border-zinc-800"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Blocked">Blocked</option>
                            </select>

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value as any)}
                                className="rounded-xl border px-3 py-2 text-sm bg-white dark:bg-zinc-950 dark:border-zinc-800"
                            >
                                <option value="All">All Roles</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl border dark:border-zinc-800">
                        {loading ? (
                            <UsersTableSkeleton />
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {users.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                No users found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((u) => (
                                            <TableRow key={u.id}>
                                                <TableCell className="font-medium">{u.id}</TableCell>
                                                <TableCell>{u.name}</TableCell>
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

                                                <TableCell>
                                                    <Badge variant="outline">{u.role}</Badge>
                                                </TableCell>

                                                <TableCell className="text-right flex justify-end gap-2">
                                                    {/* View */}
                                                    <Link href={`/users/${u.id}`}>
                                                        <Button size="sm" className="rounded-xl">
                                                            View
                                                        </Button>
                                                    </Link>

                                                    {/* Edit */}
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="rounded-xl"
                                                                onClick={() => {
                                                                    setEditUser(u);
                                                                    setEditStatus(u.status);
                                                                    setEditRole(u.role);
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </DialogTrigger>

                                                        <DialogContent className="rounded-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit User</DialogTitle>
                                                            </DialogHeader>

                                                            <div className="space-y-4">
                                                                <div>
                                                                    <p className="text-sm font-medium">Status</p>
                                                                    <Select
                                                                        value={editStatus}
                                                                        onValueChange={(v) =>
                                                                            setEditStatus(v as User["status"])
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="rounded-xl">
                                                                            <SelectValue placeholder="Select status" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Active">Active</SelectItem>
                                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                                            <SelectItem value="Blocked">Blocked</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div>
                                                                    <p className="text-sm font-medium">Role</p>
                                                                    <Select
                                                                        value={editRole}
                                                                        onValueChange={(v) =>
                                                                            setEditRole(v as User["role"])
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="rounded-xl">
                                                                            <SelectValue placeholder="Select role" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Admin">Admin</SelectItem>
                                                                            <SelectItem value="User">User</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <Button
                                                                    className="w-full rounded-xl"
                                                                    onClick={handleUpdateUser}
                                                                >
                                                                    Save Changes
                                                                </Button>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {/* Delete */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                className="rounded-xl"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </AlertDialogTrigger>

                                                        <AlertDialogContent className="rounded-2xl">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Delete this user?
                                                                </AlertDialogTitle>
                                                            </AlertDialogHeader>

                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="rounded-xl">
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="rounded-xl"
                                                                    onClick={() => handleDeleteUser(u.id)}
                                                                >
                                                                    Yes Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-zinc-500">
                            Page <span className="font-semibold">{page}</span> of{" "}
                            <span className="font-semibold">{totalPages}</span>
                        </p>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                disabled={page === 1 || loading}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                Prev
                            </Button>

                            <Button
                                className="rounded-xl"
                                disabled={page === totalPages || loading}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
