/*
Calls EditTimeLogModal

-- Clickup Ticket
Build <TimeEntryTable> using MRT. Columns: Date, Project chip, Duration (h), Notes, row actions (edit / delete).
Acceptance Criteria
Pagination (10 rows) handled by hook page,limit
Footer row shows page total hours.
While fetching: skeleton rows.
On fetch error: alert banner with retry.
*/

import * as React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography, Alert, Button, Skeleton, Pagination, TableFooter, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigationManager } from '../services/navigationManager';
import { useDeleteTimeLogs } from "../hooks/useDeleteTimeLogs";
import { type TimeLogs, type Project } from "../models/timelogs.types";

interface TimeLogTableProps {
  logs: TimeLogs[];
  projectId: string;
  projects?: Project[];
  showProjectChip?: boolean;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void; 
}

export default function TimeLogTable({ logs, projects = [], showProjectChip = false, isLoading, isError, refetch }: TimeLogTableProps) {
  const { handleEditTime } = useNavigationManager();
  const deleteMutation = useDeleteTimeLogs();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const paginatedLogs = logs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalHours = logs.reduce((sum, log) => sum + Number(log.hours), 0);
  const totalMinutes = logs.reduce((sum, log) => sum + Number(log.minutes), 0);
  const displayTotal = `${totalHours + Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;

  const handleDelete = async (logId: string) => {
    try {
      // Passes the specific row ID to the mutation
      await deleteMutation.mutateAsync(logId);
      console.log("Deleted log:", logId);
    } catch (error) {
      console.error("Deletion failed in component:", error);
    }
  };

  if (isError) {
      return (
          <Alert severity="error" action={<Button onClick={() => refetch()}>Retry</Button>}>
              Failed to load time logs.
          </Alert>
      );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Typography variant="h6" id="tableTitle" component="div" sx={{ mb: 2 }}>
          Project Time Logs
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'var(--shadow)'}}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Minutes</TableCell>
                <TableCell>Notes</TableCell>
                {showProjectChip && <TableCell sx={{ fontWeight: 'bold' }}>Project</TableCell>}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={showProjectChip ? 5 : 4}>
                      <Skeleton variant="text" height={40} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                paginatedLogs.map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.projectId}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell>{row.hours}</TableCell>
                    <TableCell>{row.minutes}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                    {showProjectChip && (
                      <TableCell>
                        <Chip 
                          label={projects.find(p => p.id === row.projectId)?.name || 'Unknown'} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      </TableCell>
                    )}
                    
                    {/* ACTIONS COLUMN */}
                    <TableCell align="center">
                      <Tooltip title="Edit Entry">
                        <IconButton 
                          onClick={() => handleEditTime(row.id, row.projectId)}
                          size="small"
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Entry">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={1} align="center">No time logs found.</TableCell>
                </TableRow>
              )}
            </TableBody>
            {!isLoading && (
              <TableFooter>
                  <TableRow sx={{ bgcolor: 'primary.light' }}>
                      <TableCell colSpan={7} sx={{ fontWeight: 'bold' }}>Total Logged</TableCell>
                      {showProjectChip && <TableCell />}
                      <TableCell colSpan={8} sx={{ fontWeight: 'bold' }}>{displayTotal}</TableCell>
                      <TableCell colSpan={9} />
                  </TableRow>
              </TableFooter>
            )}
          </Table>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination 
                  count={Math.ceil(logs.length / rowsPerPage)} 
                  page={page} 
                  onChange={(_, v) => setPage(v)} 
                  color="primary" 
              />
          </Box>
        </TableContainer>
      </Paper>
    </Box>
  );
}