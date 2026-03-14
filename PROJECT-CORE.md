# PROJECT-CORE.md — How We Build Stuff
Last Updated: March 2026

## WHY THIS EXISTS
I build different things — web apps, games, tools, and random experiments. This file is my anchor. Every project gets one, and it reminds me how I like to work so future projects don’t turn into chaos.

## HOW I THINK
*   **Consistent > Convenient**
    If every project is structured the same, I never waste time figuring out where I put things.
*   **Build in chunks**
    Pieces should be modular so they can change without breaking everything.
*   **Learn as I go**
    I’m not an expert at everything (yet). Comments are mainly for future me.
*   **Future me exists**
    Build like someone else might join the project later (or like I might forget what I was thinking).

## NAMING STUFF (SO I DON’T GUESS)
| What | How | Example |
| :--- | :--- | :--- |
| Files (Frontend) | kebab-case or PascalCase | `user-profile.tsx`, `LoginForm.tsx` |
| Files (Backend) | PascalCase | `UserController.java` |
| Classes | PascalCase | `StudentManagementService` |
| Functions / Variables | camelCase | `getUserById()`, `attendanceScore` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Folders | by feature or role | `/components/auth`, `/api`, `/services` |
| Database Tables | singular | `user`, `student`, `timetable_entry` |

## HOW I STRUCTURE CODE

### Backend Structure (Spring Boot)
*   **Domain (Model/Entity)**: The core business rules and database representations.
*   **Repository**: Data access layer connecting entities to the database.
*   **Service**: Connects domain logic with external systems and controllers.
*   **Entry Points (Controller)**: Endpoints that receive requests and pass them to services.
*   **Security**: Authentication, authorization, and JWT filters.

### Frontend Structure (Next.js)
*   **UI Components (`/components`)**: Buttons, layouts, and feature-specific widgets.
*   **App Router (`/app`)**: Page definitions and API routes.
*   **State / Context (`/contexts`)**: What the application knows internally (e.g., Auth State).
*   **Data Fetching (`/lib` or custom hooks)**: Handles communication with the backend. No business logic should live here.

## COMMENT RULES (FOR FUTURE ME)
Comment things that are not obvious.
Use comments when:
*   I had to Google how something works
*   The purpose of the code is not obvious
*   Future me might look at it and be confused
*   The logic is complex or unusual

Avoid comments on obvious code.
Focus on explaining *why* something exists, not just *what* it does.

## SECURITY BASICS
*   **Never store secrets in code**: Use environment variables (`.env`, `application.properties`).
*   **Validate all inputs**: Never trust user input (use Zod on frontend, `@Valid` on backend).
*   **Assume someone might try to break it**: Handle errors and edge cases gracefully.
*   **Keep actions consistent**: The same request should produce the same result.
*   **Sensitive logic belongs on the backend**: Never trust the client application.

## PROJECT DOCUMENTATION
Every project should include these files in the root directory.

*   `README.md` — The Front Door
*   `PROJECT-CORE.md` — This file
*   `DOCS-INDEX.md` — Master index of all documentation

Further documentation is split by audience:
*   `/docs/` for Frontend Documentation
*   `/backend/docs/` for Backend Documentation

## KEEPING THIS DOCUMENT UPDATED
This document should evolve.
Update it when:
*   I learn better practices
*   I change how I structure projects
*   I improve development workflows

Documentation should be living guidance, not dead weight.
