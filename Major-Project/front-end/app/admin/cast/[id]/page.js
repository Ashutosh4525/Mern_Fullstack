'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import Loading from "@/app/loading";

export default function EditCastPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    bio: '',
    profileImage: null
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const response = await API.get(`/cast/${params.id}`);
      const cast = response.data.data;
      setForm({
        name: cast.name || '',
        bio: cast.bio || '',
        profileImage: null
      });
    } catch (error) {
      console.error('Error loading cast:', error);
      router.push('/admin/cast');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      if (form.bio) formData.append('bio', form.bio);
      if (form.profileImage) formData.append('profileImage', form.profileImage);

      await API.put(`/cast/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      router.push('/admin/cast');
    } catch (error) {
      console.error('Error updating cast:', error);
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
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Cast Member</p>
        <h1 className="text-3xl font-semibold">Update Cast Member Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <input
          type="text"
          placeholder="Cast Member Name"
          value={form.name}
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />

        <textarea
          placeholder="Biography"
          value={form.bio}
          onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none h-32"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm(prev => ({ ...prev, profileImage: e.target.files?.[0] || null }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Cast Member'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/cast')}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}