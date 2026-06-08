import { useEffect, useState } from 'react';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';

const STATUSES = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('jobs');
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="mt-6 inline-flex bg-white rounded-xl ring-1 ring-slate-200 p-1">
        {['jobs', 'applications'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm rounded-lg font-medium capitalize ${tab===t ? 'bg-brand-600 text-white' : 'text-slate-600'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tab === 'jobs' ? <JobsPanel /> : <AppsPanel />}
      </div>
    </div>
  );
}

function emptyJob() {
  return { title: '', description: '', type: 'Job', location: '', stipend: '', duration: '', skills: '', isActive: true };
}

function JobsPanel() {
  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyJob());

  async function load() {
    const { data } = await api.get('/jobs');
    setJobs(data);
  }
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    const payload = {
      ...form,
      skills: typeof form.skills === 'string'
        ? form.skills.split(',').map(s => s.trim()).filter(Boolean)
        : form.skills,
    };
    if (editing) await api.put(`/jobs/${editing}`, payload);
    else await api.post('/jobs', payload);
    setForm(emptyJob()); setEditing(null); load();
  }

  async function remove(id) {
    if (!confirm('Delete this listing?')) return;
    await api.delete(`/jobs/${id}`);
    load();
  }

  function startEdit(j) {
    setEditing(j._id);
    setForm({ ...j, skills: (j.skills || []).join(', ') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <form onSubmit={save} className="card lg:col-span-2 h-fit">
        <h2 className="font-semibold text-lg">{editing ? 'Edit listing' : 'New listing'}</h2>
        <div className="space-y-3 mt-3">
          <input className="input" placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea className="input min-h-[110px]" placeholder="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <select className="input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Job</option><option>Internship</option>
            </select>
            <input className="input" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <input className="input" placeholder="Stipend / Salary" value={form.stipend} onChange={e => setForm({ ...form, stipend: e.target.value })} />
            <input className="input" placeholder="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
          </div>
          <input className="input" placeholder="Skills (comma separated)" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
            Active
          </label>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="btn-primary flex-1">{editing ? 'Save changes' : 'Create listing'}</button>
          {editing && <button type="button" className="btn-ghost" onClick={() => { setEditing(null); setForm(emptyJob()); }}>Cancel</button>}
        </div>
      </form>

      <div className="lg:col-span-3 space-y-3">
        {jobs.map(j => (
          <div key={j._id} className="card flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="badge bg-brand-50 text-brand-700">{j.type}</span>
                {j.isActive ? <span className="badge bg-emerald-50 text-emerald-700">Active</span> : <span className="badge bg-slate-100">Closed</span>}
              </div>
              <h3 className="font-semibold mt-1">{j.title}</h3>
              <p className="text-sm text-slate-500">{j.location || 'Remote'}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost" onClick={() => startEdit(j)}>Edit</button>
              <button className="btn-danger" onClick={() => remove(j._id)}>Delete</button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && <div className="card text-center text-slate-500">No listings yet.</div>}
      </div>
    </div>
  );
}

function AppsPanel() {
  const [apps, setApps] = useState([]);
  const [status, setStatus] = useState('');

  async function load() {
    const params = {};
    if (status) params.status = status;
    const { data } = await api.get('/applications', { params });
    setApps(data);
  }
  useEffect(() => { load(); }, [status]);

  async function changeStatus(id, s) {
    await api.put(`/applications/${id}/status`, { status: s });
    load();
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-500">Filter status:</label>
        <select className="input max-w-xs" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="card mt-4 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr>
              <th className="p-4">Applicant</th><th className="p-4">Role</th>
              <th className="p-4">Resume</th><th className="p-4">Applied</th>
              <th className="p-4">Status</th><th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {apps.map(a => (
              <tr key={a._id} className="border-t border-slate-100 align-top">
                <td className="p-4">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-slate-500">{a.email}</div>
                </td>
                <td className="p-4">{a.jobId?.title || '—'}<div className="text-xs text-slate-500">{a.jobId?.type}</div></td>
                <td className="p-4"><a className="text-brand-700 underline" href={a.resumeLink} target="_blank" rel="noreferrer">View</a></td>
                <td className="p-4 text-slate-600">{new Date(a.appliedAt).toLocaleDateString()}</td>
                <td className="p-4"><StatusBadge status={a.status} /></td>
                <td className="p-4">
                  <select className="input" value={a.status} onChange={e => changeStatus(a._id, e.target.value)}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {apps.length === 0 && <tr><td colSpan="6" className="p-6 text-center text-slate-500">No applications.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
