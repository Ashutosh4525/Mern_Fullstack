'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getContentById, getContentCast } from "@/services/contentService";
import { getUserRentals } from "@/services/rentalService";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";

export default function MovieDetailPage({ params }) {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [hasRental, setHasRental] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      const [contentRes, rentalRes, castRes] = await Promise.all([
        getContentById(id),
        getUserRentals(user._id),
        getContentCast(id)
      ]);

      setMovie(contentRes.data);
      setCast(castRes.data || []);
      const activeRental = rentalRes.data?.some(
        (rental) => rental.contentId?._id === id && new Date(rental.expiresAt) > new Date()
      );
      setHasRental(Boolean(activeRental));
      setLoading(false);
    };

    load();
  }, [id, user]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#080808] px-6 pb-20 pt-28 text-white md:px-10">
        {loading || !movie ? (
          <Loading />
        ) : (
          <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/30">
              <img src={movie.poster?.url} alt={movie.title} className="h-full w-full object-cover" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">{movie.type}</p>
                <h1 className="text-4xl font-semibold md:text-6xl">{movie.title}</h1>
                <p className="max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">{movie.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Release</p>
                  <p className="mt-3 text-lg font-semibold">
                    {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "TBA"}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Rental</p>
                  <p className="mt-3 text-lg font-semibold">
                    {movie.rentalPrice ? `Rs. ${movie.rentalPrice}` : "Included"}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Access</p>
                  <p className="mt-3 text-lg font-semibold">{hasRental ? "Rented" : "Locked"}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {movie.categoryIds?.map((category) => (
                  <span
                    key={category._id}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              {cast.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Cast</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cast.map((castMember) => (
                      <div
                        key={castMember._id}
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        {castMember.castID?.profileImage?.url && (
                          <img
                            src={castMember.castID.profileImage.url}
                            alt={castMember.castID.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-white">{castMember.castID?.name}</p>
                          <p className="text-sm text-neutral-400">
                            {castMember.role || 'Cast Member'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {movie.trailer?.url && (
                  <a
                    href={movie.trailer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Watch Trailer
                  </a>
                )}

                {hasRental ? (
                  <Link
                    href={`/watch/movie/${movie._id}`}
                    className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black transition hover:bg-amber-200"
                  >
                    Watch Now
                  </Link>
                ) : (
                  <Link
                    href={`/payment/${movie._id}?type=movie`}
                    className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black transition hover:bg-amber-200"
                  >
                    Rent and Watch
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </ProtectedRoute>
  );
}
