import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/users.services";

// Simulating an API call for getting all users
// Simulation Functions
export const fetchUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return UserService.getUsers();
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

// Simulating an API call for getting users by ID
export const fetchUserById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  return UserService.getUserById(id!);
};

export const useGetUserById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return fetchUserById(id); 
    },
    enabled: !!id, // Only runs if ID exists
  });
};