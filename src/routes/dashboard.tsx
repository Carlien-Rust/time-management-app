// Opening page and "overview" nav

import { createFileRoute, redirect } from '@tanstack/react-router'
import DashboardPage from '../pages/DashboardPage';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: DashboardPage,
})