import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, API_URL } from '../services/api';
import { getAllContent } from '../services/content';
import DataGrid from '../components/DataGrid';

export default function MovieManagement() {
  const navigate = useNavigate();
  const [contentItems, setContentItems] = useState([]);
  const [uploadedMovies, setUploadedMovies] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState('');
  const [duration, setDuration] = useState('');
  const [video, setVideo] = useState(null);

  const loadData = async () => {
    const [contentRes, movieRes] = await Promise.all([
      getAllContent({ type: 'movie', limit: 500 }),
      API.get('/movie/all'),
    ]);

    setContentItems(contentRes.data || []);
    setUploadedMovies(movieRes.data?.data || []);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Error loading movies:', error));
  }, []);

  const columns = [
    {
      field: 'contentId',
      headerName: 'Movie Title',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => params.value?.title || 'N/A',
    },
    { field: 'duration', headerName: 'Duration (min)', minWidth: 130, flex: 0.5 },
    {
      field: 'createdAt',
      headerName: 'Created',
      minWidth: 150,
      flex: 0.6,
      renderCell: (params) => (params.value ? new Date(params.value).toLocaleDateString() : 'N/A'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Movies</p>
        <h1 className="text-3xl font-semibold">Attach movie video files</h1>
        <p className="max-w-3xl text-neutral-300">
          Movie metadata is created under Content. This page attaches the actual movie video and runtime for each movie content record.
        </p>
      </div>

      <form
        className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const payload = new FormData();
          payload.append('contentId', selectedContentId);
          payload.append('duration', duration);
          if (video) payload.append('video', video);
          await API.post('/movie/create', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
          setSelectedContentId('');
          setDuration('');
          setVideo(null);
          await loadData();
        }}
      >
        <select
          value={selectedContentId}
          onChange={(event) => setSelectedContentId(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        >
          <option value="">Select movie content</option>
          {contentItems.map((item) => (
            <option key={item._id} value={item._id}>{item.title}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Duration in minutes"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={(event) => setVideo(event.target.files?.[0] || null)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          required
        />
        <button type="submit" className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
          Upload Movie Video
        </button>
      </form>

      {uploadedMovies.length > 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-400">Latest Upload Preview</p>
          <video
            controls
            className="w-full rounded-3xl border border-white/10 bg-black"
            src={`${API_URL}/movie/watch/${uploadedMovies[0]._id}/stream`}
          />
        </div>
      ) : null}

      <DataGrid
        data={uploadedMovies}
        columns={columns}
        onRowClick={(item) => navigate(`/movies/${item._id}`)}
        onEdit={(item) => navigate(`/movies/${item._id}`)}
        searchFields={['contentId.title']}
      />
    </div>
  );
}
