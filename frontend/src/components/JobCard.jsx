import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job._id}`} className="card hover:-translate-y-0.5 hover:shadow-lg transition block">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="badge bg-brand-50 text-brand-700">{job.type}</span>
            {job.isActive ? (
              <span className="badge bg-emerald-50 text-emerald-700">Active</span>
            ) : (
              <span className="badge bg-slate-100 text-slate-500">Closed</span>
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">{job.title}</h3>
          <p className="text-sm text-slate-500">{job.location || 'Remote'}{job.stipend ? ` • ${job.stipend}` : ''}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-violet-500" />
      </div>
      <p className="mt-3 text-sm text-slate-600 line-clamp-2">{job.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(job.skills || []).slice(0, 4).map(s => (
          <span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>
        ))}
      </div>
    </Link>
  );
}
