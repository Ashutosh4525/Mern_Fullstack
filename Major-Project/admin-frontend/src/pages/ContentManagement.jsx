import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import { getCategories } from '../services/content';
import DataGrid from '../components/DataGrid';

export default function ContentManagement() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'movie',
    rentalPrice: '',
    categoryIds: [],
    poster: null,
    trailer: null,
  });

  const loadData = async () => {
    const [contentRes, categoryRes] = await Promise.all([
      API.get('/content/all-admin'),
      getCategories(),
    ]);

    setItems(contentRes.data.data || []);
    setCategories(categoryRes.data || []);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Error loading content:', error));
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 250, flex: 1 },
    {
      field: 'type',
      headerName: 'Type',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => <span className="capitalize">{params.value}</span>,
    },
    {
      field: 'rentalPrice',
      headerName: 'Rental Price',
      minWidth: 140,
      flex: 0.6,
      renderCell: (params) => <span>{params.value ? `Rs. ${params.value}` : 'Included'}</span>,
    },
    {
      field: 'categoryIds',
      headerName: 'Categories',
      minWidth: 220,
      flex: 1,
      renderCell: (params) => <span>{(params.value || []).map((cat) => cat?.name).filter(Boolean).join(', ')}</span>,
    },
    {
      field: 'isDeleted',
      headerName: 'Status',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => (
        <span className={`text-xs font-semibold uppercase ${params.value ? 'text-red-400' : 'text-green-400'}`}>
          {params.value ? 'Disabled' : 'Active'}
        </span>
      ),
    },
  ];

  const renderActions = (item) => (
    <button
      onClick={async (event) => {
        event.stopPropagation();
        try {
          if (item.isDeleted) {
            await API.patch(`/content/restore/${item._id}`);
          } else {
            await API.patch(`/content/delete/${item._id}`);
          }
          await loadData();
        } catch (error) {
          console.error('Error toggling content status:', error);
        }
      }}
      className={`rounded px-3 py-1 text-sm text-white ${item.isDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
    >
      {item.isDeleted ? 'Restore' : 'Disable'}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Content</p>
        <h1 className="text-3xl font-semibold">Manage Movies and TV Content</h1>
        <p className="max-w-3xl text-neutral-300">
          Base content lives here. Create movie or TV metadata, then attach movie videos or seasons and episodes from the dedicated admin pages.
        </p>
      </div>

      <form
        className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append('title', form.title);
          payload.append('description', form.description);
          payload.append('type', form.type);
          payload.append('rentalPrice', form.rentalPrice);
          form.categoryIds.forEach((id) => payload.append('categoryIds', id));
          if (form.poster) payload.append('poster', form.poster);
          if (form.trailer) payload.append('trailer', form.trailer);

          await API.post('/content/create', payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          setForm({
            title: '',
            description: '',
            type: 'movie',
            rentalPrice: '',
            categoryIds: [],
            poster: null,
            trailer: null,
          });
          await loadData();
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            required
          />
          <select
            value={form.type}
            onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="min-h-28 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none md:col-span-2"
          />
          <input
            type="number"
            placeholder="Rental price"
            value={form.rentalPrice}
            onChange={(event) => setForm((prev) => ({ ...prev, rentalPrice: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
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
                          : [...prev.categoryIds, category._id],
                      }))
                    }
                    className={`rounded-full px-3 py-2 text-sm ${selected ? 'bg-amber-300 text-black' : 'border border-white/10 bg-white/5 text-white'}`}
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
            onChange={(event) => setForm((prev) => ({ ...prev, poster: event.target.files?.[0] || null }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
          <input
            type="file"
            accept="video/*"
            onChange={(event) => setForm((prev) => ({ ...prev, trailer: event.target.files?.[0] || null }))}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          />
        </div>
        <button type="submit" className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
          Create Content
        </button>
      </form>

      <DataGrid
        data={items}
        columns={columns}
        onRowClick={(item) => navigate(`/content/${item._id}`)}
        onEdit={(item) => navigate(`/content/${item._id}`)}
        actions={renderActions}
        searchFields={['title', 'description']}
      />
    </div>
  );
}
