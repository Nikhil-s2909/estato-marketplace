import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Rajesh Menon',
    email: 'rajesh.menon@example.com',
    phone: '+91 98470 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    memberSince: 'March 2022',
    isLoggedIn: true
  });

  const login = (email, password) => {
    setUser({
      name: email.split('@')[0] || 'Member User',
      email,
      phone: '+91 98000 12345',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Today',
      isLoggedIn: true
    });
  };

  const register = (userData) => {
    setUser({
      name: userData.name || 'New Member',
      email: userData.email,
      phone: userData.phone || '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Today',
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
