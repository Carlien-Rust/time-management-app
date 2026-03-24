import { createFileRoute } from '@tanstack/react-router'

const id = 1;

export const Route = createFileRoute(`/project/${id}/edit-project`)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit-project"!</div>
}
