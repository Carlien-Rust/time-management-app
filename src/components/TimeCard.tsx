/*

*/
import { Container, CardActions, Button, Box, Typography, Alert } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from '../services/navigationManager';
import { useGetTimeLogsById } from "../hooks/useGetTime";
import TimeLogTable from "./TimeLogTable";

export default function TimeCard() {

    const defaultTheme = createTheme();

    const params = useParams({ strict: false });
    const id = params?.id;

    const { data: timeData, isLoading, isError, refetch } = useGetTimeLogsById(id); 

    const logId = "log_001";
    const { handleEditTime, handleAddTime } = useNavigationManager();

    // const handleRefresh = () => {
    //     refetch(); 
    //     console.log("Refreshing encryption servers...");
    // };

    // Add mutation hook for delete project
    // const handleDelete = (projects.id) => {
    //     const updatedData = projects.filter(item => item.id !== id);
    //     setData(updatedData);
    // };

    if (isLoading) return <Typography>Loading Time Data...</Typography>;
    if (isError) return <Typography>Project not found. Please check the ID.</Typography>;
    if (!id || !logId) {
        return <Typography>Error: No Project ID provided.</Typography>;
    }
    if (!timeData || timeData.length === 0) {
        return (
            <Container>
                <Typography variant="h6">Time Entries</Typography>
                <Alert severity="info" sx={{ my: 2 }}>
                    No time logs found for this project.
                </Alert>
                <Button variant="contained" onClick={() => handleAddTime(id, logId)}>
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
                    projectId={id}
                />
                <CardActions>
                    <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => handleAddTime(id, logId)}
                    >
                        Log new time
                    </Button>
                </CardActions>
            </Container>
        </ThemeProvider>
    );
}