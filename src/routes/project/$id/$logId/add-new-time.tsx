import { createFileRoute } from '@tanstack/react-router'
import AddTimeLog from "../../../../components/NewTimeLogModal";

export const Route = createFileRoute('/project/$id/$logId/add-new-time')({
  component: AddTimeLog,
})

