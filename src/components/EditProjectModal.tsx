/*
Add new project
Include project name, project duration (start/end), overview of single project

Need to add API call to create project

-- Clickup ticket
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { useGetProjectsById } from "../hooks/useGetIds";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export default function EditProject() {
    const { handleClickProject } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const params = useParams({ strict: false });
    const id = params?.id;
    const { data: projectEntry, isLoading, isError, refetch } = useGetProjectsById(id);

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const projectData = {
            name: formData.get('project_name'),
            startDate: formData.get('start_date'),
            endDate: formData.get('end_date'),
            durationDays: formData.get('durationDays'),
            summary: formData.get('summary'),
        };

        try {
            console.log("Saving to Firebase:", projectData);
            // await createProject(projectData); // Your Firebase service call
            setLoading(false);

        } catch (err: any) {
            setLoading(false);
            setError("Failed to create project. Please check your inputs.");
        }
    };
    
    if (!id) {
        return <Typography>Error: No Project ID provided.</Typography>;
    }

    return (
        <div>
        <Modal
            open={true}
            onClose={handleClickProject}
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit project
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="project_name"
                    label="Project Name"
                    name="project_name"
                    defaultValue={projectEntry?.name}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="start_date"
                    label="Start Date"
                    type="date"
                    id="start_date"
                    defaultValue={projectEntry?.startDate}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="end_date"
                    label="End Date"
                    type="date"
                    id="end_date"
                    defaultValue={projectEntry?.endDate}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="durationDays"
                    label="Duration in days"
                    type="number"
                    id="durationDays"
                    defaultValue={projectEntry?.durationDays}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="summary"
                    label="Project Overview"
                    type="text"
                    id="summary"
                    defaultValue={projectEntry?.summary}
                />
                <Button 
                    variant="contained" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button 
                    type="button"
                    onClick={() => handleClickProject(id)} 
                    disabled={loading} 
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
        </div>
    );
}
