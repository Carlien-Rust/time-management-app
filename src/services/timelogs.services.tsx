/*
TimeLogs API 

GET /time-entries/project/{projectId} 
send
{
    projectId
}
return
{
    "id": "string",
    "projectId": "string",
    "userId": "string",
    "date": "string",
    "hours": 0,
    "minutes": 0,
    "notes": "string",
    "createdAt": "2026-03-26T12:15:05.452Z",
    "updatedAt": "2026-03-26T12:15:05.452Z"
}
GET /time-entries/user/{userId}
send
{
    userId
}
return
{
    "id": "string",
    "projectId": "string",
    "userId": "string",
    "date": "string",
    "hours": 0,
    "minutes": 0,
    "notes": "string",
    "createdAt": "2026-03-26T12:15:05.452Z",
    "updatedAt": "2026-03-26T12:15:05.452Z"
}
POST /time-entries
send
{
    "projectId": "string",
    "userId": "string",
    "date": "string",
    "hours": 0,
    "minutes": 0,
    "notes": "string"
}
return
{
    "id": "string",
    "projectId": "string",
    "userId": "string",
    "date": "string",
    "hours": 0,
    "minutes": 0,
    "notes": "string",
    "createdAt": "2026-03-26T12:19:54.901Z",
    "updatedAt": "2026-03-26T12:19:54.901Z"
}
PATCH /time-entries/{id}
send
{
    id
}
return
{
    "projectId": "string",
    "date": "string",
    "hours": 0,
    "minutes": 0,
    "notes": "string"
}
DELETE /time-entries/{id}
send
{
    id
}
return
{

}
*/
import { type TimeLogs, type TimeLogApiResponse } from "../models/timelogs.types";
import { TimeSchema } from "../models/timelogs.schema";
import apiClient from './apiClient';
import { z } from "zod";

export const TimeLogsService = {
    getTimeLogsByProjectId: async (projectId: string): Promise<TimeLogs[]> => {
        const response = await apiClient.get<TimeLogApiResponse<TimeLogs[]>>(`/time-entries/project/${projectId}`);
        return z.array(TimeSchema).parse(response.data.data);
    },
    getTimeLogsByUserId: async (userId: string): Promise<TimeLogs[]> => {
        const response = await apiClient.get<TimeLogApiResponse<TimeLogs[]>>(`/time-entries/user/${userId}`);
        return z.array(TimeSchema).parse(response.data.data);
    },
    postTimeLogs: async (payload: { projectId: string; userId: string; date: string; hours: 0; minutes: 0; notes: string }): Promise<TimeLogs> => {
        const response = await apiClient.post<TimeLogApiResponse<TimeLogs>>(`/time-entries`, payload);
        return TimeSchema.parse(response.data.data);
    },
    deleteTimeLogs: async (id: string): Promise<void> => {
        await apiClient.delete(`/time-entries/${id}`);
    },
    patchTimeLogs: async (id: string, payload: { projectId: string; date: string; hours: 0; minutes: 0; notes: string }): Promise<TimeLogs> => {
        const response = await apiClient.patch<TimeLogApiResponse<TimeLogs[]>>(`/time-entries/${id}`, payload);
        return TimeSchema.parse(response.data.data);
    }
};