// Managers for navigation in the app 

import { useNavigate } from "@tanstack/react-router";

export function useNavigationManager() {
    const navigate = useNavigate();

    // Sidebar - Overview
    const handleClickOverview = () => {
        navigate({ to: "/dashboard" });
    };

    // Sidebar - Add project
    const handleAddProject = () => {
        navigate({ to: "/new-project" });
    };

    //Sidebar - Projects
    const handleClickProject = (id: string) => {
        navigate({ to: "/project/$id",
            params: { id }
        });
    };

    // Register
    const handleRegister = () => {
        navigate({ to: "/register" });
    };

    //Project card - Edit projects
    const handleEditProject = (id: string) => {
        navigate({ to: "/project/$id/edit-project",
            params: { id } 
        });
    };

    //Project card - Logging time
    const handleTimeEntry = (id: string) => {
        navigate({ to: "/project/$id/add-time",
            params: { id }
        });
    };

    //Time card - Edit 
    const handleEditTime = (logId: string, projectId: string) => {
        navigate({ 
            to: "/timeEntries/edit-time",
            search: { 
                id: logId,
                projectId: projectId
            }
        });
    };

    //Time card - Add
    const handleAddTime = (id: string) => {
        navigate({ 
            to: "/timeEntries/add-new-time",
            search: { 
                projectId: id
            }
        });
    };

   // Profile
    const handleProfile = () => {
        navigate({ to: "/profile" });
    };

    // Reset password
    const handleReset = () => {
        navigate({ to: "/reset" });
    };

    // Logout/Login Page
    const handleLogout = () => {
        navigate({ to: "/login" });
    };
    

   return {
    handleClickOverview, 
    handleClickProject, 
    handleAddProject,
    handleEditProject,
    handleTimeEntry,
    handleAddTime,
    handleEditTime,
    handleRegister,
    handleProfile,
    handleReset,
    handleLogout,
   };
}