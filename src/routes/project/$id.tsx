import { createFileRoute } from '@tanstack/react-router'

const id = 1;

export const Route = createFileRoute(`/project/${id}`)({
  component: Project,
})

function Project() {
  // const {id} = Route.useParams()
  return <div className="p-2">Project ID: {id}!</div>
}