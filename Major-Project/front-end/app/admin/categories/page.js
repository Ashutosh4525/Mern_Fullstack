'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/services/api";
import { getCategories } from "@/services/contentService";
import AdminDataGrid from "@/components/admin/AdminDataGrid";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const handleEdit = (item) => {
    router.push(`/admin/categories/${item._id}`);
  };

  const load = async () => {
    const res = await API.get('/category/all-admin');
    setCategories(res.data.data ?? []);
  };

  const handleToggleCategoryStatus = async (categoryId, isDeleted) => {
    try {
      if (isDeleted) {
        // Restore category
        await API.patch(`/category/restore/${categoryId}`);
      } else {
        // Soft delete category
        await API.delete(`/category/delete/${categoryId}`);
      }
      // Refresh the categories list
      const res = await API.get('/category/all-admin');
      setCategories(res.data.data ?? []);
    } catch (error) {
      console.error('Error toggling category status:', error);
      alert('Failed to update category status');
    }
  };

  const renderActions = (item) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleCategoryStatus(item._id, item.isDeleted);
      }}
      className={`px-3 py-1 text-white rounded text-sm transition-colors ${
        item.isDeleted
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-red-600 hover:bg-red-700'
      }`}
    >
      {item.isDeleted ? 'Restore' : 'Disable'}
    </button>
  );

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const res = await API.get('/category/all-admin');
      if (active) {
        setCategories(res.data.data ?? []);
      }
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Category Name',
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 300,
      flex: 1.5,
      renderCell: (params) => params.value || 'No description',
    },
    {
      field: 'isDeleted',
      headerName: 'Status',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => (
        <span className={`text-xs uppercase font-semibold ${
          params.value ? 'text-red-400' : 'text-green-400'
        }`}>
          {params.value ? 'DISABLED' : 'ACTIVE'}
        </span>
      ),
    },
  ];

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
          await API.post("/category/create", form);
          setForm({ name: "", description: "" });
          load();
        }}
      >
        <input
          type="text"
          placeholder="Category name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          className="min-h-28 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />
        <button
          type="submit"
          className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black"
        >
          Create Category
        </button>
      </form>

      <AdminDataGrid
        data={categories}
        columns={columns}
        onRowClick={(item) => {
          router.push(`/admin/categories/${item._id}`);
        }}
        onEdit={handleEdit}
        actions={renderActions}
        searchFields={['name', 'description']}
      />
    </div>
  );
}
