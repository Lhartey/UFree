// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

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
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post('/users/login/', { email, password });
    const { access } = res.data;

    // Get user profile using access token
    const profileRes = await axios.get('/users/profile/', {
      headers: { Authorization: `Bearer ${access}` },
    });

    const userData = profileRes.data;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', access);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
