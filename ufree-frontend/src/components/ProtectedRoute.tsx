// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { getToken, getUserRole, logout } from '../utils/auth';

interface Props {
  children: JSX.Element;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const token = getToken();
  const role = getUserRole();

  if (!token) {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
