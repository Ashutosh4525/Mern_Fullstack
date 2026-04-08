import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCurrentAdminPassword,
  clearAuthError,
  fetchCurrentAdmin,
  updateCurrentAdmin,
} from '../services/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user: admin, hydrated, status, error } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    avatar: null,
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!hydrated && status !== 'loading') {
      dispatch(fetchCurrentAdmin());
    }
  }, [dispatch, hydrated, status]);

  useEffect(() => {
    if (!admin) {
      return;
    }

    setProfileForm({
      firstname: admin.firstname || '',
      lastname: admin.lastname || '',
      email: admin.email || '',
      avatar: null,
    });
    setAvatarPreview(admin.avatar?.url || '');
  }, [admin]);

  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0] || null;
    handleProfileChange('avatar', file);

    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    dispatch(clearAuthError());

    try {
      const updatedAdmin = await dispatch(updateCurrentAdmin(profileForm)).unwrap();
      setProfileForm((prev) => ({
        ...prev,
        avatar: null,
      }));
      setAvatarPreview(updatedAdmin?.avatar?.url || avatarPreview);
      setMessage('Profile updated successfully.');
    } catch (err) {}
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    dispatch(clearAuthError());

    try {
      await dispatch(changeCurrentAdminPassword(passwordForm)).unwrap();
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
      });
      setMessage('Password changed successfully.');
    } catch (err) {}
  };

  if (!hydrated || status === 'loading') {
    return (
      <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-8 text-white">
        Loading your admin profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,25,43,0.96),rgba(10,17,32,0.94))] p-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#59f2c3]/10 text-2xl font-semibold text-[#d8fff1]">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Admin avatar" className="h-full w-full object-cover" />
            ) : (
              `${admin?.firstname?.[0] || 'A'}${admin?.lastname?.[0] || ''}`
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#59f2c3]/80">Admin Profile</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              {[admin?.firstname, admin?.lastname].filter(Boolean).join(' ') || 'Administrator'}
            </h2>
            <p className="mt-2 text-sm text-neutral-400">{admin?.email}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-white/10 bg-[#091120] p-6 shadow-xl shadow-black/20">
        <div className="mb-6 flex flex-wrap gap-3 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === 'profile' ? 'bg-amber-300 text-slate-950' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            Profile Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === 'password' ? 'bg-amber-300 text-slate-950' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            Change Password
          </button>
        </div>

        {message ? (
          <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-100">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-700/50 bg-red-900/30 px-4 py-3 text-red-200">
            {error}
          </div>
        ) : null}

        {activeTab === 'profile' ? (
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-200">Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition file:mr-3 file:rounded-full file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:font-medium file:text-slate-950"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-200">First name</label>
                <input
                  type="text"
                  value={profileForm.firstname}
                  onChange={(event) => handleProfileChange('firstname', event.target.value)}
                  className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-200">Last name</label>
                <input
                  type="text"
                  value={profileForm.lastname}
                  onChange={(event) => handleProfileChange('lastname', event.target.value)}
                  className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-200">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(event) => handleProfileChange('email', event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#79f5ce] disabled:bg-gray-600 disabled:text-white"
            >
              {status === 'loading' ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-200">Current password</label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(event) => handlePasswordChange('oldPassword', event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-200">New password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) => handlePasswordChange('newPassword', event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#79f5ce] disabled:bg-gray-600 disabled:text-white"
            >
              {status === 'loading' ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
