/*
./src/services/auth_services/context/AuthContext.tsx

- used to prevent prop drilling
- Any component can call useAuth() 
- Called by AuthProvider

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
*/
import { createContext } from 'react';
import { type User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({ user: null, loading: true });
