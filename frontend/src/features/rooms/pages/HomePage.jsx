import React, { useState } from 'react'
import JoinPopup from '../components/JoinPopup'

const HomePage = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue-100 opacity-40 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-green-100 opacity-40 pointer-events-none" />

      {/* Live badge */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 font-medium mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        12 rooms active now
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-3 max-w-md leading-snug">
        Join a study room or create your own 🚀
      </h1>
      <p className="text-gray-500 text-center mb-8 text-sm">
        Collaborate, focus, and grow together
      </p>

      <button
        onClick={(e) => { e.preventDefault(); setShow(true); }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 rounded-xl shadow-md transition-all font-medium"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Create / Join Room
      </button>

      {/* Stats row */}
      <div className="flex items-center gap-6 mt-10 text-center">
        {[['2.4k', 'Students'], ['340', 'Rooms'], ['18h', 'Avg focus']].map(([num, label], i, arr) => (
          <React.Fragment key={label}>
            <div>
              <p className="text-lg font-semibold text-gray-800">{num}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
            </div>
            {i < arr.length - 1 && <div className="w-px h-8 bg-gray-200" />}
          </React.Fragment>
        ))}
      </div>

      {show && <JoinPopup setShow={setShow} />}
    </div>
  )
}

export default HomePage