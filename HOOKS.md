TODO SIDEBAR

## Auth/Login

usePostAuth()

```
import { usePostAuth } from "../hooks/usePostAuth"; 

const loginMutation = usePostAuth();
...
await loginMutation.mutateAsync({ email, password }).then(() => {
        handleClickOverview();
      });
```

## Users

usePostUser()

```
import { usePostUser } from "../hooks/usePostUser"; 

const postMutation = usePostUser();
...
await postMutation.mutateAsync({ userId, name, email }).then(() => {
        handleClickOverview();
      });
```

useGetUserById(id);
useGetUsers(); 

```
import { useGetUsers, useGetUserById } from "../hooks/useGetUsers"; 
import { useParams } from "@tanstack/react-router";

const params = useParams({ strict: false });
const id = params?.id;

const {data: usersData , isLoading, isError} = useGetUsers();
const {data: usersData , isLoading, isError} = useGetUserById(id);

```

## Projects

useGetProjects(userId); - ProjectCard

```
import { useGetProjects } from "../hooks/useGetProjects"; 
import { useParams } from "@tanstack/react-router";

const params = useParams({ strict: false });
const userId = params?.userId;

const {data: projectsData , isLoading, isError} = useGetProjects(userId);

```

usePostProjects(); - NewProjectModal

```
import { usePostProjects } from "../hooks/usePostProjects"; 

const postMutation = usePostProjects();
...
await postMutation.mutateAsync({ name, userId, description }).then(() => {
        handleClickOverview();
      });
```

useDeleteProject(); - ProjectCard

```
import { useDeleteProject } from "../hooks/useDeleteProject"; 

const deleteMutation = useDeleteProject();
...
const handleDelete = async () => {
  await deleteMutation.mutateAsync(projectId);
};
```

usePatchProjects(); - EditProjectModal

```
import { usePatchProjects } from "../hooks/usePatchProjects"; 

const patchMutation = usePatchProjects();
...
const handleUpdate = async () => {
  await patchMutation.mutateAsync({
    projectId, 
    payload: {name, description}
  });
};

```

## Time Logs

useGetTimeLogsByProjectId(projectId); - TimeCard

```
import { useGetTimeLogsByProjectId } from "../hooks/useGetTimeLogsByProjectId"; 
import { useParams } from "@tanstack/react-router";

const params = useParams({ strict: false });
const projectId = params?.projectId;

const {data: timeData , isLoading, isError} = useGetTimeLogsByProjectId(projectId);

```

useGetTimeLogsByUserId(userId):

```
import { useGetTimeLogsByUserId } from "../hooks/useGetTimeLogsByUserId"; 
import { useParams } from "@tanstack/react-router";

const params = useParams({ strict: false });
const userId = params?.userId;

const {data: timeData , isLoading, isError} = useGetTimeLogsByUserId(userId);

```

usePostTimeLogs(); - NewTimeLogModal

```
import { usePostTimeLogs } from "../hooks/usePostTimeLogs"; 

const postMutation = usePostTimeLogs();
...
const handleAddLog = async () => {
  await postMutation.mutateAsync({ 
    projectId, userId, date, hours, minutes, notes  
  });
};

```

useDeleteTimeLogs(); - TimeLogTable

```
import { useDeleteTimeLogs } from "../hooks/useDeleteTimeLogs"; 

const deleteMutation = useDeleteTimeLogs();
...
await deleteMutation.mutateAsync(id).then(() => {
        handleClickOverview();
      });
```

usePatchTimeLogs(); - EditTimeLogModal

```
import { usePatchTimeLogs } from "../hooks/usePatchTimeLogs"; 

const patchMutation = usePatchTimeLogs();
...
const handleUpdateLog = async () => {
  await patchMutation.mutateAsync({
    id, 
    payload: { projectId, date, hours, minutes, notes }
  });
};

```
