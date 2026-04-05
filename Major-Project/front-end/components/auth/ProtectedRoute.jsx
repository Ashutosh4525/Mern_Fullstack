'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoute({
  children,
  adminOnly = false,
  redirectTo = "/login"
}) {
  const router = useRouter();
  const { user, hydrated, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!hydrated || status === "loading") return;

    if (!user) {
      router.replace(redirectTo);
      return;
    }

    if (adminOnly && user.role !== "admin") {
      router.replace("/");
    }
  }, [adminOnly, hydrated, redirectTo, router, status, user]);

  if (!hydrated || status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-neutral-300">
        Checking your session...
      </div>
    );
  }

  if (!user) return null;
  if (adminOnly && user.role !== "admin") return null;

  return children;
}
