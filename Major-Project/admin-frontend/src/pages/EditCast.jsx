import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../services/api';

export default function EditCast() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [form, setForm] = useState({ name: '', bio: '', profileImage: null });

  useEffect(() => {
    API.get(`/cast/${id}`)
      .then((response) => {
        const item = response.data.data;
        setCast(item);
        setForm({ name: item.name || '', bio: item.bio || '', profileImage: null });
      })
      .catch((error) => {
        console.error('Error loading cast:', error);
        navigate('/cast');
      });
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Cast Member</p>
        <h1 className="text-3xl font-semibold">Update Cast Member Details</h1>
      </div>

      {cast?.profileImage?.url ? <img src={cast.profileImage.url} alt={cast.name} className="h-56 w-56 rounded-3xl object-cover" /> : null}

      <form onSubmit={async (event) => {
        event.preventDefault();
        const payload = new FormData();
        payload.append('name', form.name);
        if (form.bio) payload.append('bio', form.bio);
        if (form.profileImage) payload.append('profileImage', form.profileImage);
        await API.put(`/cast/update/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        navigate('/cast');
      }} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <input type="text" placeholder="Cast Member Name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
        <textarea placeholder="Biography" value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} className="h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <input type="file" accept="image/*" onChange={(event) => setForm((prev) => ({ ...prev, profileImage: event.target.files?.[0] || null }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <div className="flex gap-4">
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Update Cast Member</button>
          <button type="button" onClick={() => navigate('/cast')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
