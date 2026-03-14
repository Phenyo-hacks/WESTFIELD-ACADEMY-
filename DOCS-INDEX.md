# Westfield Academy Documentation Index
Quick Reference: All documentation for the Westfield Academy School Management System

## Project Structure
```text
WESTFIELD-ACADEMY-/
├── README.md                    # Project overview and quick start
├── PROJECT-CORE.md              # Core project guidelines and philosophy
├── DOCS-INDEX.md                # THIS FILE - Master index
│
├── docs/                        # FRONTEND Documentation (Next.js)
│   ├── ARCHITECTURE.md          # React/Next.js architecture
│   ├── API-INTEGRATION.md       # How frontend calls backend
│   └── COMPONENTS.md            # UI component library mapping
│
└── src/main/resources/docs/     # BACKEND Documentation (Spring Boot)
    ├── API.md                   # REST API specification
    └── ARCHITECTURE.md          # Spring Boot/Java Architecture
```

## Documentation by Audience

### For Frontend Developers (Next.js/React)
| Document | Location | Purpose |
| :--- | :--- | :--- |
| Project Overview | `README.md` | Getting started with the project |
| Core Philosophy | `PROJECT-CORE.md` | How we build stuff |
| Architecture Guide | `docs/ARCHITECTURE.md` | React patterns, state management |
| API Client | `docs/API-INTEGRATION.md` | How to call backend APIs |
| Components | `docs/COMPONENTS.md` | UI component documentation |

### For Backend Developers (Spring Boot/Java 17)
| Document | Location | Purpose |
| :--- | :--- | :--- |
| Project Overview | `README.md` | Getting started with the project |
| Core Philosophy | `PROJECT-CORE.md` | How we build stuff |
| Architecture Guide | `src/main/resources/docs/ARCHITECTURE.md` | Spring Boot patterns, layers |
| API Specification | `src/main/resources/docs/API.md` | Endpoint contracts, request/response |

## Documentation Content Summary

### Frontend Documentation (`/docs/`)
*   **`ARCHITECTURE.md`**: Next.js App Router structure, component organization, and state management conventions.
*   **`API-INTEGRATION.md`**: API client setup, JWT authentication flow, error handling patterns.
*   **`COMPONENTS.md`**: Directory of available UI components (Shadcn, custom widgets, dashboard layouts).

### Backend Documentation (`/src/main/resources/docs/`)
*   **`API.md`**: Complete REST API specification including Auth, Users, Academics, and Tracking.
*   **`ARCHITECTURE.md`**: Layered architecture (Controller, Service, Repository), database schema, and security flow.

## Document Maintenance
| Document | Owner | Update Frequency |
| :--- | :--- | :--- |
| Frontend docs (`/docs/`) | Frontend Devs | On component/feature changes |
| Backend docs (`.../docs/`) | Backend Devs | On API/architecture changes |
| This Index | Any contributor | When adding new docs |

*Last Updated: March 2026*
