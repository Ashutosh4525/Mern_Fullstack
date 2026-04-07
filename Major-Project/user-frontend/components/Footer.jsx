'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-black text-sm font-black">
                SF
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">StreamForge</p>
                <p className="text-sm text-neutral-400">Premium entertainment on demand.</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-neutral-400">
              Build your streaming experience with movies, TV shows, rentals, and curated recommendations.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.45em] text-neutral-400">Explore</h3>
            <nav className="mt-4 space-y-2 text-sm text-neutral-300">
              <Link href="/" className="block hover:text-white">Home</Link>
              <Link href="/movies" className="block hover:text-white">Movies</Link>
              <Link href="/tvshow" className="block hover:text-white">TV Shows</Link>
              <Link href="/services" className="block hover:text-white">Services</Link>
              <Link href="/contact" className="block hover:text-white">Contact</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.45em] text-neutral-400">Support</h3>
            <div className="mt-4 space-y-2 text-sm text-neutral-300">
              <p>help@streamforge.com</p>
              <p>+91 98765 43210</p>
              <p>123 Stream Ave, Mumbai, India</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.45em] text-neutral-400">Legal</h3>
            <div className="mt-4 space-y-2 text-sm text-neutral-300">
              <Link href="/" className="block hover:text-white">Terms of Service</Link>
              <Link href="/" className="block hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-neutral-500">
          © {year} StreamForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
