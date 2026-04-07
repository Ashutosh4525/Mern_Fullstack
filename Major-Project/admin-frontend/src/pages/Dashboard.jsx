// import { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { API } from '../services/api';

// const statsConfig = [
//   { key: 'totalContent', label: 'Catalog Library', tone: 'text-[#59f2c3]', accent: 'Ready' },
//   { key: 'totalUsers', label: 'Audience Accounts', tone: 'text-[#ffd24a]', accent: 'Watching' },
//   { key: 'totalCasts', label: 'Cast Profiles', tone: 'text-[#68d7ff]', accent: 'Verified' },
//   { key: 'totalCategories', label: 'Browse Collections', tone: 'text-[#ff8f70]', accent: 'Structured' },
// ];

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalContent: 0,
//     totalUsers: 0,
//     totalCasts: 0,
//     totalCategories: 0,
//   });

//   useEffect(() => {
//     const loadStats = async () => {
//       try {
//         const [contentRes, usersRes, castRes, categoriesRes] = await Promise.all([
//           API.get('/content/all-admin'),
//           API.get('/users/all-admin'),
//           API.get('/cast/all-admin'),
//           API.get('/category/all-admin'),
//         ]);

//         setStats({
//           totalContent: contentRes.data.total || contentRes.data.data?.length || 0,
//           totalUsers: usersRes.data.total || usersRes.data.data?.length || 0,
//           totalCasts: castRes.data.total || castRes.data.data?.length || 0,
//           totalCategories: categoriesRes.data.total || categoriesRes.data.data?.length || 0,
//         });
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//       }
//     };

//     loadStats();
//   }, []);

//   const quickLinks = useMemo(
//     () => [
//       { to: '/content', title: 'Catalog Control', copy: 'Create titles, posters, trailers, and core metadata from one flow.' },
//       { to: '/movies', title: 'Movie Uploads', copy: 'Attach premium streams and verify playback before publishing.' },
//       { to: '/tvshows', title: 'Series Ops', copy: 'Handle seasons, episodes, and release structure with less friction.' },
//       { to: '/users', title: 'User Oversight', copy: 'Review account status, access state, and restoration actions.' },
//     ],
//     []
//   );

//   const opsPanels = useMemo(
//     () => [
//       {
//         title: 'Next Admin Modules',
//         items: [
//           'Content CRUD with poster, trailer, and video uploads.',
//           'Category and genre management for cleaner discovery.',
//           'User list, status, and restore actions.',
//           'Rental and payment monitoring across the platform.',
//         ],
//       },
//       {
//         title: 'Backend Ready For',
//         items: [
//           'Cookie-based auth plus admin verification.',
//           'Content, season, episode, and category APIs.',
//           'Rental checks for movie and episode watching.',
//           'Dedicated current-user API for profile-driven screens.',
//         ],
//       },
//     ],
//     []
//   );

//   const spotlightCards = useMemo(
//     () => [
//       { label: 'Catalog Health', value: 'Ready', tone: 'text-[#59f2c3]' },
//       { label: 'Public Experience', value: 'In Progress', tone: 'text-[#ffd24a]' },
//       { label: 'Dashboard Shell', value: 'Live', tone: 'text-[#68d7ff]' },
//     ],
//     []
//   );

//   return (
//     <div className="admin-dashboard space-y-6">
//       <section className="admin-hero overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-8">
//         <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
//           <div>
//             <p className="text-sm uppercase tracking-[0.45em] text-[#59f2c3]/85">Dashboard</p>
//             <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-none text-white md:text-6xl xl:text-7xl">
//               Control the OTT platform from one place.
//             </h1>
//             <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-xl">
//               This admin shell is the base for Corona-inspired management screens: content creation, category CRUD,
//               user management, and dashboard reporting.
//             </p>
//             <div className="mt-8 grid gap-4 lg:grid-cols-3">
//               {spotlightCards.map((card) => (
//                 <div key={card.label} className="admin-panel rounded-[1.75rem] border border-white/6 px-6 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
//                   <p className="text-xs uppercase tracking-[0.38em] text-neutral-500">{card.label}</p>
//                   <p className={`mt-5 text-2xl font-semibold md:text-4xl ${card.tone}`}>{card.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <aside className="admin-panel rounded-[1.75rem] border border-white/8 p-6">
//             <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Admin Pulse</p>
//             <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
//               <p>Admin-only session verification protects every route.</p>
//               <p>Movie and episode playback can be tested directly from admin workflows.</p>
//               <p>Soft-deleted records stay visible so moderation and restores stay easy.</p>
//             </div>
//             <div className="mt-6 flex flex-wrap gap-3">
//               <Link
//                 to="/content"
//                 className="rounded-full bg-[#59f2c3] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#79f5ce]"
//               >
//                 Open Content
//               </Link>
//               <Link
//                 to="/movies"
//                 className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
//               >
//                 Movie Uploads
//               </Link>
//             </div>
//           </aside>
//         </div>
//       </section>

