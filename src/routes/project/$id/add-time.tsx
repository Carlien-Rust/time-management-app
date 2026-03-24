import { createFileRoute } from '@tanstack/react-router'

const id = 1;

export const Route = createFileRoute(`/project/${id}/add-time`)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/project/$id/add-time"!</div>
}
