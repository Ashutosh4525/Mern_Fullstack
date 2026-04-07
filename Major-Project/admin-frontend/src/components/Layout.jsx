import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';
import { API } from '../services/api';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageMeta = useMemo(() => {
    const metaMap = [
      { match: /^\/dashboard$/, title: 'Dashboard', copy: 'A single console for platform health, uploads, and admin actions.' },
      { match: /^\/content/, title: 'Content', copy: 'Create and refine the core movie and TV metadata library.' },
      { match: /^\/movies/, title: 'Movies', copy: 'Attach and verify movie video uploads with a premium admin workflow.' },
      { match: /^\/tvshows/, title: 'TV Shows', copy: 'Manage season structure and episode delivery from one place.' },
      { match: /^\/episodes/, title: 'Episodes', copy: 'Inspect and update episode records with playback-ready video access.' },
      { match: /^\/cast/, title: 'Cast', copy: 'Keep talent profiles and movie-cast relationships organized.' },
      { match: /^\/categories/, title: 'Categories', copy: 'Shape discovery and catalog grouping with focused taxonomy controls.' },
      { match: /^\/users/, title: 'Users', copy: 'Monitor user access, status, and admin visibility.' },
      { match: /^\/purchases/, title: 'Purchases', copy: 'Review rental activity and purchase history across the platform.' },
    ];

    return metaMap.find((item) => item.match.test(location.pathname)) || metaMap[0];
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await API.post('/users/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="admin-app-shell min-h-screen px-4 pb-10 pt-6 text-white md:px-8 lg:px-10">
      <div className="admin-shell mx-auto max-w-7xl gap-6">
        <div className={`admin-sidebar-wrap ${sidebarOpen ? 'is-open' : ''}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <div className="admin-main-column flex min-w-0 flex-col gap-6">
          <header className="admin-topbar rounded-[1.9rem] border border-white/10 bg-[#0f172a]/90 px-5 py-5 shadow-xl shadow-black/20 md:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="admin-menu-button mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
                >
                  {sidebarOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
                </button>

                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#59f2c3]/80">Admin Console</p>
                  <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{pageMeta.title}</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-400">{pageMeta.copy}</p>
                </div>
              </div>

              <div className="admin-topbar-actions flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[#59f2c3]/20 bg-[#59f2c3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#d8fff1]">
                  Admin Only
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff5f57] px-5 py-3 font-semibold text-white transition hover:bg-[#ff776f]"
                >
                  <ArrowLeftOnRectangleIcon className="size-5" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="admin-content rounded-[1.9rem] border border-white/10 bg-[#0b1220]/92 p-5 shadow-xl shadow-black/20 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
