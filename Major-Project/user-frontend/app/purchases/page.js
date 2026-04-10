'use client'

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getUserRentals } from "@/services/rentalService";
import { useAppSelector } from "@/store/hooks";

export default function PurchasesPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    if (!user) return;
    getUserRentals(user._id).then((res) => setRentals(res.data ?? []));
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white md:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">My Purchases</p>
            <h1 className="mt-4 text-4xl font-semibold">Your active and past rentals</h1>
          </div>

          <div className="grid gap-4">
            {rentals.map((rental) => (
              <div
                key={rental._id}
                className="rounded-3xl border border-white/10 bg-white/4 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                      {rental.contentId?.type}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{rental.contentId?.title}</h2>
                    <p className="mt-2 text-sm text-neutral-400">
                      Expires: {new Date(rental.expiresAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-200">
                    {new Date(rental.expiresAt) > new Date() ? "Active" : "Expired"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
