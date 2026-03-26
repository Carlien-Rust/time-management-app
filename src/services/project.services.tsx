import apiClient from './apiClient';
import z from "zod";

/*
Login = base endpoint {
    base url + "/login"
    method: "post"
    + request body 
    {
  "email": "string",
  "password": "string"
*/


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

export const AuthService = {
    postAuth: async (payload: { email: string; password: string}): Promise<Auth> => {
        // We use .post and pass the payload as the second argument
        const response = await apiClient.post<AuthApiResponse<Auth>>(`/login`, payload);
        return AuthSchema.parse(response.data.data);
    }
}

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
-> Hook: useGetUser

*/

import { type User, type UserApiResponse } from "../models/users.types";
import { UserSchema} from "../models/users.schema";

export const UserService = {
    // 1. CREATE (POST) - Needs to send data!
    postUser: async (payload: { userId: string; name: string; email: string }): Promise<User> => {
        // We use .post and pass the payload as the second argument
        const response = await apiClient.post<UserApiResponse<User>>(`/users`, payload);
        return UserSchema.parse(response.data.data);
    },

    // 2. GET ALL (Plural) - Returns an Array
    getUsers: async (): Promise<User[]> => {
        const response = await apiClient.get<UserApiResponse<User[]>>(`/users`);
        // We use z.array(UserSchema) because we expect a list
        return z.array(UserSchema).parse(response.data.data);
    },

    // 3. GET BY ID (Single)
    getUserById: async (id: string): Promise<User> => {
        const response = await apiClient.get<UserApiResponse<User>>(`/users/${id}`);
        return UserSchema.parse(response.data.data);
    },
};

/*
Project API

GET /projects/user/{userId}
send
{
    userId
}
return
{
    "id": "string",
    "name": "string",
    "userId": "string",
    "description": "string",
    "createdAt": "2026-03-26T10:56:07.479Z",
    "updatedAt": "2026-03-26T10:56:07.479Z"
}
-> Hook:

POST /projects
send
{
  "name": "string",
  "userId": "string",
  "description": "string"
}
return
{
    "id": "string",
    "name": "string",
    "userId": "string",
    "description": "string",
    "createdAt": "2026-03-26T10:56:07.479Z",
    "updatedAt": "2026-03-26T10:56:07.479Z"
}
-> Hook:

DELETE /projects/{projectId}
{
    projectId
}
-> Hook:

PATCH /projects/{projectId}
send
{
    projectId
}
return
{
  "name": "string",
  "description": "string"
}
-> Hook:

*/
import { type Project, type ProjectApiResponse } from "../models/projects.types";
import { ProjectSchema } from "../models/projects.schema";


/*
TimeLogs API 

GET /time-entries/project/{projectId}
GET /time-entries/user/{userId}
POST /time-entries
PATCH /time-entries/{id}
DELETE /time-entries/{id}
*/
import { type TimeLogs, type TimeLogApiResponse } from "../models/timelogs.types";
import { TimeSchema } from "../models/timelogs.schema";




