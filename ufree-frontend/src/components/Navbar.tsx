// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        UFree
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Logged in as <strong>{user.username}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/"
          className="text-sm text-indigo-600 hover:underline"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
