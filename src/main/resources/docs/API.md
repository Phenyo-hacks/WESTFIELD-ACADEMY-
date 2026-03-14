# Backend API Specification
**Spring Boot REST API - Westfield Academy**

## Base URL
All requests are made relative to the base URL (Default `http://localhost:8080/api`)

## Authentication & Securing Points
All requests (excluding authentication paths) require a valid JWT passed in the Authorization header.
```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## 1. AuthController (`/api/auth`)
Handles authentication and registration.

*   **`POST /login`**
    *   **Body**: `{ "username": "admin", "password": "password" }`
    *   **Action**: Authenticates user and returns JWT.
    *   **Response**: `{ "token": "eyJhbGciOi...", "type": "Bearer", "id": 1, "username": "admin", "role": "ADMIN" }`
*   **`POST /register`**
    *   **Body**: User registration detailing (username, password, role).
    *   **Action**: Creates a new user. Admin only (typically).

## 2. UserController (`/api/users`)
General user management.

*   **`GET /`** - Retrieve all users (Admin only).
*   **`GET /{id}`** - Retrieve specific user details.
*   **`PUT /{id}`** - Update user details.
*   **`DELETE /{id}`** - Remove user.

## 3. StudentController (`/api/students`)
*   **`GET /`** - Retrieve list of all students.
*   **`POST /`** - Register a new student profile.
*   **`GET /{id}`** - Retrieve a specific student profile.
*   **`GET /class/{classId}`** - Get all students enrolled in a specific class.

## 4. TeacherController (`/api/teachers`)
*   **`GET /`** - Retrieve list of all teachers.
*   **`POST /`** - Register a new teacher profile.
*   **`GET /{id}`** - Retrieve a specific teacher.

## 5. ClassController (`/api/classes`)
*   **`GET /`** - List all classes (e.g. Grade 1, Grade 2).
*   **`POST /`** - Create a new class.
*   **`GET /{id}`** - Retrieve class details.

## 6. SubjectController (`/api/subjects`)
*   **`GET /`** - List all subjects.
*   **`POST /`** - Add a new subject to the curriculum.

## 7. TimetableController (`/api/timetable`)
*   **`GET /class/{classId}`** - Get weekly timetable for a specific class.
*   **`GET /teacher/{teacherId}`** - Get weekly timetable for a specific teacher.
*   **`POST /`** - Create a new timetable entry (Admin/Teacher mapping period to subject/room).

## 8. AttendanceController (`/api/attendance`)
*   **`POST /`** - Submit daily attendance for a student.
*   **`GET /student/{studentId}`** - View attendance history for a single student.
*   **`GET /class/{classId}/date/{date}`** - Get attendance records for a class on a specific date.

## 9. MarkController (`/api/marks`)
*   **`POST /`** - Add a new grade/mark for a student in a specific subject.
*   **`GET /student/{studentId}`** - View all marks for a specific student.
*   **`GET /student/{studentId}/subject/{subjectId}`** - Get marks for a student filtered by subject.

## 10. Communication (`/api/announcements` & `/api/messages`)
*   **`GET /api/announcements`** - Fetch global announcements.
*   **`POST /api/announcements`** - Post new global announcement (Admin/Teacher).
*   **`GET /api/messages/user/{userId}`** - Get inbox messages for user.
*   **`POST /api/messages`** - Send direct message to another user.

## Note on Response Format
Unless explicitly stating an error format, successful queries return standard JSON responses mirroring the Domain Entities mapped in the backend architecture. Error responses will follow standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error).
