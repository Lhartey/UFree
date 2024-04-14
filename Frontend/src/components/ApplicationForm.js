import React, { useState } from "react";
import { useApplicationsContext } from "../hooks/useApplicationsContext"; // Assuming the context hook name is 'useApplicationsContext'
import { useAuthContext } from "../hooks/useAuthContext";

const ApplicationForm = () => {
  const { dispatch } = useApplicationsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState(null); // Assuming cover letter is a file
  const [resume, setResume] = useState(null); // Assuming resume is a file (optional)
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (e.target.id === 'coverLetter') {
      setCoverLetter(file);
    } else if (e.target.id === 'resume') { // Optional: handle resume upload
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please Login or Signup');
      return;
    }

    if (!name || !email || !coverLetter) {
      setError('Please fill in all required fields (Name, Email, Cover Letter)');
      return;
    }

    const formData = new FormData(); // Use FormData for file uploads
    formData.append('name', name);
    formData.append('email', email);
    formData.append('coverLetter', coverLetter);
    // Optional: Add resume to FormData if applicable
    if (resume) {
      formData.append('resume', resume);
    }

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setName('');
      setEmail('');
      setCoverLetter(null);
      setResume(null); // Reset resume state if applicable
      setError(null);
      console.log('new application submitted', json);
      dispatch({ type: 'CREATE_APPLICATIONS', payload: json });
    }
  };

  return (
    <form className="apply" onSubmit={handleSubmit}>
      <h3>Apply</h3>
      <label>Name:</label>
      <input
        type="text"
        required
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Email:</label>
      <input
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Cover Letter:</label>
      <input
        type="file"
        id="coverLetter"
        required
        onChange={handleFileUpload}
      />
      {resume && ( // Optional: Display resume upload option if applicable
        <>
          <label>Resume (Optional):</label>
          <input type="file" id="resume" onChange={handleFileUpload} />
        </>
      )}
      <button>Submit Application</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ApplicationForm;
