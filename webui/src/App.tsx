import { NavLink, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-white/10">
        <nav className="mx-auto max-w-6xl flex items-center gap-6 px-6 h-14 text-sm">
          <span className="font-semibold tracking-tight">Valkyrie</span>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}>
            Dashboard
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
