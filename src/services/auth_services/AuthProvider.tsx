/*
./src/services/auth_services/AuthProvider.tsx

- single, persistent listener, reply on for data 
- loading state important to allow FB time to react 
- will be wrapper in App for secure entry
- called by App
- will contain Login/Logout actions that gets called by useAuth hook

-- Clickup ticket
Enable Email/Password sign-in
Copy config vars into .env.local
*/

import React, { useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  type User, 
  sendPasswordResetEmail,
  type Auth,
} from 'firebase/auth';
import { auth } from './config/firebaseConfig'; 
import { AuthContext } from './context/AuthContext';
import { UserService } from "../../services/users.services";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, pass: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;
    //console.log("fbUser in AuthProvider:", fbUser);
    return userCredential;
  };

  // Update to work with Firebase and BE database - struggled with this
  const register = async (email: string, pass: string, firstName: string, lastName: string) => {
      // 1. Create the Firebase Auth record
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const fbUser = userCredential.user;

      try {
        await UserService.postUser({
          userId: fbUser.uid,
          name: `${firstName} ${lastName}`,
          email: fbUser.email!,
        });
      } catch (backendError) {
        console.error("Firebase user created, but backend sync failed:", backendError);
      }

      return fbUser;
  };

  const resetPass = (auth: Auth, pass: string) => {
    return sendPasswordResetEmail(auth, pass);
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
    <AuthContext.Provider value={{ user, loading, login, register, resetPass, logout }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);