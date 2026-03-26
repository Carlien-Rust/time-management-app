import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.services";
import { useNavigationManager } from "../services/navigationManager";

export const usePostAuth = () => {
    const { handleClickOverview } = useNavigationManager();
    return useMutation({
        mutationFn: (payload: { email: string; password: string }) => AuthService.postAuth(payload),
        onSuccess: () => {
            console.log("Logged in successfully!");
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Login failed:", error);
        }
    });
};