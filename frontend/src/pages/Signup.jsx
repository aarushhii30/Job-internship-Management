import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    try {
      const u = await signup(form);
      navigate(u.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    } catch (e) {
      setErr(e.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="card">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-slate-500">Start applying in seconds.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input className="input" placeholder="Full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input" type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="input" type="password" placeholder="Password (min 6 chars)" minLength={6} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <select className="input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="user">I'm an applicant</option>
            <option value="admin">I'm hiring (admin)</option>
          </select>
          {err && <div className="text-sm text-rose-600">{err}</div>}
          <button disabled={loading} className="btn-primary w-full">{loading ? 'Creating…' : 'Create account'}</button>
        </form>
        <p className="text-sm text-slate-500 mt-4">Have an account? <Link to="/login" className="text-brand-700 font-medium">Log in</Link></p>
      </div>
    </div>
  );
}
