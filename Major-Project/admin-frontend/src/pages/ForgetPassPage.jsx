import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/auth';

const ForgetPassPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setError('');

    try {
      const response = await forgotPassword({ email });
      setMessage(response.message || 'OTP sent successfully');
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send reset OTP');
      setStatus('failed');
      return;
    }

    setStatus('succeeded');
  };

  return (
    <div className="admin-login-shell min-h-screen px-6 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,25,43,0.96),rgba(10,17,32,0.94))] p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Password Help</p>
          <h1 className="mt-4 text-4xl font-semibold">Request a reset code</h1>
          <p className="mt-4 text-base leading-8 text-neutral-300">
            Enter your admin email address to receive a one-time reset code.
          </p>

          {message ? (
            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-100">
              {message}
            </div>
          ) : null}

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

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-amber-300 py-3 font-semibold text-slate-950 transition hover:bg-[#79f5ce] disabled:bg-gray-600 disabled:text-white"
            >
              {status === 'loading' ? 'Sending code...' : 'Send OTP'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between gap-3 text-sm text-neutral-300">
            <Link to="/login" className="transition hover:text-amber-300">
              Back to login
            </Link>
            <Link to={`/reset-password${email ? `?email=${encodeURIComponent(email)}` : ''}`} className="transition hover:text-amber-300">
              Already have OTP?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassPage;
