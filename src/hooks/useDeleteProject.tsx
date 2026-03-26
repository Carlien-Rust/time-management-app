import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../services/project.services";
import { useNavigationManager } from "../services/navigationManager";

export const useDeleteProject = () => {
    const { handleClickOverview } = useNavigationManager();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (projectId: string) => ProjectService.deleteProject(projectId),
        onSuccess: () => {
            console.log("Deleted project successfully!");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Project deletion failed:", error);
        }
    });
};