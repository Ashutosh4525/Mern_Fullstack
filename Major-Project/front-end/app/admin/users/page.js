'use client'

import { useEffect, useState } from "react";
import { API } from "@/services/api";
import AdminDataGrid from "@/components/admin/AdminDataGrid";
import Loading from "@/app/loading";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users/all-admin');
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
        await API.patch(`/users/restore/${userId}`);
      } else {
        await API.patch(`/users/delete/${userId}`);
      }
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to update user status');
    }
  };

  const renderActions = (user) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleUserStatus(user._id, user.isDeleted);
      }}
      className={`px-3 py-1 text-white rounded text-sm transition-colors ${
        user.isDeleted
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-red-600 hover:bg-red-700'
      }`}
    >
      {user.isDeleted ? 'Activate' : 'Disable'}
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  const columns = [
    {
      field: 'firstname',
      headerName: 'First Name',
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1.2,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
          params.value === 'admin'
            ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
            : 'border border-white/10 bg-white/5 text-neutral-200'
        }`}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'isDeleted',
      headerName: 'Status',
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => (
        <span className={`text-xs uppercase font-semibold ${
          params.value ? 'text-red-400' : 'text-green-400'
        }`}>
          {params.value ? 'DISABLED' : 'ACTIVE'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Users</p>
        <h1 className="text-3xl font-semibold">Monitor Accounts and Access</h1>
        <p className="max-w-3xl text-neutral-300">
          View all users, enable/disable accounts, and manage user access.
        </p>
      </div>

      <AdminDataGrid
        data={users}
        columns={columns}
        actions={renderActions}
        searchFields={['firstname', 'lastname', 'email', 'role']}
      />
    </div>
  );
}
