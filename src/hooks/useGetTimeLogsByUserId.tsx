import { useQuery } from "@tanstack/react-query";
import { TimeLogsService } from "../services/timelogs.services";

// Simulating an API call for getting by userId
// Simulation Functions
export const fetchTimeLogs = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return TimeLogsService.getTimeLogsByUserId(userId!);
};

export const useGetTimeLogsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["timeLogs"],
    queryFn: () => {
      if (!userId) throw new Error("ID is required");
      return fetchTimeLogs(userId); 
    },
    enabled: !!userId,
  });
};