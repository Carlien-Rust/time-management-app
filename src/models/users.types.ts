import z from 'zod';
import { UserSchema } from "./users.schema";

// This automatically creates a TS interface matching the Schema
export type User = z.infer<typeof UserSchema>;

// Generic wrapper for all BE responses
export interface UserApiResponse<T> {
  data: T;           // User or Array of Users
  message?: string;  // Success/Error message
  success: boolean;  // Helper for quick checks
}