/*
Cards to show total hours worked and average per day
*/
import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import { type TimeLogs } from "../models/timelogs.types";

export function KPICards({ logs, isLoading } : { logs: TimeLogs[], isLoading: boolean }) {
    
    if (isLoading) return <Skeleton variant="rectangular" height={120} sx={{ mb: 4, borderRadius: 3 }} />;

    const totalMinutes = logs.reduce((acc, log) => acc + (Number(log.hours) * 60) + Number(log.minutes), 0);
    const uniqueDays = new Set(logs.map(l => l.date)).size;
    const avgPerDay = uniqueDays > 0 ? (totalMinutes / 60) / uniqueDays : 0;

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid>
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 3 }}>
                    <Typography variant="subtitle2">Total Hours</Typography>
                    <Typography variant="h3" fontWeight="bold">{Math.floor(totalMinutes / 60)}h</Typography>
                </Paper>
            </Grid>
            <Grid>
                <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Typography variant="subtitle2">Avg Hours/Day</Typography>
                    <Typography variant="h3" fontWeight="bold">{avgPerDay.toFixed(1)}h</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}