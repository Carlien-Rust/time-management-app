import { createFileRoute } from '@tanstack/react-router'
import EditTime from "../../../components/EditTimeLogModal";

export const Route = createFileRoute('/project/$id/edit-time')({
  component: EditTime,
})
