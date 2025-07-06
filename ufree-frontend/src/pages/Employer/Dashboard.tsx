// src/pages/Employer/Dashboard.tsx
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

type Job = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/jobs/employer/').then((res) => {
      setJobs(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Your Job Listings</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">You haven't posted any jobs yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-xl p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600 line-clamp-3">{job.description}</p>
              <p className="text-sm text-gray-400">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
              <Link
                to={`/employer/jobs/${job.id}/applications`}
                className="inline-block mt-2 text-indigo-600 font-medium hover:underline"
              >
                View Applications →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
