// src/components/ApplicationForm.tsx
import { useState } from "react";
import axios from "../api/axios"; // Adjust path if your axios instance is elsewhere

interface ApplicationFormProps {
  jobId: number;
  onApplicationSuccess: () => void; // THIS PROP MUST BE DEFINED
  onCancel: () => void;             // THIS PROP MUST BE DEFINED
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobId, onApplicationSuccess, onCancel }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState(""); // Corresponds to 'message' field in Django Application model
  const [cv, setCv] = useState<File | null>(null);
  const [modal, setModal] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    const formData = new FormData();
    formData.append("job", jobId.toString());
    formData.append("cover_letter", coverLetter);

    if (message.trim()) {
      formData.append("message", message);
    }
    
    if (cv) {
      formData.append("cv", cv);
    }

    try {
      const token = localStorage.getItem("token"); 

      if (!token) {
        setErrorMessage("Authentication token not found. Please log in.");
        setModal("error");
        return;
      }

      const res = await axios.post(
        `http://127.0.0.1:8000/api/jobs/apply/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setModal("success");
        setCoverLetter("");
        setMessage("");
        setCv(null);
        onApplicationSuccess(); // Notify parent on success
      }
    } catch (err: any) {
      console.error("Application submission error:", err);
      if (err.response && err.response.data && err.response.data.detail) {
        setErrorMessage(err.response.data.detail);
      } else if (err.response && err.response.status === 401) {
        setErrorMessage("Unauthorized. Please log in again.");
      } else {
        setErrorMessage("Failed to submit application. Please try again.");
      }
      setModal("error");
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-4 bg-white shadow rounded-xl max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-gray-800">Apply for Job</h2>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium mb-1 text-gray-700">Cover Letter</label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={5}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700">Message (optional)</label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="cvUpload" className="block text-sm font-medium mb-1 text-gray-700">Upload CV (PDF, DOC, DOCX)</label>
          <input
            id="cvUpload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCv(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {cv && <p className="mt-1 text-sm text-gray-500">Selected file: {cv.name}</p>}
        </div>

        <div className="flex gap-2 justify-end mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Modal Feedback */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-sm text-center space-y-4">
            <h3 className={`text-lg font-semibold ${modal === "success" ? "text-green-600" : "text-red-600"}`}>
              {modal === "success" ? "Application Sent!" : "Submission Failed"}
            </h3>
            <p className="text-gray-700">
              {modal === "success"
                ? "Your application was submitted successfully."
                : errorMessage}
            </p>
            <button
              onClick={() => setModal(null)}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
