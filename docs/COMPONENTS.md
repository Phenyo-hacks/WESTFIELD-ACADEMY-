# Component Library Map
**Frontend UI Components - Westfield Academy**

This document catalogs the primary React components used across the frontend, located within the `components/` directory.

## Core UI Primitives (`/components/ui`)
These are base building blocks generated via Shadcn UI. They are generic, highly reusable, and contain no domain-specific logic.
*   `Button`, `Input`, `Label`: Basic form controls.
*   `Avatar`, `Badge`, `Card`: Display components.
*   `Dialog`, `DropdownMenu`, `Popover`: Interactive overlay components.
*   `Table`, `Select`, `Tabs`: Complex data interaction components.

## Layout Components (`/components/layout`)
Components responsible for the overall page structure.
*   **`Sidebar.tsx`**: The main navigation menu. Handles section switching and displays relevant links based on the active user's role.
*   **`ThemeProvider.tsx`**: Manages light/dark mode transitions across the app.

## Authentication (`/components/auth`)
*   **`LoginForm.tsx`**: Handles user authentication, capturing credentials, and communicating with the AuthContext.

## Dashboards (`/components/dashboard`)
Role-specific summaries and quick-action views.
*   **`AdminDashboard.tsx`**: High-level metrics, system overviews, and administrative shortcuts.
*   **`TeacherDashboard.tsx`**: Class schedules, recent grading activity, and student overview.
*   **`StudentDashboard.tsx`**: Personal schedule, recent grades, and attendance summary.
*   **`ParentDashboard.tsx`**: Overview of child's academic performance and attendance.

## Feature Modules

### Students (`/components/students`)
*   **`StudentManagement.tsx`**: Admin view to list, search, and manage student records.
*   **`StudentRegistrationForm.tsx`**: Form for onboarding new students.

### Teachers (`/components/teachers`)
*   **`TeacherManagement.tsx`**: Interface for administrators to manage staff records and assign roles.

### Academics (`/components/classes` & `/components/subjects`)
*   **`ClassManagement.tsx`**: Managing physical/logical class groups (e.g., "Grade 10A").
*   **`SubjectManagement.tsx`**: Managing course offerings and curriculum structure.
*   **`TimetableManagement.tsx`**: Interface for creating and viewing weekly class schedules. Functionality adapts based on user role (view-only vs. editable).

### Performance & Tracking (`/components/grades` & `/components/attendance`)
*   **`GradeManagement.tsx`**: Interface for teachers to input marks and for students/parents to view performance.
*   **`AttendanceSystem.tsx`**: Interface for teachers to mark daily attendance and for administration to run reports.

### Finance (`/components/fees`)
*   **`FeeManagement.tsx`**: Module for tracking tuition, payments, and outstanding balances.

## Usage Guidelines
1.  **Never modify UI Primitives directly** unless you intend to change the global design system.
2.  **Keep Feature Components modular**: A feature component (like `FeeManagement`) should not directly depend on another feature component (like `GradeManagement`).
3.  **State Management**: If a component needs to share data with a sibling, lift the state up to their parent or use the appropriate React Context.
