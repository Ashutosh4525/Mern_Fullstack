import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import DataGrid from '../components/DataGrid';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    const response = await API.get('/users/all-admin');
    setUsers(response.data.data || []);
  };

  useEffect(() => {
    loadData().catch((error) => console.error('Error fetching users:', error));
  }, []);

  const columns = [
    { field: 'firstname', headerName: 'First Name', minWidth: 150, flex: 0.8 },
    { field: 'lastname', headerName: 'Last Name', minWidth: 150, flex: 0.8 },
    { field: 'email', headerName: 'Email', minWidth: 220, flex: 1.1 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => <span className="capitalize">{params.value}</span>,
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
          await API.patch(`/users/restore/${item._id}`);
        } else {
          await API.patch(`/users/delete/${item._id}`);
        }
        await loadData();
      }}
      className={`rounded px-3 py-1 text-sm text-white ${item.isDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
    >
      {item.isDeleted ? 'Activate' : 'Disable'}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Users</p>
        <h1 className="text-3xl font-semibold">Monitor Accounts and Access</h1>
      </div>

      <DataGrid
        data={users}
        columns={columns}
        onRowClick={(item) => navigate(`/users/${item._id}`)}
        // onEdit={(item) => navigate(`/users/${item._id}`)}
        actions={renderActions}
        searchFields={['firstname', 'lastname', 'email', 'role']}
      />
    </div>
  );
}
