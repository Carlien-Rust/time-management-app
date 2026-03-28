import { createFileRoute } from '@tanstack/react-router'
import EditProject from "../../../components/EditProjectModal";

export const Route = createFileRoute('/project/$id/edit-project')({
  component: EditProject
})
