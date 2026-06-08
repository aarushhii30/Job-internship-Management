import { useEffect, useState } from 'react';
import api from '../services/api';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q: '', type: '', location: '' });

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      const params = { active: 'true' };
      if (filters.q) params.q = filters.q;
      if (filters.type) params.type = filters.type;
      if (filters.location) params.location = filters.location;
      api.get('/jobs', { params }).then(r => setJobs(r.data)).finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Open roles</h1>
      <p className="text-slate-600 mt-1">{jobs.length} listings</p>
      <div className="mt-6"><FilterBar value={filters} onChange={setFilters} /></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <div key={i} className="card h-44 animate-pulse bg-slate-100" />)
        ) : jobs.length === 0 ? (
          <div className="card col-span-full text-center text-slate-500">No jobs match your filters.</div>
        ) : (
          jobs.map(j => <JobCard key={j._id} job={j} />)
        )}
      </div>
    </div>
  );
}
