import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', resumeLink: '', coverNote: '' });
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/jobs/${id}`).then(r => setJob(r.data));
  }, [id]);

  useEffect(() => {
    if (user) setForm(f => ({ ...f, name: f.name || user.name, email: f.email || user.email }));
  }, [user]);

  async function submit(e) {
    e.preventDefault();
    if (!user) return navigate('/login');
    setSubmitting(true); setMsg(null);
    try {
      await api.post('/applications', { jobId: id, ...form });
      setMsg({ type: 'ok', text: 'Application submitted!' });
    } catch (err) {
      setMsg({ type: 'err', text: err.response?.data?.message || 'Could not submit' });
    } finally { setSubmitting(false); }
  }

  if (!job) return <div className="max-w-3xl mx-auto p-10">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card">
        <div className="flex items-center gap-2">
          <span className="badge bg-brand-50 text-brand-700">{job.type}</span>
          <StatusBadge status={job.isActive ? 'Selected' : 'Rejected'} />
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{job.title}</h1>
        <p className="text-slate-500">{job.location || 'Remote'}{job.stipend ? ` • ${job.stipend}` : ''}{job.duration ? ` • ${job.duration}` : ''}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {(job.skills || []).map(s => <span key={s} className="badge bg-slate-100 text-slate-700">{s}</span>)}
        </div>
        <div className="prose prose-slate mt-6 whitespace-pre-wrap text-slate-700">{job.description}</div>
      </div>

      <form onSubmit={submit} className="card h-fit md:sticky md:top-20">
        <h2 className="text-lg font-semibold">Apply now</h2>
        <p className="text-sm text-slate-500">Takes less than a minute.</p>
        <div className="mt-4 space-y-3">
          <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="input" placeholder="Resume URL" value={form.resumeLink} onChange={e => setForm({ ...form, resumeLink: e.target.value })} required />
          <textarea className="input min-h-[100px]" placeholder="Cover note (optional)" value={form.coverNote} onChange={e => setForm({ ...form, coverNote: e.target.value })} />
        </div>
        {msg && <div className={`mt-3 text-sm ${msg.type === 'ok' ? 'text-emerald-600' : 'text-rose-600'}`}>{msg.text}</div>}
        <button disabled={submitting} className="btn-primary w-full mt-4">{submitting ? 'Submitting…' : 'Submit application'}</button>
        {!user && <p className="text-xs text-slate-500 mt-2">You'll be asked to log in.</p>}
      </form>
    </div>
  );
}
