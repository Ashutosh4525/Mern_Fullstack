import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../services/api';

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    API.get('/category/all-admin')
      .then((response) => {
        const category = (response.data.data || []).find((item) => item._id === id);
        if (!category) {
          navigate('/categories');
          return;
        }
        setForm({ name: category.name || '', description: category.description || '' });
      })
      .catch((error) => {
        console.error('Error loading category:', error);
        navigate('/categories');
      });
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Edit Category</p>
        <h1 className="text-3xl font-semibold">Update Category Details</h1>
      </div>

      <form onSubmit={async (event) => {
        event.preventDefault();
        await API.put(`/category/update/${id}`, form);
        navigate('/categories');
      }} className="space-y-6 rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <input type="text" placeholder="Category Name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" required />
        <textarea placeholder="Description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} className="h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <div className="flex gap-4">
          <button type="submit" className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Update Category</button>
          <button type="button" onClick={() => navigate('/categories')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
