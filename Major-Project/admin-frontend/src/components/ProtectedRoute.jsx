import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { API } from '../services/api';

const ProtectedRoute = () => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let mounted = true;

    const verifySession = async () => {
      try {
        const response = await API.get('/users/me');
        const user = response.data?.data;
        if (mounted) {
          setStatus(user?.role === 'admin' ? 'authorized' : 'forbidden');
        }
      } catch (error) {
        if (mounted) {
          setStatus('unauthorized');
        }
      }
    };

    verifySession();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#050505,#0a0a0a)] px-6 text-white">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Security</p>
          <h2 className="mt-4 text-2xl font-semibold">Checking your admin session...</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
            Verifying credentials and role access before opening the console.
          </p>
        </div>
      </div>
    );
  }

  if (status !== 'authorized') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
