import z from 'zod';
import { ProjectSchema } from "./projects.schema";

export type Project = z.infer<typeof ProjectSchema>;

export interface ProjectApiResponse<T> {
  data: T;          
  message?: string;  
  success: boolean;  
}