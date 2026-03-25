/*
Add new project
Include project name, project duration (start/end), overview of single project

Need to add API call to create project
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert} from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";

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

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

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
                    id="project_name"
                    label="Project Name"
                    name="project_name"
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
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="end_date"
                    label="End Date"
                    type="date"
                    id="end_date"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="durationDays"
                    label="Duration in days"
                    type="number"
                    id="durationDays"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="summary"
                    label="Project Overview"
                    type="text"
                    id="summary"
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
