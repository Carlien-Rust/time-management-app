import { useMutation } from "@tanstack/react-query";
import { TimeLogsService } from "../services/timelogs.services";
import { useNavigationManager } from "../services/navigationManager";

export const usePostTimeLogs = () => {
    const { handleClickOverview } = useNavigationManager();
    return useMutation({
        mutationFn: (payload: { projectId: string; userId: string; date: string; hours: 0; minutes: 0; notes: string }) => TimeLogsService.postTimeLogs(payload),
        onSuccess: () => {
            console.log("Created time log successfully!");
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Time log creation failed:", error);
        }
    });
};