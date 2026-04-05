'use client'

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { API_BASE_URL } from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function WatchEpisodePage({ params }) {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/episode/${id}`);
        if (res.ok) {
          const data = await res.json();
          setEpisode(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch episode:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEpisode();
    }
  }, [id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-black px-4 pb-10 pt-28 text-white md:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <Loading />
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black px-4 pb-10 pt-28 text-white md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <h1 className="text-3xl font-semibold">{episode?.title || "Episode Title"}</h1>
        </div>
      </main>
    </ProtectedRoute>
  );
}
