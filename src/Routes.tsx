import { Suspense, lazy } from 'react'
import App from './App.tsx'
const FloorPlan = lazy(() => import('./FloorPlan.tsx'))
const HousePlan = lazy(() => import('./HousePlan.tsx'))
export default function Routes() {
  const path = window.location.pathname.replace(/\/$/, '')
  return <Suspense fallback={<p style={{ padding: 32 }}>Loading plan…</p>}>
    {path === '/house-plan' ? <HousePlan /> : path === '/floor-plan' ? <FloorPlan /> : <App />}
  </Suspense>
}
