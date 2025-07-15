// src/pages/Student/MyApplications.tsx
// This component should be in its own file: src/pages/Student/MyApplications.tsx
import { useEffect, useState } from "react";
import axios from "../../api/axios"; // Corrected path to axios instance

interface Job {
  title: string;
  description: string;
  created_at: string;
}

interface Student {
  username: string;
  email: string;
}

interface Application {
  id: number;
  job_details: Job; // This should ideally be job_details from the backend serializer
  student: Student;
  cover_letter: string;
  message?: string; // Added message field
  cv: string | null; // CV can be null if not uploaded
  applied_at: string;
}

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Changed to string | null

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const token = localStorage.getItem("token"); // Changed from "accessToken" to "token"
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get("jobs/my-applications/");

        setApplications(res.data);
      } catch (err: any) { // Use 'any' for now to catch all error types
        console.error("Failed to load applications:", err);
        if (err.response && err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Failed to load applications. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center py-4 text-gray-600">Loading your applications...</p>;
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Applications</h1>
      {applications.length === 0 ? (
        <p className="text-gray-600 text-center">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="border p-4 rounded-xl shadow bg-white">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{app.job_details.title || "No title available"}</h2>
                  <p className="text-sm text-gray-500">Applied on {new Date(app.applied_at).toLocaleDateString()}</p>
                </div>
                {app.cv && (
                  <a
                    href={app.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline text-sm font-medium hover:text-indigo-700"
                  >
                    View CV
                  </a>
                )}
              </div>
              <p className="mt-2 text-gray-700">
                <strong>Cover Letter:</strong> {app.cover_letter || "N/A"}
              </p>
              {app.message && ( // Conditionally render message if it exists
                <p className="mt-1 text-gray-700">
                  <strong>Message:</strong> {app.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