//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         {statsConfig.map((item) => (
//           <div key={item.key} className="admin-panel rounded-[1.5rem] border border-white/8 p-5 shadow-[0_14px_30px_rgba(0,0,0,0.2)]">
//             <p className="text-xs uppercase tracking-[0.34em] text-neutral-500">{item.label}</p>
//             <div className="mt-4 flex items-end justify-between gap-3">
//               <p className={`text-3xl font-semibold md:text-4xl ${item.tone}`}>{stats[item.key]}</p>
//               <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-neutral-300">
//                 {item.accent}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
//         <section className="admin-panel rounded-[1.75rem] border border-white/8 p-6">
//           <div>
//             <p className="text-xs uppercase tracking-[0.34em] text-neutral-500">Quick Access</p>
//             <h2 className="mt-2 text-3xl font-semibold text-white">Core admin routes</h2>
//           </div>
//           <div className="mt-5 grid gap-4 md:grid-cols-2">
//             {quickLinks.map((item) => (
//               <Link
//                 key={item.to}
//                 to={item.to}
//                 className="admin-subpanel rounded-[1.5rem] border border-white/8 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
//               >
//                 <p className="text-xs uppercase tracking-[0.3em] text-[#59f2c3]/70">Quick Access</p>
//                 <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
//                 <p className="mt-2 text-sm leading-7 text-neutral-400">{item.copy}</p>
//               </Link>
//             ))}
//           </div>
//         </section>

//         <section className="admin-panel rounded-[1.75rem] border border-white/8 p-6">
//           <p className="text-xs uppercase tracking-[0.34em] text-neutral-500">Operations</p>
//           <div className="mt-4 space-y-4">
//             {opsPanels.map((panel) => (
//               <div key={panel.title} className="admin-subpanel rounded-[1.5rem] border border-white/8 p-6">
//                 <h3 className="text-xl font-semibold text-white">{panel.title}</h3>
//                 <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-400">
//                   {panel.items.map((item) => (
//                     <p key={item}>{item}</p>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../services/api';

const statsConfig = [
  { key: 'totalContent', label: 'Catalog Library', tone: 'text-[#59f2c3]', accent: 'Ready' },
  { key: 'totalUsers', label: 'Audience Accounts', tone: 'text-[#ffd24a]', accent: 'Watching' },
  { key: 'totalCasts', label: 'Cast Profiles', tone: 'text-[#68d7ff]', accent: 'Verified' },
  { key: 'totalCategories', label: 'Browse Collections', tone: 'text-[#ff8f70]', accent: 'Structured' },
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
        title: 'Next Admin Modules',
        items: [
          'Content CRUD with media uploads',
          'Category & genre management',
          'User management system',
          'Payments & rentals monitoring',
        ],
      },
      {
        title: 'Backend Ready For',
        items: [
          'Auth + admin verification',
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

        {/* HERO */}
        <section className="rounded-2xl border border-white/10 p-6 shadow-xl">
          <div className="grid gap-8 xl:grid-cols-2">

            {/* LEFT */}
            <div>
              <p className="text-sm uppercase tracking-widest text-[#59f2c3]">Dashboard</p>

              <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
                Control your OTT platform
              </h1>

              <p className="mt-4 text-slate-300">
                Manage content, users, and analytics from one unified admin panel.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {['Ready', 'In Progress', 'Live'].map((status, i) => (
                  <div key={i} className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-xl font-semibold text-[#59f2c3]">{status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="rounded-xl border border-white/10 p-6">
              <p className="text-sm text-gray-400">Admin Info</p>

              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <p>Secure admin access</p>
                <p>Playback testing enabled</p>
                <p>Soft delete system active</p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/content" className="bg-[#59f2c3] px-4 py-2 rounded text-black">
                  Content
                </Link>
                <Link to="/movies" className="border border-white/20 px-4 py-2 rounded">
                  Movies
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statsConfig.map((item) => (
            <div key={item.key} className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className={`mt-2 text-2xl font-bold ${item.tone}`}>
                {stats[item.key]}
              </p>
            </div>
          ))}
        </div>

        {/* LOWER SECTION */}
        <div className="grid gap-4 xl:grid-cols-2">

          {/* QUICK LINKS */}
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>

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

          {/* OPERATIONS */}
          <div className="rounded-xl border border-white/10 p-6 space-y-4">
            {opsPanels.map((panel) => (
              <div key={panel.title} className="border border-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">{panel.title}</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  {panel.items.map((item, i) => (
                    <li key={i}>• {item}</li>
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