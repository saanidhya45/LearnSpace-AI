import React, { useState } from 'react'
import { useRoom } from '../hook/UseRoom';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Loading';

const JoinPopup = ({ setShow }) => {
  const { handleRoomCreation, loading, handleRoomJoining } = useRoom();
  const [name, setName] = useState('')
  const [roomId, setRoomId] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  const Navigate = useNavigate();

  const handleCreation = async () => {
    const res = await handleRoomCreation({ name });
    if (res?.success) {
      Navigate(`/Rooms/${res.room._id}/`)
    } else {
      alert(res?.msg);
    }
  }

  const handleUserRoomJoining = async () => {
    const res = await handleRoomJoining({ roomId });
    if (res?.success) {
      Navigate(`/Rooms/${res.UpdatedRoom._id}`);
    } else {
      alert(res?.msg);
    }
  };

  if (loading) return <Loading />

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Study Room</h2>
            <p className="text-xs text-gray-400 mt-0.5">Create or join a session</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-sm"
          >✕</button>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {['create', 'join'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'create' ? 'Create room' : 'Join room'}
            </button>
          ))}
        </div>

        {/* Create tab */}
        {activeTab === 'create' && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Room name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="e.g. DSA Practice"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
            <button
              onClick={(e) => { e.preventDefault(); setShow(false); handleCreation(); }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition text-sm font-medium"
            >
              Create Room
            </button>
          </div>
        )}

        {/* Join tab */}
        {activeTab === 'join' && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Room ID</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <circle cx="6.5" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14 14l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                onChange={(e) => setRoomId(e.target.value)}
                type="text"
                placeholder="Paste room ID here"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              />
            </div>
            <button
              onClick={(e) => { e.preventDefault(); handleUserRoomJoining(); }}
              className="bg-transparent border border-emerald-500 text-emerald-700 hover:bg-emerald-50 py-2.5 rounded-lg transition text-sm font-medium"
            >
              Join Room
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default JoinPopup