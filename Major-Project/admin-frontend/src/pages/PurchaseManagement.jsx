import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import DataGrid from '../components/DataGrid';

export default function PurchaseManagement() {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    API.get('/rental/all')
      .then((response) => setRentals(response.data?.data || []))
      .catch((error) => console.error('Error loading purchases:', error));
  }, []);

  const columns = [
    {
      field: 'userId',
      headerName: 'User',
      minWidth: 220,
      flex: 1,
      renderCell: (params) => params.value ? `${params.value.firstname} ${params.value.lastname}` : 'N/A',
    },
    {
      field: 'contentId',
      headerName: 'Content',
      minWidth: 240,
      flex: 1,
      renderCell: (params) => params.value?.title || 'N/A',
    },
    {
      field: 'createdAt',
      headerName: 'Purchased',
      minWidth: 180,
      flex: 0.8,
      renderCell: (params) => (params.value ? new Date(params.value).toLocaleString() : 'N/A'),
    },
    {
      field: 'expiresAt',
      headerName: 'Expires',
      minWidth: 180,
      flex: 0.8,
      renderCell: (params) => {
        if (!params.value) return 'N/A';
        const expiry = new Date(params.value);
        return (
          <div>
            <div>{expiry.toLocaleString()}</div>
            <span className={`text-xs font-semibold uppercase ${expiry > new Date() ? 'text-green-400' : 'text-red-400'}`}>
              {expiry > new Date() ? 'Active' : 'Expired'}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Purchases</p>
        <h1 className="text-3xl font-semibold">User rentals and purchases</h1>
      </div>

      <DataGrid
        data={rentals}
        columns={columns}
        onRowClick={(item) => navigate(`/purchases/${item._id}`, { state: { rental: item } })}
        onEdit={(item) => navigate(`/purchases/${item._id}`, { state: { rental: item } })}
        searchFields={['userId.firstname', 'userId.lastname', 'contentId.title']}
      />
    </div>
  );
}
