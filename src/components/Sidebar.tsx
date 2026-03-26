/*
src/components/Sidebar.tsx

Include project names and nav to different projects
Implemented in __root.tsx
On left - ensured by Sidebar.css
Need hook to fetch project names and ids

routes for projects: "/new-project" and `/project/${id}`

Active styling – The currently selected route is visually distinct (e.g., bold text or different background).
*/
import "../styles/Sidebar.css";
import { Box, Drawer, Divider, Toolbar, List, ListItemText, ListItemButton  } from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
import { useGetProjects } from "../hooks/useGetIds";
import { useParams } from "@tanstack/react-router";

const drawerWidth = 120;

export default function Sidebar() {
  const { handleClickOverview, handleAddProject, handleClickProject } = useNavigationManager();
  const { data: projects, isLoading, isError, refetch } = useGetProjects(); 
  
  // Use params just to "highlight" which one is active
  const params = useParams({ strict: false });
  const currentId = params.id;

  return (
    <Box>
      <Drawer variant="permanent" sx={{ width: drawerWidth }}>
        <Toolbar />
        <Divider />
        <List>
          {/* STATIC ITEMS (Always there) */}
          <ListItemButton onClick={handleAddProject}>
            <ListItemText primary="Add new project" />
          </ListItemButton>

          <ListItemButton onClick={handleClickOverview} selected={!currentId}>
            <ListItemText primary="Overview" />
          </ListItemButton>

          <Divider />

          {/* DYNAMIC ITEMS (Looping through the database) */}
          {isLoading ? (
            <ListItemText primary="Loading..." sx={{ p: 2 }} />
          ) : (
            projects?.map((project) => (
              <ListItemButton 
                key={project.id} 
                onClick={() => handleClickProject(project.id)}
                selected={currentId === project.id}
              >
                <ListItemText primary={project.name} />
              </ListItemButton>
            ))
          )}
        </List>
      </Drawer>
    </Box>
  );
}