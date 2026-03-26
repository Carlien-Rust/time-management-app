/*
./src/services/auth_services/context/AuthContext.tsx

- used to prevent prop drilling 
- Any component can call useAuth() 
- Called by AuthProvider

*/
import { createContext } from 'react';
import { type Auth, type User, type UserCredential } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserCredential>;
  register: (email: string, pass: string) => Promise<UserCredential>;
  resetPass: (auth: Auth, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { throw new Error("AuthContext not initialized"); },
  register: async () => { throw new Error("AuthContext not initialized"); },
  resetPass: async () => { throw new Error("AuthContext not initialized"); },
  logout: async () => { throw new Error("AuthContext not initialized"); },
});
