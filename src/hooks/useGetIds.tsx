/* Get Project IDs
Mock data: src/mockData/projects.ts 
*/
import { useQuery } from "@tanstack/react-query";
import { projects } from "../mockData/projects";

// Simulating an API call for getting all users and users by ID
// Simulation Functions
export const fetchProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return projects;
};

export const fetchProjectsById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return projects.find(p => p.id === id); // Returns just the specific user object
};

// Hooks
export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

export const useGetProjectsById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return fetchProjectsById(id); 
    },
    enabled: !!id, // Only runs if ID exists
  });
};