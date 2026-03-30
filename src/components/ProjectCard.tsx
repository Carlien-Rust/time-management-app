/*
src/components/ProjectCard.jsx

Include project name, project duration (start/end), overview of single project
Link to "Edit project details" and "Log time entry" modals
Called by Project Page

routes for projects: `/project/${id}/edit-project` and `/project/${id}/add-time`
Hook: useGetProjects(userId); AND useDeleteProject();

TODO:
Need to receive project id from Project Page
Hook for fetching project info based on id
Render Project card with the project info:
- Dates
- Project summary
- Graphs
- Edit and Time log buttons that link to modals 


-- Clickup ticket 
Successful delete removes card immediately.
Projects with linked entries return error → toast “Cannot delete: project has time entries.”

*/
import { Container, CardActions, Button, Box, Typography } from '@mui/material';
import { useNavigationManager } from '../services/navigationManager';
import { useUserStore } from "../store/user/UserStore";
import { useLocation, useParams } from "@tanstack/react-router";
import { useGetProjects } from "../hooks/useGetProjects";
import { useDeleteProject } from "../hooks/useDeleteProject"; 

export default function ProjectCard() {

    const location = useLocation();
    // IDs
    // projectId
    const params = useParams({ strict: false }); 
    const { id } = params; // from URL - projectId
    // userId
    const user = useUserStore((state) => state.user);
    const userId = user?.id

    const isViewingTimeLogs = location.pathname.includes(`/add-time`) || 
                              location.pathname.includes(`/add-new-time`);

    // Returns array
    const { data: allProjects, isLoading, isError, refetch } = useGetProjects(userId);
    // Single entry
    const projectEntry = allProjects?.find((p) => p.id === id);

    const { handleEditProject, handleTimeEntry } = useNavigationManager();

    const deleteMutation = useDeleteProject();
    const handleDelete = async () => {
        await deleteMutation.mutateAsync(id!);
    };

    const handleRefresh = () => {
        refetch(); 
        console.log("Refreshing encryption servers...");
    };

    if (userId && isLoading) return <Typography>Loading Project Data...</Typography>;
    if (userId && isError) {
        return (
        <Box>
            <Typography>Error loading user data.</Typography>
            <Button onClick={handleRefresh}>Try Again</Button>
        </Box>
        );
    }
    if (isError || !projectEntry) return <Typography>Project not found. Please check the ID.</Typography>;

    if (!id) {
        return <Typography>Error: No Project ID provided.</Typography>;
    }

    return (
        <Container component="main" maxWidth="lg">
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            {projectEntry?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {projectEntry?.description}
            </Typography>
            <CardActions>
                <Button 
                    size="small" 
                    variant="contained" 
                    onClick={() => handleEditProject(id)}
                >
                    Edit
                </Button>
                <Button 
                    size="small" 
                    variant="contained" 
                    onClick={() => handleTimeEntry(id)}
                    disabled={isViewingTimeLogs}
                >
                    View Time Logs
                </Button>
                <Button 
                    size="small" 
                    variant="contained"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </CardActions>
        </Container>
    );
}
