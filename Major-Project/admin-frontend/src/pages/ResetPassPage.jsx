import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/auth';

const ResetPassPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await resetPassword({ email, otp, newPassword });
      navigate('/login', {
        replace: true,
        state: { message: 'Password reset successful. Please log in.' },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password');
      setStatus('failed');
      return;
    }

    setStatus('succeeded');
  };

  return (
    <div className="admin-login-shell min-h-screen px-6 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,25,43,0.96),rgba(10,17,32,0.94))] p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Password Reset</p>
          <h1 className="mt-4 text-4xl font-semibold">Set a new admin password</h1>
          <p className="mt-4 text-base leading-8 text-neutral-300">
            Enter your email, OTP code, and new password to restore admin access.
          </p>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-700/50 bg-red-900/30 px-4 py-3 text-red-200">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">OTP</label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                placeholder="6-digit code"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                placeholder="Enter a new password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-amber-300 py-3 font-semibold text-slate-950 transition hover:bg-[#79f5ce] disabled:bg-gray-600 disabled:text-white"
            >
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between gap-3 text-sm text-neutral-300">
            <Link to="/forgot-password" className="transition hover:text-amber-300">
              Need a fresh OTP?
            </Link>
            <Link to="/login" className="transition hover:text-amber-300">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassPage;
