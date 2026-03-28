import { useMutation } from "@tanstack/react-query"; 
import { AuthService } from "../services/auth.services";
import { useNavigationManager } from "../services/navigationManager";
import { useAuth } from "../services/auth_services/AuthProvider";

export const usePostAuth = () => {
    const { handleClickOverview } = useNavigationManager();
    const { login } = useAuth(); // AuthProvider.tsx: Get the Firebase login function - this was missing and needed to connect BE and FB users
    return useMutation({
        mutationFn: async (payload: { email: string; password: string }) => {
            const fbUserCred = await login(payload.email, payload.password);
            const userId = fbUserCred.user ? fbUserCred.user.uid : fbUserCred.uid;
            //console.log("fbUserCred in usePostAuth", fbUserCred);

            const authData = await AuthService.postAuth(payload);
            //console.log("authData in usePostAuth", authData);
            
            return { 
                userId: userId, 
                tokens: authData 
            };
        },
        onSuccess: () => {
            console.log("Logged in and Firebase Auth successfully!");
            handleClickOverview();
        },
        onError: (error) => {
            console.error("Login failed:", error);
        }
    });
};
