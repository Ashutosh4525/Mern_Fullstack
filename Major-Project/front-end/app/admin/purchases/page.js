'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/services/api";
import AdminDataGrid from "@/components/admin/AdminDataGrid";

export default function AdminPurchasesPage() {
  const router = useRouter();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/rental/all").then((res) => {
      setRentals(res.data?.data ?? []);
      setLoading(false);
    });
  }, []);

  const handleEdit = (item) => {
    router.push(`/admin/purchases/${item._id}`);
  };

  const columns = [
    {
      field: 'userId',
      headerName: 'User',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const user = params.value;
        return user ? `${user.firstname} ${user.lastname}` : 'N/A';
      },
    },
    {
      field: 'contentId',
      headerName: 'Content Title',
      minWidth: 200,
      flex: 1.2,
      renderCell: (params) => params.value?.title || 'N/A',
    },
    {
      field: 'createdAt',
      headerName: 'Purchased',
      minWidth: 180,
      flex: 0.9,
      renderCell: (params) => {
        if (!params.value) return 'N/A';
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: 'expiresAt',
      headerName: 'Expires',
      minWidth: 180,
      flex: 0.9,
      renderCell: (params) => {
        if (!params.value) return 'N/A';
        const expiryDate = new Date(params.value);
        const status = expiryDate > new Date() ? 'Active' : 'Expired';
        const statusColor = status === 'Active' ? 'text-green-400' : 'text-red-400';
        return (
          <div>
            <div>{expiryDate.toLocaleString()}</div>
            <span className={`text-xs uppercase font-semibold ${statusColor}`}>{status}</span>
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
        <p className="max-w-3xl text-neutral-300">
          This panel shows who purchased what, when it was rented, and whether the access is still active.
        </p>
      </div>

      <AdminDataGrid
        data={rentals}
        columns={columns}
        onRowClick={(rental) => {
          // Could navigate to rental details if needed
          router.push(`/admin/rentals/${rental._id}`);
        }}
        onEdit={handleEdit}
        searchFields={['userId.firstname', 'userId.lastname', 'contentId.title']}
      />
    </div>
  );
}
