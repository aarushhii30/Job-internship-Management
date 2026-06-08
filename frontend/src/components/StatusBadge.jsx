const map = {
  Applied: 'bg-slate-100 text-slate-700',
  Shortlisted: 'bg-amber-100 text-amber-700',
  Selected: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-rose-100 text-rose-700',
};
export default function StatusBadge({ status }) {
  return <span className={`badge ${map[status] || 'bg-slate-100'}`}>{status}</span>;
}
