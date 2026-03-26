/*
return
{
  "idToken": "string",
  "refreshToken": "string",
  "expiresIn": "string"
}
*/
import { z } from 'zod';

export const AuthSchema = z.object({
  idToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.string(),
});