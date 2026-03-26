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
-> Hook: useGetProject

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
-> Hook: usePostProject

DELETE /projects/{projectId}
{
    projectId
}
-> Hook: useDeleteProject

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
-> Hook: usePatchProject

*/
import { type Project, type ProjectApiResponse } from "../models/projects.types";
import { ProjectSchema } from "../models/projects.schema";
import apiClient from './apiClient';
import { z } from "zod";

export const ProjectService = {
    getProject: async (userId: string): Promise<Project[]> => {
        const response = await apiClient.get<ProjectApiResponse<Project[]>>(`/projects/user/${userId}`);
        return z.array(ProjectSchema).parse(response.data.data);
    },
    postProjects: async (payload: { name: string; userId: string; description: string }): Promise<Project> => {
        const response = await apiClient.post<ProjectApiResponse<Project>>(`/projects`, payload);
        return ProjectSchema.parse(response.data.data);
    },
    deleteProject: async (projectId: string): Promise<void> => {
        await apiClient.delete(`/projects/${projectId}`);
    },
    patchProject: async (projectId: string, payload: { name?: string; description?: string }): Promise<Project> => {
        const response = await apiClient.patch<ProjectApiResponse<Project[]>>(`/projects/${projectId}`, payload);
        return ProjectSchema.parse(response.data.data);
    }
};




