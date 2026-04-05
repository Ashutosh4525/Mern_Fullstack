'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearAuthError, registerUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { registerStatus, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    avatar: null
  });

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Create Account</p>
        <h1 className="mt-4 text-4xl font-semibold">Join the platform</h1>
        <p className="mt-4 text-neutral-400">
          Registration is connected directly to your backend user controller and starts your OTT user journey.
        </p>

        <form
          className="mt-8 grid gap-4 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await dispatch(registerUser(form));
            if (registerUser.fulfilled.match(result)) {
              router.push("/login");
            }
          }}
        >
          <input
            type="text"
            placeholder="First name"
            value={form.firstname}
            onChange={(event) => {
              dispatch(clearAuthError());
              setForm((prev) => ({ ...prev, firstname: event.target.value }));
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            value={form.lastname}
            onChange={(event) => {
              dispatch(clearAuthError());
              setForm((prev) => ({ ...prev, lastname: event.target.value }));
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => {
              dispatch(clearAuthError());
              setForm((prev) => ({ ...prev, email: event.target.value }));
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none md:col-span-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => {
              dispatch(clearAuthError());
              setForm((prev) => ({ ...prev, password: event.target.value }));
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none md:col-span-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setForm((prev) => ({ ...prev, avatar: event.target.files?.[0] || null }))
            }
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none md:col-span-2"
          />

          {error && <p className="text-sm text-rose-300 md:col-span-2">{error}</p>}

          <button
            type="submit"
            disabled={registerStatus === "loading"}
            className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60 md:col-span-2"
          >
            {registerStatus === "loading" ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-300">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
