import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../services/project.services";
import { useNavigationManager } from "../services/navigationManager";

export const usePostProjects = () => {
    const { handleClickOverview } = useNavigationManager();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { name: string; userId: string; description: string }) => ProjectService.postProjects(payload),
        onSuccess: () => {
            console.log("Created project successfully!");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Project creation failed:", error);
        }
    });
};