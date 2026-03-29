/*
Edit project 
Include project name, project duration (start/end), overview of single project

Hook: usePatchProjects(); 

-- Clickup ticket
Update name, save; card text updates without page reload.
*/

import * as React from 'react';
import {Box, Typography, Modal, TextField , Button, Alert, FormControl } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from "../services/navigationManager";
import { usePatchProjects } from "../hooks/usePatchProject"; 
import { useUserStore } from "../store/user/UserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "../models/projects.schema";
import { useGetProjects } from '../hooks/useGetProjects';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

type EditProjectInput = {
    id: string;
    name: string;
    userId: string;
    description: string;
};

export const UpdateProjectSchema = ProjectSchema.omit({
    createdAt: true,
    updatedAt: true,
});

export default function EditProject() {
    const { handleClickProject } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    //const [loading, setLoading] = React.useState(false);

    const params = useParams({ strict: false });
    const { id } = params;

    const user = useUserStore((state) => state.user);
    const userId = user?.id
    //console.log("EPM user:", userId);

    const { data: projects } = useGetProjects(userId);
    const currentProject = projects?.find((p) => p.id === id);

    const methods = useForm<EditProjectInput>({
        resolver: zodResolver(UpdateProjectSchema),
        mode: "onChange",
        values: {
            id: id || "",
            name: currentProject?.name || "", // Fallback to empty string while loading
            userId: userId || "",
            description: currentProject?.description || ""
        },
        resetOptions: {
            keepDirtyValues: true, // Don't overwrite what the user is currently typing
        },
    });

    const patchMutation = usePatchProjects();

    // async to help execute and handle error
    const onSubmit = async (projectData: EditProjectInput) => {
        setError(null);
        //setLoading(true);

        try {
            console.log("Saving to Firebase:", projectData);
            await patchMutation.mutateAsync({
                projectId: projectData.id, 
                payload: {name: projectData.name, description: projectData.description}
            });

            //setLoading(false);
        } catch (err: any) {
            //setLoading(false);
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
            <Box sx={style} component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit project
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <TextField
                            {...methods.register("name")}
                            error={!!methods.formState.errors.name}
                            helperText={methods.formState.errors.name ? methods.formState.errors.name.message : ""}
                            required
                            label="Project name"
                        />
                    </FormControl> 
                    <FormControl>
                        <TextField
                            {...methods.register("description")}
                            error={!!methods.formState.errors.description}
                            helperText={methods.formState.errors.description ? methods.formState.errors.description.message : ""}
                            required
                            label="Description"
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
                        variant="text"
                        type="button"
                        onClick={() => handleClickProject(id)} 
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
