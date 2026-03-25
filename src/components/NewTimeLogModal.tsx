/*
-- Clickup ticket
Successful create closes modal, adds new card instantly.
Form fields validated.
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

export default function AddTime() {
    const { handleClickOverview } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const timeData = {
            projectId: formData.get('project_id'),
            date: formData.get('date'),
            startTime: formData.get('start_time'),
            endTime: formData.get('end_time'),
            durationHours: formData.get('durationHours'),
            description: formData.get('description'),
        };

        try {
            console.log("Saving to Firebase:", timeData);
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
                    id="project_id"
                    label="Project ID"
                    name="project_id"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="start_time"
                    label="Start Time"
                    type="time"
                    id="start_time"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="end_time"
                    label="End Time"
                    type="time"
                    id="end_time"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="durationHours"
                    label="Duration in hours"
                    type="number"
                    id="durationHours"
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
                    {loading ? "Logging..." : "Log Time"}
                </Button>
            </Box>
        </Modal>
        </div>
    );
}