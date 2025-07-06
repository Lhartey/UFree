import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🧭 Top Navigation */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            UFree
          </Link>

          <nav className="space-x-4">
            <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>
            <Link to="/my-applications" className="hover:text-blue-600">My Applications</Link>
            <Link to="/profile" className="hover:text-blue-600">Profile</Link>
          </nav>
        </div>
      </header>

      {/* 🧱 Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
