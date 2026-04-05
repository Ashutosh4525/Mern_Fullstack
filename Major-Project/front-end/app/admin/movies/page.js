'use client'

import { useEffect, useState } from "react";
import { getAllContent } from "@/services/contentService";
import { API } from "@/services/api";

export default function AdminMoviesPage() {
  const [items, setItems] = useState([]);
  const [uploadedMovies, setUploadedMovies] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [contentRes, movieRes] = await Promise.all([
      getAllContent({ type: "movie", limit: 50 }),
      API.get("/movie/all")
    ]);
    setItems(contentRes.data ?? []);
    setUploadedMovies(movieRes.data?.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const [contentRes, movieRes] = await Promise.all([
        getAllContent({ type: "movie", limit: 50 }),
        API.get("/movie/all")
      ]);

      if (!active) return;
      setItems(contentRes.data ?? []);
      setUploadedMovies(movieRes.data?.data ?? []);
      setLoading(false);
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Movies</p>
        <h1 className="text-3xl font-semibold">Attach movie video files</h1>
        <p className="max-w-3xl text-neutral-300">
          Movie metadata is created under Content. This page attaches the actual movie video and runtime for each movie content record.
        </p>
      </div>

      <form
        className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append("contentId", selectedContentId);
          payload.append("duration", duration);
          if (video) payload.append("video", video);
          await API.post("/movie/create", payload, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          setSelectedContentId("");
          setDuration("");
          setVideo(null);
          load();
        }}
      >
        <select
          value={selectedContentId}
          onChange={(event) => setSelectedContentId(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        >
          <option value="">Select movie content</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Duration in minutes"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={(event) => setVideo(event.target.files?.[0] || null)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />
        <button
          type="submit"
          className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black"
        >
          Upload Movie Video
        </button>
      </form>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">movie</p>
                <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-neutral-400 mt-1">{item.description}</p>
                <p className="text-sm text-neutral-400">
                  Price: {item.rentalPrice ? `Rs. ${item.rentalPrice}` : "Free"}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200">
                {uploadedMovies.some((movie) => movie.contentId?._id === item._id)
                  ? "Video attached"
                  : "Awaiting video"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
