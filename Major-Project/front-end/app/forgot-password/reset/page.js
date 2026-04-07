'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/services/authService";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please provide your email.");
      return;
    }

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    setStatus("loading");

    try {
      await resetPassword({ email, otp, newPassword });
      setMessage("Password changed successfully. Please log in with your new password.");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to reset password. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Reset Password</p>
        <h1 className="mt-4 text-4xl font-semibold">Enter OTP and new password</h1>
        <p className="mt-4 text-neutral-400">
          Check your email for the OTP and create a new password.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            maxLength={6}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
          >
            {status === "loading" ? "Resetting password..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-400">
          <Link href="/forgot-password" className="text-amber-300">
            Back to forgot password
          </Link>
        </p>
      </div>
    </main>
  );
}
