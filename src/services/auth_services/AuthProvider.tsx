/*
./src/services/auth_services/AuthProvider.tsx

- single, persistent listener, reply on for data 
- loading state important to allow FB time to react
- will be wrapper in App for secure entry
- called by App
- will contain Login/Logout actions that gets called by useAuth hook
*/

import React, { useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  type User 
} from 'firebase/auth';
import { auth } from './config/firebaseConfig'; 
import { AuthContext } from './context/AuthContext';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign actions

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const register = (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    return signOut(auth);
  };

  // State changes
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);