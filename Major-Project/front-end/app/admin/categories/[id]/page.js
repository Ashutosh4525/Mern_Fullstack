'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import Loading from "@/app/loading";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const response = await API.get(`/category/${params.id}`);
      const category = response.data.data;
      setForm({
        name: category.name || '',
        description: category.description || ''
      });
    } catch (error) {
      console.error('Error loading category:', error);
      router.push('/admin/categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await API.put(`/category/update/${params.id}`, form);
      router.push('/admin/categories');
    } catch (error) {
      console.error('Error updating category:', error);
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
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Category</p>
        <h1 className="text-3xl font-semibold">Update Category Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none h-32"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Category'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}