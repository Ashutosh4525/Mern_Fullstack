import MovieCard from "@/components/MovieCard";
import { API_BASE_URL } from "@/services/api";

async function getMovieContent() {
  const res = await fetch(`${API_BASE_URL}/content/all?type=movie&limit=24`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const payload = await res.json();
  return payload.data ?? [];
}

export default async function MoviesPage() {
  const movies = await getMovieContent();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#401515_0%,#0a0a0a_48%,#050505_100%)] px-6 pb-16 pt-32 text-white md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">
            Movie Library
          </p>
          <h1 className="text-4xl font-semibold md:text-6xl">
            Big-screen stories, all in one place.
          </h1>
          <p className="text-base text-neutral-300 md:text-lg">
            Browse the latest movies from your catalog and open each title for
            trailers, pricing, and watch access.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} hrefPrefix="/movies" />
          ))}
        </div>
      </section>
    </main>
  );
}
