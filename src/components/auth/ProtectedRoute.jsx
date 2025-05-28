// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../app/context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <p>Cargando...</p> // o un spinner

  if (!user) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
