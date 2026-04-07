'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/services/api";
import Loading from "@/app/loading";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const response = await API.get(`/users/${params.id}`);
      const user = response.data.data;
      setForm({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        role: user.role || 'user'
      });
    } catch (error) {
      console.error('Error loading user:', error);
      router.push('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await API.put(`/users/${params.id}`, form);
      router.push('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
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
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit User</p>
        <h1 className="text-3xl font-semibold">Update User Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstname}
            onChange={(e) => setForm(prev => ({ ...prev, firstname: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastname}
            onChange={(e) => setForm(prev => ({ ...prev, lastname: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />

        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="mb-2 text-sm text-neutral-400">Role</p>
          <select
            value={form.role}
            onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
            className="w-full bg-transparent outline-none"
            required
          >
            <option value="user" className="bg-black">User</option>
            <option value="admin" className="bg-black">Admin</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update User'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/users')}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}