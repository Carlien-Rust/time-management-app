// src/mockData/timeLogs.ts

export interface TimeLog {
  logId: string;
  projectId: string;
  date: string;       // ISO string (YYYY-MM-DD)
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  durationHours: number;
  description: string;
}

export const timeLogs: TimeLog[] = [
  // Logs for AXIS Trader MVP (proj_001)
  {
    logId: "log_001",
    projectId: "proj_001",
    date: "2025-10-05",
    startTime: "09:00",
    endTime: "12:00",
    durationHours: 3,
    description: "Setting up Firebase Auth and project structure."
  },
  {
    logId: "log_002",
    projectId: "proj_001",
    date: "2025-10-06",
    startTime: "13:00",
    endTime: "17:30",
    durationHours: 4.5,
    description: "Designing the initial Leaderboard UI components."
  },

  // Logs for Frontend UI Migration (proj_002)
  {
    logId: "log_003",
    projectId: "proj_002",
    date: "2025-11-21",
    startTime: "08:30",
    endTime: "11:30",
    durationHours: 3,
    description: "Auditing Tailwind classes for migration mapping."
  },

  // Logs for Evaluation Engine Refactor (proj_003)
  {
    logId: "log_004",
    projectId: "proj_003",
    date: "2025-12-13",
    startTime: "10:00",
    endTime: "16:00",
    durationHours: 6,
    description: "Extracted scoring logic into isolated utility functions."
  },

  // Logs for Leaderboard Optimization (proj_004)
  {
    logId: "log_005",
    projectId: "proj_004",
    date: "2026-01-07",
    startTime: "14:00",
    endTime: "18:00",
    durationHours: 4,
    description: "Implementing TanStack Query caching for leaderboard entries."
  },

  // Logs for Error Handling System (proj_005)
  {
    logId: "log_006",
    projectId: "proj_005",
    date: "2026-01-21",
    startTime: "09:00",
    endTime: "10:30",
    durationHours: 1.5,
    description: "Initial research on Sentry vs. custom Error Boundary."
  }
];