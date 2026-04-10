'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import MovieCard from '@/components/MovieCard';

export default function AIRecommendations() {
  const { user } = useAppSelector((state) => state.auth);

  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setRecommendations([]);
    setPage(1);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, limit: 5, page: 1 }),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setRecommendations(data.data);
      setHasMore(data.hasMore);
    } catch (err) {
      setError('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;

    setLoading(true);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, limit: 5, page: nextPage }),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setRecommendations((prev) => [...prev, ...data.data]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch (err) {
      setError('Error loading more');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-6 text-white">
        <p>Sign in to get AI recommendations</p>
        <Link href="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">AI Movie Recommendations</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg"
          placeholder="Describe your mood..."
          required
        />

        <button
          disabled={loading}
          className="mt-2 px-4 py-2 bg-amber-300 text-black rounded-lg disabled:opacity-50"
        >
          {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
        </button>
      </form>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      {!loading && recommendations.length === 0 && (
        <p className="text-neutral-400 mt-4">No results found</p>
      )}

      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        {recommendations.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}