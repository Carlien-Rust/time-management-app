/*
-- AUTH
POST /login
send
{
  "email": "string",
  "password": "string"
}
return
{
  "idToken": "string",
  "refreshToken": "string",
  "expiresIn": "string"
}
-> Hook: usePostAuth
*/
import { type Auth, type AuthApiResponse } from "../models/auth.types";
import { AuthSchema} from "../models/auth.schema";
import apiClient from './apiClient';

export const AuthService = {
    postAuth: async (payload: { email: string; password: string}): Promise<Auth> => {
        const response = await apiClient.post<AuthApiResponse<Auth>>(`/login`, payload);
        return AuthSchema.parse(response.data.data);
    }
}