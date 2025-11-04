import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Шапка из TailAdmin */}
      <Header />

      {/* Контент страниц */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
