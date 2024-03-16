import React, { useEffect, useState } from 'react';

function Admin() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('pending');

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${filter}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(`Failed to fetch ${filter} users:`, error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const updateUserStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:3000/api/users/${status}/${id}`, { method: 'PUT' });
      fetchUsers();
    } catch (error) {
      console.error(`Failed to ${status} user:`, error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFilterChange('pending')}>Pending</button>
        <button onClick={() => handleFilterChange('approved')}>Approved</button>
        <button onClick={() => handleFilterChange('rejected')}>Rejected</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.role} - Status: {user.status}
            {user.status === 'PENDING' && (
              <>
                <button onClick={() => updateUserStatus(user.id, 'approve')}>Approve</button>
                <button onClick={() => updateUserStatus(user.id, 'reject')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
