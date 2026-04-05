'use client'

import { useEffect, useState } from "react";
import { API } from "@/services/api";
import { getAllContent } from "@/services/contentService";

export default function AdminCastPage() {
  const [cast, setCast] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('cast');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profileImage: null
  });
  const [movieCastForm, setMovieCastForm] = useState({
    contentId: '',
    castID: '',
    role: ''
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [castRes, movieCastRes, contentRes] = await Promise.all([
      API.get('/cast/all?limit=100'),
      API.get('/movie-Cast/all'),
      getAllContent({ limit: 100 })
    ]);
    setCast(castRes.data.data || []);
    setMovieCast(movieCastRes.data.data || []);
    setContent(contentRes.data || []);
    setLoading(false);
  };

  const fetchCast = async () => {
    try {
      const response = await API.get('/cast/all');
      setCast(response.data.data || []);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const response = await API.get('/movie-Cast/all');
      setMovieCast(response.data.data || []);
    } catch (error) {
      console.error('Error fetching movie cast:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCast = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.bio) formDataToSend.append('bio', formData.bio);
      if (formData.profileImage) formDataToSend.append('profileImage', formData.profileImage);

      const response = await API.post('/cast/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        load();
        setFormData({ name: '', bio: '', profileImage: null });
      }
    } catch (error) {
      console.error('Error creating cast:', error);
    }
  };

  const handleEditCast = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      bio: item.bio || '',
      profileImage: null
    });
  };

  const handleUpdateCast = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.bio) formDataToSend.append('bio', formData.bio);
      if (formData.profileImage) formDataToSend.append('profileImage', formData.profileImage);

      const response = await API.put(`/cast/update/${editingItem._id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        load();
        setEditingItem(null);
        setFormData({ name: '', bio: '', profileImage: null });
      }
    } catch (error) {
      console.error('Error updating cast:', error);
    }
  };

  const handleDeleteCast = async (id) => {
    if (!confirm('Are you sure you want to delete this cast member?')) return;

    try {
      await API.patch(`/cast/delete/${id}`);
      load();
    } catch (error) {
      console.error('Error deleting cast:', error);
    }
  };

  const handleCreateMovieCast = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/movie-Cast/create', movieCastForm);
      if (response.data.success) {
        load();
        setMovieCastForm({ contentId: '', castID: '', role: '' });
      }
    } catch (error) {
      console.error('Error creating movie cast:', error);
    }
  };

  const handleDeleteMovieCast = async (id) => {
    if (!confirm('Are you sure you want to remove this cast from the movie/TV show?')) return;

    try {
      await API.delete(`/movie-Cast/${id}`);
      load();
    } catch (error) {
      console.error('Error deleting movie cast:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Cast Management</p>
        <h1 className="text-3xl font-semibold">Manage Cast and Movie Cast</h1>
        <p className="max-w-3xl text-neutral-300">
          Create and manage cast members and their roles in movies and TV shows.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab('cast')}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === 'cast'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Cast Members
        </button>
        <button
          onClick={() => setActiveTab('moviecast')}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === 'moviecast'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Movie/TV Cast
        </button>
      </div>

      {activeTab === 'cast' && (
        <div className="space-y-6">
          {/* Create/Edit Cast Form */}
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Cast Member' : 'Create New Cast Member'}
            </h2>
            <form onSubmit={editingItem ? handleUpdateCast : handleCreateCast} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white h-24"
                  placeholder="Optional biography..."
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, profileImage: e.target.files[0]})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({ name: '', bio: '', profileImage: null });
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Cast List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cast.map((member) => (
              <div
                key={member._id}
                className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5"
              >
                {member.profileImage?.url && (
                  <img
                    src={member.profileImage.url}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-neutral-400 mt-1">{member.bio}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditCast(member)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCast(member._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'moviecast' && (
        <div className="space-y-6">
          {/* Create Movie Cast Form */}
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-6">
            <h2 className="text-xl font-semibold mb-4">Add Cast to Movie/TV Show</h2>
            <form onSubmit={handleCreateMovieCast} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Content *</label>
                <select
                  value={movieCastForm.contentId}
                  onChange={(e) => setMovieCastForm({...movieCastForm, contentId: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  required
                >
                  <option value="">Select content</option>
                  {content.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title} ({item.type})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Cast Member *</label>
                <select
                  value={movieCastForm.castID}
                  onChange={(e) => setMovieCastForm({...movieCastForm, castID: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  required
                >
                  <option value="">Select a cast member</option>
                  {cast.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Role</label>
                <input
                  type="text"
                  value={movieCastForm.role}
                  onChange={(e) => setMovieCastForm({...movieCastForm, role: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  placeholder="e.g., Lead Actor, Director, etc."
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Add to Cast
              </button>
            </form>
          </div>

          {/* Movie Cast List */}
          <div className="grid gap-4">
            {movieCast.map((item) => (
              <div
                key={item._id}
                className="rounded-[1.5rem] border border-white/10 bg-[#0b1220] p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {item.castID?.profileImage?.url && (
                      <img
                        src={item.castID.profileImage.url}
                        alt={item.castID.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{item.castID?.name}</h3>
                      <p className="text-sm text-neutral-400">
                        Role: {item.role || 'Not specified'}
                      </p>
                      <p className="text-sm text-neutral-400">
                        Content: {item.contentId?.title || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMovieCast(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
