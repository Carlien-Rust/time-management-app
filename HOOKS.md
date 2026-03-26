
## Auth/Login

usePostAuth()

```
import { usePostAuth } from "../hooks/usePostAuth"; 

const loginMutation = usePostAuth();
...
await loginMutation.mutateAsync({ email, password }).then(() => {
        handleClickOverview();
        setLoading(false)
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
        setLoading(false)
      });
```

useGetUserById(id);
useGetUsers(); 

```
import { useGetUsers, useGetUserById } from "../hooks/useGetUsers"; 

const {data: usersData , isLoading, isError} = useGetUsers();
const {data: usersData , isLoading, isError} = useGetUserById(id);

```

## Projects

useGetProjects(userId);

```
import { useGetProjects } from "../hooks/useGetProjects"; 

const {data: projectsData , isLoading, isError} = useGetProjects(userId);

```

usePostProjects();

```
import { usePostProjects } from "../hooks/usePostProjects"; 

const postMutation = usePostProjects();
...
await postMutation.mutateAsync({ name, userId, description }).then(() => {
        handleClickOverview();
        setLoading(false)
      });
```

useDeleteProject();

```
import { useDeleteProject } from "../hooks/useDeleteProject"; 

const deleteMutation = useDeleteProject();
...
await deleteMutation.mutateAsync(projectId).then(() => {
        handleClickOverview();
        setLoading(false)
      });
```

usePatchProjects();

```
import { usePatchProjects } from "../hooks/usePatchProjects"; 

const patchMutation = usePatchProjects();
...
await patchMutation.mutateAsync(projectId, {name, description}).then(() => {
        handleClickOverview();
        setLoading(false)
      });
```

## Time Logs

useGetTimeLogsByProjectId(projectId);

```
import { useGetTimeLogsByProjectId } from "../hooks/useGetTimeLogsByProjectId"; 

const {data: projectsData , isLoading, isError} = useGetTimeLogsByProjectId(projectId);

```

useGetTimeLogsByUserId(userId):

```
import { useGetTimeLogsByUserId } from "../hooks/useGetTimeLogsByUserId"; 

const {data: projectsData , isLoading, isError} = useGetTimeLogsByUserId(userId);

```

usePostTimeLogs();

```
import { usePostTimeLogs } from "../hooks/usePostTimeLogs"; 

const postMutation = usePostTimeLogs();
...
await postMutation.mutateAsync({ projectId, userId, date, hours, minutes, notes  }).then(() => {
        handleClickOverview();
        setLoading(false)
      });
```

useDeleteTimeLogs();

```
import { useDeleteTimeLogs } from "../hooks/useDeleteTimeLogs"; 

const deleteMutation = useDeleteTimeLogs();
...
await deleteMutation.mutateAsync(id).then(() => {
        handleClickOverview();
        setLoading(false)
      });
```

usePatchTimeLogs();

```
import { usePatchTimeLogs } from "../hooks/usePatchTimeLogs"; 

const patchMutation = usePatchTimeLogs();
...
await patchMutation.mutateAsync(id, { projectId, date, hours, minutes, notes }).then(() => {
        handleClickOverview();
        setLoading(false)
      });
```
