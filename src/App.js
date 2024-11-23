import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registerpage.js'
import AdminPage from './components/AdminPage';
import AddContent from './components/AddContent';  
import Tasks from './components/Tasks';  

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const loginUser = (userInfo) => {
    localStorage.setItem('user', JSON.stringify(userInfo)); 
    setUser(userInfo); 
  };

  const logoutUser = () => {
    localStorage.removeItem('user'); 
    setUser(null)
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login loginUser={loginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage user={user} logoutUser={logoutUser} />} />
        {/* Add routes for Tasks and AddContent */}
        <Route path="/tasks" element={<Tasks user={user} />} />
        <Route path="/add-content" element={<AddContent user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
