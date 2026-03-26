/* Get Project IDs
Mock data: src/mockData/timeLogs.ts 
*/
import { useQuery } from "@tanstack/react-query";
import { timeLogs } from "../mockData/timeLog";

// Simulating an API call for getting all users and users by ID
// Simulation Functions
export const fetchTimeLogsById = async (projectId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return timeLogs.filter(t => t.projectId === projectId); // Returns all entries just the specific user object
};

export const useGetTimeLogsById = (projectId: string | undefined) => {
  return useQuery({
    queryKey: ["timelogs", projectId],
    queryFn: () => {
      if (!projectId) throw new Error("ID is required");
      return fetchTimeLogsById(projectId); 
    },
    enabled: !!projectId, // Only runs if ID exists
  });
};