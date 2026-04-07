'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoute({
  children,
  adminOnly = false,
  redirectTo = "/login"
}) {
  const router = useRouter();
  const { user, hydrated, status } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  // Show children on mount to avoid hydration mismatch, then check auth on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hydrated) return;

    if (!user) {
      router.replace(redirectTo);
      return;
    }

    if (adminOnly && user.role !== "admin") {
      router.replace("/");
    }
  }, [adminOnly, mounted, hydrated, redirectTo, router, user]);

  // On mount, show children to avoid hydration mismatch
  if (!mounted) {
    return children;
  }

  // After mount, check if user is set or loading
  if (status === "loading" || !hydrated) {
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
