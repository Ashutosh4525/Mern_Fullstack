'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllContent } from "@/services/contentService";
import { API } from "@/services/api";
import AdminDataGrid from "@/components/admin/AdminDataGrid";

export default function AdminMoviesPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [uploadedMovies, setUploadedMovies] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEdit = (item) => {
    router.push(`/admin/movies/${item._id}`);
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const [contentRes, movieRes] = await Promise.all([
        getAllContent({ type: "movie", limit: 500 }),
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

  const columns = [
    {
      field: 'contentId',
      headerName: 'Movie Title',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => params.value?.title || 'N/A',
    },
    {
      field: 'duration',
      headerName: 'Duration (min)',
      minWidth: 120,
      flex: 0.5,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => {
        if (!params.value) return 'N/A';
        return new Date(params.value).toLocaleDateString();
      },
    },
  ];

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

      <AdminDataGrid
        data={uploadedMovies}
        columns={columns}
        onRowClick={(item) => {
          router.push(`/admin/movies/${item._id}`);
        }}
        onEdit={handleEdit}
        searchFields={['contentId.title']}
      />
    </div>
  );
}
