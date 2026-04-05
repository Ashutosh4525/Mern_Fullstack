import MovieCard from "@/components/MovieCard";
import { API_BASE_URL } from "@/services/api";

async function getSearchResults(query) {
  const res = await fetch(`${API_BASE_URL}/content/all?search=${encodeURIComponent(query)}&limit=50`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  const payload = await res.json();
  return payload.data ?? [];
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const query = sp?.q || '';
  const results = query ? await getSearchResults(query) : [];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#401515_0%,#0a0a0a_48%,#050505_100%)] px-6 pb-16 pt-32 text-white md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">
            Search Results
          </p>
          <h1 className="text-4xl font-semibold md:text-6xl">
            {query ? `Results for "${query}"` : 'Search Movies & TV Shows'}
          </h1>
          <p className="text-base text-neutral-300 md:text-lg">
            {query
              ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for your search.`
              : 'Use the search bar in the header to find movies and TV shows.'
            }
          </p>
        </div>

        {query && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((item) => (
              <MovieCard
                key={item._id}
                movie={item}
                hrefPrefix={item.type === 'tv' ? '/tvshow' : '/movies'}
              />
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-400 mb-4">No results found</p>
            <p className="text-neutral-500">
              Try adjusting your search terms or browse our catalog.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}