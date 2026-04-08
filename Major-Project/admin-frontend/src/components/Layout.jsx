import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeftOnRectangleIcon, Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { logoutAdmin } from '../services/authSlice';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: admin } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pageMeta = useMemo(() => {
    const metaMap = [
      { match: /^\/dashboard$/, title: 'Dashboard', copy: 'A single console for platform health, uploads, and admin actions.' },
      { match: /^\/profile/, title: 'Profile', copy: 'Review your admin identity, update account details, and manage access credentials.' },
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
      await dispatch(logoutAdmin()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate('/profile');
  };

  const initials = `${admin?.firstname?.[0] || 'A'}${admin?.lastname?.[0] || ''}`.toUpperCase();

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
          <header className="admin-topbar relative z-10 rounded-[1.9rem] border border-white/10 bg-[#0f172a]/90 px-5 py-5 shadow-xl shadow-black/20 md:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4 overflow-visible">
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

              <div className="admin-topbar-actions relative flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[#59f2c3]/20 bg-[#59f2c3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#d8fff1]">
                  Admin Only
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#59f2c3]/15 text-sm font-semibold text-[#d8fff1]">
                      {admin?.avatar?.url ? (
                        <img src={admin.avatar.url} alt="Admin avatar" className="h-full w-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-semibold text-white">
                        {[admin?.firstname, admin?.lastname].filter(Boolean).join(' ') || 'Admin'}
                      </p>
                      <p className="text-xs text-neutral-400">{admin?.email || 'admin@streamforge.com'}</p>
                    </div>
                    <UserCircleIcon className="size-5 text-neutral-300" />
                  </button>

                  {menuOpen && (
                    <>
                      {/* Overlay */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuOpen(false)}
                      />

                      {/* Dropdown */}
                      <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[999] w-64 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-3 shadow-2xl">
                        <button
                          onClick={handleProfileClick}
                          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-100 hover:bg-white/5"
                        >
                          <UserCircleIcon className="size-5 text-[#59f2c3]" />
                          View Profile
                        </button>

                        <button
                          onClick={handleLogout}
                          className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-rose-100 hover:bg-rose-500/10"
                        >
                          <ArrowLeftOnRectangleIcon className="size-5 text-rose-300" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
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
