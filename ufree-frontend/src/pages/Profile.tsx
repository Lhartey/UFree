// src/pages/Profile.tsx
import { useAuth } from '../auth/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function Profile() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  

  if (!user) return <p className="text-center mt-10">No user logged in.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Profile</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:gap-4">
        <button
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          <Link to="/sessions" className="text-blue-600 underline mt-4 block">
          Manage Active Sessions
          </Link>
          {loading ? 'Logging out from all devices...' : 'Logout from All Devices'}
        </button>

        <button
          onClick={logout}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mt-2 sm:mt-0"
        >
          Sign Out (Current Session)
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-center text-green-600">{message}</p>}
    </div>
  );
}
