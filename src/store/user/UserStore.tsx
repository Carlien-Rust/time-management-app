import {create} from "zustand";
import {persist} from "zustand/middleware";
import { UserService } from "../../services/users.services";

interface User {
    id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UserState {
    user: User | null;
};

interface UserAction {
    setUser: (user: User) => void;
    refreshUser: () => void;
    fetchUser: (id: string) => void;
};

export const useUserStore = create<UserState & UserAction>()(
    persist(
        (set) => ({
            user: null,
            setUser: (userDetails: User) => set({
                user: userDetails
            }),
            refreshUser: () => set({user: null}),
            fetchUser: async (id: string) => {
                try {
                    const userData = await UserService.getUserById(id);
                    set({ user: userData });
                } catch (error) {
                    console.error("Failed to fetch user into store:", error);
                    set({ user: null });
                }
            }
        }),
        {name: "userStore"}
    ),
);


