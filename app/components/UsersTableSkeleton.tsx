"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function UsersTableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex justify-between gap-3">
        <Skeleton className="h-6 w-40 rounded-xl" />
        <Skeleton className="h-10 w-72 rounded-xl" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
