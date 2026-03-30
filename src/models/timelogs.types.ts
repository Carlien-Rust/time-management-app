import z from 'zod';
import { TimeSchema } from "./timelogs.schema";

export type TimeLogs = z.infer<typeof TimeSchema>;

export interface TimeLogApiResponse<T> {
  data: T;           
  message?: string;  
  success: boolean;  
}

export interface Project {
  id: string;
  name: string;
}