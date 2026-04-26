const stats = [
  { label: "Content", value: "Managed", tone: "text-emerald-300" },
  { label: "Users", value: "Tracked", tone: "text-amber-300" },
  { label: "Orders", value: "Visible", tone: "text-cyan-300" }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold md:text-5xl">
          Manage the platform from one dashboard.
        </h1>
        <p className="max-w-3xl text-neutral-300">
          Review catalog activity, manage users, and keep purchases visible from a single admin workspace.
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
          <h2 className="text-xl font-semibold">Core Workflows</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p>Content CRUD with media uploads.</p>
            <p>Category and genre management.</p>
            <p>User status and account oversight.</p>
            <p>Rental and payment monitoring.</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6">
          <h2 className="text-xl font-semibold">Platform Coverage</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p>Admin authentication and verification.</p>
            <p>Content, season, episode, and category APIs.</p>
            <p>Rental access checks for playback.</p>
            <p>Profile and account APIs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
