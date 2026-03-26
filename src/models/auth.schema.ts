/*
AuthDTo {
  "email": "string",
  "password": "string"
}
*/
import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});