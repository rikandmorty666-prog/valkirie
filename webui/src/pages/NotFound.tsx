import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-24">
      <h1 className="text-3xl font-bold">404 — Page not found</h1>
      <p className="mt-3 text-gray-400">
        Такой страницы нет. Вернуться на <Link to="/" className="text-blue-400 hover:underline">Home</Link>.
      </p>
    </div>
  );
}
