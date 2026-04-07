// import { useMemo, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import {
//   XMarkIcon,
//   ChartBarIcon,
//   FilmIcon,
//   FolderIcon,
//   RectangleStackIcon,
//   TagIcon,
//   TvIcon,
//   UserCircleIcon,
//   UsersIcon,
// } from '@heroicons/react/24/outline';

// const groups = [
//   {
//     label: 'Overview',
//     items: [{ path: '/dashboard', label: 'Dashboard', icon: ChartBarIcon }],
//   },
//   {
//     label: 'Catalog',
//     items: [
//       { path: '/content', label: 'Content', icon: RectangleStackIcon },
//       { path: '/movies', label: 'Movies', icon: FilmIcon },
//       { path: '/tvshows', label: 'TV Shows', icon: TvIcon },
//       { path: '/episodes', label: 'Episodes', icon: FolderIcon },
//     ],
//   },
//   {
//     label: 'People',
//     items: [
//       { path: '/cast', label: 'Cast', icon: UserCircleIcon },
//       { path: '/categories', label: 'Categories', icon: TagIcon },
//       { path: '/users', label: 'Users', icon: UsersIcon },
//     ],
//   },
//   {
//     label: 'Commerce',
//     items: [{ path: '/purchases', label: 'Purchases', icon: ChartBarIcon }],
//   },
// ];

// export default function Sidebar({ onNavigate }) {
//   const location = useLocation();
//   const defaultState = useMemo(
//     () =>
//       groups.reduce((acc, group) => {
//         acc[group.label] = group.items.some((item) => location.pathname.startsWith(item.path));
//         return acc;
//       }, {}),
//     [location.pathname]
//   );
//   const [openGroups, setOpenGroups] = useState(defaultState);

//   return (
//     <aside className="admin-sidebar-panel flex h-full w-full flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#11192b_0%,#101728_100%)] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
//       <div className="space-y-8">
//         <div className="space-y-3">
//           <div className="flex items-start justify-between gap-3 lg:block">
//             <p className="text-sm uppercase tracking-[0.45em] text-[#59f2c3]/85">Admin Panel</p>
//             <button
//               type="button"
//               onClick={onNavigate}
//               className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
//               aria-label="Close sidebar"
//             >
//               <XMarkIcon className="h-[18px] w-[18px]" />
//             </button>
//           </div>
//           <div>
//             <h2 className="text-[2.1rem] font-semibold leading-tight text-white">StreamForge</h2>
//             <h3 className="text-[2.1rem] font-semibold leading-tight text-white">Console</h3>
//           </div>
//           <p className="max-w-[16rem] text-sm leading-6 text-neutral-400">Manage catalog, uploads, users, and purchases.</p>
//         </div>

//         <nav className="space-y-4">
//           {groups.map((group) => (
//             <div key={group.label} className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-3.5">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setOpenGroups((prev) => ({
//                     ...prev,
//                     [group.label]: !prev[group.label],
//                   }))
//                 }
//                 className="flex w-full items-center justify-between px-2 py-1 text-left"
//               >
//                 <p className="text-[1rem] font-semibold text-white">{group.label}</p>
//                 <span className="text-lg leading-none text-neutral-500">{openGroups[group.label] ? '-' : '+'}</span>
//               </button>
//               <div className={`space-y-1 overflow-hidden transition-all duration-300 ${openGroups[group.label] ? 'mt-3 max-h-96' : 'max-h-0'}`}>
//                 {group.items.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <NavLink
//                       key={item.path}
//                       to={item.path}
//                       onClick={onNavigate}
//                       className={({ isActive }) =>
//                         `admin-nav-link flex items-center gap-3 rounded-2xl border px-4 py-3 text-base transition ${
//                           isActive
//                             ? 'border-[#59f2c3]/20 bg-[#59f2c3]/10 text-[#d8fff1]'
//                             : 'border-transparent text-neutral-200 hover:border-white/10 hover:bg-white/5 hover:text-white'
//                         }`
//                       }
//                     >
//                       <Icon className="admin-nav-icon shrink-0" />
//                       <span>{item.label}</span>
//                     </NavLink>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>
//       </div>

