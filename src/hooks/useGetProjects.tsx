import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "../services/project.services";

// Simulating an API call for getting by userId
// Simulation Functions
export const fetchProjects = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return ProjectService.getProjects(userId!);
};

export const useGetProjects = (userId: string | null | undefined ) => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => {
      if (!userId) throw new Error("ID is required");
      return fetchProjects(userId); 
    },
    enabled: !!userId,
  });
};
