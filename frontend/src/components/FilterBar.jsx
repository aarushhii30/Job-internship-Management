export default function FilterBar({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });
  return (
    <div className="card flex flex-col md:flex-row gap-3 md:items-end">
      <div className="flex-1">
        <label className="text-xs font-medium text-slate-500">Search</label>
        <input className="input mt-1" placeholder="Title, skill, description..."
          value={value.q} onChange={e => set({ q: e.target.value })} />
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">Type</label>
        <select className="input mt-1" value={value.type} onChange={e => set({ type: e.target.value })}>
          <option value="">All</option>
          <option>Job</option>
          <option>Internship</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">Location</label>
        <input className="input mt-1" placeholder="e.g. Remote"
          value={value.location} onChange={e => set({ location: e.target.value })} />
      </div>
    </div>
  );
}
