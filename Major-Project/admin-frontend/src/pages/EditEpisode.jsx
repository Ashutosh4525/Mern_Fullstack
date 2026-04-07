import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API, API_URL } from '../services/api';

export default function EditEpisode() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', episodeNumber: '', duration: '', video: null });

  useEffect(() => {
    API.get(`/episode/${id}`)
      .then((response) => {
        const episode = response.data.data;
        setForm({
          title: episode.title || '',
          episodeNumber: episode.episodeNumber || '',
          duration: episode.duration || '',
          video: null,
        });
      })
      .catch((error) => {
        console.error('Error loading episode:', error);
        navigate('/episodes');
      });
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Episode</p>
        <h1 className="text-3xl font-semibold">Update Episode Details</h1>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-400">Current Episode Video</p>
        <video controls className="w-full rounded-3xl border border-white/10 bg-black" src={`${API_URL}/episode/watch/${id}/stream`} />
      </div>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append('title', form.title);
          payload.append('episodeNumber', form.episodeNumber);
          payload.append('duration', form.duration);
          if (form.video) payload.append('video', form.video);
          await API.put(`/episode/update/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
          navigate('/episodes');
        }}
        className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="Episode Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
          <input type="number" placeholder="Episode Number" value={form.episodeNumber} onChange={(event) => setForm((prev) => ({ ...prev, episodeNumber: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input type="number" placeholder="Duration (minutes)" value={form.duration} onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
          <input type="file" accept="video/*" onChange={(event) => setForm((prev) => ({ ...prev, video: event.target.files?.[0] || null }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        </div>
        <div className="flex gap-4">
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Update Episode</button>
          <button type="button" onClick={() => navigate('/episodes')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
