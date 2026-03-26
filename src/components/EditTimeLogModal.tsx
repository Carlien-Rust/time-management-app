/*
Hook: usePatchTimeLogs();

-- Clickup ticket 
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { usePatchTimeLogs } from "../hooks/usePatchTimeLogs";

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
    const { id, projectId } = params;

    const patchMutation = usePatchTimeLogs();

    const handleUpdateLog = async () => {
        await patchMutation.mutateAsync({
            id, 
            payload: { projectId, date, hours, minutes, notes }
        });
    };

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        // Update to use an array
        const upateEntry = {
            id: id,
            projectId: projectId,
            date: formData.get('date'),
            hours: Number(formData.get('hours')),
            minutes: Number(formData.get('minutes')),
            notes: formData.get('description'),
        };

        try {
            console.log("Saving to Firebase:", upateEntry);
            handleUpdateLog;

            setLoading(false);

        } catch (err: any) {
            setLoading(false);
            setError("Failed to create project. Please check your inputs.");
        }
    };
    
    if (!id || !projectId) {
        return <Typography>Error: No ID provided.</Typography>;
    }
    if (!loading) {
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
                    id="projectId"
                    label="Project ID"
                    name="projectId"
                    value={projectId}
                    disabled
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="date"
                    label="Date"
                    type="date"
                    id="date"
                    //defaultValue={currentEntry?.date}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="hours"
                    label="Hours"
                    type="number"
                    id="hours"
                    //defaultValue={currentEntry?.hours}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="minutes"
                    label="Minutes"
                    type="number"
                    id="minutes"
                    //defaultValue={currentEntry?.minutes}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    id="description"
                    //value={currentEntry?.notes}
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