import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function ProfilePage() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null); // State to hold fetched user data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      // Prefill form fields with user data
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send updated profile information to backend API
    try {
      const response = await fetch(`/api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      // Update user data in the context if necessary
      // Optionally display a success message to the user
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>New Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfilePage;
