import { Paper, Avatar, Typography } from "@mui/material"
import { Person } from "@mui/icons-material";
import { useAuth} from "../services/auth_services/AuthProvider";

export default function ProfileCard() {
    const { user } = useAuth();

    if (!user) {
        return <Typography>Please log in to view your profile.</Typography>;
    }

    return (
        <Paper>
            <h2>Welcome!</h2>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <Person />
            </Avatar>
            <body>Username: {user.displayName}</body>
            <body>Email: {user.email}</body>
        </Paper>
    );
};