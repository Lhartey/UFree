// src/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import EmployerDashboard from '../pages/Employer/Dashboard';
import JobApplications from '../pages/Employer/JobApplications';
import StudentDashboard from '../pages/Student/Dashboard';
import { useAuth } from '../auth/AuthContext';
import CreateJob from '../pages/Employer/CreateJob';
import MyApplications from '../pages/Student/MyApplications';

export default function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/employer/jobs/create" element={<CreateJob />} />
        <Route path="/student/applications" element={<MyApplications />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {user.role === 'employer' && (
        <>
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/jobs/:jobId/applications" element={<JobApplications />} />
        </>
      )}

      {user.role === 'student' && (
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      )}

      {/* fallback */}
      <Route path="*" element={<Navigate to={`/${user.role}/dashboard`} replace />} />
    </Routes>
  );
}
