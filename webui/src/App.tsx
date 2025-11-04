export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Valkyrie <span className="text-blue-500">WebUI</span>
        </h1>
        <p className="mt-3 text-gray-400">
          Если вы видите тёмный фон, белый текст и синее слово “WebUI” — Tailwind работает.
        </p>
        <div className="mt-6">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}
