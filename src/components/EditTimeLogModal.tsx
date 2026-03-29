/*
Hook: usePatchTimeLogs();

-- Clickup ticket 
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert, FormControl } from '@mui/material';
import { useSearch } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { usePatchTimeLogs } from "../hooks/usePatchTimeLogs";
import { useUserStore } from '../store/user/UserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TimeSchema } from "../models/timelogs.schema";
import { useGetTimeLogsByProjectId } from '../hooks/useGetTimeLogsByProjectId';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

type EditTimeInput = {
    id: string;
    projectId: string;
    userId: string;
    date: string,
    hours: number, 
    minutes: number,
    notes: string
};

export const UpdateTimeLogSchema = TimeSchema.omit({
    createdAt: true,
    updatedAt: true,
});

export default function EditTimeLog() {
    const { handleTimeEntry } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    //const [loading, setLoading] = React.useState(false);

    const search = useSearch({ strict: false });
    const logId = search.id;
    const projectId = search.projectId; 

    const user = useUserStore((state) => state.user);
    const userId = user?.id

    const { data: timeData } = useGetTimeLogsByProjectId(projectId);
    const currentTime = React.useMemo(() => 
        timeData?.find((t) => t.id === logId), 
    [timeData, logId]);

    const methods = useForm<EditTimeInput>({
        resolver: zodResolver(UpdateTimeLogSchema),
        mode: "onChange",
        values: {
            id: logId || "",
            projectId: projectId || "",
            userId: userId || "",
            date: currentTime?.date ? new Date(currentTime.date).toISOString().split('T')[0] : "",
            hours: Number(currentTime?.hours) || 0, 
            minutes: Number(currentTime?.minutes) || 0,
            notes: currentTime?.notes || ""
        },
        resetOptions: {
            keepDirtyValues: true, // Don't overwrite what the user is currently typing
        },
    });
 
    const patchMutation = usePatchTimeLogs();

    // async to help execute and handle error
    const onSubmit = async (timeData: any) => {
        setError(null);
        //setLoading(true);

        try {
            console.log("Saving to Firebase:", timeData);
            await patchMutation.mutateAsync({
                id: logId!, // Check this
                payload: { 
                    projectId: timeData.projectId, 
                    date: timeData.date, 
                    hours: timeData.hours, 
                    minutes: timeData.minutes, 
                    notes: timeData.notes 
                }
            });

            //setLoading(false);
            handleTimeEntry(projectId!);
        } catch (err: any) {
            //setLoading(false);
            setError("Failed to create project. Please check your inputs.");
        }
    };
    
    if (!logId) {
        return <Typography>No log ID provided.</Typography>;
    }
    if (!projectId) {
        return <Typography>No project ID provided.</Typography>;
    }

    return (
        <div>
        <Modal
            open={true}
            onClose={handleTimeEntry}
        >
            <Box sx={style} component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit time log
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <input type="hidden" {...methods.register("id")} />
                    <FormControl>
                        <TextField
                            {...methods.register("projectId")}
                            error={!!methods.formState.errors.projectId}
                            helperText={methods.formState.errors.projectId ? methods.formState.errors.projectId.message : ""}
                            required
                            label="Project ID"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...methods.register("date")}
                            error={!!methods.formState.errors.date}
                            helperText={methods.formState.errors.date ? methods.formState.errors.date.message : ""}
                            required
                            label="Date"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...methods.register("hours")}
                            error={!!methods.formState.errors.hours}
                            helperText={methods.formState.errors.hours ? methods.formState.errors.hours.message : ""}
                            type='number'
                            required
                            label="Hours"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...methods.register("minutes")}
                            error={!!methods.formState.errors.minutes}
                            helperText={methods.formState.errors.minutes ? methods.formState.errors.minutes.message : ""}
                            type='number'
                            required
                            label="Minutes"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...methods.register("notes")}
                            error={!!methods.formState.errors.notes}
                            helperText={methods.formState.errors.notes ? methods.formState.errors.notes.message : ""}
                            required
                            label="Notes"
                        />
                    </FormControl>
                    <Button 
                        variant="contained" 
                        type="submit"
                        disabled={patchMutation.isPending}
                    >
                        {patchMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button 
                        type="button"
                        onClick={() => handleTimeEntry(projectId)} 
                        disabled={patchMutation.isPending} 
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
        </div>
    );
}