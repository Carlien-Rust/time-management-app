import { Typography, Box } from '@mui/material';
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { type TimeLogs } from "../models/timelogs.types";
import { getProjectColor } from '../styles/chartHelpers';

export function TimeChart({ logs, projects }: { logs: TimeLogs[], projects: any[] }) {
    const chartData = useMemo(() => {
        if (!projects) return [];

        return projects.map(p => {
            const projectLogs = logs.filter(l => l.projectId === p.id);
            const totalHours = projectLogs.reduce((sum, l) => sum + Number(l.hours) + (Number(l.minutes) / 60), 0);
            
            return { 
                id: p.id,
                name: p.name, 
                hours: parseFloat(totalHours.toFixed(1)) 
            };
        }).filter(d => d.hours > 0);
    }, [logs, projects]);

    if (chartData.length === 0) return (
        <Box sx={{ py: 10, textAlign: 'center', bgcolor: '#fafafa', borderRadius: 2 }}>
            <Typography color="textSecondary">No data for the selected filter</Typography>
        </Box>
    );

    return (
        <Box sx={{ 
            width: '100%', 
            height: 350, 
            overflowX: 'auto', 
            overflowY: 'hidden' 
        }}>
            {/* If many projects, force a minimum width to enable scrolling */}
            <Box sx={{ minWidth: chartData.length > 8 ? 1000 : '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                        <YAxis />
                        <Tooltip 
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="hours"radius={[6, 6, 0, 0]} barSize={40}>
                            {chartData.map((entry, index) => {
                                const originalIndex = projects.findIndex(p => p.id === entry.id);
                                return (
                                    <Cell 
                                        key={`cell-${entry.id}`} 
                                        fill={getProjectColor(originalIndex !== -1 ? originalIndex : index)} 
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}