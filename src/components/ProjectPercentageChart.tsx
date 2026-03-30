import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Typography, Paper } from '@mui/material'; 
import { type TimeLogs, type Project } from '../models/timelogs.types';
import { getProjectColor } from "../styles/chartHelpers";

interface Props {
  logs: TimeLogs[];
  projects: Project[];
}

export function ProjectPercentageChart({ logs, projects }: Props) {
  const data = projects.map(p => {
    const projectLogs = logs.filter(l => l.projectId === p.id);
    const totalHours = projectLogs.reduce((sum, l) => sum + Number(l.hours) + (Number(l.minutes) / 60), 0);
    return { name: p.name, value: parseFloat(totalHours.toFixed(1)) };
  }).filter(d => d.value > 0);

  if (data.length === 0) return null;

  return (
    <Paper sx={{ p: 3, borderRadius: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Workload Distribution (%)</Typography>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ percent }) => `${(percent ? percent * 100 : 0).toFixed(0)}%`}
          >
            {data.map((entry) => {
                const colorIndex = projects.findIndex(p => p.name === entry.name);
                return (
                    <Cell 
                        key={`cell-${entry.name}`} 
                        fill={getProjectColor(colorIndex !== -1 ? colorIndex : 0)} 
                    />
                ); 
            })}
          </Pie>
          <Tooltip 
            formatter={(value: any) => {
                const numericValue = Number(value) || 0; 
                return [`${numericValue.toFixed(1)} hrs`, 'Total Time'];
            }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}