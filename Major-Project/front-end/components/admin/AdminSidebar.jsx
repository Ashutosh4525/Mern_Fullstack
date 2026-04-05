'use client'

import Link from "next/link";
import { useState } from "react";

const groups = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard" }]
  },
  {
    label: "Catalog",
    items: [
      { href: "/admin/content", label: "Content" },
      { href: "/admin/movies", label: "Movies" },
      { href: "/admin/tvshows", label: "TV Shows" }
    ]
  },
  {
    label: "People",
    items: [
      { href: "/admin/cast", label: "Cast" },
      { href: "/admin/users", label: "Users" }
    ]
  },
  {
    label: "Commerce",
    items: [{ href: "/admin/purchases", label: "Purchases" }]
  }
];

export default function AdminSidebar() {
  const [openGroups, setOpenGroups] = useState({
    Overview: true,
    Catalog: true,
    People: false,
    Commerce: false
  });

  return (
    <aside className="flex w-full max-w-xs flex-col justify-between rounded-4xl border border-white/10 bg-[#111827] p-6 text-white">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300/70">
            Admin Panel
          </p>
          <h2 className="text-2xl font-semibold">StreamForge Console</h2>
        </div>

        <nav className="space-y-3">
          {groups.map((group) => (
            <div key={group.label} className="rounded-2xl border border-white/8 bg-white/2">
              <button
                type="button"
                onClick={() =>
                  setOpenGroups((prev) => ({ ...prev, [group.label]: !prev[group.label] }))
                }
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
              >
                <span>{group.label}</span>
                <span className="text-neutral-400">{openGroups[group.label] ? "-" : "+"}</span>
              </button>
              {openGroups[group.label] && (
                <div className="space-y-1 px-3 pb-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-2xl border border-transparent px-4 py-3 text-sm text-neutral-200 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
        Sidebar groups now behave like collapsible menus under <span className="font-semibold">/admin</span>.
      </div>
    </aside>
  );
}
