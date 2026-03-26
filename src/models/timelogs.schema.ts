/*
TimeEntryDto {
    id*	string
    projectId*	string
    userId*	string
    date*	string
    hours*	number
    minutes*	number
    notes*	string
    createdAt*	string($date-time)
    updatedAt*	string($date-time)
}
*/
import { z } from 'zod';

export const TimeSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  userid: z.string(),
  date: z.string(),
  hours: z.number(),
  minutes: z.number(),
  notes: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});