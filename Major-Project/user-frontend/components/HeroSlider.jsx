'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

function formatDate(date) {
  if (!date) return 'Streaming now'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function HeroSlider({ movies }) {
  return (
    <section className="hero-section relative overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6500 }}
        loop
        className="hero-slider"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie._id}>
            {/* <div
              className="hero-image-area"
              style={{
                backgroundImage: `url(${movie.poster?.url})`,
              }}
            > */}
            <div className="hero-image-area relative">
                {/* Poster Image (fallback) */}
                <img
                  src={movie.poster?.url}
                  alt={movie.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Trailer Video */}
                {movie.trailer?.url && (
                  // <video
                  //   className="absolute inset-0 h-full w-full object-cover"
                  //   src={movie.trailer.url}
                  //   autoPlay
                  //   muted
                  //   loop
                  //   playsInline
                  //   onLoadedData={(e) => {
                  //     e.target.style.opacity = 1;
                  //   }}
                  //   style={{ opacity: 0, transition: "opacity 0.5s ease" }}
                  // />
              <div className="absolute inset-0 transition-opacity duration-700 opacity-100">

              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${movie.trailer.url}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailer.url}`}
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
  
                // style={{
                //   opacity: 0,
                //   transition: "opacity 0.6s ease"
                // }}
              />
              </div>
                )}
              <div className="hero-overlay" />
              <div className="hero-glow" />
              <div className="mx-auto flex h-full max-w-7xl items-end px-6 pb-16 pt-32 md:px-10 md:pb-20">
                <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
                  <div className="hero-content max-w-3xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.55em] text-amber-300/85">
                      Prime Entertainment
                    </p>
                    <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
                      {movie.title}
                    </h1>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-neutral-200">
                      <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 uppercase tracking-[0.25em]">
                        {movie.type}
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                        {formatDate(movie.releaseDate)}
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                        {movie.rentalPrice ? `Rent for Rs. ${movie.rentalPrice}` : 'Included'}
                      </span>
                    </div>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-200/90 md:text-lg">
                      {movie.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href={`/${movie.type === 'tv' ? 'tvshow' : 'movies'}/${movie._id}`}
                        className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
                      >
                        Explore Title
                      </Link>
                      {movie.trailer?.url && (
                        <a
                          href={movie.trailer.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Watch Trailer
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="hidden rounded-4xl border border-white/10 bg-black/30 p-6 text-white backdrop-blur lg:block">
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-300/75">
                      Spotlight
                    </p>
                    <div className="mt-5 space-y-5">
                      <div>
                        <p className="text-sm text-neutral-400">Genres</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {movie.categoryIds?.slice(0, 3).map((category) => (
                            <span
                              key={category._id}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-100"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                            Access
                          </p>
                          <p className="mt-3 text-lg font-semibold">OTT Ready</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                            Format
                          </p>
                          <p className="mt-3 text-lg font-semibold uppercase">
                            {movie.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
