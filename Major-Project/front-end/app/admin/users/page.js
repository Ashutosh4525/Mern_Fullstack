'use client'

import { useEffect, useState } from "react";
import { API } from "@/services/api";
import Loading from "@/app/loading";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users/all');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, isDeleted) => {
    try {
      if (isDeleted) {
        // Restore user
        await API.patch(`/users/${userId}/restore`);
      } else {
        // Soft delete user (disable)
        await API.delete(`/users/${userId}`);
      }
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Users</p>
        <h1 className="text-3xl font-semibold">Monitor Accounts and Access</h1>
        <p className="max-w-3xl text-neutral-300">
          View all users, enable/disable accounts, and manage user access.
        </p>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-3xl border border-white/10 bg-[#0b1220] p-5"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="mt-2 text-sm text-neutral-400">{user.email}</p>
                <p className="text-xs text-neutral-500 uppercase tracking-[0.3em]">
                  Status: {user.isDeleted ? 'DISABLED' : 'ACTIVE'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-4 py-2 text-sm uppercase ${
                  user.role === 'admin'
                    ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-neutral-200'
                }`}>
                  {user.role}
                </span>
                <button
                  onClick={() => handleToggleUserStatus(user._id, user.isDeleted)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    user.isDeleted
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {user.isDeleted ? 'Enable' : 'Disable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
