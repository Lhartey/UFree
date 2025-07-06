// src/pages/Employer/JobApplications.tsx
// This component should be in its own file: src/pages/Employer/JobApplications.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios'; // Corrected path to axios instance

type Application = {
  id: number;
  // Changed from 'applicant' to 'student' to match backend serializer output
  student: { 
    username: string;
    email: string;
  };
  cover_letter: string;
  applied_at: string;
  // If you also want to display CV file, you might add cv: string; here
};

export default function JobApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token"); // Assuming 'token' is where your access token is stored
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        // Updated API endpoint to match backend's EmployerJobApplicationsView
        // This assumes the employer is viewing applications for their own job.
        const res = await axios.get(
          `http://127.0.0.1:8000/api/jobs/${jobId}/applications/owner/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(res.data);
      } catch (err: any) {
        console.error("Failed to fetch applications:", err);
        if (err.response && err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else if (err.response && err.response.status === 404) {
          setError("Job applications not found or you don't have permission.");
        } else if (err.response && err.response.status === 403) {
          setError("You do not have permission to view these applications.");
        } else {
          setError("Failed to load applications. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (jobId) { // Only fetch if jobId is available
      fetchApplications();
    }
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Job Applications</h1>

      {loading ? (
        <p className="text-gray-600">Loading applications...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No applications yet for this job.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {app.student.username} {/* Changed from app.applicant.username */}
                  </h2>
                  <p className="text-sm text-gray-500">{app.student.email}</p> {/* Changed from app.applicant.email */}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(app.applied_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{app.cover_letter}</p>
              {/* You can add a link to download CV here if your backend serves it */}
              {/* {app.cv && (
                <a href={app.cv} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm font-medium hover:underline mt-2 block">
                  Download CV
                </a>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
