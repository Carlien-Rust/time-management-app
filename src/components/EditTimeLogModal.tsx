/*
-- Clickup ticket
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { useGetTimeLogById } from "../hooks/useGetTime";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export default function EditTime() {
    const { handleClickProject } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const params = useParams({ strict: false });
    const id = params?.id;
    const { data: timeData, isLoading, isError, refetch } = useGetTimeLogById(id);

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

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
            handleClickProject(id!);

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
                    id="project_id"
                    label="Project ID"
                    name="project_id"
                    defaultValue={timeData?.projectId}
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
                    defaultValue={timeData?.startTime}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="end_time"
                    label="End Time"
                    type="time"
                    id="end_time"
                    defaultValue={timeData?.endTime}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="durationHours"
                    label="Duration in hours"
                    type="number"
                    id="durationHours"
                    defaultValue={timeData?.durationHours}
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