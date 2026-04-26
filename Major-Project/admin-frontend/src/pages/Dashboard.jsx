import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../services/api';

const statsConfig = [
  { key: 'totalContent', label: 'Catalog Library', tone: 'text-[#59f2c3]' },
  { key: 'totalUsers', label: 'Audience Accounts', tone: 'text-[#ffd24a]' },
  { key: 'totalCasts', label: 'Cast Profiles', tone: 'text-[#68d7ff]' },
  { key: 'totalCategories', label: 'Browse Collections', tone: 'text-[#ff8f70]' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalContent: 0,
    totalUsers: 0,
    totalCasts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [contentRes, usersRes, castRes, categoriesRes] = await Promise.all([
          API.get('/content/all-admin'),
          API.get('/users/all-admin'),
          API.get('/cast/all-admin'),
          API.get('/category/all-admin'),
        ]);

        setStats({
          totalContent: contentRes.data.total || contentRes.data.data?.length || 0,
          totalUsers: usersRes.data.total || usersRes.data.data?.length || 0,
          totalCasts: castRes.data.total || castRes.data.data?.length || 0,
          totalCategories: categoriesRes.data.total || categoriesRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    loadStats();
  }, []);

  const quickLinks = useMemo(
    () => [
      { to: '/content', title: 'Catalog Control', copy: 'Create titles, posters, trailers, and metadata.' },
      { to: '/movies', title: 'Movie Uploads', copy: 'Attach streams and verify playback.' },
      { to: '/tvshows', title: 'Series Ops', copy: 'Manage seasons and episodes.' },
      { to: '/users', title: 'User Oversight', copy: 'Handle users and account states.' },
    ],
    []
  );

  const opsPanels = useMemo(
    () => [
      {
        title: 'Core Workflows',
        items: [
          'Content CRUD with media uploads',
          'Category and genre management',
          'User management system',
          'Payments and rentals monitoring',
        ],
      },
      {
        title: 'Platform Coverage',
        items: [
          'Auth and admin verification',
          'Content APIs',
          'Rental logic',
          'User profile APIs',
        ],
      },
    ],
    []
  );

  return (
    <div className="overflow-hidden">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4">
        <section className="rounded-2xl border border-white/10 p-6 shadow-xl">
          <div className="grid gap-8 xl:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#59f2c3]">Dashboard</p>
              <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
                Manage your streaming platform
              </h1>
              <p className="mt-4 text-slate-300">
                Keep content, users, and purchases organized from one admin workspace.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Content', value: 'Managed' },
                  { label: 'Users', value: 'Tracked' },
                  { label: 'Orders', value: 'Visible' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="text-xl font-semibold text-[#59f2c3]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 p-6">
              <p className="text-sm text-gray-400">Admin Overview</p>

              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <p>Secure admin access</p>
                <p>Catalog updates in one place</p>
                <p>Purchase activity review</p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/content" className="rounded bg-[#59f2c3] px-4 py-2 text-black">
                  Content
                </Link>
                <Link to="/movies" className="rounded border border-white/20 px-4 py-2">
                  Movies
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statsConfig.map((item) => (
            <div key={item.key} className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className={`mt-2 text-2xl font-bold ${item.tone}`}>{stats[item.key]}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="mb-4 text-xl font-semibold">Quick Access</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg border border-white/10 p-4 hover:bg-white/5"
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.copy}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-white/10 p-6">
            {opsPanels.map((panel) => (
              <div key={panel.title} className="rounded-lg border border-white/10 p-4">
                <h3 className="mb-2 font-semibold">{panel.title}</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  {panel.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
