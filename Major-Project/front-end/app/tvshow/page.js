import MovieCard from "@/components/MovieCard";
import { API_BASE_URL } from "@/services/api";

async function getTvContent() {
  const res = await fetch(`${API_BASE_URL}/content/all?type=tv&limit=24`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch TV shows");
  }

  const payload = await res.json();
  return payload.data ?? [];
}

export default async function TvShowPage() {
  const shows = await getTvContent();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#12324a_0%,#07131d_48%,#03070b_100%)] px-6 pb-16 pt-32 text-white md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.45em] text-cyan-300/80">
            Series Library
          </p>
          <h1 className="text-4xl font-semibold md:text-6xl">
            Episode-driven worlds worth staying in.
          </h1>
          <p className="text-base text-neutral-300 md:text-lg">
            Explore TV content, season breakdowns, and episode lists from your
            backend catalog.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shows.map((show) => (
            <MovieCard key={show._id} movie={show} hrefPrefix="/tvshow" />
          ))}
        </div>
      </section>
    </main>
  );
}
