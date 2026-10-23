import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'xp.css/dist/XP.css'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'
import { initAnalytics } from './analytics.js'

initAnalytics()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)