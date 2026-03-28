import { createFileRoute } from '@tanstack/react-router'
import AddTimeLog from "../../components/NewTimeLogModal";
import { z } from 'zod'

const timeSearchSchema = z.object({
  projectId: z.string().optional(),
})

export const Route = createFileRoute('/timeEntries/add-new-time')({
  validateSearch: (search) => timeSearchSchema.parse(search),
  component: AddTimeLog,
})

