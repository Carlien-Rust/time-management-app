import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const RootLayout = () => (
  <>
    <Header />
    <Sidebar />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
