/*

Hooks: usePostTimeLogs();

-- Clickup ticket 
Successful create closes modal, adds new card instantly.
Form fields validated. 
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert, FormControl, FormLabel} from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
import { useSearch } from "@tanstack/react-router";
import { usePostTimeLogs } from "../hooks/usePostTimeLogs";
import { useUserStore } from '../store/user/UserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TimeSchema } from "../models/timelogs.schema";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export const CreateTimeLogSchema = TimeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export default function AddTimeLog() {
    const { handleTimeEntry } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const search = useSearch({ strict: false });
    const id = search.projectId; 
    //console.log("NTLM projectID", id);

    const user = useUserStore((state) => state.user);
    const userId = user?.id

    const methods = useForm({
        resolver: zodResolver(CreateTimeLogSchema),
        mode: "onChange",
        defaultValues: {
            projectId: id || "",
            userId: userId || "",
            date: new Date().toISOString().split('T')[0], // Defaults to today
            hours: 0, 
            minutes: 0,
            notes: ""
        }
    });

    const postMutation = usePostTimeLogs();

    // async to help execute and handle error
    const onSubmit = async (timeData: any) => {
        setLoading(true);
        setError(null);

        try {
            console.log("Saving to Firebase:", timeData);
            await postMutation.mutateAsync(
                {
                projectId: timeData.projectId, 
                userId: timeData.userId, 
                date: timeData.date, 
                hours: timeData.hours, 
                minutes: timeData.minutes, 
                notes: timeData.notes  
                }
            );
     
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
            <Box sx={style} component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Log new time
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <FormControl>
                    <FormLabel htmlFor="projectId">Project ID</FormLabel>
                    <TextField
                        {...methods.register("projectId")}
                        error={!!methods.formState.errors.projectId}
                        helperText={methods.formState.errors.projectId ? methods.formState.errors.projectId.message : ""}
                        required
                        label="Project ID"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <TextField
                        {...methods.register("date")}
                        error={!!methods.formState.errors.date}
                        helperText={methods.formState.errors.date ? methods.formState.errors.date.message : ""}
                        required
                        label="Date"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="hours">Hours</FormLabel>
                    <TextField
                        {...methods.register("hours")}
                        error={!!methods.formState.errors.hours}
                        helperText={methods.formState.errors.hours ? methods.formState.errors.hours.message : ""}
                        required
                        label="Hours"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="minutes">Minutes</FormLabel>
                    <TextField
                        {...methods.register("minutes")}
                        error={!!methods.formState.errors.minutes}
                        helperText={methods.formState.errors.minutes ? methods.formState.errors.minutes.message : ""}
                        required
                        label="Minutes"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="notes">Notes</FormLabel>
                    <TextField
                        {...methods.register("notes")}
                        error={!!methods.formState.errors.notes}
                        helperText={methods.formState.errors.notes ? methods.formState.errors.notes.message : ""}
                        required
                        label="notes"
                    />
                </FormControl>
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