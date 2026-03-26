/*
ProjectDto {
    id*	string
    name*	string
    userId*	string
    description*	string
    createdAt*	string($date-time)
    updatedAt*	string($date-time)
}
*/
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});