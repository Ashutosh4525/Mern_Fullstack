'use client'

import { useEffect, useState } from "react";
import { API } from "@/services/api";
import { getCategories } from "@/services/contentService";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const load = async () => {
    const res = await getCategories();
    setCategories(res.data ?? []);
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const res = await getCategories();
      if (active) {
        setCategories(res.data ?? []);
      }
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Categories</p>
        <h1 className="text-3xl font-semibold">Manage Genres and Grouping</h1>
      </div>

      <form
        className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6"
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

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="mt-2 text-sm text-neutral-400">{category.description || "No description"}</p>
            </div>
            <button
              type="button"
              onClick={async () => {
                await API.delete(`/category/delete/${category._id}`);
                load();
              }}
              className="rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
