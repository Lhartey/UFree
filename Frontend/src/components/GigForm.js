import React, { useState } from "react";
import { useGigsContext } from "../hooks/useGigsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GigForm = () => {
  const { dispatch } = useGigsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [attachments, setAttachments] = useState('');
  const [error, setError] = useState(null);

  const categories = [
    "Copywriting",
    "Photography",
    "Web Development",
    "Programming",
    "Data Entry",
    "Graphic Designing",
    "Accounting",
    "Language translation",
    "Creative-Designing",
    "Other",
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please Login or Signup');
      return;
    }
    // Handle form submission logic
    const gig = { title, description, requirements, budget, category, deadline, attachments };
    
    const response = await fetch('/api/gigs', {
        method: 'POST',
        body: JSON.stringify(gig),
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${user.token}`
        }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle('');
      setDescription('');
      setRequirements('');
      setBudget('');
      setCategory('');
      setDeadline('');
      setAttachments('');
      setError(null);
      console.log('new gig added', json);
      dispatch({ type: 'CREATE_GIGS', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Project</h3>
      <label>Project Title</label>
      <input
        type="text"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Description:</label>
      <textarea
        required
        rows={10}
        cols={90}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Project Requirements:</label>
      <input
        type="text"
        required
        onChange={(e) => setRequirements(e.target.value)}
        value={requirements}
      />

      <label>Budget (GH¢):</label>
      <input
        type="double"
        required
        onChange={(e) => setBudget(e.target.value)}
        value={budget}
      />
      <label>Category:</label>
      <select
        value={category} // Set the selected value based on the 'category' state
        onChange={(e) => setCategory(e.target.value)} // Update state on change
      >
        <option value="">Select Category</option> {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label>Deadline:</label>
      <input
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
      />

      <label>Attachments:</label>
      <input
        type="file"
        onChange={(e) => setAttachments(e.target.files[0])}
        // value={attachments} // Remove value attribute for file inputs
      />

      <button>Add Project</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default GigForm;
