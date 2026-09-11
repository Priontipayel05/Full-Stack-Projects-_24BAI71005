import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/token';

function ProtectedRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const role = getRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;