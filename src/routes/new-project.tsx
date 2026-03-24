import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-project')({
  component: AddProject,
})

function AddProject() {
  return <div className="p-2">Add new project!</div>
}