import { createFileRoute } from '@tanstack/react-router'
import TimeLogPage from '../../../pages/TimeLogPage'

export const Route = createFileRoute('/$userId/$projectId/add-time')({
  component: TimeLogPage,
})
