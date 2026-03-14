# Backend Architecture
**Spring Boot API - Westfield Academy**

## Overview
The backend is built using **Spring Boot 3.3.1 (Java 17)** and follows a standard monolithic layered architecture. The system exposes a RESTful API secured by JWT authentication.

## Core Hierarchy
The project is rooted in `com.schoolmgmt` and follows this structure:
```text
src/main/java/com/schoolmgmt/
├── controller/         # API Endpoints (Receives HTTP requests)
├── service/            # Business Logic (Executes rules, calls DB)
├── repository/         # Data Access Layer (Spring Data JPA interfaces)
├── model/              # Domain Entities (Database mappings via Hibernate)
└── security/           # JWT Filters and Authentication setups
```

## Layer Definitions
1.  **Controllers (`@RestController`)**
    *   Responsible *only* for handling incoming HTTP requests, validating input parameters (`@Valid`), and mapping responses. No business logic should reside here.
2.  **Services (`@Service`)**
    *   The core of the application. Services process data, enforce business rules, and interact with the database. Services should aim to be independent.
3.  **Repositories (`@Repository`)**
    *   Spring Data JPA interfaces extending `JpaRepository`. They handle all specific database queries automatically based on method names.
4.  **Models/Entities (`@Entity`)**
    *   Pure Java POJOs representing database tables. We use `lombok` annotations (`@Data`, `@NoArgsConstructor`) to drastically reduce boilerplate code.

## Entities (Domain Map)
The primary functional entities mapping exactly to database tables:
*   `User`: Base identity entity inheriting role-based authority.
*   `Student` / `Teacher`: Domain-specific subclass expansions for users.
*   `SchoolClass`: Represents groups (e.g., Grade 10A).
*   `Subject`: Courses/classes available to be taken.
*   `TimetableEntry`: A specific period slot linking a Subject, a Teacher, and a SchoolClass.
*   `Attendance`: Logs a student's presence/absence for a given date.
*   `Mark`: Represents a grade received by a specific student for a specific subject.
*   `Announcement` & `Message`: Communication entities.

## Database & ORM
*   **Technology**: PostgreSQL database (Supabase compatibility configs active in `application.properties`).
*   **ORM Strategy**: Hibernate handles ORM mapping. 
*   **DDL Strategy**: `spring.jpa.hibernate.ddl-auto=update` is used during iterative development to ensure the schema updates alongside entity modifications.

## Security Context
*   **Spring Security**: Defines a filter chain intercepting incoming requests. 
*   **JWT Filter**: Intercepts requests, parses the `Authorization: Bearer <token>` header, validates the signature, extracts the permissions (`Roles`), and places the user details into the Spring Security Context for the life of that single request.
*   **Role-Based Access Control (RBAC)**: Individual API endpoints are guarded natively via Spring Security rules (e.g., `hasRole('ADMIN')`) to ensure actions like modifying grades or adding teachers are restricted.
