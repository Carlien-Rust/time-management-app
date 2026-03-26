/*

Hooks: usePostTimeLogs();

-- Clickup ticket 
Successful create closes modal, adds new card instantly.
Form fields validated. 
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert} from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
import { useParams } from "@tanstack/react-router";
import { usePostTimeLogs } from "../hooks/usePostTimeLogs";

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
    const { id, userId, projectId} = params;
    const postMutation = usePostTimeLogs();

    const handleAddLog = async () => {
        await postMutation.mutateAsync({ 
            projectId, userId, date, hours, minutes, notes  
        });
    };

    // async to help execute and handle error
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);

        const timeData = {
            projectId: id,
            userId: userId,
            date: formData.get('date'),
            hours: Number(formData.get('hours')),
            minutes: Number(formData.get('minutes')),
            notes: formData.get('notes'),
        };

        try {
            console.log("Saving to Firebase:", timeData);
            handleAddLog;
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
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="hours"
                    label="Hours"
                    type="number"
                    id="hours"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="minutes"
                    label="Minutes"
                    type="number"
                    id="minutes"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="notes"
                    label="Notes"
                    type="text"
                    id="notes"
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