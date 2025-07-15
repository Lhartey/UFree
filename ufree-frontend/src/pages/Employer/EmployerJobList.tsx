import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

type Job = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  application_count: number;
};

export default function EmployerJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/jobs/employer/");
      setJobs(res.data);
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load your jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: number) => {
    const confirmed = confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    try {
      await axios.delete(`/jobs/${jobId}/`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err: any) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center py-4 text-gray-600">Loading your jobs...</p>;
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">My Job Listings</h1>
        <Link
          to="/employer/jobs/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-center">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow border p-5 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-sm text-gray-500">
                  Posted on {new Date(job.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  to={`/employer/jobs/${job.id}/applications`}
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  View Applications ({job.application_count})
                </Link>
                <button
                  onClick={() => navigate(`/employer/jobs/${job.id}/edit`)}
                  className="text-yellow-600 hover:underline text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
