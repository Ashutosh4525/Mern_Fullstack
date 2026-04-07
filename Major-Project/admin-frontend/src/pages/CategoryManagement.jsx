import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import DataGrid from '../components/DataGrid';

export default function CategoryManagement() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  const loadData = async () => {
    const response = await API.get('/category/all-admin');
    setCategories(response.data.data || []);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const columns = [
    { field: 'name', headerName: 'Category Name', minWidth: 220, flex: 1 },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 280,
      flex: 1.2,
      renderCell: (params) => params.value || 'No description',
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
        if (item.isDeleted) {
          await API.patch(`/category/restore/${item._id}`);
        } else {
          await API.delete(`/category/delete/${item._id}`);
        }
        await loadData();
      }}
      className={`rounded px-3 py-1 text-sm text-white ${item.isDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
    >
      {item.isDeleted ? 'Restore' : 'Disable'}
    </button>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Categories</p>
        <h1 className="text-3xl font-semibold">Manage Genres and Grouping</h1>
      </div>

      <form
        className="grid gap-4 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          await API.post('/category/create', form);
          setForm({ name: '', description: '' });
          await loadData();
        }}
      >
        <input
          type="text"
          placeholder="Category name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          className="min-h-28 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />
        <button type="submit" className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
          Create Category
        </button>
      </form>

      <DataGrid
        data={categories}
        columns={columns}
        onRowClick={(item) => navigate(`/categories/${item._id}`)}
        onEdit={(item) => navigate(`/categories/${item._id}`)}
        actions={renderActions}
        searchFields={['name', 'description']}
      />
    </div>
  );
}
