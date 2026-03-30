/*
src/components/DashboardPage.jsx
- Overview of all project highlights

Calls TimeLogTable, KPICards, ProjectPercentageChart, TimeChart

route: '/dashboard'

Hooks: useGetTimeLogsByUserId, useGetProjects

-- Clickup ticket
Open /dashboard; cards render once (no duplicate requests) and display project + total time
Resize browser; card count per row matches breakpoints.
Loading & Error States: While fetching: project-card skeletons shown.
On fetch error: alert banner with retry button appears.
Empty State: If no projects exist, show illustration and “Add Project” button.
*/

import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Button, Alert } from '@mui/material';
import { useGetProjects } from '../hooks/useGetProjects';
import { useGetTimeLogsByUserId } from '../hooks/useGetTimeLogsByUserId';
import { useUserStore } from '../store/user/UserStore';
import TimeLogTable from '../components/TimeLogTable'; 
import { KPICards } from '../components/KPICards';
import { TimeChart } from '../components/TimeChart';
import { useNavigationManager } from '../services/navigationManager';
import { ProjectPercentageChart } from '../components/ProjectPercentageChart';

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);
    const { handleAddProject } = useNavigationManager();
    const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

    const { data: projects, isLoading: projectsLoading } = useGetProjects(user?.id);
    const { data: allLogs, isLoading, isError, refetch } = useGetTimeLogsByUserId(user?.id!);

    const filteredLogs = useMemo(() => {
        if (selectedProjectId === 'all') return allLogs || [];
        return allLogs?.filter(log => log.projectId === selectedProjectId) || [];
    }, [allLogs, selectedProjectId]);

    if (!projectsLoading && (!projects || projects.length === 0)) {
        return (
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" gutterBottom>No projects yet!</Typography>
                <Typography color="textSecondary" sx={{ mb: 3 }}>Create your first project to start logging time.</Typography>
                <Button variant="contained" onClick={handleAddProject}>+ Add Project</Button>
            </Box>
        );
    }

    if (isError) return (
        <Alert severity="error" action={<Button onClick={() => refetch()}>Retry</Button>}>
            Failed to load dashboard data.
        </Alert>
    );

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>
                
                {/* Project Filter */}
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Project</InputLabel>
                    <Select
                        value={selectedProjectId}
                        label="Filter by Project"
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                    >
                        <MenuItem value="all">All Projects</MenuItem>
                        {projects?.map(p => (
                            <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <KPICards logs={filteredLogs} isLoading={isLoading} />

            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
                    gap: 3, 
                    mb: 4 
                }}
            >
                {/* Left Side: Bar Chart (Flexible width) */}
                <Paper 
                    sx={{ 
                        p: 3, 
                        borderRadius: 3, 
                        flex: { xs: '1 1 auto', md: '2' }, // Takes 2/3 of space on desktop
                        minWidth: 0 // Prevents chart overflow
                    }}
                >
                    <Typography variant="h6" gutterBottom>Hours per Project</Typography>
                    <Box sx={{ height: 400 }}>
                        <TimeChart logs={filteredLogs} projects={projects || []} />
                    </Box>
                </Paper>

                {/* Right Side: Pie Chart (Fixed width/Smaller flex) */}
                <Paper 
                    sx={{ 
                        p: 3, 
                        borderRadius: 3, 
                        flex: { xs: '1 1 auto', md: '1' }, // Takes 1/3 of space on desktop
                        minWidth: { md: '300px' } // Ensures the Pie chart doesn't get too squished
                    }}
                >
                    <ProjectPercentageChart logs={filteredLogs} projects={projects || []} />
                </Paper>
            </Box>

            <Typography variant="h6" gutterBottom>Time Log Overview</Typography>
            <TimeLogTable 
                logs={filteredLogs}
                projects={projects || []}
                projectId={selectedProjectId}
                showProjectChip={selectedProjectId === 'all'}  
                isLoading={isLoading} 
                isError={isError} 
                refetch={refetch}
            />
        </Box>
    );
}