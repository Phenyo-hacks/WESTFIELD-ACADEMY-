# Frontend Architecture
**Westfield Academy School Management System**

## Overview
The frontend is built with **Next.js 15 (App Router)** and **React 19**. It follows a component-driven architecture focusing on reusability, clear state management, and separation of concerns.

## Tech Stack
*   **Framework**: Next.js 15
*   **UI Library**: React 19
*   **Styling**: Tailwind CSS
*   **Component Library**: Shadcn UI (Radix UI primitives)
*   **Icons**: Lucide React
*   **Form Handling**: React Hook Form with Zod validation
*   **Routing**: Next.js App Router (`/app`)

## Directory Structure
```text
WESTFIELD-ACADEMY-/
├── app/                  # Next.js App Router pages and layouts
│   ├── api/              # Static Next.js API route definitions (if any)
│   ├── globals.css       # Global Tailwind CSS configurations
│   ├── layout.tsx        # Root layout (HTML, Body, Theme Provider)
│   └── page.tsx          # Main entry point (Dashboard hub)
├── components/           # UI Components (Highly modular)
│   ├── auth/             # Login and authentication forms
│   ├── dashboard/        # Role-specific dashboard layouts (Admin, Teacher, etc.)
│   ├── layout/           # Global layout components (Sidebar, Top Navigation)
│   ├── ui/               # Reusable Shadcn/Radix primitive components
│   └── [feature]/        # Feature-specific components (e.g., /students, /timetable)
├── contexts/             # React Context Providers
│   └── AuthContext.tsx   # Global authentication state management
└── lib/                  # Utility functions
    └── utils.ts          # Tailwind merge utilities (clsx, twMerge)
```

## Architectural Patterns

### 1. Single Page Dashboard Concept
Instead of relying on Next.js page transitions for every single view, the primary application runs out of `app/page.tsx`.
*   **State-driven Routing**: The Next.js page maintains an `activeSection` state.
*   **Conditional Rendering**: The main content area dynamically renders specific components (e.g., `<AdminDashboard />` or `<StudentManagement />`) based on both the `activeSection` and the user's `role`.

### 2. State Management
*   **Global State**: Managed via React Context. Currently, an `AuthContext` provides `user` details, `isAuthenticated` status, and login/logout methods globally.
*   **Local State**: Managed via React `useState` and `useReducer` within specific components.

### 3. Styling Strategy
*   **Tailwind CSS**: Used for all styling.
*   **Shadcn UI**: We use Shadcn UI to generate accessible primitives. These are not installed as NPM packages but copied directly into the `components/ui` folder, allowing full customization of the Tailwind classes.
*   **Utility Helper (`cn`)**: Forms class names conditionally by merging Tailwind classes safely (`lib/utils.ts`).

### 4. Component Structure
Components are split based on responsibility:
*   **Presentational (UI)**: Found in `components/ui`. They have no business logic and exist only to display data symmetrically.
*   **Container/Feature**: Found in feature folders (like `components/students`). These hold state, map data to UI components, and handle user interactions.

## Data Flow (Frontend to Backend)
1.  **User Action**: User interacts with a form or button in a feature component.
2.  **API Call**: The component makes an HTTP request (using `fetch` or a dedicated API client lib) to the backend.
3.  **Authentication**: The request includes the JWT token (stored securely) in the Authorization header.
4.  **State Update**: On successful response, the local component state or global context is updated.
5.  **Re-render**: React updates the UI reflecting the new data.
