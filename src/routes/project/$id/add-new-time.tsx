import { createFileRoute } from '@tanstack/react-router'
import AddTime from "../../../components/NewTimeLogModal";

export const Route = createFileRoute('/project/$id/add-new-time')({
  component: AddTime,
})

