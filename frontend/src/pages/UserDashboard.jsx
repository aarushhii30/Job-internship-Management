import { useEffect, useState } from 'react';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/me').then(r => setApps(r.data)).finally(() => setLoading(false));
  }, []);

  const counts = apps.reduce((a, x) => ({ ...a, [x.status]: (a[x.status] || 0) + 1 }), {});

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {['Applied', 'Shortlisted', 'Selected', 'Rejected'].map(s => (
          <div key={s} className="card">
            <div className="text-xs text-slate-500">{s}</div>
            <div className="text-3xl font-bold mt-1">{counts[s] || 0}</div>
          </div>
        ))}
      </div>

      <div className="card mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-4">Role</th><th className="p-4">Type</th><th className="p-4">Applied on</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="4" className="p-6 text-center text-slate-500">Loading…</td></tr>
            : apps.length === 0 ? <tr><td colSpan="4" className="p-6 text-center text-slate-500">No applications yet. <Link className="text-brand-700 font-medium" to="/jobs">Browse jobs</Link></td></tr>
            : apps.map(a => (
              <tr key={a._id} className="border-t border-slate-100">
                <td className="p-4 font-medium">{a.jobId?.title || '—'}</td>
                <td className="p-4 text-slate-600">{a.jobId?.type || '—'}</td>
                <td className="p-4 text-slate-600">{new Date(a.appliedAt).toLocaleDateString()}</td>
                <td className="p-4"><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
