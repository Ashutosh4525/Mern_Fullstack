'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllContent } from "@/services/contentService";
import { API } from "@/services/api";
import AdminDataGrid from "@/components/admin/AdminDataGrid";
import Loading from "@/app/loading";

export default function AdminTVShowsPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeForm, setEpisodeForm] = useState({
    seasonId: "",
    title: "",
    episodeNumber: "",
    duration: "",
    video: null
  });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await getAllContent({ type: "tv", limit: 500 });
    setItems(res.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const res = await getAllContent({ type: "tv", limit: 500 });
      if (!active) return;
      setItems(res.data ?? []);
      setLoading(false);
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const fetchSeasons = async (contentId) => {
    const response = await API.get(`/season/content/${contentId}`);
    setSeasons(response.data.data || []);
  };

  const fetchEpisodes = async (seasonId) => {
    const response = await API.get(`/episode/season/${seasonId}`);
    setEpisodes(response.data.data || []);
  };

  const handleShowClick = (show) => {
    setSelectedShow(show);
    fetchSeasons(show._id);
    setSelectedSeasonId("");
    setEpisodes([]);
  };

  const handleSeasonClick = (season) => {
    setSelectedSeasonId(season._id);
    setEpisodeForm((prev) => ({ ...prev, seasonId: season._id }));
    fetchEpisodes(season._id);
  };

  const handleEdit = (item) => {
    router.push(`/admin/tvshows/${item._id}`);
  };

  const handleEditEpisode = (episode) => {
    router.push(`/admin/episodes/${episode._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  const showColumns = [
    {
      field: 'title',
      headerName: 'Show Title',
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'rentalPrice',
      headerName: 'Rental Price',
      minWidth: 150,
      flex: 0.6,
      renderCell: (params) => params.value ? `Rs. ${params.value}` : 'Free',
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

  const episodeColumns = [
    {
      field: 'episodeNumber',
      headerName: 'Episode #',
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: 'title',
      headerName: 'Episode Title',
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'duration',
      headerName: 'Duration (min)',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => params.value ? `${params.value} min` : 'N/A',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">TV Shows</p>
        <h1 className="text-3xl font-semibold">Manage seasons and episodes</h1>
        <p className="max-w-3xl text-neutral-300">
          TV show metadata is created under Content. This page adds seasons and episode videos to existing TV titles.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <form
          className="space-y-4 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!selectedShow) return;
            await API.post("/season/create", {
              contentId: selectedShow._id,
              seasonNumber
            });
            setSeasonNumber("");
            fetchSeasons(selectedShow._id);
          }}
        >
          <h2 className="text-xl font-semibold">Create Season</h2>
          <input
            type="number"
            placeholder="Season number"
            value={seasonNumber}
            onChange={(event) => setSeasonNumber(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
            Add Season
          </button>
        </form>

        <form
          className="space-y-4 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const payload = new FormData();
            payload.append("seasonId", episodeForm.seasonId);
            payload.append("title", episodeForm.title);
            payload.append("episodeNumber", episodeForm.episodeNumber);
            payload.append("duration", episodeForm.duration);
            if (episodeForm.video) payload.append("video", episodeForm.video);
            await API.post("/episode/create", payload, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            setEpisodeForm({
              seasonId: selectedSeasonId,
              title: "",
              episodeNumber: "",
              duration: "",
              video: null
            });
            fetchEpisodes(selectedSeasonId);
          }}
        >
          <h2 className="text-xl font-semibold">Create Episode</h2>
          <input
            type="text"
            placeholder="Episode title"
            value={episodeForm.title}
            onChange={(event) => setEpisodeForm((prev) => ({ ...prev, title: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="number"
              placeholder="Episode number"
              value={episodeForm.episodeNumber}
              onChange={(event) => setEpisodeForm((prev) => ({ ...prev, episodeNumber: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
              required
            />
            <input
              type="number"
              placeholder="Duration"
              value={episodeForm.duration}
              onChange={(event) => setEpisodeForm((prev) => ({ ...prev, duration: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
              required
            />
          </div>
          <input
            type="file"
            accept="video/*"
            onChange={(event) => setEpisodeForm((prev) => ({ ...prev, video: event.target.files?.[0] || null }))}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
            Add Episode
          </button>
        </form>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* TV Shows List */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">TV Shows</h3>
          <AdminDataGrid
            data={items}
            columns={showColumns}
            onRowClick={(item) => {
              handleShowClick(item);
            }}
            onEdit={handleEdit}
            searchFields={['title']}
          />
        </div>

        {/* Seasons */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Seasons</h3>
          {selectedShow ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {seasons.length > 0 ? seasons.map((season) => (
                <div
                  key={season._id}
                  onClick={() => handleSeasonClick(season)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSeasonId === season._id
                      ? 'border-emerald-400 bg-emerald-400/10'
                      : 'border-white/10 bg-[#0b1220] hover:border-white/20'
                  }`}
                >
                  <h4 className="font-semibold text-sm">Season {season.seasonNumber}</h4>
                  <p className="text-xs text-neutral-400">Select to manage episodes</p>
                </div>
              )) : (
                <p className="text-neutral-400 text-sm">No seasons found</p>
              )}
            </div>
          ) : (
            <p className="text-neutral-400 text-sm">Select a TV show to view seasons</p>
          )}
        </div>
      </div>

      {/* Episodes - Full Width */}
      {selectedSeasonId && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Episodes - Season {seasons.find(s => s._id === selectedSeasonId)?.seasonNumber}</h3>
          {episodes.length > 0 ? (
            <AdminDataGrid
              data={episodes}
              columns={episodeColumns}
              onRowClick={(item) => {
                // Could add more functionality here if needed
              }}
              onEdit={handleEditEpisode}
              searchFields={['title']}
            />
          ) : (
            <p className="text-neutral-400 text-sm">No episodes found in this season</p>
          )}
        </div>
      )}
    </div>
  );
}
