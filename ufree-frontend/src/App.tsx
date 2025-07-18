// src/App.tsx

import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './routes';


export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}