/*
UsersDTo {
  "id": "string",
  "name": "string",
  "email": "string",
  "createdAt": "2026-03-26T09:14:53.648Z",
  "updatedAt": "2026-03-26T09:14:53.648Z"
}
*/
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});