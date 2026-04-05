'use client'

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute adminOnly>
      <main className="min-h-screen bg-[linear-gradient(135deg,#06131c_0%,#0f172a_45%,#111827_100%)] px-6 pb-10 pt-28 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
            >
              <Bars3Icon className="size-5" />
              {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
              <AdminSidebar />
            </div>
            <section className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              {children}
            </section>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
