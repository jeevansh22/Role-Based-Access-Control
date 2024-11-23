import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const adminUser = {
    email: 'admin@gmail.com',
    password: '12345678',
    role: 'admin',
  };
  const [users, setUsers] = useState([
    adminUser, // Add admin user by default
  ]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser)); 
      return true;
    }

    return false; 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const registerUser = (email, password, role) => {
    if (user?.role === 'admin') {
      const newUser = { email, password, role };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return true;
    } else {
      return false; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
