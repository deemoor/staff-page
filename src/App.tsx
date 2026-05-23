import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout, StaffPage } from './pages'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/staff" replace />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="*" element={<Navigate to="/staff" replace />} />
      </Route>
    </Routes>
  )
}

export default App
