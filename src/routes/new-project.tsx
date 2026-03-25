import { createFileRoute } from '@tanstack/react-router'
import AddProject from "../components/NewProjectModal";

export const Route = createFileRoute('/new-project')({
  component: AddProject,
})
