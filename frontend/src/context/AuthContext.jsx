import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'guest',
    name: 'Guest Player'
  });

  const login = (playerName) => {
    setUser({
      id: Date.now().toString(), // Generate a unique ID for the player
      name: playerName
    });
  };

  const logout = () => {
    setUser({
      id: 'guest',
      name: 'Guest Player'
    });
  };

  const value = {
    user,
    setUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 