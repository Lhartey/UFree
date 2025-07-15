// src/pages/SessionManager.tsx

import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../auth/AuthContext';

type Session = {
  id: string;
  created_at: string;
  expires_at: string;
  blacklisted: boolean;
  token_type: string;
  current: boolean;
  ip_address: string;
  device_info: string;
};

type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    sessions: Session[];
  };
};

export default function SessionManager() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const { logout } = useAuth();

  const isExpired = (expiresAt: string) => new Date(expiresAt) < new Date();

  const fetchSessions = async (pageNum: number = 1) => {
    try {
      const res = await axios.get<PaginatedResponse>(`/users/sessions/?page=${pageNum}&limit=5`);
      setSessions(res.data.results.sessions);
      setHasNext(!!res.data.next);
      setHasPrev(!!res.data.previous);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to fetch sessions', err);
    }
  };

  const handleLogoutSession = async (jti: string) => {
    try {
      await axios.post('/users/logout-session/', { jti });
      fetchSessions(page);
    } catch (err) {
      console.error('Failed to logout session', err);
    }
  };

  const handleLogoutAll = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/users/logout-all-sessions/');
      setMessage('✅ Logged out from all devices.');
      fetchSessions(page);
    } catch (err: any) {
      setMessage('❌ Failed to logout from all devices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Active Sessions</h2>

      <div className="space-y-4">
        {sessions.map(session => {
          const expired = isExpired(session.expires_at);
          const status = session.blacklisted
            ? 'Logged out'
            : expired
            ? 'Expired'
            : 'Active';

          return (
            <div
              key={session.id}
              className={`p-4 border rounded relative ${
                session.current ? 'bg-green-50' : ''
              } ${expired ? 'opacity-50' : ''}`}
            >
              <p><strong>Created:</strong> {new Date(session.created_at).toLocaleString()}</p>
              <p><strong>Expires:</strong> {new Date(session.expires_at).toLocaleString()}</p>
              <p><strong>IP:</strong> {session.ip_address || 'N/A'}</p>
              <p><strong>Device:</strong> {session.device_info || 'N/A'}</p>
              <p><strong>Status:</strong> {status}</p>

              {session.current && !expired && (
                <p className="text-sm text-green-600 font-semibold">This session</p>
              )}

              {!session.current && !session.blacklisted && !expired && (
                <button
                  onClick={() => handleLogoutSession(session.id)}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Logout Session
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => fetchSessions(page - 1)}
          disabled={!hasPrev}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => fetchSessions(page + 1)}
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <button
        onClick={handleLogoutAll}
        disabled={loading}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Logging out...' : 'Logout All Sessions'}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-blue-700 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}
