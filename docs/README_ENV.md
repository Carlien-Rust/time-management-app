# Environment Variables in Vite

This project follows Vite's environment and mode guidelines for managing environment variables across different modes (development, staging, production.). The environment variables are defined in .env files within the environments folder in the root for different modes:

- .env
- .env.local
- .env.development
- .env.staging
- .env.production

Please see [VITE env documentation](https://vite.dev/guide/env-and-mode) for more information.

Our environment variables will be contained within the the `environments` folder within the project root.

## Getting started
The .env.local will not be pushed to the repository and could contain variables needed that are not exposed to the client. 

1. Create a .env.local file within your environments folder and populate it with the necessary variables.
   You can contact one of the original developers if you need any more information.

Note: the `.env` will still be pushed to the repo as this only contains env vars that are re-used and is the same over all the modes. Sensitive env data should be added to .env.local which will not be pushed. These env vars will be set on the pipeline for
  
## Adding a New Environment Variable
When adding a new environment variable, follow these steps to ensure proper type safety and correct usage:

1. Add your new environment variable to the appropriate `.env.*` file. 
   
   All environment variables must be prefixed with VITE_ to be exposed to the client-side code. Client side environment variables will exposed and should not contain sensitive information. 

   TODO: We still need to figure out how to handle sensitive information that will be needed on the client-side, which will probably happen via the server / back-end. But most client-side information should be fine and be handled appropriately with 3rd party services like firebase for example.

    Example:
    ```bash
    # .env.local
    VITE_API_URL=https://api.example.com
    VITE_ENV_VAR=true
    ```

2. Update the `vite-env.d.ts` for Type Safety:

    To ensure type safety, you must also declare your new environment variables in the `vite-env.d.ts` file within src root. This file should already exist. This will allow TypeScript to validate their usage.

    Example:
    ```typescript
    // vite-env.d.ts
    interface ImportMetaEnv {
        readonly VITE_API_URL: string;
        readonly VITE_ENV_VAR: boolean;
        // Add new variables here
    }
    ```

This ensures that your environment variables are typed and available via import.meta.env.

These variables can be added to .env.local because it won't be pushed to the repository.

## Accessing Environment Variables:
You can access your environment variables in your code as follows:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const envVar = import.meta.env.VITE_ENV_VAR;

console.log(apiUrl); // Outputs: https://api.example.com
console.log(envVar); // Outputs: true

```

### Default variables
VITE has default variables your can use in conjunction with modes etc.

Example:
```typescript
import.meta.env.PROD // will output if the app is running in prod mode.
```
More info on these can be found in the [VITE env documentation](https://vite.dev/guide/env-and-mode) for more information.

## Modes and Environment Files
This project has the following modes included:

- development
- production
- staging 
  
You can specify other modes if needed, and Vite will automatically load .env files matching the mode name (e.g., .env.production, .env.development).

Please see the [VITE env documentation](https://vite.dev/guide/env-and-mode) for more information.