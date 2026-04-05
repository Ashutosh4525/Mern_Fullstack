import HeroSlider from "@/components/HeroSlider";
import MovieCard from "@/components/MovieCard";
import AIRecommendations from "@/components/AIRecommendations";
import { API_BASE_URL } from "@/services/api";
import NotFound from "./not-found";

async function getMovies() {
  const res = await fetch(`${API_BASE_URL}/content/all`, {
    cache: "no-store"
  });

  if (!res.ok) {
    // throw new Error("Failed to fetch homepage content");
    return null;
  }

  const data = await res.json();
  return data.data ?? [];
}

function groupByType(items, type) {
  return items.filter((item) => item.type === type);
}

function uniqueCategories(items) {
  const map = new Map();

  items.forEach((item) => {
    item.categoryIds?.forEach((category) => {
      if (!map.has(category._id)) {
        map.set(category._id, category);
      }
    });
  });

  return Array.from(map.values()).slice(0, 8);
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{title}</h2>
      </div>
      <p className="max-w-xl text-sm leading-7 text-neutral-400 md:text-base">{copy}</p>
    </div>
  );
}

export default async function Home() {
  const movies = await getMovies();
  if(!movies || movies.length === 0) {return (<NotFound/>)}
  const featured = movies.slice(0, 4);
  const trendingMovies = groupByType(movies, "movie").slice(0, 4);
  const topSeries = groupByType(movies, "tv").slice(0, 4);
  const categories = uniqueCategories(movies);
  const latestDrops = movies.slice(4, 8);
  const heroItems = movies.slice(0, 5);

  

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <HeroSlider movies={heroItems} />

      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-6 md:px-10">
        <div className="grid gap-4 rounded-4xl border border-white/10 bg-[#0b0b0f]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur xl:grid-cols-4">
          {[
            { label: "Premium catalog", value: `${movies.length}+ titles`, tone: "text-amber-300" },
            { label: "Movies", value: `${trendingMovies.length} featured`, tone: "text-white" },
            { label: "Series", value: `${topSeries.length} spotlight`, tone: "text-cyan-300" },
            { label: "Watch flow", value: "Rental ready", tone: "text-emerald-300" }
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/3 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{item.label}</p>
              <p className={`mt-3 text-2xl font-semibold ${item.tone}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading
          eyebrow="Browse Genres"
          title="Designed for quick discovery, just like a real OTT homepage."
          copy="The reference layout uses strong hero placement and easy category discovery. This version keeps your backend dynamic while giving the same premium landing-page feel."
        />

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category._id}
              className="rounded-full border border-white/10 bg-white/3 px-5 py-3 text-sm text-neutral-200 transition hover:border-amber-300/40 hover:text-white"
            >
              {category.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <SectionHeading
          eyebrow="Trending Now"
          title="Spotlight movies with the big-card OTT treatment."
          copy="These cards can stay backend-driven while still feeling like a polished streaming storefront."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} hrefPrefix="/movies" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(135deg,#33170d_0%,#100d11_55%,#090909_100%)] p-8">
            <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Featured Collection</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold md:text-5xl">
              Premium launches, dark visuals, and long-form storytelling.
            </h2>
            <p className="mt-5 max-w-2xl text-neutral-300">
              This block mirrors the editorial feel of the reference template and works well for curated campaigns, banners, or subscription upsells.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {featured.slice(0, 2).map((item) => (
                <div key={item._id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{item.type}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-4xl border border-white/10 bg-[#0b0b0f] p-6">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300/80">Fresh Drops</p>
            {latestDrops.map((item) => (
              <div key={item._id} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/3 p-3">
                <img src={item.poster?.url} alt={item.title} className="h-20 w-16 rounded-2xl object-cover" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{item.type}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    {item.rentalPrice ? `Rs. ${item.rentalPrice}` : "Included access"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <SectionHeading
          eyebrow="Top Series"
          title="TV shows presented as binge-worthy rows."
          copy="This section gives you the same OTT rhythm: hero first, then curated rows for movies and series."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {topSeries.map((show) => (
            <MovieCard key={show._id} movie={show} hrefPrefix="/tvshow" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <AIRecommendations />
      </section>
    </main>
  );
}
