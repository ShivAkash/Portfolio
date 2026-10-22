import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initTheme } from '@/hooks/useTheme'
import App from './App'
import './index.css'

initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
