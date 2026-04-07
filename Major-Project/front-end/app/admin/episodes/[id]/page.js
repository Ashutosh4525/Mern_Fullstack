'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import Loading from "@/app/loading";

export default function EditEpisodePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    episodeNumber: '',
    duration: '',
    video: null
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const response = await API.get(`/episode/${params.id}`);
      const episode = response.data.data;
      setForm({
        title: episode.title || '',
        episodeNumber: episode.episodeNumber || '',
        duration: episode.duration || '',
        video: null
      });
    } catch (error) {
      console.error('Error loading episode:', error);
      router.push('/admin/tvshows');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('episodeNumber', form.episodeNumber);
      formData.append('duration', form.duration);

      if (form.video) formData.append('video', form.video);

      await API.put(`/episode/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      router.push('/admin/tvshows');
    } catch (error) {
      console.error('Error updating episode:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Episode</p>
        <h1 className="text-3xl font-semibold">Update Episode Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Episode Title"
            value={form.title}
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <input
            type="number"
            placeholder="Episode Number"
            value={form.episodeNumber}
            onChange={(e) => setForm(prev => ({ ...prev, episodeNumber: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={(e) => setForm(prev => ({ ...prev, duration: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setForm(prev => ({ ...prev, video: e.target.files?.[0] || null }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Episode'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/tvshows')}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}