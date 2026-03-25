/*
src/components/ProjectCard.jsx

Include project name, project duration (start/end), overview of single project
Link to "Edit project details" and "Log time entry" modals
Called by Project Page

routes for projects: `/project/${id}/edit-project` and `/project/${id}/add-time`

TODO:
Need to receive project id from Project Page
Hook for fetching project info based on id
Render Project card with the project info:
- Dates
- Project summary
- Graphs
- Edit and Time log buttons that link to modals 

*/
import { Container, CardActions, Button, Box, Typography } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from '../services/navigationManager';
import { useGetProjectsById } from "../hooks/useGetIds";

export default function ProjectCard() {

    const defaultTheme = createTheme();

    // Hook for fetching project info based on id 
    const params = useParams({ strict: false });
    const id = params?.id;
    const { data: projectEntry, isLoading, isError, refetch } = useGetProjectsById(id); 

    const { handleEditProject, handleTimeEntry } = useNavigationManager();

    const handleRefresh = () => {
        refetch(); 
        console.log("Refreshing encryption servers...");
    };

    if (id && isLoading) return <Typography>Loading Project Data...</Typography>;
    if (id && isError) {
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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                {projectEntry?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {projectEntry?.summary}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Duration: {projectEntry?.durationDays}
                </Typography>
                <CardActions>
                    <Button size="small" variant="contained" onClick={() => handleEditProject(id)}>Edit</Button>
                    <Button size="small" variant="contained" onClick={() => handleTimeEntry(id)}>Log Time</Button>
                </CardActions>
            </Container>
        </ThemeProvider>
    );
}
