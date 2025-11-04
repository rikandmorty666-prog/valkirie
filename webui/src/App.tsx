import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="p-8 rounded-2xl bg-slate-800 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Tailwind v3 работает ✅</h1>
        <p className="mt-2 text-slate-300">Vite + React + TypeScript</p>
        <button className="mt-6 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition">
          Проверить hover
        </button>
      </div>
    </div>
  )
}
