const stats = [
  { label: "Catalog Health", value: "Ready", tone: "text-emerald-300" },
  { label: "Public Experience", value: "In Progress", tone: "text-amber-300" },
  { label: "Dashboard Shell", value: "Live", tone: "text-cyan-300" }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold md:text-5xl">
          Control the OTT platform from one place.
        </h1>
        <p className="max-w-3xl text-neutral-300">
          This admin shell is the base for Corona-inspired management screens:
          content creation, category CRUD, user management, and dashboard
          reporting.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              {stat.label}
            </p>
            <p className={`mt-3 text-2xl font-semibold ${stat.tone}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6">
          <h2 className="text-xl font-semibold">Next Admin Modules</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p>Content CRUD with poster, trailer, and video uploads.</p>
            <p>Category and genre management.</p>
            <p>User list, status, and restore actions.</p>
            <p>Rental and payment monitoring.</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6">
          <h2 className="text-xl font-semibold">Backend Ready For</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p>Cookie-based auth plus admin verification.</p>
            <p>Content, season, episode, and category APIs.</p>
            <p>Rental checks for movie and episode watching.</p>
            <p>Dedicated current-user API for profile-driven screens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
