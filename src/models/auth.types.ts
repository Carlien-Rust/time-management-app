import z from 'zod';
import { AuthSchema } from "./auth.schema";

// This automatically creates a TS interface matching the Schema
export type Auth = z.infer<typeof AuthSchema>;

// Generic wrapper for all BE responses
export interface AuthApiResponse<T> {
  data: T;           // User or Array of Users
  message?: string;  // Success/Error message
  success: boolean;  // Helper for quick checks
}