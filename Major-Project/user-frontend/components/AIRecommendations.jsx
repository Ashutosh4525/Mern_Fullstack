// 'use client'

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { useAppSelector } from '@/store/hooks';
// import MovieCard from '@/components/MovieCard';

// export default function AIRecommendations() {
//   const { user } = useAppSelector((state) => state.auth);

//   const [input, setInput] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [mounted, setMounted] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError('');
//     setRecommendations([]);
//     setPage(1);

//     try {
//       const res = await fetch('/api/recommend', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ input, limit: 5, page: 1 }),
//       });

//       const data = await res.json();

//       if (!data.success) throw new Error();

//       setRecommendations(data.data);
//       setHasMore(data.hasMore);
//     } catch (err) {
//       setError('Error fetching recommendations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMore = async () => {
//     const nextPage = page + 1;

//     setLoading(true);

//     try {
//       const res = await fetch('/api/recommend', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ input, limit: 5, page: nextPage }),
//       });

//       const data = await res.json();

//       if (!data.success) throw new Error();

//       setRecommendations((prev) => [...prev, ...data.data]);
//       setPage(nextPage);
//       setHasMore(data.hasMore);
//     } catch (err) {
//       setError('Error loading more');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!mounted) {
//     return <div className="p-6 text-white">Loading...</div>;
//   }

//   if (!user) {
//     return (
//       <div className="p-6 text-white">
//         <p>Sign in to get AI recommendations</p>
//         <Link href="/login">Login</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg text-white">
//       <h2 className="text-2xl font-bold mb-4">AI Movie Recommendations</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="w-full p-3 bg-gray-800 rounded-lg"
//           placeholder="Describe your mood..."
//           required
//         />

//         <button
//           disabled={loading}
//           className="mt-2 px-4 py-2 bg-amber-300 text-black rounded-lg disabled:opacity-50"
//         >
//           {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
//         </button>
//       </form>

//       {error && <p className="text-red-400 mt-2">{error}</p>}

//       {!loading && recommendations.length === 0 && (
//         <p className="text-neutral-400 mt-4">No results found</p>
//       )}

//       <div className="grid gap-4 mt-6 sm:grid-cols-2">
//         {recommendations.map((movie) => (
//           <MovieCard key={movie._id} movie={movie} />
//         ))}
//       </div>

//       {hasMore && (
//         <button
//           onClick={loadMore}
//           disabled={loading}
//           className="mt-4 px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
//         >
//           {loading ? 'Loading...' : 'Load More'}
//         </button>
//       )}
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import MovieCard from '@/components/MovieCard';

export default function AIRecommendations() {
  const { user } = useAppSelector((state) => state.auth);

  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 🔁 Reusable API function (DRY)
  const fetchRecommendations = async (pageNum, searchQuery) => {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: searchQuery,
        limit: 5,
        page: pageNum,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  };

  // 🚀 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setRecommendations([]);
    setPage(1);
    setHasSearched(true);
    setQuery(input); // freeze query for pagination

    try {
      const data = await fetchRecommendations(1, input);

      setRecommendations(data.data);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Load more
  const loadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    setError('');

    try {
      const data = await fetchRecommendations(nextPage, query);

      setRecommendations((prev) => [...prev, ...data.data]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  // 🔒 Not logged in
  if (!user) {
    return (
      <div className="p-6 text-white">
        <p>Sign in to get AI recommendations</p>
        <Link href="/login" className="text-amber-300 underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">
        AI Movie Recommendations
      </h2>

      {/* 🔍 Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg"
          placeholder="Describe your mood..."
          required
        />

        <div className="flex gap-2 mt-2">
          <button
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-amber-300 text-black rounded-lg disabled:opacity-50"
          >
            {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </button>

          <button
            type="button"
            onClick={() => setInput('')}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            Clear
          </button>
        </div>
      </form>

      {/* ❌ Error */}
      {error && <p className="text-red-400 mt-2">{error}</p>}

      {/* ⚠️ Empty state */}
      {hasSearched && !loading && recommendations.length === 0 && (
        <p className="text-neutral-400 mt-4">No results found</p>
      )}

      {/* 🎬 Results */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        {recommendations.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* ➕ Load More */}
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loadingMore}
          className="mt-4 px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
        >
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}