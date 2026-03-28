import { createFileRoute } from '@tanstack/react-router'
import TimeLogPage from '../../../pages/TimeLogPage'

export const Route = createFileRoute('/project/$id/add-time')({
  component: TimeLogPage,
})
