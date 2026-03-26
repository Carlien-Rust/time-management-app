/*
Need to add conditional rendering - struggled with this
*/

import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Toolbar } from '@mui/material';
import { useEffect } from 'react';
import { useNavigationManager } from '../services/navigationManager';

export const Route = createRootRouteWithContext<any>()({
  component: RootLayout,
});

function RootLayout() {
  const { auth } = Route.useRouteContext();
  const navigate = useNavigate();
  const { handleLogout } = useNavigationManager();

  // Redirect Logic:
  useEffect(() => {
    if (!auth.loading && !auth.user) {
      // Check already on login/signup to avoid infinite loops
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/signup') {handleLogout}
    }
  }, [auth.user, auth.loading, navigate]);

  /*
  // Checking Firebase (Show nothing or a spinner)
  if (auth.loading) return null;

  // No User (Render Login/Signup without Sidebar/Header)
  if (!auth.user) {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools /> 
      </>
    );
  }
  */

  // Authenticated
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { sm: `calc(100% - 120)` }}}>
      <Header />
      <Sidebar />
      <Box>
        <Toolbar /> 
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
}

