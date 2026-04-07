'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import { getAllContent } from "@/services/contentService";
import Loading from "@/app/loading";

export default function EditMoviePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({
    contentId: '',
    video: null
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const [movieRes, contentRes] = await Promise.all([
        API.get(`/movie/get/${params.id}`),
        getAllContent({ type: "movie", limit: 500 })
      ]);

      const movie = movieRes.data.data;
      setForm({
        contentId: movie.contentId?._id || '',
        video: null
      });
      setContent(contentRes.data || []);
    } catch (error) {
      console.error('Error loading movie:', error);
      router.push('/admin/movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('contentId', form.contentId);

      if (form.video) formData.append('video', form.video);

      await API.put(`/movie/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      router.push('/admin/movies');
    } catch (error) {
      console.error('Error updating movie:', error);
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
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Movie</p>
        <h1 className="text-3xl font-semibold">Update Movie Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="mb-2 text-sm text-neutral-400">Content</p>
          <select
            value={form.contentId}
            onChange={(e) => setForm(prev => ({ ...prev, contentId: e.target.value }))}
            className="w-full bg-transparent outline-none"
            required
          >
            <option value="" className="bg-black">Select content</option>
            {content.map((item) => (
              <option key={item._id} value={item._id} className="bg-black">
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setForm(prev => ({ ...prev, video: e.target.files?.[0] || null }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Movie'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/movies')}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}