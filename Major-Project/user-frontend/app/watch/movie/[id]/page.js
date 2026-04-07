'use client'

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { API_BASE_URL } from "@/services/api";
import { getContentById, getContentCast } from "@/services/contentService";
import { useParams } from "next/navigation";

export default function WatchMoviePage({ params }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getContentById(id).then((res) => setMovie(res.data));
    getContentCast(id).then((res) => setCast(res.data || []));
  }, [id]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black px-4 pb-10 pt-28 text-white md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <h1 className="text-3xl font-semibold">{movie?.title || "Now Playing"}</h1>
          <video
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full rounded-4xl border border-white/10 bg-black"
            src={`${API_BASE_URL}/movie/watch/${id}/stream`}
          />
          <div className="rounded-4xl border border-white/10 bg-white/4 p-6">
            <h2 className="text-xl font-semibold">Cast</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cast.map((entry) => (
                <div key={entry._id} className="rounded-[1.25rem] border border-white/10 bg-white/3 p-4">
                  <p className="font-semibold">{entry.castID?.name}</p>
                  <p className="text-sm text-neutral-400">{entry.role || "Cast member"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
