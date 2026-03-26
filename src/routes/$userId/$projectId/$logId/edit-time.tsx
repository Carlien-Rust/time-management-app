import { createFileRoute } from '@tanstack/react-router'
import EditTimeLog from "../../../../components/EditTimeLogModal";

export const Route = createFileRoute('/$userId/$projectId/$logId/edit-time')({
  component: EditTimeLog,
})
