'use client'

import { useEffect, useState } from "react";
import { API } from "@/services/api";
import { getAllContent, getCategories } from "@/services/contentService";

export default function AdminContentPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "movie",
    rentalPrice: "",
    categoryIds: [],
    poster: null,
    trailer: null
  });

  const load = async () => {
    const [contentRes, categoryRes] = await Promise.all([
      getAllContent({ limit: 50 }),
      getCategories()
    ]);
    setItems(contentRes.data ?? []);
    setCategories(categoryRes.data ?? []);
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const [contentRes, categoryRes] = await Promise.all([
        getAllContent({ limit: 50 }),
        getCategories()
      ]);

      if (!active) return;
      setItems(contentRes.data ?? []);
      setCategories(categoryRes.data ?? []);
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Content</p>
        <h1 className="text-3xl font-semibold">Manage Movies and TV Content</h1>
        <p className="max-w-3xl text-neutral-300">
          Base content lives here. Create movie or TV metadata, then attach movie video or seasons/episodes from the dedicated admin pages.
        </p>
      </div>

      <form
        className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append("title", form.title);
          payload.append("description", form.description);
          payload.append("type", form.type);
          payload.append("rentalPrice", form.rentalPrice);
          form.categoryIds.forEach((id) => payload.append("categoryIds", id));
          if (form.poster) payload.append("poster", form.poster);
          if (form.trailer) payload.append("trailer", form.trailer);
          await API.post("/content/create", payload, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          setForm({
            title: "",
            description: "",
            type: "movie",
            rentalPrice: "",
            categoryIds: [],
            poster: null,
            trailer: null
          });
          load();
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
                          : [...prev.categoryIds, category._id]
                      }))
                    }
                    className={`rounded-full px-3 py-2 text-sm ${
                      selected ? "bg-amber-300 text-black" : "border border-white/10 bg-white/5 text-white"
                    }`}
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
        <button
          type="submit"
          className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black"
        >
          Create Content
        </button>
      </form>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{item.type}</p>
                <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-neutral-400">{item.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-neutral-400">
                  {item.rentalPrice ? `Rs. ${item.rentalPrice}` : "Included"}
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    await API.patch(`/content/delete/${item._id}`);
                    load();
                  }}
                  className="rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
