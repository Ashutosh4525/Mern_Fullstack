import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../services/api';

export default function PurchaseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [rental, setRental] = useState(location.state?.rental || null);

  useEffect(() => {
    if (rental) return;

    API.get('/rental/all')
      .then((response) => {
        const match = (response.data?.data || []).find((item) => item._id === id);
        setRental(match || null);
      })
      .catch((error) => console.error('Error loading rental detail:', error));
  }, [id, rental]);

  if (!rental) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Purchase Details</p>
          <h1 className="text-3xl font-semibold">Purchase Not Found</h1>
        </div>
        <button onClick={() => navigate('/purchases')} className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Back to Purchases</button>
      </div>
    );
  }

  const active = new Date(rental.expiresAt) > new Date();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">Purchase Details</p>
        <h1 className="text-3xl font-semibold">Rental Information</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <h2 className="mb-4 text-xl font-semibold">User Information</h2>
          <div className="space-y-3">
            <div><p className="text-sm text-neutral-400">Name</p><p>{rental.userId?.firstname} {rental.userId?.lastname}</p></div>
            <div><p className="text-sm text-neutral-400">Email</p><p>{rental.userId?.email}</p></div>
            <div><p className="text-sm text-neutral-400">User ID</p><p className="text-sm font-mono">{rental.userId?._id}</p></div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <h2 className="mb-4 text-xl font-semibold">Content Information</h2>
          <div className="space-y-3">
            <div><p className="text-sm text-neutral-400">Title</p><p>{rental.contentId?.title}</p></div>
            <div><p className="text-sm text-neutral-400">Type</p><p className="capitalize">{rental.contentId?.type}</p></div>
            <div><p className="text-sm text-neutral-400">Content ID</p><p className="text-sm font-mono">{rental.contentId?._id}</p></div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <h2 className="mb-4 text-xl font-semibold">Rental Details</h2>
          <div className="space-y-3">
            <div><p className="text-sm text-neutral-400">Rental ID</p><p className="text-sm font-mono">{rental._id}</p></div>
            <div><p className="text-sm text-neutral-400">Purchased On</p><p>{new Date(rental.createdAt).toLocaleString()}</p></div>
            <div><p className="text-sm text-neutral-400">Expires On</p><p>{new Date(rental.expiresAt).toLocaleString()}</p></div>
            <div>
              <p className="text-sm text-neutral-400">Status</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${active ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-100' : 'border border-red-400/20 bg-red-400/10 text-red-100'}`}>
                {active ? 'Active' : 'Expired'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/purchases')} className="rounded-full bg-amber-300 px-5 py-3 font-semibold text-black">Back to Purchases</button>
    </div>
  );
}
