/*
Add new project 
Include project name, project duration (start/end), overview of single project

Hook: usePostProjects();

-- Clickup ticket
“New Entry” Modal (Project, Date, Duration, Notes) with validation. Creates and updates using API
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert} from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
import { usePostProjects } from "../hooks/usePostProjects";
import { useParams } from "@tanstack/react-router";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export default function AddProject() {
    const { handleClickOverview } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const params = useParams({ strict: false });
    const userId = params?.userId;
    const postMutation = usePostProjects();

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const projectData = {
            name: formData.get('name'),
            userId: userId,
            description: formData.get('description'),
        };

        try {
            console.log("Saving to Firebase:", projectData);
            await postMutation.mutateAsync({ name, userId, description });
            
            setLoading(false);
            handleClickOverview();

        } catch (err: any) {
            setLoading(false);
            setError("Failed to create project. Please check your inputs.");
        }
    };

    return (
        <div>
        <Modal
            open={true}
            onClose={handleClickOverview}
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new project
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Project Name"
                    name="name"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="userId"
                    label="User Id"
                    type="string"
                    id="userId"
                    value={userId}
                    disabled
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Project Overview"
                    type="text"
                    id="description"
                />
                <Button 
                    type="button"
                    onClick={handleClickOverview} 
                    disabled={loading} 
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Project"}
                </Button>
            </Box>
        </Modal>
        </div>
    );
}
