import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TimeLogsService } from "../services/timelogs.services";
import { useNavigationManager } from "../services/navigationManager";

export const usePostTimeLogs = () => {
    const queryClient = useQueryClient();
    const { handleTimeEntry } = useNavigationManager();

    return useMutation({
        mutationFn: (payload: { projectId: string; userId: string; date: string; hours: 0; minutes: 0; notes: string }) => TimeLogsService.postTimeLogs(payload),
        onSuccess: (_data, variables) => {
            console.log("Created time log successfully!");
            queryClient.invalidateQueries({ queryKey: ["timeLogs"] });
            handleTimeEntry(variables.projectId);
        },
        onError: (error) => {
            console.error("Time log creation failed:", error);
        }
    });
};