'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { sendOtpForPasswordChange, verifyOtpChangePassword } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [step, setStep] = useState("send-otp"); // "send-otp" or "verify-otp"
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    try {
      const result = await dispatch(sendOtpForPasswordChange()).unwrap();
      if (result.remainingTime) {
        setTimer(result.remainingTime);
        setCanResend(false);
      }
      setStep("verify-otp");
    } catch (err) {
      // Error is handled by redux
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!otp.trim() || !newPassword.trim()) {
      return;
    }

    try {
      await dispatch(verifyOtpChangePassword({ otp, newPassword })).unwrap();
      router.push("/"); // Redirect to home or profile page
    } catch (err) {
      // Error is handled by redux
    }
  };

  const handleResendOtp = () => {
    if (canResend) {
      handleSendOtp();
    }
  };

  if (step === "send-otp") {
    return (
      <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
        <div className="mx-auto max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Change Password</p>
          <h1 className="mt-4 text-4xl font-semibold">Change your password</h1>
          <p className="mt-4 text-neutral-400">
            We&apos;ll send an OTP to your registered email to verify your identity.
          </p>

          {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

          <div className="mt-8">
            <button
              onClick={handleSendOtp}
              disabled={status === "loading"}
              className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
            >
              {status === "loading" ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          <p className="mt-6 text-sm text-neutral-400">
            <Link href="/" className="text-amber-300">
              Back to home
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Change Password</p>
        <h1 className="mt-4 text-4xl font-semibold">Enter OTP & New Password</h1>
        <p className="mt-4 text-neutral-400">
          Check your email for the OTP and enter your new password.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            maxLength={6}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
          >
            {status === "loading" ? "Changing Password..." : "Change Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendOtp}
            disabled={!canResend || status === "loading"}
            className="text-sm text-amber-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
          </button>
        </div>

        <p className="mt-6 text-sm text-neutral-400">
          <Link href="/" className="text-amber-300">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
