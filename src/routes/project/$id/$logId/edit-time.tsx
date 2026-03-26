import { createFileRoute } from '@tanstack/react-router'
import EditTimeLog from "../../../../components/EditTimeLogModal";

export const Route = createFileRoute('/project/$id/$logId/edit-time')({
  component: EditTimeLog,
})
