import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import { getAllContent } from '../services/content';
import DataGrid from '../components/DataGrid';

export default function CastManagement() {
  const navigate = useNavigate();
  const [cast, setCast] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [content, setContent] = useState([]);
  const [activeTab, setActiveTab] = useState('cast');
  const [formData, setFormData] = useState({ name: '', bio: '', profileImage: null });
  const [movieCastForm, setMovieCastForm] = useState({ contentId: '', castID: '', role: '' });

  const loadData = async () => {
    const [castRes, movieCastRes, contentRes] = await Promise.all([
      API.get('/cast/all-admin'),
      API.get('/movie-Cast/all'),
      getAllContent({ limit: 500 }),
    ]);

    setCast(castRes.data.data || []);
    setMovieCast(movieCastRes.data.data || []);
    setContent(contentRes.data || []);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Error loading cast:', error));
  }, []);

  const castColumns = [
    { field: 'name', headerName: 'Name', minWidth: 220, flex: 1 },
    {
      field: 'bio',
      headerName: 'Bio',
      minWidth: 280,
      flex: 1.2,
      renderCell: (params) => params.value || 'No bio',
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

  const movieCastColumns = [
    {
      field: 'castID',
      headerName: 'Cast Member',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => params.value?.name || 'N/A',
    },
    {
      field: 'contentId',
      headerName: 'Content',
      minWidth: 240,
      flex: 1,
      renderCell: (params) => params.value?.title || 'N/A',
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 180,
      flex: 0.7,
      renderCell: (params) => params.value || 'Not specified',
    },
  ];

  const renderCastActions = (item) => (
    <button
      onClick={async (event) => {
        event.stopPropagation();
        if (item.isDeleted) {
          await API.patch(`/cast/restore/${item._id}`);
        } else {
          await API.patch(`/cast/delete/${item._id}`);
        }
        await loadData();
      }}
      className={`rounded px-3 py-1 text-sm text-white ${item.isDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
    >
      {item.isDeleted ? 'Restore' : 'Disable'}
    </button>
  );

  const renderMovieCastActions = (item) => (
    <button
      onClick={async (event) => {
        event.stopPropagation();
        await API.delete(`/movie-Cast/${item._id}`);
        await loadData();
      }}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
    >
      Remove
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Cast Management</p>
        <h1 className="text-3xl font-semibold">Manage Cast and Movie Cast</h1>
      </div>

      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab('cast')}
          className={`px-4 py-2 text-sm font-semibold ${activeTab === 'cast' ? 'border-b-2 border-emerald-400 text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
        >
          Cast Members
        </button>
        <button
          onClick={() => setActiveTab('moviecast')}
          className={`px-4 py-2 text-sm font-semibold ${activeTab === 'moviecast' ? 'border-b-2 border-emerald-400 text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
        >
          Movie/TV Cast
        </button>
      </div>

      {activeTab === 'cast' ? (
        <div className="space-y-6">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const payload = new FormData();
              payload.append('name', formData.name);
              if (formData.bio) payload.append('bio', formData.bio);
              if (formData.profileImage) payload.append('profileImage', formData.profileImage);
              await API.post('/cast/create', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
              setFormData({ name: '', bio: '', profileImage: null });
              await loadData();
            }}
            className="space-y-4 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
          >
            <h2 className="text-xl font-semibold">Create New Cast Member</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Name"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
              required
            />
            <textarea
              value={formData.bio}
              onChange={(event) => setFormData((prev) => ({ ...prev, bio: event.target.value }))}
              placeholder="Bio"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none h-28"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setFormData((prev) => ({ ...prev, profileImage: event.target.files?.[0] || null }))}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            />
            <button type="submit" className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
              Create Cast Member
            </button>
          </form>

          <DataGrid
            data={cast}
            columns={castColumns}
            onRowClick={(item) => navigate(`/cast/${item._id}`)}
            onEdit={(item) => navigate(`/cast/${item._id}`)}
            actions={renderCastActions}
            searchFields={['name', 'bio']}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await API.post('/movie-Cast/create', movieCastForm);
              setMovieCastForm({ contentId: '', castID: '', role: '' });
              await loadData();
            }}
            className="space-y-4 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
          >
            <h2 className="text-xl font-semibold">Add Cast to Movie/TV Show</h2>
            <select
              value={movieCastForm.contentId}
              onChange={(event) => setMovieCastForm((prev) => ({ ...prev, contentId: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 outline-none"
              required
            >
              <option value="">Select content</option>
              {content.map((item) => (
                <option key={item._id} value={item._id}>{item.title} ({item.type})</option>
              ))}
            </select>
            <select
              value={movieCastForm.castID}
              onChange={(event) => setMovieCastForm((prev) => ({ ...prev, castID: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 outline-none"
              required
            >
              <option value="">Select cast member</option>
              {cast.map((member) => (
                <option key={member._id} value={member._id}>{member.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={movieCastForm.role}
              onChange={(event) => setMovieCastForm((prev) => ({ ...prev, role: event.target.value }))}
              placeholder="Role"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
            />
            <button type="submit" className="w-fit rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">
              Add to Cast
            </button>
          </form>

          <DataGrid
            data={movieCast}
            columns={movieCastColumns}
            actions={renderMovieCastActions}
            searchFields={['castID.name', 'contentId.title', 'role']}
          />
        </div>
      )}
    </div>
  );
}
