import Link from "next/link";

const services = [
  {
    title: "Premium Streaming Catalog",
    description:
      "Curated movie and TV show collections with fast search, personalized browsing, and rich genre discovery.",
  },
  {
    title: "Secure Rental Experience",
    description:
      "Fast, secure rental flows with payment protection and instant access to your selected titles.",
  },
  {
    title: "AI-Assisted Recommendations",
    description:
      "Smart suggestions based on your mood and catalog availability, powered by Gemina-style generative AI.",
  },
  {
    title: "Admin Content Control",
    description:
      "Full admin management for movies, TV shows, users, and streaming content in a modern dashboard layout.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-16">
        <section className="rounded-4xl border border-white/10 bg-[#0d0d11]/90 p-10 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Services</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">What StreamForge offers.</h1>
          <p className="mt-6 max-w-3xl text-neutral-300 leading-8">
            From catalog management to personalized discovery and secure rentals, StreamForge delivers a modern streaming platform built for both viewers and content managers.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-400"
          >
            Talk to sales
          </Link>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-4xl border border-white/10 bg-[#111827]/90 p-8 shadow-2xl shadow-black/30">
              <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Service</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{service.title}</h2>
              <p className="mt-4 text-neutral-300 leading-7">{service.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-4xl border border-white/10 bg-[#0d0d11]/90 p-10 shadow-2xl shadow-black/30 backdrop-blur">
          <h2 className="text-3xl font-semibold">Why choose StreamForge?</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold">Fast discovery</h3>
              <p className="mt-3 text-neutral-400">Search, filter, and preview titles with a fluid interface designed for quick browsing.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold">Catalog accuracy</h3>
              <p className="mt-3 text-neutral-400">Real catalog-aware recommendations and a unified admin experience keep content accurate.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold">Secure playback</h3>
              <p className="mt-3 text-neutral-400">Protected access and playback controls ensure your content is delivered safely.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
