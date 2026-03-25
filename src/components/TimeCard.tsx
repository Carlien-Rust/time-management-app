/*
-- Clickup Ticket
Build <TimeEntryTable> using MRT. Columns: Date, Project chip, Duration (h), Notes, row actions (edit / delete).
Acceptance Criteria
Pagination (10 rows) handled by hook page,limit
Footer row shows page total hours.
While fetching: skeleton rows.
On fetch error: alert banner with retry.
*/
import { Container, CardActions, Button, Box, Typography } from '@mui/material';
import { useParams } from "@tanstack/react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from '../services/navigationManager';
import { useGetTimeLogById } from "../hooks/useGetTime";

export default function TimeCard() {

    const defaultTheme = createTheme();

    const params = useParams({ strict: false });
    const id = params?.id;

    const { data: timeData, isLoading, isError, refetch } = useGetTimeLogById(id); 

    const { handleEditTime, handleAddTime } = useNavigationManager();

    const handleRefresh = () => {
        refetch(); 
        console.log("Refreshing encryption servers...");
    };

    // Add mutation hook for delete project
    // const handleDelete = (projects.id) => {
    //     const updatedData = projects.filter(item => item.id !== id);
    //     setData(updatedData);
    // };

    if (id && isLoading) return <Typography>Loading Time Data...</Typography>;
    if (id && isError) {
        return (
        <Box>
            <Typography>Error loading user data.</Typography>
            <Button onClick={handleRefresh}>Try Again</Button>
        </Box>
        );
    }
    if (isError || !timeData) return <Typography>Project not found. Please check the ID.</Typography>;

    if (!id) {
        return <Typography>Error: No Project ID provided.</Typography>;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                {timeData?.projectId}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Duration: {timeData?.durationHours}
                </Typography>
                <CardActions>
                    <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => handleAddTime(id)}
                    >
                        Add
                    </Button>
                    <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => handleEditTime(id)}
                    >
                        Edit
                    </Button>
                    <Button 
                        size="small" 
                        variant="contained"
                        type="button"
                    >
                        Delete
                    </Button>
                </CardActions>
            </Container>
        </ThemeProvider>
    );
}