import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkCls = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium ${
      isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-brand-700'
    }`;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500" />
          <span className="font-bold text-lg tracking-tight">Hireloop</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkCls}>Home</NavLink>
          <NavLink to="/jobs" className={linkCls}>Jobs</NavLink>
          {user?.role === 'user' && <NavLink to="/dashboard/user" className={linkCls}>My Applications</NavLink>}
          {user?.role === 'admin' && <NavLink to="/dashboard/admin" className={linkCls}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-sm text-slate-500">
                Hi, <span className="font-semibold text-slate-700">{user.name}</span>
              </span>
              <button onClick={() => { logout(); navigate('/'); }} className="btn-ghost">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
