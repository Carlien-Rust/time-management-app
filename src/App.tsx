/*
ThemeProvider, RouterProvider, AuthProvider 
*/
import './App.css';
import ThemeProviderWrapper from './styles/ThemeProvider';

import { RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { createRouter } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './services/auth_services/AuthProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const router = createRouter({ 
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  
  // useEffect(() => {
  //   async function getToken() {
  //     const auth = getAuth();
  //     const idToken = await auth.currentUser?.getIdToken();
  //     console.log(idToken);
  //   }

  //   getToken();
  // }) 

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProviderWrapper>
          <InnerApp />
        </ThemeProviderWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
