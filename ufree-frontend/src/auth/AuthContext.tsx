// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import { isTokenValid } from '../utils/auth';

type User = {
  id: number;
  username: string;
  email: string;
  role: 'student' | 'employer';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user and validate token on mount
  useEffect(() => {
  const savedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh');

  const checkToken = async () => {
    if (token && isTokenValid(token)) {
      if (savedUser) setUser(JSON.parse(savedUser));
      setLoading(false);
    } else if (refresh) {
      try {
        const res = await axios.post('/users/token/refresh/', {
          refresh,
        });
        const newAccess = res.data.access;
        localStorage.setItem('token', newAccess);

        const profileRes = await axios.get('/users/profile/', {
          headers: { Authorization: `Bearer ${newAccess}` },
        });

        setUser(profileRes.data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      logout();
      setLoading(false);
    }
  };

  checkToken();
}, []);


  const login = async (email: string, password: string) => {
    const res = await axios.post('/users/login/', { email, password });
    const { access, refresh } = res.data;

    const profileRes = await axios.get('/users/profile/', {
      headers: { Authorization: `Bearer ${access}` },
    });

    const userData = profileRes.data;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', access);
    localStorage.setItem('refresh', refresh);
    setUser(userData);
  };

  const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  setUser(null);

  const currentPath = window.location.pathname;
  if (!['/', '/login'].includes(currentPath)) {
    window.location.href = '/';
  }
};

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
