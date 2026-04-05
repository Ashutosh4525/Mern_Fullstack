'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AuthActions() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-black"
        >
          Sign up
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/purchases"
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
      >
        Purchases
      </Link>
      {user.role === "admin" && (
        <Link
          href="/admin"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
        >
          Admin
        </Link>
      )}
      <span className="hidden text-sm text-neutral-300 xl:block">
        {user.firstname} {user.lastname}
      </span>
      <button
        type="button"
        onClick={async () => {
          await dispatch(logoutUser());
          router.push("/");
        }}
        className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-black"
      >
        Logout
      </button>
    </>
  );
}
