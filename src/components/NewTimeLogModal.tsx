/*
-- Clickup ticket
Successful create closes modal, adds new card instantly.
Form fields validated. 
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert} from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
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

export default function AddTimeLog() {
    const { handleTimeEntry } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const params = useParams({ strict: false });
    const id = params?.id; // This is the Project ID from the URL
    console.log(`ID incoming: ${id}`);

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);

        const timeData = {
            projectId: id,
            date: formData.get('date'),
            startTime: formData.get('start_time'),
            endTime: formData.get('end_time'),
            durationHours: Number(formData.get('durationHours')),
            description: formData.get('description'),
        };

        try {
            console.log("Saving to Firebase:", timeData);
            // await createTimeLog(timeData); // Your Firebase service call
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
            onClose={() =>handleTimeEntry(id)}
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Log new time
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    margin="normal"
                    fullWidth
                    id="project_id"
                    label="Project ID"
                    name="project_id"
                    value={id}
                    disabled
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    id="description"
                />
                <Button 
                    type="button"
                    onClick={() => handleTimeEntry(id)} 
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