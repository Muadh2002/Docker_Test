import React, { useState, useEffect } from 'react';
import './App.css';

// PHP API base URL
const API_URL = 'http://localhost:8000/api';

function App() {
  // State management - React hooks
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users from PHP backend
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/users.php`);
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure PHP server is running on port 8000.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new user
  const addUser = async (e) => {
    e.preventDefault();
    
    if (!newUser.name || !newUser.email) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/users.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNewUser({ name: '', email: '' }); // Clear form
        fetchUsers(); // Refresh user list
      } else {
        setError(data.message || 'Failed to add user');
      }
    } catch (err) {
      setError('Failed to add user');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/users.php?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchUsers(); // Refresh user list
      } else {
        setError(data.message || 'Failed to delete user');
      }
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 React + PHP Learning Project Test</h1>
        <p>Simple User Management System</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {/* Add User Form */}
      <section className="form-section">
        <h2>Add New User</h2>
        <form onSubmit={addUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </section>

      {/* Users List */}
      <section className="users-section">
        <h2>Users List</h2>
        {loading && <p className="loading">Loading...</p>}
        
        {!loading && users.length === 0 && (
          <p className="no-users">No users yet. Add your first user above!</p>
        )}
        
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <small>ID: {user.id}</small>
              </div>
              <button 
                className="delete-btn"
                onClick={() => deleteUser(user.id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="App-footer">
        <p>💡 Learning: React State, useEffect, Fetch API, PHP REST API</p>
      </footer>
    </div>
  );
}

export default App;
