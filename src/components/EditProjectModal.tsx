/*
Edit project 
Include project name, project duration (start/end), overview of single project

Hook: usePostProjects();

-- Clickup ticket
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { usePatchProjects } from "../hooks/usePatchProject"; 

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
    const { id, projectId } = params;
    const patchMutation = usePatchProjects();

    const handleUpdate = async () => {
        await patchMutation.mutateAsync({
            projectId, 
            payload: {name, description}
        });
    };

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const projectData = {
            projectId: projectId,
            name: formData.get('name'),
            description: formData.get('description'),
        };

        try {
            console.log("Saving to Firebase:", projectData);
            handleUpdate();
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
                    id="name"
                    label="Project Name"
                    name="name"
                    //defaultValue={projectEntry?.name}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Project Overview"
                    type="text"
                    id="description"
                    // defaultValue={projectEntry?.description}
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
