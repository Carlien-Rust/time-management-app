import { createFileRoute } from '@tanstack/react-router'
import EditProject from "../../../components/EditProjectModal";

export const Route = createFileRoute('/$userId/$projectId/edit-project')({
  component: EditProject
})
