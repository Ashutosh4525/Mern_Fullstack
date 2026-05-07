// 'use client'

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { clearAuthError, loginUser } from "@/store/authSlice";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";

// export default function LoginPage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { status, error, user } = useAppSelector((state) => state.auth);
//   const [form, setForm] = useState({ email: "", password: "" });

//   useEffect(() => {
//     if (user) {
//       router.replace("/");
//     }
//   }, [router, user]);

//   return (
//     <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
//       <div className="mx-auto max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
//         <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Welcome Back</p>
//         <h1 className="mt-4 text-4xl font-semibold">Login to continue watching</h1>
//         <p className="mt-4 text-neutral-400">
//           You need an active session before opening detail pages, renting titles, or watching content.
//         </p>

//         <form
//           className="mt-8 space-y-4"
//           onSubmit={async (event) => {
//             event.preventDefault();
//             const result = await dispatch(loginUser(form));
//             if (loginUser.fulfilled.match(result)) {
//               router.push("/");
//             }
//           }}
//         >
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(event) => {
//               dispatch(clearAuthError());
//               setForm((prev) => ({ ...prev, email: event.target.value }));
//             }}
//             className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(event) => {
//               dispatch(clearAuthError());
//               setForm((prev) => ({ ...prev, password: event.target.value }));
//             }}
//             className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
//           />

//           {error && <p className="text-sm text-rose-300">{error}</p>}

//           <button
//             type="submit"
//             disabled={status === "loading"}
//             className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
//           >
//             {status === "loading" ? "Logging in..." : "Login"}
//           </button>
//         </form>

//       <div className="flex justify-between items-center ">
//         <p className="mt-6 text-sm text-neutral-400">
//           New here?{" "}
//           <Link href="/register" className="text-amber-300">
//             Create an account
//           </Link>
//         </p>
//         <p className="mt-6">
//           <Link href="/forgot-password" className="text-amber-300"> 
//              Forgot Password?
//           </Link>
//         </p>
//       </div>
//       </div>
//     </main>
//   );
// }
'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthError, loginUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error, user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [mounted, setMounted] = useState(false); // ✅ FIX
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);

  // ✅ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Welcome Back</p>
        <h1 className="mt-4 text-4xl font-semibold">Login to continue watching</h1>
        <p className="mt-4 text-neutral-400">
          You need an active session before opening detail pages, renting titles, or watching content.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await dispatch(loginUser(form));
            if (loginUser.fulfilled.match(result)) {
              router.push("/");
            }
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => {
              dispatch(clearAuthError());
              setForm((prev) => ({ ...prev, email: event.target.value }));
            }}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            value={form.password}
            onChange={(event) => {
              dispatch(clearAuthError());
              setForm((prev) => ({ ...prev, password: event.target.value }));
            }}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
           <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <LuEyeClosed className="h-5 w-5" /> // Crossed eye for 'Hide'
              ) : (
                <LuEye className="h-5 w-5" />    // Open eye for 'Show'
              )}
            </button>
        </div>
          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center">
          <p className="mt-6 text-sm text-neutral-400">
            New here?{" "}
            <Link href="/register" className="text-amber-300">
              Create an account
            </Link>
          </p>

          <p className="mt-6">
            <Link href="/forgot-password" className="text-amber-300">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}