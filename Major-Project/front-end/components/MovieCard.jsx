import Link from "next/link";

export default function MovieCard({ movie, hrefPrefix = "/movies" }) {
  return (
    <Link href={`${hrefPrefix}/${movie._id}`}>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 transition hover:-translate-y-1 hover:border-white/20">
        <img
          src={movie.poster?.url}
          alt={movie.title}
          className="h-72 w-full object-cover"
        />
        <div className="space-y-2 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
            {movie.type}
          </p>
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
          <p className="text-sm text-neutral-400 line-clamp-2">
            {movie.description || "Explore this title in your streaming library."}
          </p>
        </div>
      </div>
    </Link>
  );
}
