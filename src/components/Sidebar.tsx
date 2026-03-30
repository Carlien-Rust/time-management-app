/*
src/components/Sidebar.tsx 

Include project names and nav to different projects
Implemented in __root.tsx
On left - ensured by Sidebar.css
Need hook to fetch project names and ids

Calls NewProjectModal

routes for projects: "/new-project" and `/project/${id}`

Active styling – The currently selected route is visually distinct (e.g., bold text or different background).
*/
import "../styles/Sidebar.css";
import { Box, Drawer, Divider, Toolbar, List, ListItemText, ListItemButton, Typography  } from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
import { useGetProjects } from "../hooks/useGetProjects"; 
import { useParams } from "@tanstack/react-router";
import { useUserStore } from "../store/user/UserStore";

const drawerWidth = 120;

export default function Sidebar() {
  const { handleClickOverview, handleAddProject, handleClickProject } = useNavigationManager();
  
  const user = useUserStore((state) => state.user);

  const params = useParams({ strict: false }); // URL params
  const activeProjectId = params.id;

  const { data: projects, isLoading} = useGetProjects(user?.id as string);

  if (!user?.id) {
    return (
      <Drawer variant="permanent" sx={{ width: drawerWidth }}>
        <Toolbar />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Please sign in to view projects.
          </Typography>
        </Box>
      </Drawer>
    );
  }

  return (
    <Box>
      <Drawer variant="permanent" sx={{ width: drawerWidth }}>
        <Toolbar />
        <Divider />
        <List>
          {/* STATIC ITEMS (Always there) */}
          <ListItemButton 
            onClick={handleAddProject}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                borderRight: '4px solid primary.main',
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                  color: 'primary.main',
                },
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText primary="+ New Project" />
          </ListItemButton>

          <ListItemButton 
            onClick={handleClickOverview} 
            selected={!activeProjectId}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                borderRight: '4px solid primary.main',
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                  color: 'primary.main',
                },
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
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
                selected={activeProjectId === project.id}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    borderRight: '4px solid primary.main',
                    '& .MuiTypography-root': {
                      fontWeight: 'bold',
                      color: 'primary.main',
                    },
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
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