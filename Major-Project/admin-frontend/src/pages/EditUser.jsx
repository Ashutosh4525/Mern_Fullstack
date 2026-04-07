import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../services/api';

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', role: 'user' });

  useEffect(() => {
    API.get(`/users/${id}`)
      .then((response) => {
        const user = response.data.data;
        setForm({
          firstname: user.firstname || '',
          lastname: user.lastname || '',
          email: user.email || '',
          role: user.role || 'user',
        });
      })
      .catch((error) => {
        console.error('Error loading user:', error);
        navigate('/users');
      });
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit User</p>
        <h1 className="text-3xl font-semibold">Update User Details</h1>
      </div>

      <form onSubmit={async (event) => {
        event.preventDefault();
        await API.put(`/users/${id}`, form);
        navigate('/users');
      }} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="First Name" value={form.firstname} onChange={(event) => setForm((prev) => ({ ...prev, firstname: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
          <input type="text" placeholder="Last Name" value={form.lastname} onChange={(event) => setForm((prev) => ({ ...prev, lastname: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
        </div>
        <input type="email" placeholder="Email Address" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
        <select value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex gap-4">
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Update User</button>
          <button type="button" onClick={() => navigate('/users')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
