'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearAuthError, registerUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LuEye, LuEyeClosed } from "react-icons/lu";

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
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!form.firstname.trim() || !form.lastname.trim() || !form.email.trim() || !form.password) {
      return "Please fill in all required fields.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (form.avatar && !["image/jpeg", "image/png", "image/webp"].includes(form.avatar.type)) {
      return "Avatar must be a JPEG, PNG, or WEBP image.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");
    dispatch(clearAuthError());

    const validationMessage = validateForm();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-lg rounded-4xl border border-white/10 bg-white/4 p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Create Account</p>
        <h1 className="mt-4 text-4xl font-semibold">Join the platform</h1>
        <p className="mt-4 text-neutral-400">
          Registration is connected directly to your backend user controller and starts your OTT user journey.
        </p>

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            value={form.firstname}
            onChange={(event) => {
              dispatch(clearAuthError());
              setValidationError("");
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
              setValidationError("");
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
              setValidationError("");
              setForm((prev) => ({ ...prev, email: event.target.value }));
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none md:col-span-2"
          />
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            value={form.password}
            onChange={(event) => {
              dispatch(clearAuthError());
              setValidationError("");
              setForm((prev) => ({ ...prev, password: event.target.value }));
            }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none md:col-span-2"
          />
           <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <LuEye className="h-5 w-5" /> 
              ) : (
                <LuEyeClosed className="h-5 w-5" />    
              )}
            </button>
          </div>
          <p>Upload your Profile Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setValidationError("");
              setForm((prev) => ({ ...prev, avatar: event.target.files?.[0] || null }));
            }}
            className="rounded-2xl border border-white/10 bg-white/30 px-4 py-3 outline-none md:col-span-2"
          />

          {validationError && <p className="text-sm text-rose-300 md:col-span-2">{validationError}</p>}
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
