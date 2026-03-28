/*
Users API - EXAMPLE
-> useUser hook

POST /users
send 
{
    "userId": "string",
    "name": "string",
    "email": "string"
}
return
{
    "id": "string",
    "name": "string",
    "email": "string",
    "createdAt": "2026-03-26T10:52:05.382Z",
    "updatedAt": "2026-03-26T10:52:05.382Z"
}
-> Hook: usePostUser

GET /users
return
{
    "id": "string",
    "name": "string",
    "email": "string",
    "createdAt": "2026-03-26T10:52:05.382Z",
    "updatedAt": "2026-03-26T10:52:05.382Z"
}

GET /users/{id}
send
{
    id
}
return
{
    "id": "string",
    "name": "string",
    "email": "string",
    "createdAt": "2026-03-26T10:52:05.382Z",
    "updatedAt": "2026-03-26T10:52:05.382Z"
}
-> Hook: useGetUsers

*/
import apiClient from './apiClient';
import { z } from "zod";
import { type User, type UserApiResponse } from "../models/users.types";
import { UserSchema} from "../models/users.schema";

export const UserService = {
    postUser: async (payload: { userId: string; name: string; email: string }): Promise<User> => {
        const response = await apiClient.post<UserApiResponse<User>>(`/users`, payload);
        return UserSchema.parse(response.data);
    },
    getUsers: async (): Promise<User[]> => {
        const response = await apiClient.get<UserApiResponse<User[]>>(`/users`);
        return z.array(UserSchema).parse(response.data);
    },
    getUserById: async (id: string): Promise<User> => {
        const response = await apiClient.get<UserApiResponse<User>>(`/users/${id}`);
        return UserSchema.parse(response.data);
    },
};