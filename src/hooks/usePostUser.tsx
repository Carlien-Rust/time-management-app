import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/users.services";
import { useNavigationManager } from "../services/navigationManager";

export const usePostUser = () => {
    const { handleClickOverview } = useNavigationManager();
    return useMutation({
        mutationFn: (payload: { userId: string; name: string; email: string }) => UserService.postUser(payload),
        onSuccess: () => {
            console.log("Created user successfully!");
            handleClickOverview();
        },
        onError: (error) => {
            console.error("User creation failed:", error);
        }
    });
};