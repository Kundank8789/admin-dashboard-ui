import { NextResponse } from "next/server";

type User = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Blocked";
  role: "Admin" | "User";
};

let allUsers: User[] = Array.from({ length: 57 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  status: i % 3 === 0 ? "Blocked" : i % 2 === 0 ? "Pending" : "Active",
  role: i % 4 === 0 ? "Admin" : "User",
}));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = (searchParams.get("search") || "").toLowerCase();
  const status = searchParams.get("status") || "All";
  const role = searchParams.get("role") || "All";
  const id = searchParams.get("id");

  // Single user fetch
  if (id) {
    const user = allUsers.find((u) => u.id === Number(id));
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  }

  let filtered = allUsers;

  if (search) {
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
    );
  }

  if (status !== "All") filtered = filtered.filter((u) => u.status === status);
  if (role !== "All") filtered = filtered.filter((u) => u.role === role);

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({
    data,
    meta: { total, page, limit, totalPages },
  });
}

// ✅ Update user (status/role)
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, status, role } = body as {
    id: number;
    status?: User["status"];
    role?: User["role"];
  };

  const userIndex = allUsers.findIndex((u) => u.id === Number(id));
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  allUsers[userIndex] = {
    ...allUsers[userIndex],
    status: status ?? allUsers[userIndex].status,
    role: role ?? allUsers[userIndex].role,
  };

  return NextResponse.json({ user: allUsers[userIndex] });
}

// ✅ Delete user
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "User id is required" }, { status: 400 });
  }

  const before = allUsers.length;
  allUsers = allUsers.filter((u) => u.id !== Number(id));

  if (allUsers.length === before) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
