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
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigationManager } from '../services/navigationManager';

export default function ProjectCard() {

    // Hook for fetching project info based on id
    //const id = 1;

    const { handleEditProject, handleTimeEntry } = useNavigationManager();

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            title="Project"
        />
        <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Project Summary
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" onClick={() => {handleEditProject}}>Edit</Button>
            <Button size="small" variant="contained" onClick={() => {handleTimeEntry}}>Log Time</Button>
        </CardActions>
        </Card>
    );
}
