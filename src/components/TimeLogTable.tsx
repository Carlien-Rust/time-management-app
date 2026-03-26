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
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigationManager } from '../services/navigationManager';

interface TimeLog {
  logId: string;
  projectId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  description: string;
}

interface TimeLogTableProps {
  logs: TimeLog[];
  projectId: string;
}

export default function TimeLogTable({ logs, projectId }: TimeLogTableProps) {
  const { handleEditTime } = useNavigationManager();

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
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
                <TableCell align="right">Hours</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row) => (
                <TableRow hover key={row.logId}>
                  <TableCell component="th" scope="row">{row.date}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">{row.startTime}</TableCell>
                  <TableCell align="right">{row.endTime}</TableCell>
                  <TableCell align="right">{row.durationHours}</TableCell>
                  
                  {/* ACTIONS COLUMN */}
                  <TableCell align="center">
                    <Tooltip title="Edit Entry">
                      <IconButton 
                        onClick={() => handleEditTime(projectId, row.logId)}
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
                        onClick={() => console.log("Trigger Delete for:", row.logId)}
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