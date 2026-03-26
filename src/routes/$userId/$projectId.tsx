import { createFileRoute, Outlet } from '@tanstack/react-router'
import ProjectPage from "../../pages/ProjectPage";

export const Route = createFileRoute('/$userId/$projectId')({
  component: () => (
    <div>
      <ProjectPage />
      <Outlet />
    </div>
  )
}) 