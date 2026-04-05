'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getAllContent } from '@/services/contentService';
import { getMovieRecommendations } from '@/services/aiService';

export default function AIRecommendations() {
  const { user } = useAppSelector((state) => state.auth);
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      const catalogRes = await getAllContent({ limit: 40 });
      const catalog = catalogRes.data || [];
      const recs = await getMovieRecommendations(input, catalog);
      setRecommendations(recs);
    } catch (err) {
      console.error(err);
      setError('Error fetching recommendations. Please try again later.');
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">AI Movie Recommendations</h2>
        <p className="mb-4 text-neutral-300">
          Sign in to get personalized recommendations generated from the current movie and TV show catalog.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
        >
          Sign in to continue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">AI Movie Recommendations</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you're in the mood for..."
          className="w-full p-3 bg-gray-800 text-white rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-amber-300 text-black rounded-lg disabled:opacity-50"
        >
          {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
        </button>
      </form>
      {error && <p className="text-sm text-rose-300">{error}</p>}
      {recommendations && (
        <div className="text-white whitespace-pre-wrap">
          {recommendations}
        </div>
      )}
    </div>
  );
}