import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TimeLogsService } from "../services/timelogs.services";
import { useNavigationManager } from "../services/navigationManager";

export const useDeleteTimeLogs= () => {
    const { handleClickOverview } = useNavigationManager();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => TimeLogsService.deleteTimeLogs(id),
        onSuccess: () => {
            console.log("Deleted time log successfully!");
            queryClient.invalidateQueries({ queryKey: ["timeLogs"] });
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Time log deletion failed:", error);
        }
    });
}; 