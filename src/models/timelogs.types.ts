import z from 'zod';
import { TimeSchema } from "./timelogs.schema";

// This automatically creates a TS interface matching the Schema
export type TimeLogs = z.infer<typeof TimeSchema>;

// Generic wrapper for all BE responses
export interface TimeLogApiResponse<T> {
  data: T;           // User or Array of Users
  message?: string;  // Success/Error message
  success: boolean;  // Helper for quick checks
}

export interface Project {
  id: string;
  name: string;
}