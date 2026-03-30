/*
Hook: useGetTimeLogsByProjectId();
*/
import { Container, CardActions, Button, Typography, Alert, Box } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { useNavigationManager } from '../services/navigationManager';
import { useGetTimeLogsByProjectId } from "../hooks/useGetTimeLogsByProjectId";
import TimeLogTable from "./TimeLogTable";

export default function TimeCard() {

    const params = useParams({ strict: false });
    const { id } = params; // projectId

    const { data: timeData, isLoading, isError, refetch } = useGetTimeLogsByProjectId(id);

    const { handleAddTime } = useNavigationManager();

    const handleRefresh = () => {
        refetch(); 
        console.log("Refreshing encryption servers...");
    };

    if (!id) return <Typography>No Project ID provided.</Typography>;
    if (id && isError) {
        return (
        <Box>
            <Typography>Error loading user data.</Typography>
            <Button onClick={handleRefresh}>Try Again</Button>
        </Box>
        );
    }
    if (!isLoading && (!timeData || timeData.length === 0)) {
        return (
            <Container>
                <Typography variant="h6">Time Entries</Typography>
                <Alert severity="info" sx={{ my: 2 }}>
                    No time logs found for this project.
                </Alert>
                <Button variant="contained" onClick={() => handleAddTime(id)}>
                    Log your first entry
                </Button>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="lg">
            <Typography variant="h6" sx={{ mb: 2 }}>Time Entries</Typography>
            < TimeLogTable
                logs={timeData || []} 
                projectId={id}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
            <CardActions>
                <Button 
                    size="small" 
                    variant="contained" 
                    onClick={() => handleAddTime(id)}
                >
                    Log new time
                </Button>
            </CardActions>
        </Container>
    );
}