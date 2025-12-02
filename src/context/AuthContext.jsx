import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInAnonymously, signOut, onAuthStateChanged } from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded admin email for now
  const ADMIN_EMAIL = "your.email@gmail.com"; // REPLACE THIS with your actual email

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const loginAnonymously = () => {
    return signInAnonymously(auth);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    isAdmin: user?.email === ADMIN_EMAIL,
    loginWithGoogle,
    loginAnonymously,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};