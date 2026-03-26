/*
Hook: useGetTimeLogsByProjectId();
*/
import { Container, CardActions, Button, Typography, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from '../services/navigationManager';
import { useGetTimeLogsByProjectId } from "../hooks/useGetTimeLogsByProjectId";
import TimeLogTable from "./TimeLogTable";

export default function TimeCard() {

    const defaultTheme = createTheme();

    const params = useParams({ strict: false });
    const { id, projectId } = params;

    const { data: timeData, isLoading, isError, refetch } = useGetTimeLogsByProjectId(projectId);

    const { handleAddTime } = useNavigationManager();

    // const handleRefresh = () => {
    //     refetch(); 
    //     console.log("Refreshing encryption servers...");
    // };

    if (isLoading) return <Typography>Loading Time Data...</Typography>;
    if (isError) return <Typography>Project not found. Please check the ID.</Typography>;
    if (!id || !projectId) {
        return <Typography>Error: No Project ID provided.</Typography>;
    }
    if (!timeData || timeData.length === 0) {
        return (
            <Container>
                <Typography variant="h6">Time Entries</Typography>
                <Alert severity="info" sx={{ my: 2 }}>
                    No time logs found for this project.
                </Alert>
                <Button variant="contained" onClick={() => handleAddTime(id, projectId)}>
                    Log your first entry
                </Button>
            </Container>
        );
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <Typography variant="h6" sx={{ mb: 2 }}>Time Entries</Typography>
                < TimeLogTable
                    logs={timeData || []} 
                    projectId={projectId}
                />
                <CardActions>
                    <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => handleAddTime(id, projectId)}
                    >
                        Log new time
                    </Button>
                </CardActions>
            </Container>
        </ThemeProvider>
    );
}