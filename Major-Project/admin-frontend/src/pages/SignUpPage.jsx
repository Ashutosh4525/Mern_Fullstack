import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAdminCandidate } from '../services/auth';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await registerAdminCandidate(formData);
      navigate('/login', {
        replace: true,
        state: {
          message: 'Account created successfully. Admin access must still be granted before this account can use the admin console.',
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account');
      setStatus('failed');
      return;
    }

    setStatus('succeeded');
  };

  return (
    <div className="admin-login-shell min-h-screen px-6 py-8 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Admin Access Setup</p>
          <h1 className="max-w-2xl text-4xl font-semibold md:text-6xl">Create an account for the admin workspace.</h1>
          <p className="max-w-2xl text-base leading-8 text-neutral-300">
            This form creates the base user account first. Your backend currently decides admin privileges separately, so role approval still needs to happen after signup.
          </p>
        </div>

        <div className="w-full max-w-lg justify-self-center rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,25,43,0.96),rgba(10,17,32,0.94))] p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <h2 className="text-3xl font-semibold">Create account</h2>
          <p className="mt-2 text-neutral-400">Fill in the details below to register.</p>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-700/50 bg-red-900/30 px-4 py-3 text-red-200">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">First name</label>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(event) => handleChange('firstname', event.target.value)}
                  className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Last name</label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(event) => handleChange('lastname', event.target.value)}
                  className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(event) => handleChange('password', event.target.value)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleChange('avatar', event.target.files?.[0] || null)}
                className="admin-login-input w-full rounded-2xl border border-white/10 px-4 py-3 outline-none transition file:mr-3 file:rounded-full file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:font-medium file:text-slate-950"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-amber-300 py-3 font-semibold text-slate-950 transition hover:bg-[#79f5ce] disabled:bg-gray-600 disabled:text-white"
            >
              {status === 'loading' ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-sm text-neutral-300">
            Already have an account?{' '}
            <Link to="/login" className="transition hover:text-amber-300">
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
