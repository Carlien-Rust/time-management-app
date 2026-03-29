/*
Add new project 
Include project name, project duration (start/end), overview of single project

Hook: usePostProjects();

-- Clickup ticket 
“New Entry” Modal (Project, Date, Duration, Notes) with validation. Creates and updates using API
*/

import * as React from 'react';
import { Box, Typography, Modal, TextField , Button, Alert, FormControl } from '@mui/material';
import { useNavigationManager } from "../services/navigationManager";
import { usePostProjects } from "../hooks/usePostProjects";
import { useUserStore } from "../store/user/UserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "../models/projects.schema";
import { type Project } from "../models/projects.types";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export const CreateProjectSchema = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export default function AddProject() {
    const { handleClickOverview } = useNavigationManager();
    const [error, setError] = React.useState<string | null>(null);
    //const [loading, setLoading] = React.useState(false);

    const user = useUserStore((state) => state.user);
    const userId = user?.id
    //console.log("NPM user:", userId);

    const methods = useForm({
        resolver: zodResolver(CreateProjectSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            userId: userId || "",
            description: ""
        }
    });

    const postMutation = usePostProjects();
   
    // async to help execute and handle error
    const onSubmit = async (data: Project) => {
        //setLoading(true);
        setError(null);
        // console.log("Payload:", projectData);

        try {
            console.log("Saving to Firebase:", data);
            await postMutation.mutateAsync({
                name: data.name, 
                userId: data.userId, 
                description: data.description
            });
            
            //setLoading(false);
        } catch (err: any) {
            //setLoading(false);
            setError("Failed to create project. Please check your inputs.");
        }
    };

    return (
        <div>
        <Modal
            open={true}
            onClose={handleClickOverview}
        >
            <Box sx={style} component="form" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new project
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
                            {...methods.register("userId")}
                            error={!!methods.formState.errors.userId}
                            helperText={methods.formState.errors.userId ? methods.formState.errors.userId.message : ""}
                            label="User ID"
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
                        disabled={postMutation.isPending}
                    >
                        {postMutation.isPending ? "Creating..." : "Create Project"}
                    </Button>
                    <Button 
                        type="button"
                        onClick={handleClickOverview} 
                        disabled={postMutation.isPending} 
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
        </div>
    );
}
