interface Project {
  id: string;
  name: string;
  startDate: string;      // ISO string
  endDate: string | null; // null = ongoing
  durationDays: number | null;
  summary?: string;
}

export const projects: Project[] = [
  {
    id: "proj_001",
    name: "AXIS Trader MVP",
    startDate: "2025-10-01",
    endDate: "2025-11-15",
    durationDays: 45,
    summary: "Initial MVP build including authentication and leaderboard."
  },
  {
    id: "proj_002",
    name: "Frontend UI Migration",
    startDate: "2025-11-20",
    endDate: "2025-12-10",
    durationDays: 20,
    summary: "Migrated UI from Tailwind to MUI."
  },
  {
    id: "proj_003",
    name: "Evaluation Engine Refactor",
    startDate: "2025-12-12",
    endDate: "2025-12-20",
    durationDays: 8,
    summary: "Moved evaluation logic to backend."
  },
  {
    id: "proj_004",
    name: "Leaderboard Optimization",
    startDate: "2026-01-05",
    endDate: "2026-01-18",
    durationDays: 13,
    summary: "Optimized queries and introduced caching."
  },
  {
    id: "proj_005",
    name: "Error Handling System",
    startDate: "2026-01-20",
    endDate: null,
    durationDays: null,
    summary: "Centralized client error reporting."
  }
];