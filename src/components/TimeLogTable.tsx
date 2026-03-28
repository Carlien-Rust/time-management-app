/*
-- Clickup Ticket
Build <TimeEntryTable> using MRT. Columns: Date, Project chip, Duration (h), Notes, row actions (edit / delete).
Acceptance Criteria
Pagination (10 rows) handled by hook page,limit
Footer row shows page total hours.
While fetching: skeleton rows.
On fetch error: alert banner with retry.
*/

import * as React from 'react';
import { useSearch } from "@tanstack/react-router";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigationManager } from '../services/navigationManager';
import { useDeleteTimeLogs } from "../hooks/useDeleteTimeLogs";

interface TimeLog {
  id: string;
  projectId: string;
  userId: string;
  date: string;
  hours: string;
  minutes: string;
  notes: string;
  createdAt: string,
  updatedAt: string,
}

interface TimeLogTableProps {
  logs: TimeLog[];
  projectId: string;
}

export default function TimeLogTable({ logs }: TimeLogTableProps) {
  const { handleEditTime } = useNavigationManager();
  const search = useSearch({ strict: false });
  const id = search.projectId; 
  const logId = search.id;

  console.log("ETLM projectID", id);
  console.log("ETLM timelog ID", logId);

  const deleteMutation = useDeleteTimeLogs();
  const handleDelete = async () => {
        await deleteMutation.mutateAsync(logId!);
  };

  if (!id) {
      return <Typography>No project ID provided.</Typography>;
  }
  if (!logId) {
      return <Typography>No log ID provided.</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Typography variant="h6" id="tableTitle" component="div" sx={{ mb: 2 }}>
          Project Time Logs
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Hours</TableCell>
                <TableCell align="right">Minutes</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.projectId}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell component="th" scope="row">{row.date}</TableCell>
                  <TableCell align="right">{row.hours}</TableCell>
                  <TableCell align="right">{row.minutes}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  
                  {/* ACTIONS COLUMN */}
                  <TableCell align="center">
                    <Tooltip title="Edit Entry">
                      <IconButton 
                        onClick={() => handleEditTime(id, logId)}
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
                        onClick={handleDelete}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No time logs found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}