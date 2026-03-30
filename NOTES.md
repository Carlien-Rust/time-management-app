## 🏗️ Phase 1: Core Architecture & Routing

### 1. Navigation & State Management
* **The Struggle:** Deep linking and state persistence. Refreshing `/projects/123/edit` must not break the app or lose the "Edit" context.
* **The Fix: URL as Global State.**
    * **Dynamic Paths (`$id`):** Mandatory context (e.g., `projects/$projectId`). Accessible via `useParams()`.
    * **Search Params (`?id=abc`):** Optional/temporary states like Modals or Filters. Accessible via `useSearch()`.
    * **Central `navManager`:** A service layer that prevents "Magic Strings." Instead of hardcoding `Maps("/dashboard")`, we use `navManager.goToDashboard()`.
* **Tree Structure:** Using `__root.tsx` for global layouts (Sidebar, Navbar, ThemeProvider) ensures that information and context (like `apiClient` initialization) pass correctly down the tree to child routes.

### 2. Authentication & The Routing Bridge
* **The Struggle:** Preventing "Flash of Protected Content" (seeing the dashboard for a split second before the app realizes you aren't logged in).
* **The Fix: Route Guards (`beforeLoad`).**
    * TanStack Router checks the Zustand `UserStore` or Firebase status **before** a component renders.
    * **Implementation:** If no token exists in `localStorage` or Firebase, the router triggers a `redirect({ to: '/login' })`.
* **Firebase Integration:** Handles the "Who." Zustand holds that "Who" globally so hooks like `useGetTimeLogsByUserId(user.id)` work instantly.

### 3. CSS Scope & Global UI
* **The Struggle:** "Style Bleed" and starting from scratch. Changing a button in one place accidentally changes it everywhere.
* **The Fix: MUI Theme Provider.**
    * We define a **Design System** in `createTheme.ts` (e.g., `MuiButton`, `MuiTextField`). This ensures "Padding," "Colors," and "Border Radius" are consistent app-wide automatically.

---

## 📡 Phase 2: API Contract & Data Integrity

### 1. The "Chain of Trust"
Data must maintain its integrity from the Database to the Screen. If a number becomes a string midway, calculations break.

| Layer | Tool | Responsibility |
| :--- | :--- | :--- |
| **Database** | **BE API** | Enforces the "JSON Shape" (The Agreement). |
| **Validation** | **Zod Schema** | **The Enforcer.** Coerces strings to numbers, validates dates. |
| **Types** | **TypeScript** | **The Guide.** Provides IDE Autocomplete and build-time safety. |
| **Inference** | `z.infer<T>` | **The Bridge.** Generates the TS Interface from the Schema. |


### 2. The API Contract (The Agreement)
For `TimeLogs`, the FE and BE agree on this exact structure:
* **`id` / `projectId` / `userId`**: `string` (UUIDs).
* **`date`**: `string` (ISO `YYYY-MM-DD`).
* **`hours` / `minutes`**: `number` (**Crucial:** Must be numeric for Chart/KPI math).
* **`notes`**: `string`.

### 3. `apiClient` Logic (Axios Interceptors)
The `apiClient` acts as **Border Control**:
* **Interceptors:** Automatically checks `localStorage` for a token (Performance Win), then Firebase. It attaches the `Authorization: Bearer <token>` header to every request.
* **Security:** Using `user.getIdToken(true)` forces a fresh token, preventing session expiration while idling.

---

## 📝 Phase 3: Modern Form Building & Rules of Hooks

### 1. Reactive Prefilling
* **The Struggle:** Forms not populating when data arrives late, or failing "Rules of Hooks" by using `useEffect` to set state.
* **The Fix: The Values Pattern.**
    ```tsx
    const { data } = useGetData(id);
    const methods = useForm({
      values: data ? { ...data } : undefined, // Form updates as soon as data arrives
      resetOptions: { keepDirtyValues: true } // Preserves user edits on background refresh
    });
    ```

### 2. Form Structural Validation
* **Layer A (Schema):** `z.coerce.number()` turns HTML `<input>` strings back into numbers for the API.
* **Layer B (Structure):** `FormProvider` wraps modals so nested inputs can access form context without "prop drilling."
* **Layer C (UI):** `resolver: zodResolver(Schema)` highlights MUI `TextFields` in red automatically on error.

### 3. React "Rules of Hooks" & `useEffect`
* **The Hook Rule:** Never call hooks inside `if` statements or loops. Always call them at the top level.
* **Cleanup:** Always return a cleanup function in `useEffect` (e.g., `removeEventListener`) to prevent event listeners from "leaking."

---

## 🔄 Phase 4: TanStack Query (Read vs. Write)

We follow the **CQRS Pattern** (Command Query Responsibility Segregation).

* **Reading (`useQuery`):** Handles `GET` requests. Uses `queryKeys` as unique addresses.
* **Writing/Acting (`useMutation`):** Handles `POST/PATCH/DELETE`.
    * **On Success:** Use `onSuccess` callbacks to "Invalidate" the query key, forcing the app to fetch the fresh truth immediately.
* **`isLoading` (Layout Shift):** Use **Skeletons over Spinners** (e.g., `[...Array(n)]`) to reserve layout space and prevent "Jumping UI."

---

## 🚀 The Developer "Cheatsheet"

| Category | The "Rule" | Pro-Tip |
| :--- | :--- | :--- |
| **Auth** | **Token First** | Check `localStorage` in interceptors for speed; use Firebase for session refresh. |
| **API** | **Query vs Mutation** | `useQuery` is for Reading; `useMutation` is for Acting (Buttons/Actions). |
| **Forms** | **Always Coerce** | `z.coerce.number()` turns string inputs into math-ready numbers. |
| **Logic** | **Parent First** | Always derive colors/UI from the **Project**, not the individual **TimeLog**. |
| **Routing** | **$ for Variables** | `/projects/$id` makes `id` a variable; `projects/new` is a static path. |
| **State** | **URL is Truth** | If you can put it in the URL (ID, Page #, Filter), do it via Search Params. |
| **Modals** | **Overlay Logic** | Use MUI `Dialog` or `Modal`. Driven by URL for refresh-persistence. |

### ⚠️ Error Handling & Troubleshooting
* **401 Unauthorized:** Interceptor clears `localStorage` and redirects to `/login`.
* **400 Bad Request:** Display inline Zod/MUI validation messages (e.g., "Minutes must be < 60").
* **500 Server Error:** Show a global MUI `<Alert />` banner with a "Retry" button.
* **404 Not Found:** Use a `NotFoundComponent` in the router tree to catch broken links.
* **Firebase auth/user-not-found**: Redirect to Signup.
* **Firebase auth/wrong-password**: Show "Invalid Credentials" via MUI Alert.
