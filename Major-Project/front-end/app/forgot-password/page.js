'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Provide a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await forgotPassword({ email });
      setMessage(response.message || "Reset OTP sent. Redirecting to reset page...");
      router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to send password reset. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Forgot Password</p>
        <h1 className="mt-4 text-4xl font-semibold">Reset your password</h1>
        <p className="mt-4 text-neutral-400">
          Enter your registered email and we&apos;ll send you a password reset code.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
          >
            {status === "loading" ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-400">
          Remembered your password?{" "}
          <Link href="/login" className="text-amber-300">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
