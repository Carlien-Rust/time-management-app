import { createFileRoute } from '@tanstack/react-router'
import AddTimeLog from "../../../../components/NewTimeLogModal";

export const Route = createFileRoute('/$userId/$projectId/$logId/add-new-time')({
  component: AddTimeLog,
})

