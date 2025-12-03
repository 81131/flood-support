import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signOut, 
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc
} from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // 'admin' | 'user' | null
  const [status, setStatus] = useState(null); // 'active' | 'banned' | null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is authenticated, now fetch their role/status from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          
          // Check for Ban
          if (data.accStatus === 'banned') {
            await signOut(auth);
            alert("Your account has been suspended by an administrator.");
            setUser(null);
            setRole(null);
            setStatus(null);
            setLoading(false);
            return;
          }

          setRole(data.role);
          setStatus(data.accStatus);
        } else {
          // First time user? Create their profile
          // Default role is 'user', status is 'active'
          const newUserData = {
            email: currentUser.email,
            role: "user", 
            accStatus: "active",
            createdAt: new Date().toISOString()
          };
          await setDoc(userRef, newUserData);
          setRole("user");
          setStatus("active");
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
        setStatus(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginAnonymously = () => signInAnonymously(auth);
  const logout = () => signOut(auth);

  const value = {
    user,
    role,
    status,
    isAdmin: role === 'admin',
    isActive: status === 'active',
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