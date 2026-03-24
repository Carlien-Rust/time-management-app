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

const drawerWidth = 120;

export default function Sidebar() {

  const { handleClickOverview, handleAddProject, handleClickProject } = useNavigationManager();
  
  // Hook for fetching project names and ids

  const navItems = [
    { id: 'add-project', label: 'Add new', action: handleAddProject },
    { id: 'overview', label: 'Overview', action: handleClickOverview },
    { id: '1', label: 'Project 1', action: () => handleClickProject('1') },
    { id: '2', label: 'Project 2', action: () => handleClickProject('2') },
  ];

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        //anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {navItems.map(item => (
              <ListItemButton key={item.id} onClick={item.action}>
                <ListItemText primary={item.label} />
              </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}