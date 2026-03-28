import { Person } from "@mui/icons-material";
import  { Typography, Paper, Avatar } from "@mui/material";
import { useGetUserById } from "../hooks/useGetUsers";
import { useAuth } from "../services/auth_services/AuthProvider";

export default function ProfileCard() {
    const { user, loading: authLoading } = useAuth();
    const id = user?.uid;
    console.log(id)

    const { 
        data: backendUser, 
        isLoading: backendLoading, 
        isError 
    } = useGetUserById(id); 

    if (authLoading) return <p>Checking authentication...</p>;

    if (user && backendLoading) return <p>Fetching profile details...</p>;

    if (!user) {
        return <Typography>Please log in to view your profile.</Typography>;
    }

    if (isError || !backendUser) {
        return (
            <Typography color="error">
                Authenticated as {user.email}, but no backend record found.
            </Typography>
        );
    }

    // 5. Final Render
    return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
            <h2>Welcome!</h2>
            <Avatar sx={{ m: 'auto', bgcolor: 'secondary.main' }}>
                <Person />
            </Avatar>
            <Typography variant="h6">Username: {backendUser.name}</Typography>
            <Typography>Email: {backendUser.email}</Typography>
            <Typography variant="caption">
                Joined: {new Date(backendUser.createdAt).toLocaleDateString()}
            </Typography>
        </Paper>
    );
}