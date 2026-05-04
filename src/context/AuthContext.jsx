import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,  setUser]  = useState(() => JSON.parse(localStorage.getItem('user')  || 'null'));
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('admin') || 'null'));

  const loginUser  = (data) => { setUser(data);  localStorage.setItem('user',  JSON.stringify(data)); };
  const loginAdmin = (data) => { setAdmin(data); localStorage.setItem('admin', JSON.stringify(data)); };
  const logoutUser  = () => { setUser(null);  localStorage.removeItem('user'); };
  const logoutAdmin = () => { setAdmin(null); localStorage.removeItem('admin'); };

  return (
    <AuthContext.Provider value={{ user, admin, loginUser, loginAdmin, logoutUser, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);