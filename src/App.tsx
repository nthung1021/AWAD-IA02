import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold my-6">Vite + React</h1>

      {/* Tailwind test block */}
      <div className="max-w-xl mx-auto p-6 bg-white/5 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-blue-400">Tailwind test</h2>
        <p className="mt-2 text-sm text-gray-300">If this is styled, Tailwind is working.</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setCount((c) => c + 1)}
          >
            count is {count}
          </button>
          <span className="text-sm text-gray-200">Clicked <strong className="text-white">{count}</strong> times</span>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
