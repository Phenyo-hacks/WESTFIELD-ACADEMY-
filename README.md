# WestField Academy - School Management System

A comprehensive School Management System built with a modern **Next.js** frontend and a robust **Spring Boot** backend.

## 🚀 Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI
- **Backend**: Spring Boot 3.3.1, Java 17, Spring Security (JWT)
- **Database**: PostgreSQL
- **Tools**: Maven, npm/pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Java 17** (or higher)
- **Node.js 18** (or higher)
- **PostgreSQL** (Local installation or a cloud database like Supabase/Railway)

## 🛠️ Local Development Setup

### 1. Database Setup
1.  Install PostgreSQL or create a free database on [Supabase](https://supabase.com/) or [Railway](https://railway.app/).
2.  Create a database named `schoolmgmt` (or whatever you prefer).
3.  Keep note of your **Database URL**, **Username**, and **Password**.

### 2. Backend Setup (Spring Boot)
1.  Navigate to the project root.
2.  Open `src/main/resources/application.properties`.
3.  You can either edit the file directly or set environment variables.
    *   **Option A (Env Variables - Recommended)**:
        Set the following environment variables in your IDE or terminal:
        ```bash
        DB_URL=jdbc:postgresql://localhost:5432/schoolmgmt
        DB_USERNAME=postgres
        DB_PASSWORD=your_password
        JWT_SECRET=your_very_long_and_secure_secret_key
        FRONTEND_URL=http://localhost:3000
        ```
    *   **Option B (Direct Edit)**:
        Replace the default values in `application.properties` with your actual database credentials.
4.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    (Or run the `SchoolMgmtApp` class from your IDE).

### 3. Frontend Setup (Next.js)
1.  Navigate to the project root (where `package.json` is).
2.  Install dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```
3.  Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Deployment Guide

### Backend (Railway/Render)
1.  Push your code to GitHub.
2.  Connect your repository to Railway or Render.
3.  Add the **Environment Variables** (DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, FRONTEND_URL) in the dashboard.
4.  Deploy! The platform will automatically detect the Maven project.

### Frontend (Vercel/Netlify)
1.  Push your code to GitHub.
2.  Connect your repository to Vercel or Netlify.
3.  Add `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed backend URL (e.g., `https://my-backend.railway.app`).
4.  Deploy!

## 🔐 Default Credentials
*   **Admin**: (You will need to create the first admin user via database or API)
