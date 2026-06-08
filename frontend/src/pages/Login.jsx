import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    try {
      const u = await login(form.email, form.password);
      const to = loc.state?.from?.pathname || (u.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
      navigate(to, { replace: true });
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="card">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-slate-500">Log in to track your applications.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input className="input" type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="input" type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          {err && <div className="text-sm text-rose-600">{err}</div>}
          <button disabled={loading} className="btn-primary w-full">{loading ? 'Logging in…' : 'Login'}</button>
        </form>
        <p className="text-sm text-slate-500 mt-4">No account? <Link to="/signup" className="text-brand-700 font-medium">Sign up</Link></p>
      </div>
    </div>
  );
}
