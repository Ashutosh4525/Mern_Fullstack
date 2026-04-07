'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import { getCategories } from "@/services/contentService";
import Loading from "@/app/loading";

export default function EditTVShowPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryIds: [],
    poster: null,
    rentalPrice: '',
    type: 'tvshow'
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const [contentRes, categoriesRes] = await Promise.all([
        API.get(`/content/${params.id}`),
        getCategories()
      ]);

      const content = contentRes.data.data;
      setForm({
        title: content.title || '',
        description: content.description || '',
        categoryIds: content.categoryIds?.map(cat => cat._id) || [],
        rentalPrice: content.rentalPrice || '',
        type: content.type || 'tvshow'
      });
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error loading TV show:', error);
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
      formData.append('description', form.description);
      formData.append('categoryIds', JSON.stringify(form.categoryIds));
      formData.append('rentalPrice', form.rentalPrice);
      formData.append('type', form.type);

      if (form.poster) formData.append('poster', form.poster);

      await API.put(`/content/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      router.push('/admin/tvshows');
    } catch (error) {
      console.error('Error updating TV show:', error);
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
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit TV Show</p>
        <h1 className="text-3xl font-semibold">Update TV Show Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="TV Show Title"
            value={form.title}
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <input
            type="number"
            placeholder="Rental Price (Rs.)"
            value={form.rentalPrice}
            onChange={(e) => setForm(prev => ({ ...prev, rentalPrice: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none h-32"
        />

        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="mb-2 text-sm text-neutral-400">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const selected = form.categoryIds.includes(category._id);
              return (
                <button
                  key={category._id}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      categoryIds: selected
                        ? prev.categoryIds.filter((id) => id !== category._id)
                        : [...prev.categoryIds, category._id]
                    }))
                  }
                  className={`rounded-full px-3 py-2 text-sm ${
                    selected ? "bg-amber-300 text-black" : "border border-white/10 bg-white/5 text-white"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm(prev => ({ ...prev, poster: e.target.files?.[0] || null }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update TV Show'}
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