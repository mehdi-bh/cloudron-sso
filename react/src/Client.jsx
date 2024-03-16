import React, { useState } from 'react';

function Client() {
  const [user, setUser] = useState({
    email: '',
    role: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        alert('User submitted for approval');
        setUser({ email: '', role: '', password: '' });
      }
    } catch (error) {
      console.error('Failed to submit user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>

      <br />

      <input name="email" type="email" value={user.email} onChange={handleChange} required />
      
      <br />

      <label>Role:</label>

      <br />
      <input name="role" type="text" value={user.role} onChange={handleChange} required />

      <br />

      <label>Password:</label>

      <br />
      
      <input name="password" type="password" value={user.password} onChange={handleChange} required />

      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Client;
