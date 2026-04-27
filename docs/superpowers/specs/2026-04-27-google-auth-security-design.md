# Design Spec: Google OAuth2 Integration & Security Hardening

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementing Google Login, User Isolation, and Infrastructure Security.

## 1. Overview
The goal is to transition the Terra Todo App from an open, anonymous system to a secure, user-specific application using Google OAuth2 for authentication. We will also address critical infrastructure security gaps.

## 2. Architecture & Data Flow

### 2.1 Authentication Flow (Google OAuth2)
1.  **Frontend:** User clicks "Login with Google". React app uses `@react-oauth/google` to obtain an `ID Token`.
2.  **API:** Frontend sends the `ID Token` to the Backend (`/api/auth/google`).
3.  **Validation:** Backend validates the token using Google's public keys (`Google.Apis.Auth`).
4.  **Session:** If valid, Backend checks if the user exists in our DB. If not, it creates a record (using Google's `sub` as unique ID).
5.  **JWT:** Backend generates a local JWT containing the `UserId` and returns it to the Frontend.
6.  **Persistence:** Frontend stores the JWT in `localStorage` and includes it in the `Authorization: Bearer <token>` header for all subsequent API calls.

### 2.2 User Isolation
-   **Database:** `TodoItem` model will be updated with a `UserId` (string) field.
-   **Repository/Controller:** Every query will be filtered by the `UserId` extracted from the JWT claims.
-   **Data Migration:** All existing records will be deleted to ensure a clean state.

## 3. Infrastructure Security Hardening

### 3.1 Terraform (AWS)
-   **Security Group:** 
    -   Remove public access (0.0.0.0/0) for port `5432`.
    -   Restrict port `22` (SSH) to a specific IP (to be provided or defaulted to a safer placeholder).
-   **VPC:** Ensure the database subnets are properly isolated (already partially done, but enforcement is needed in SGs).

### 3.2 Application Security
-   **CORS:** Restrict `AllowFrontend` to only trusted origins.
-   **Swagger:** Disable in production environment (`!app.Environment.IsDevelopment()`).
-   **Secrets:** Move Google Client ID and JWT Secret to Environment Variables (AWS Secrets Manager or `.env` via Docker).

## 4. Components & Technologies

-   **Frontend:** React, `@react-oauth/google`, Axios.
-   **Backend:** .NET 8, `Microsoft.AspNetCore.Authentication.JwtBearer`, `Google.Apis.Auth`.
-   **Database:** PostgreSQL (EF Core Migration).
-   **Infrastructure:** Terraform (AWS), Docker Compose.

## 5. Success Criteria
- [ ] Users cannot access the Todo list without logging in.
- [ ] Users can only see and manage their own Todo items.
- [ ] The PostgreSQL port (5432) is not reachable from the public internet.
- [ ] The application successfully validates Google tokens and issues local JWTs.

## 6. Testing Strategy
-   **Manual:** Verify login flow and verify that a user cannot see another user's data by manipulating IDs.
-   **Automated:** Add unit tests for the Auth controller and integration tests for filtered Todo queries.
-   **Infrastructure:** Use `nmap` or similar to verify port 5432 is closed.
