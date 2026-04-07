'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import Loading from "@/app/loading";

export default function ViewPurchasePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState(null);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const response = await API.get(`/rental/${params.id}`);
      setRental(response.data.data);
    } catch (error) {
      console.error('Error loading rental:', error);
      router.push('/admin/purchases');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Purchase Details</p>
          <h1 className="text-3xl font-semibold">Purchase Not Found</h1>
        </div>
        <button
          onClick={() => router.push('/admin/purchases')}
          className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black"
        >
          Back to Purchases
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Purchase Details</p>
        <h1 className="text-3xl font-semibold">Rental Information</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-400">Name</p>
              <p className="text-white">{rental.userId?.firstname} {rental.userId?.lastname}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Email</p>
              <p className="text-white">{rental.userId?.email}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">User ID</p>
              <p className="text-white font-mono text-sm">{rental.userId?._id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <h2 className="text-xl font-semibold mb-4">Content Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-400">Title</p>
              <p className="text-white">{rental.contentId?.title}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Type</p>
              <p className="text-white capitalize">{rental.contentId?.type}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Content ID</p>
              <p className="text-white font-mono text-sm">{rental.contentId?._id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <h2 className="text-xl font-semibold mb-4">Rental Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-400">Rental ID</p>
              <p className="text-white font-mono text-sm">{rental._id}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Purchased On</p>
              <p className="text-white">{new Date(rental.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Expires On</p>
              <p className="text-white">{new Date(rental.expiresAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Status</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                new Date(rental.expiresAt) > new Date()
                  ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                  : 'border border-red-400/20 bg-red-400/10 text-red-100'
              }`}>
                {new Date(rental.expiresAt) > new Date() ? 'Active' : 'Expired'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/admin/purchases')}
        className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black"
      >
        Back to Purchases
      </button>
    </div>
  );
}