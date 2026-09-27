import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './Routes.tsx'

document.title = window.location.pathname.startsWith('/house-plan') ? 'Your Home / Three Lab' : window.location.pathname.startsWith('/floor-plan') ? 'Residence 001 / Three Lab' : 'Three / Lab'
createRoot(document.getElementById('root')!).render(<StrictMode><Routes /></StrictMode>)

