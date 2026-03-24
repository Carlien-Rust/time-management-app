/*
What would go in here?
ThemeProvider, RouterProvider, AuthProvider
*/
import './App.css';
import ThemeProviderWrapper from './styles/ThemeProvider';

import { RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { createRouter } from '@tanstack/react-router'

import { AuthProvider } from './services/auth_services/AuthProvider';

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <RouterProvider router={router} />
      </ThemeProviderWrapper>
    </AuthProvider>
  );
}
export default App;
