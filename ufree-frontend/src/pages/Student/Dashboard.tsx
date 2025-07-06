// src/pages/Student/Dashboard.tsx
import { useEffect, useState } from 'react';
import axios from '../../api/axios'; // Ensure this path is correct for your axios instance
import ApplicationForm from '../../components/ApplicationForm'; // Import ApplicationForm

type Job = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export default function StudentDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token for authorization
      if (!token) {
        setErrorMsg("Authentication token not found. Please log in.");
        return;
      }
      const res = await axios.get('http://127.0.0.1:8000/api/jobs/', { // Ensure full URL if axios base URL is not set
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (err: any) {
      console.error("Failed to fetch jobs:", err);
      if (err.response && err.response.data && err.response.data.detail) {
        setErrorMsg(err.response.data.detail);
      } else {
        setErrorMsg('Failed to load jobs. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs on component mount
  }, []);

  // Callback for when an application is successfully submitted
  const handleApplicationSuccess = () => {
    setSuccessMsg('Application sent successfully!');
    setSelectedJobId(null); // Close the form
    fetchJobs(); // Re-fetch jobs to update any status or application count if needed
  };

  // Callback to cancel/close the application form
  const handleCancelApplication = () => {
    setSelectedJobId(null); // Close the form
    setSuccessMsg(''); // Clear success message if user cancels before seeing it
    setErrorMsg(''); // Clear any error messages
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Find a Job</h1>

      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      {selectedJobId ? (
        // Render the ApplicationForm if a job is selected for application
        <ApplicationForm 
          jobId={selectedJobId} 
          onApplicationSuccess={handleApplicationSuccess} 
          onCancel={handleCancelApplication} 
        />
      ) : (
        // Render the list of jobs if no job is selected
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">No jobs available at the moment.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white shadow rounded-xl p-4">
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-600 line-clamp-3">{job.description}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Posted on {new Date(job.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => setSelectedJobId(job.id)}
                  className="mt-3 text-indigo-600 text-sm font-medium hover:underline"
                >
                  Apply →
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
