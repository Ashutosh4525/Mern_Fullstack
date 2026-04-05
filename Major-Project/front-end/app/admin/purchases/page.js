'use client'

import { useEffect, useState } from "react";
import { API } from "@/services/api";

export default function AdminPurchasesPage() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    API.get("/rental/all").then((res) => setRentals(res.data?.data ?? []));
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Purchases</p>
        <h1 className="text-3xl font-semibold">User rentals and purchases</h1>
        <p className="max-w-3xl text-neutral-300">
          This panel shows who purchased what, when it was rented, and whether the access is still active.
        </p>
      </div>

      <div className="grid gap-4">
        {rentals.map((rental) => (
          <div
            key={rental._id}
            className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5"
          >
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">User</p>
                <p className="mt-2 font-semibold">
                  {rental.userId?.firstname} {rental.userId?.lastname}
                </p>
                <p className="text-sm text-neutral-400">{rental.userId?.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Title</p>
                <p className="mt-2 font-semibold">{rental.contentId?.title}</p>
                <p className="text-sm text-neutral-400">{rental.contentId?.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Purchased</p>
                <p className="mt-2 font-semibold">{new Date(rental.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Expires</p>
                <p className="mt-2 font-semibold">{new Date(rental.expiresAt).toLocaleString()}</p>
                <p className="text-sm text-neutral-400">
                  {new Date(rental.expiresAt) > new Date() ? "Active" : "Expired"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
