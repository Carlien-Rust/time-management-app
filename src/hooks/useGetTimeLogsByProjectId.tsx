import { useQuery } from "@tanstack/react-query";
import { TimeLogsService } from "../services/timelogs.services";

// Simulating an API call for getting by projectId
// Simulation Functions
export const fetchTimeLogs = async (projectId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return TimeLogsService.getTimeLogsByProjectId(projectId!);
};

export const useGetTimeLogsByProjectId = (id: string | null | undefined) => {
  return useQuery({
    queryKey: ["timeLogs"],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return fetchTimeLogs(id); 
    },
    enabled: !!id,
  });
};