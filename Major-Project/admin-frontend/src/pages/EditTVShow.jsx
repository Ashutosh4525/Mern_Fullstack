import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../services/api';
import { getCategories } from '../services/content';

export default function EditTVShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryIds: [],
    poster: null,
    rentalPrice: '',
    type: 'tv',
  });

  useEffect(() => {
    const loadData = async () => {
      const [contentRes, categoriesRes] = await Promise.all([
        API.get(`/content/${id}`),
        getCategories(),
      ]);
      const item = contentRes.data.data;
      setForm({
        title: item.title || '',
        description: item.description || '',
        categoryIds: item.categoryIds?.map((cat) => cat._id) || [],
        poster: null,
        rentalPrice: item.rentalPrice || '',
        type: item.type || 'tv',
      });
      setCategories(categoriesRes.data || []);
    };

    loadData().catch((error) => {
      console.error('Error loading TV show:', error);
      navigate('/tvshows');
    });
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit TV Show</p>
        <h1 className="text-3xl font-semibold">Update TV Show Details</h1>
      </div>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append('title', form.title);
          payload.append('description', form.description);
          payload.append('categoryIds', JSON.stringify(form.categoryIds));
          payload.append('rentalPrice', form.rentalPrice);
          payload.append('type', form.type);
          if (form.poster) payload.append('poster', form.poster);
          await API.put(`/content/update/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
          navigate('/tvshows');
        }}
        className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="TV Show Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
          <input type="number" placeholder="Rental Price (Rs.)" value={form.rentalPrice} onChange={(event) => setForm((prev) => ({ ...prev, rentalPrice: event.target.value }))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} className="h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="mb-2 text-sm text-neutral-400">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const selected = form.categoryIds.includes(category._id);
              return (
                <button key={category._id} type="button" onClick={() => setForm((prev) => ({ ...prev, categoryIds: selected ? prev.categoryIds.filter((entry) => entry !== category._id) : [...prev.categoryIds, category._id] }))} className={`rounded-full px-3 py-2 text-sm ${selected ? 'bg-amber-300 text-black' : 'border border-white/10 bg-white/5 text-white'}`}>
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
        <input type="file" accept="image/*" onChange={(event) => setForm((prev) => ({ ...prev, poster: event.target.files?.[0] || null }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <div className="flex gap-4">
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Update TV Show</button>
          <button type="button" onClick={() => navigate('/tvshows')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
