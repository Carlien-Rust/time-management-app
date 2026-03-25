/* Get Project IDs
Mock data: src/mockData/timeLogs.ts 
*/
import { useQuery } from "@tanstack/react-query";
import { timeLogs } from "../mockData/timeLog";

// Simulating an API call for getting all users and users by ID
// Simulation Functions
export const fetchTimeLog = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return timeLogs;
};

export const fetchTimeLogById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return timeLogs.find(t => t.id === id); // Returns just the specific user object
};

// Hooks
export const useGetTimeLog = () => {
  return useQuery({
    queryKey: ["timelogs"],
    queryFn: fetchTimeLog,
  });
};

export const useGetTimeLogById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["timelogs", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return fetchTimeLogById(id); 
    },
    enabled: !!id, // Only runs if ID exists
  });
};