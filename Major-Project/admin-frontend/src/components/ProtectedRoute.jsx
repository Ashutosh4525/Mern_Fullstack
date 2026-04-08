import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchCurrentAdmin } from '../services/authSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { user, hydrated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!hydrated && status !== 'loading') {
      dispatch(fetchCurrentAdmin());
    }
  }, [dispatch, hydrated, status]);

  const isLoading = !hydrated || status === 'loading';

  if (isLoading) {
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

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
