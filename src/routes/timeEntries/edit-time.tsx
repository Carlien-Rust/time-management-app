import { createFileRoute } from '@tanstack/react-router'
import EditTimeLog from "../../components/EditTimeLogModal";
import { z } from 'zod'

const timeSearchSchema = z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
})

export const Route = createFileRoute('/timeEntries/edit-time')({
  validateSearch: (search) => timeSearchSchema.parse(search),
  component: EditTimeLog,
})
