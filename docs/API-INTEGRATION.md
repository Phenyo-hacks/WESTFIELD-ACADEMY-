# Frontend API Integration Guide
**Connecting Next.js to the Spring Boot Backend**

## Overview
This document outlines how the Next.js frontend communicates with the Spring Boot backend APIs. All internal and external network calls should follow these principles.

## Base Configuration
The frontend expects the backend API URL to be configured in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Authentication Flow
The application uses JWT (JSON Web Tokens) for securing endpoints.
1.  **Login**: User submits credentials to `/api/auth/login`.
2.  **Token Reception**: The backend validates credentials and returns a JWT response payload.
3.  **Token Storage**: (Currently managed by Custom AuthContext hook/localStorage vs HttpOnly Cookies — to be standardized).
4.  **Authorized Requests**: Every subsequent HTTPS request must include the header:
    ```http
    Authorization: Bearer <Your_JWT_Token>
    ```

## Example API Client Pattern
When requesting secured endpoints from a component, ensure the authorization header is passed:

```typescript
// pages/api-example.ts
async function fetchStudentData(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
     throw new Error("Failed to fetch data");
  }
  return response.json();
}
```

## Available Endpoints (Summary)
*For the complete detailed API contract, refer to `src/main/resources/docs/API.md`.*

*   `/api/auth/**` - Authentication and Registration.
*   `/api/users/**` - General user management endpoints.
*   `/api/students/**` - Student specific endpoints.
*   `/api/teachers/**` - Teacher specific endpoints.
*   `/api/classes/**` - Class management endpoints (e.g. Grade 10A).
*   `/api/subjects/**` - Curriculum offerings.
*   `/api/timetable/**` - Scheduling and period plotting.
*   `/api/attendance/**` - Marking and tracking attendance records.
*   `/api/marks/**` - Grading and performance tracking.
*   `/api/announcements/**` - School-wide broadcast messaging.
*   `/api/messages/**` - Direct user-to-user communication.

## Error Handling
The backend implements standard Spring Boot Exception handlers. Ensure the frontend gracefully catches HTTP 4xx and 5xx responses:
*   **401 Unauthorized**: Redirect to login, clear local token.
*   **403 Forbidden**: Show Unauthorized Access page.
*   **400 Bad Request**: Display field-level validation errors.
*   **404 Not Found**: Display generic generic "Not Found" toaster notification.
*   **500 Internal Server**: Display generic error toaster message ("Something went wrong").
