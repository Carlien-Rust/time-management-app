/*
Need to add conditional rendering - struggled with this
*/

import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Toolbar, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigationManager } from '../services/navigationManager';
import { useAuth } from '../services/auth_services/AuthProvider';

export const Route = createRootRouteWithContext<any>()({
  component: RootLayout,
});

function RootLayout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user becomes null, jump to login immediately
    if (!auth.loading && !auth.user) {
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/signup') {
        navigate({ to: '/login' });
      }
    }
  }, [auth.user, auth.loading, navigate]);

  // Checking Firebase (Show a spinner)
 if (auth.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // No User (Render Login/Signup without Sidebar/Header)
  if (!auth.user) {
    console.log("No user found - Rendering clean page");
    return (
      <>
        <Outlet /> 
        <TanStackRouterDevtools />
      </>
    );
  }

  // Authenticated
  console.log("User found:", auth.user.email);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { sm: `calc(100% - 120)` }}}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: 'background.default',
          minHeight: '100vh',
          width: { sm: `calc(100% - 240px)` }, // Adjust 240px to your Sidebar width
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
}

