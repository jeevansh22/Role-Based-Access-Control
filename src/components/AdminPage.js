import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = ({ logoutUser }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Load users from localStorage (Simulating a database fetch)
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    logoutUser(); 
    navigate('/');
  };

  // Update User Role
  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole; 
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
  };

  // Delete User
  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <Link to="/register">
          <button style={buttonStyle}>Register New User</button>
        </Link>
        <Link to="/add-content">
          <button style={buttonStyle}>Add Content</button>
        </Link>
        <Link to="/tasks">
          <button style={buttonStyle}>Go to Task Page</button>
        </Link>
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      </div>

      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>User List</h3>
      {users.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    style={dropdownStyle}
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(index)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>No users found.</p>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#1E90FF',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  backgroundColor: '#333',
  color: 'white',
};

const dropdownStyle = {
  backgroundColor: '#444',
  color: 'white',
  border: '1px solid #555',
  padding: '5px',
};

const deleteButtonStyle = {
  backgroundColor: '#FF6347',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};
export default AdminPage;
