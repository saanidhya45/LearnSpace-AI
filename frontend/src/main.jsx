import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './features/auth/auth.context.jsx'
import { RoomContextProvider } from './features/rooms/rooms.context.jsx'

createRoot(document.getElementById('root')).render(
  <RoomContextProvider>
 <AuthContextProvider>
        <App />
  </AuthContextProvider>
  </RoomContextProvider>

)
