import React, { useState } from "react";
import { useGigsContext } from "../hooks/useGigsContext";

const GigForm = () => {
  const { dispatch } = useGigsContext()
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
    // Handle form submission logic
    const gig = {title, description, requirements,budget,category,deadline,attachments}
    
    const response = await fetch('/api/gigs', {
        method: 'POST',
        body: JSON.stringify(gig),
        headers: {
            'Content-Type': "application/json"
        }
  })
  const json = await response.json()

  if (!response.ok) {
    setError(json.error)
    // Update emptyFields based on backend response
  }
  if (response.ok) {
    setTitle('')
    setDescription('')
    setRequirements('')
    setBudget('')
    setCategory('')
    setDeadline('')
    setAttachments('')
    setError(null)
    console.log('new workout added', json)
    dispatch({type: 'CREATE_GIGS', payload: json})
  }
  }

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
      <input
        type="text"
        required
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
        type="number"
        required
        onChange={(e) => setBudget(e.target.value)}
        value={budget}
      />

      
      <label>Category:</label>
            <div>
              {categories.map((category) => (
                <div key={category}>
                  <input
                    type="radio"
                    required
                    id={category}
                    name="service"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>


      
      <label>Deadline:</label>
      <input
        type="date"
        required
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
      />

      <label>Attachments:</label>
      <input
        type="file"
        onChange={(e) => setAttachments(e.target.value)}
        value={attachments}
      />

      <button>Add Project</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default GigForm;
