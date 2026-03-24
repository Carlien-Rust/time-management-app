## 📖 Project Structure Documentation

This document provides an overview of the folder structure in your project and explains the purpose of each directory.

```

```


## 📂 **time-management-portal/**
This is the root folder of the application.

### 📂 **environments/**
- Stores **environment variables** for different environments (e.g., development, staging, production).
- Typically includes `.env` files or configurations loaded at runtime.

💡 **More info** can be found [here](./README.ENVIRONMENTS.md)

### 📂 **public/**
- Contains **static assets** such as images, icons, and fonts that don’t get processed by Webpack/Vite.
- Includes the `index.html` file, which serves as the entry point for the app.

---

## 📂 **src/**  
This is the **main source directory** containing the core application logic.

#### 📂 **layouts/**
- Contains **layout components** such as:
  - Headers
  - Sidebars
  - Footers
- Used to provide consistent UI structure across different pages.

#### 📂 **pages/**
- Contains all **main pages** of the application.
- Typically follows a **route-based structure**, where each page corresponds to a route.


#### 📂 **router/**
- Manages **app routing** and navigation logic.
- Typically includes configurations for `react-router-dom` or `tanstack-router`.


#### 📂 **theme/**
- Stores **theme-related styles**, including:
  - Color palettes
  - Typography
  - Dark mode/light mode configurations


#### 📄 **App.tsx**
- The **root component** of the application.
- Sets up providers (e.g., Zustand, CASL, Authentication).
- Mounts the main layout and handles global side effects.

#### 📄 **main.tsx**
- The **entry point** of the React application.
- Typically renders `<App />` inside `ReactDOM.createRoot`.

---

### 📂 **assets/**
- Contains all **media assets** used within components, such as:
  - Images
  - Icons
  - Fonts

### 📂 **components/**
- Houses **reusable UI components** (e.g., buttons, modals, form inputs).
- Encourages **modular design** by separating UI logic from business logic.


### 📂 **config/**
- Stores **configuration files** used within the application.
- Includes settings for **CASL**, API endpoints, feature flags, etc.

💡 **More info** can be found [here](../docs/appFolders/CONFIG.md)

### 📂 **guards/**
- Contains **route and component guards**.
- Ensures **access control** before rendering a route or component.
- Examples:
  - `AuthGuard.tsx` (checks authentication)
  - `RoleGuard.tsx` (checks user roles & permissions)

### 📂 **hooks/**
- Stores **reusable custom hooks** to encapsulate shared logic.
- Examples:
  - `useAuth()`
  - `useFetch()`
  - `usePermissions()`

### 📂 **lib/**
- Contains **typed libraries** or wrappers around 3rd-party services for **reusability**.
- Provides an abstraction layer for external dependencies.

### 📂 **models/**
- Defines **TypeScript models** and interfaces for:
  - API responses
  - Entities (User, Product, etc.)
  - Form schemas

### 📂 **services/**
- Manages **API calls and external services**.
- Typically contains:
  - Authentication service (`authService.ts`)
  - API clients (`apiService.ts`)

### 📂 **utils/**
- Stores **common utility functions** (helpers).
- Examples:
  - Date formatting
  - Debouncing functions
  - Local storage helpers

---

## 📄 **Other Configuration Files**
- `tsconfig.json` → TypeScript configuration.
- `vite.config.ts` → Vite build configuration.
- `.eslintrc.js` → ESLint rules for code linting.

---

## 🎯 **Best Practices**
1. **Feature-Based Development** → Keep features self-contained in `features/`.
2. **Separation of Concerns** → Pages should only contain UI logic, while services handle data fetching.
3. **Typed Libraries** → Use `lib/` to wrap third-party services for maintainability.
4. **Consistent Naming** → Follow conventions to make the project easier to navigate.
