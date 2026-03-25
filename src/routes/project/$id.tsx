import { createFileRoute, Outlet } from '@tanstack/react-router'
import ProjectPage from "../../pages/ProjectPage";

export const Route = createFileRoute('/project/$id')({
  component: () => (
    <div>
      <ProjectPage />
      <Outlet />
    </div>
  )
}) 