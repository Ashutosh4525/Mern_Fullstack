import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthError, loginAdmin } from '../services/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const flashMessage = location.state?.message || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    try {
      await dispatch(loginAdmin({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {}
  };

  return (
    // <div className="admin-login-shell min-h-screen px-6 py-8 text-white md:py-12">
    <div className="admin-login-shell min-h-screen text-white" style={{ padding: '2rem 1.5rem' }}>
      {/* <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]"> */}
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]" style={{ padding: '0 1.5rem' }}>
        <div className="admin-login-copy space-y-6">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Admin Portal</p>
          <h1 className="max-w-2xl text-4xl font-semibold md:text-6xl">Secure access for platform administrators.</h1>
          <p className="max-w-2xl text-base leading-8 text-neutral-300">
            Sign in to manage content, review users, and monitor purchases from the admin dashboard.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Catalog', value: 'Movies + TV' },
              { label: 'Security', value: 'Admin only' },
              { label: 'Playback', value: 'Video checks' },
            ].map((item) => (
              <div key={item.label} className="admin-login-stat rounded-3xl border border-white/10 backdrop-blur" style={{padding:"8px"}}>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center">
          <div className="admin-login-card rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur" style={{padding:"18px"}}>
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center text-center rounded-full bg-amber-300 text-lg font-black text-slate-950">
                SF
              </div>
              <h2 className="mt-4 text-3xl font-bold text-white">StreamForge</h2>
              <p className="mt-2 text-neutral-400">Admin access required</p>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-700/50 bg-red-900/30 px-4 py-3 text-red-200">
                {error}
              </div>
            )}

            {flashMessage && !error && (
              <div className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-100">
                {flashMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) {
                      dispatch(clearAuthError());
                    }
                  }}
                  className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) {
                      dispatch(clearAuthError());
                    }
                  }}
                  className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-full bg-amber-300 py-3 font-semibold text-slate-950 transition hover:bg-[#79f5ce] disabled:bg-gray-600 disabled:text-white"
              >
                {status === 'loading' ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-300">
              <Link to="/forgot-password" className="transition hover:text-amber-300">
                Forgot password?
              </Link>
              <Link to="/signup" className="transition hover:text-amber-300">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
