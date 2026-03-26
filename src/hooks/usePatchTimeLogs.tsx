import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TimeLogsService } from "../services/timelogs.services";
import { useNavigationManager } from "../services/navigationManager";
import { type TimeLogs } from "../models/timelogs.types";

export const usePatchTimeLogs = () => {
    const { handleClickOverview } = useNavigationManager();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: {id: string, payload: { projectId: string; date: string; hours: 0; minutes: 0; notes: string }}) => TimeLogsService.patchTimeLogs(id, payload),
        onSuccess: (data: TimeLogs) => {
            console.log("Updated time log successfully!");
            queryClient.invalidateQueries({ queryKey: ["timeLogs"] });
            queryClient.setQueryData(["timeLogs", data.id], data);
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Time log updation failed:", error);
        }
    });
};