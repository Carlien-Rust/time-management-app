/*
./src/services/auth_services/context/AuthContext.tsx

- used to prevent prop drilling 
- Any component can call useAuth() 
- Called by AuthProvider

*/
import { createContext } from 'react';
import { type User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User>; // or UserCredential
  register: (email: string, pass: string, firstName: string, lastName: string) => Promise<User>; // or UserCredential
  resetPass: (newPass: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { throw new Error("AuthContext not initialized"); },
  register: async () => { throw new Error("AuthContext not initialized"); },
  resetPass: async () => { throw new Error("AuthContext not initialized"); },
  forgotPassword: async () => { throw new Error("AuthContext not initialized"); },
  logout: async () => { throw new Error("AuthContext not initialized"); },
});
