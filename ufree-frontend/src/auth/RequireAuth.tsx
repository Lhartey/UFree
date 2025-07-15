// src/auth/RequireAuth.tsx

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type RequireAuthProps = {
  children: JSX.Element;
  allowedRoles: ('student' | 'employer')[];
};

export default function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
}
