/*
Need to add conditional rendering - struggled with this
*/

import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Toolbar, CircularProgress } from '@mui/material';
import { useAuth } from '../services/auth_services/AuthProvider';
interface MyRouterContext {
  auth: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const auth = useAuth();
  // const navigate = useNavigate();
  const routerState = useRouterState();

  // Checking Firebase (Show a spinner)
 if (auth.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const authPages = ['/login', '/register', '/reset', '/'];
  const isAuthPage = authPages.includes(routerState.location.pathname);

  // No User (Render Login/Signup without Sidebar/Header)
  if (!auth.user || isAuthPage) {
    return (
      <Box component="main" sx={{ width: '100vw', height: '100vh' }}>
        <Outlet /> 
        <TanStackRouterDevtools />
      </Box>
    );
  }

  // Authenticated
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: { sm: `calc(100% - 120)`},
      }}
      >
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          width: { sm: `calc(100% - 240px)` }, 
          ml: { sm: `240px` }, 
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
}

