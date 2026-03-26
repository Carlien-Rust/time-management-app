import z from 'zod';
import { ProjectSchema } from "./projects.schema";

// This automatically creates a TS interface matching the Schema
export type Project = z.infer<typeof ProjectSchema>;

// Generic wrapper for all BE responses
export interface ProjectApiResponse<T> {
  data: T;           // User or Array of Users
  message?: string;  // Success/Error message
  success: boolean;  // Helper for quick checks
}