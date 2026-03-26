import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../services/project.services";
import { useNavigationManager } from "../services/navigationManager";
import { type Project } from "../models/projects.types";

export const usePatchProjects = () => {
    const { handleClickOverview } = useNavigationManager();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, payload }: {projectId: string, payload: { name: string; description: string }}) => ProjectService.patchProject(projectId, payload),
        onSuccess: (data: Project) => {
            console.log("Updated project successfully!");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.setQueryData(["projects", data.id], data);
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Project updation failed:", error);
        }
    });
};