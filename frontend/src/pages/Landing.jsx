import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
      <section className="hero-bg">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <span className="badge bg-white ring-1 ring-slate-200 text-brand-700">New • Internships open</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              Land your next <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">role</span>, faster.
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Hireloop connects ambitious applicants with companies hiring for real jobs and internships — track every application from Applied to Selected.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/jobs" className="btn-primary">Browse openings</Link>
              <Link to="/signup" className="btn-ghost">Create account</Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[['1.2k','Openings'],['480','Companies'],['96%','Track rate']].map(([n,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Built for both sides</h2>
        <p className="text-slate-600 mt-2">Applicants apply with confidence. Admins manage every pipeline in one dashboard.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ['Role-based access', 'Applicants and admins see different dashboards, with protected routes end to end.'],
            ['Live workflow', 'Track status: Applied → Shortlisted → Selected / Rejected, updated in real time.'],
            ['Powerful filters', 'Search by skill, type, location. Admins filter by role, status, and date.'],
          ].map(([t,d]) => (
            <div key={t} className="card">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 mb-4" />
              <h3 className="font-semibold text-lg">{t}</h3>
              <p className="text-sm text-slate-600 mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
