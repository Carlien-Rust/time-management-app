import z from 'zod';
import { UserSchema } from "./users.schema";

export type User = z.infer<typeof UserSchema>;

export interface UserApiResponse<T> {
  data: T;          
  message?: string;
  success: boolean; 
}