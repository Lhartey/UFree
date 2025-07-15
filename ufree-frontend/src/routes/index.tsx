import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import EmployerDashboard from '../pages/Employer/Dashboard';
import JobApplications from '../pages/Employer/JobApplications';
import StudentDashboard from '../pages/Student/Dashboard';
import CreateJob from '../pages/Employer/CreateJob';
import MyApplications from '../pages/Student/MyApplications';
import RequireAuth from '../auth/RequireAuth';
import { useAuth } from '../auth/AuthContext';
import EmployerJobList from "../pages/Employer/EmployerJobList";
import EditJob from "../pages/Employer/EditJob";
import EmployerJobs from '../pages/Employer/Jobs';
import Profile from '../pages/Profile';
import SessionManager from '../pages/SessionManager';


export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <LoginPage />} />

      {/* Student routes */}
      <Route path="/student/dashboard" element={
        <RequireAuth allowedRoles={['student']}>
          <StudentDashboard />
        </RequireAuth>
      } />
      <Route path="/student/applications" element={
        <RequireAuth allowedRoles={['student']}>
          <MyApplications />
        </RequireAuth>
      } />

      {/* Employer routes */}
      <Route path="/employer/dashboard" element={
        <RequireAuth allowedRoles={['employer']}>
          <EmployerDashboard />
        </RequireAuth>
      } />
      <Route path="/employer/jobs/create" element={
        <RequireAuth allowedRoles={['employer']}>
          <CreateJob />
        </RequireAuth>
      } />
      <Route path="/employer/jobs/:jobId/applications" element={
        <RequireAuth allowedRoles={['employer']}>
          <JobApplications />
        </RequireAuth>
      } />

      {/* Catch-all fallback */}
      <Route path="*" element={
        user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Navigate to="/" />
      } />

      <Route path="/employer/jobs" element={<EmployerJobList />} />

      <Route path="/employer/jobs/:jobId/edit" element={<EditJob />} />

      <Route path="/employer/jobs" element={<EmployerJobs />} />

      <Route path="/profile" element={
        <RequireAuth allowedRoles={['student', 'employer']}>
          <Profile />
        </RequireAuth>
      } />

      <Route path="/sessions" element={
        <RequireAuth allowedRoles={['student', 'employer']}>
          <SessionManager />
        </RequireAuth>
      } />

    </Routes>
  );
}