//       <div className="rounded-[1.6rem] border border-[#59f2c3]/20 bg-[linear-gradient(180deg,rgba(10,54,59,0.95),rgba(9,45,48,0.95))] p-4 text-sm leading-7 text-[#d8fff1]">
//         Sidebar groups behave like collapsible menus, so the dashboard keeps the reference-style layout without making navigation crowded.
//       </div>
//     </aside>
//   );
// }
import { useMemo, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  XMarkIcon,
  ChartBarIcon,
  FilmIcon,
  FolderIcon,
  RectangleStackIcon,
  TagIcon,
  TvIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const groups = [
  {
    label: 'Overview',
    items: [{ path: '/dashboard', label: 'Dashboard', icon: ChartBarIcon }],
  },
  {
    label: 'Catalog',
    items: [
      { path: '/content', label: 'Content', icon: RectangleStackIcon },
      { path: '/movies', label: 'Movies', icon: FilmIcon },
      { path: '/tvshows', label: 'TV Shows', icon: TvIcon },
      { path: '/episodes', label: 'Episodes', icon: FolderIcon },
    ],
  },
  {
    label: 'People',
    items: [
      { path: '/cast', label: 'Cast', icon: UserCircleIcon },
      { path: '/categories', label: 'Categories', icon: TagIcon },
      { path: '/users', label: 'Users', icon: UsersIcon },
    ],
  },
  {
    label: 'Commerce',
    items: [{ path: '/purchases', label: 'Purchases', icon: ChartBarIcon }],
  },
];

export default function Sidebar({ onNavigate }) {
  const location = useLocation();

  const defaultState = useMemo(() => {
    return groups.reduce((acc, group) => {
      acc[group.label] = group.items.some((item) =>
        location.pathname.startsWith(item.path)
      );
      return acc;
    }, {});
  }, [location.pathname]);

  const [openGroups, setOpenGroups] = useState(defaultState);

  // ✅ FIX: sync when route changes
  useEffect(() => {
    setOpenGroups(defaultState);
  }, [defaultState]);

  return (
    // <aside className="flex h-full w-full flex-col justify-between rounded-[2rem] border border-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.3)] admin-sidebar-panel">
    <aside className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.3)] admin-sidebar-panel">
      {/* <div className="space-y-8"> */}
      {/* <div className="space-y-8 overflow-y-auto pr-2"> */}
      <div className="space-y-8 overflow-y-auto pr-2 max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3 lg:block">
            <p className="text-sm uppercase tracking-[0.45em] text-[#59f2c3]/85">
              Admin Panel
            </p>

            <button
              onClick={onNavigate}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:hidden"
            >
              <XMarkIcon className="h-[18px] w-[18px]" />
            </button>
          </div>

          <div>
            <h2 className="text-[2.1rem] font-semibold">StreamForge</h2>
            <h3 className="text-[2.1rem] font-semibold">Console</h3>
          </div>

          <p className="max-w-[16rem] text-sm text-neutral-400">
            Manage catalog, uploads, users, and purchases.
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.label}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-3.5"
            >
              {/* Group Toggle */}
              <button
                onClick={() =>
                  setOpenGroups((prev) => ({
                    ...prev,
                    [group.label]: !prev[group.label],
                  }))
                }
                className="flex w-full items-center justify-between px-2 py-1"
              >
                <p className="font-semibold">{group.label}</p>

                {/* Animated Arrow */}
                <span
                  className={`transition-transform ${
                    openGroups[group.label] ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Items */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openGroups[group.label]
                    ? 'mt-3 max-h-screen'
                    : 'max-h-0'
                }`}
              >
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                          isActive
                            ? 'bg-[#59f2c3]/10 text-[#d8fff1]'
                            : 'text-neutral-200 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Info */}
      {/* <div className="rounded-[1.6rem] border border-[#59f2c3]/20 p-4 text-sm text-[#d8fff1]">
        Sidebar groups behave like collapsible menus for better UX.
      </div> */}
    </aside>
  );
}