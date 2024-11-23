import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const DashBoard = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />; }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashBoard;
