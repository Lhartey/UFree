// src/pages/Employer/CreateJob.tsx
import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function CreateJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/jobs/create/', {
        title,
        description,
      });
      navigate('/employer/dashboard');
    } catch (err) {
      setError('Failed to post job. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl space-y-4"
        >
          <h1 className="text-2xl font-bold text-indigo-700">Post a New Job</h1>

          {error && <p className="text-red-600">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded p-2"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Job
          </button>
        </form>
      </div>
    </>
  );
}
