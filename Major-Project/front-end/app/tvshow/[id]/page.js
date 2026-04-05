'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { API } from "@/services/api";
import { getContentById, getContentCast } from "@/services/contentService";
import { getUserRentals } from "@/services/rentalService";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
export default function TvShowDetailPage({ params }) {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [hasRental, setHasRental] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      const [showRes, seasonRes, rentalRes, castRes] = await Promise.all([
        getContentById(id),
        API.get(`/season/content/${id}`),
        getUserRentals(user._id),
        getContentCast(id)
      ]);

      const seasonPayload = await Promise.all(
        (seasonRes.data?.data ?? []).map(async (season) => {
          const episodeRes = await API.get(`/episode/season/${season._id}`);
          return {
            ...season,
            episodes: episodeRes.data?.data ?? []
          };
        })
      );

      setShow(showRes.data);
      setCast(castRes.data || []);
      setSeasons(seasonPayload);
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
      <main className="min-h-screen bg-[#061018] px-6 pb-20 pt-28 text-white md:px-10">
        {loading || !show ? (
          // <div className="mx-auto max-w-7xl text-neutral-300">Loading series details...</div>
          <Loading/>
        ) : (
          <section className="mx-auto max-w-7xl space-y-10">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="overflow-hidden rounded-4xl border border-cyan-400/15 bg-neutral-950 shadow-2xl shadow-black/30">
                <img src={show.poster?.url} alt={show.title} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.45em] text-cyan-300/80">TV Series</p>
                <h1 className="text-4xl font-semibold md:text-6xl">{show.title}</h1>
                <p className="max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">{show.description}</p>

                <div className="flex flex-wrap gap-3">
                  {show.categoryIds?.map((category) => (
                    <span
                      key={category._id}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {show.trailer?.url && (
                    <a
                      href={show.trailer.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                    >
                      Watch Trailer
                    </a>
                  )}

                  {hasRental ? (
                    <span className="rounded-full bg-emerald-400/15 px-6 py-3 font-semibold text-emerald-200">
                      Rental Active
                    </span>
                  ) : (
                    <Link
                      href={`/payment/${show._id}?type=tv`}
                      className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black transition hover:bg-amber-200"
                    >
                      Rent Series Access
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
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
                            {castMember.role || "Cast Member"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold md:text-3xl">Seasons and Episodes</h2>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">{seasons.length} Seasons</p>
              </div>

              <div className="space-y-4">
                {seasons.map((season) => (
                  <section
                    key={season._id}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-semibold">Season {season.seasonNumber}</h3>
                      <span className="text-sm text-neutral-400">{season.episodes.length} Episodes</span>
                    </div>

                    <div className="space-y-3">
                      {season.episodes.map((episode) => (
                        <div
                          key={episode._id}
                          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
                        >
                          <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                              Episode {episode.episodeNumber}
                            </p>
                            <p className="mt-2 text-lg font-medium">{episode.title}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-neutral-300">
                              {episode.duration ? `${episode.duration} mins` : "Duration TBA"}
                            </span>
                            {hasRental ? (
                              <Link
                                href={`/watch/episode/${episode._id}`}
                                className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-black"
                              >
                                Watch
                              </Link>
                            ) : (
                              <Link
                                href={`/payment/${show._id}?type=tv`}
                                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white"
                              >
                                Rent First
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </ProtectedRoute>
  );
}
