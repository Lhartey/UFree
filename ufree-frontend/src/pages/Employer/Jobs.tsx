import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

type Job = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export default function EmployerJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/jobs/employer/');
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Posted Jobs</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map(job => (
            <li key={job.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.description.slice(0, 100)}...</p>
              <div className="mt-2 flex gap-4 text-sm text-indigo-600">
                <Link to={`/employer/jobs/${job.id}/applications`}>View Applications</Link>
                <Link to={`/employer/jobs/${job.id}/edit`}>Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
