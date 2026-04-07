import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, API_URL } from '../services/api';
import DataGrid from '../components/DataGrid';

export default function EpisodeManagement() {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);

  const loadData = async () => {
    const response = await API.get('/episode/all-admin/all');
    setEpisodes(response.data?.data || []);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Error fetching episodes:', error));
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 220, flex: 1 },
    { field: 'episodeNumber', headerName: 'Episode #', minWidth: 120, flex: 0.4 },
    { field: 'duration', headerName: 'Duration', minWidth: 120, flex: 0.5 },
    {
      field: 'seasonId',
      headerName: 'Season',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => `S${params.value?.seasonNumber || 'N/A'}`,
    },
    {
      field: 'isDeleted',
      headerName: 'Status',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => (
        <span className={`text-xs font-semibold uppercase ${params.value ? 'text-red-400' : 'text-green-400'}`}>
          {params.value ? 'Disabled' : 'Active'}
        </span>
      ),
    },
  ];

  const renderActions = (item) => (
    <button
      onClick={async (event) => {
        event.stopPropagation();
        if (item.isDeleted) {
          await API.patch(`/episode/restore/${item._id}`);
        } else {
          await API.patch(`/episode/delete/${item._id}`);
        }
        await loadData();
      }}
      className={`rounded px-3 py-1 text-sm text-white ${item.isDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
    >
      {item.isDeleted ? 'Restore' : 'Disable'}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Episodes</p>
        <h1 className="text-3xl font-semibold">Review uploaded episode videos</h1>
        <p className="max-w-3xl text-neutral-300">
          This page gives admins a quick way to inspect episode records and jump into the full editor for video updates.
        </p>
      </div>

      {episodes.length > 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-400">Latest Episode Preview</p>
          <video controls className="w-full rounded-3xl border border-white/10 bg-black" src={`${API_URL}/episode/watch/${episodes[0]._id}/stream`} />
        </div>
      ) : null}

      <DataGrid
        data={episodes}
        columns={columns}
        onRowClick={(item) => navigate(`/episodes/${item._id}`)}
        onEdit={(item) => navigate(`/episodes/${item._id}`)}
        actions={renderActions}
        searchFields={['title']}
      />
    </div>
  );
}
