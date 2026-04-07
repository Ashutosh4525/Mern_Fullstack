import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API, API_URL } from '../services/api';
import { getAllContent } from '../services/content';

export default function EditMovie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contentItems, setContentItems] = useState([]);
  const [movie, setMovie] = useState(null);
  const [form, setForm] = useState({ contentId: '', duration: '', video: null });

  useEffect(() => {
    const loadData = async () => {
      const [movieRes, contentRes] = await Promise.all([
        API.get(`/movie/get/${id}`),
        getAllContent({ type: 'movie', limit: 500 }),
      ]);
      const item = movieRes.data.data;
      setMovie(item);
      setContentItems(contentRes.data || []);
      setForm({ contentId: item.contentId?._id || '', duration: item.duration || '', video: null });
    };

    loadData().catch((error) => {
      console.error('Error loading movie:', error);
      navigate('/movies');
    });
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Movie</p>
        <h1 className="text-3xl font-semibold">Update Movie Details</h1>
      </div>

      {movie ? (
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-400">Current Movie Video</p>
          <video controls className="w-full rounded-3xl border border-white/10 bg-black" src={`${API_URL}/movie/watch/${id}/stream`} />
        </div>
      ) : null}

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append('contentId', form.contentId);
          payload.append('duration', form.duration);
          if (form.video) payload.append('video', form.video);
          await API.put(`/movie/update/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
          navigate('/movies');
        }}
        className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
      >
        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="mb-2 text-sm text-neutral-400">Content</p>
          <select value={form.contentId} onChange={(event) => setForm((prev) => ({ ...prev, contentId: event.target.value }))} className="w-full bg-transparent outline-none" required>
            <option value="" className="bg-black">Select content</option>
            {contentItems.map((item) => (
              <option key={item._id} value={item._id} className="bg-black">{item.title}</option>
            ))}
          </select>
        </div>
        <input type="number" placeholder="Duration in minutes" value={form.duration} onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <input type="file" accept="video/*" onChange={(event) => setForm((prev) => ({ ...prev, video: event.target.files?.[0] || null }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <div className="flex gap-4">
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Update Movie</button>
          <button type="button" onClick={() => navigate('/movies')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
