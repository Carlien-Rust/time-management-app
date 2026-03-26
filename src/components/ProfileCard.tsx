/*
 Hooks: Need to fetch user info
*/
import { Paper, Avatar, Typography } from "@mui/material"
import { Person } from "@mui/icons-material";
import { useAuth} from "../services/auth_services/AuthProvider";
// import { useGetUserById } from "../hooks/useGetUsers";

export default function ProfileCard() {
    const { user } = useAuth();

    // const params = useParams({ strict: false });
    // const id = params?.id;
    // const {data: usersData , isLoading, isError} = useGetUserById(id);

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
            {/* <body>Username: {usersData.displayName}</body>
            <body>Email: {usersData.email}</body> */}
        </Paper>
    );
};