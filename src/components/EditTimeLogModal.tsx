/*
-- Clickup ticket
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { useGetTimeLogsById } from "../hooks/useGetTime";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export default function EditTimeLog() {
    const { handleTimeEntry } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const params = useParams({ strict: false });
    const { id, logId } = params;

    const { data: timeData, isLoading, isError, refetch } = useGetTimeLogsById(id);

    const currentEntry = React.useMemo(() => {
        return timeData?.find((log) => log.logId === logId);
    }, [timeData, logId]);

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        // Update to use an array
        const upateEntry = {
            logId: logId,
            projectId: id,
            date: formData.get('date'),
            startTime: formData.get('start_time'),
            endTime: formData.get('end_time'),
            durationHours: Number(formData.get('durationHours')),
            description: formData.get('description'),
        };

        try {
            console.log("Saving to Firebase:", upateEntry);
            // await updateTimeLog(upateEntry); // Your Firebase service call

            setLoading(false);

        } catch (err: any) {
            setLoading(false);
            setError("Failed to create project. Please check your inputs.");
        }
    };
    
    if (!id || !logId) {
        return <Typography>Error: No ID provided.</Typography>;
    }
    if (!currentEntry && !isLoading) {
        return <Typography>Error: Specific log entry not found.</Typography>;
    }

    return (
        <div>
        <Modal
            open={true}
            onClose={handleTimeEntry}
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit time log
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    margin="normal"
                    required
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
                    defaultValue={currentEntry?.startTime}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="end_time"
                    label="End Time"
                    type="time"
                    id="end_time"
                    defaultValue={currentEntry?.endTime}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="durationHours"
                    label="Duration in hours"
                    type="number"
                    id="durationHours"
                    defaultValue={currentEntry?.durationHours}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    id="description"
                    value={currentEntry?.description}
                    disabled
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
                    onClick={() => handleTimeEntry(id)} 
                    disabled={loading} 
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
        </div>
    );
}