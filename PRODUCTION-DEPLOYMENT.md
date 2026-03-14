# Production Deployment Guide
**Westfield Academy School Management System**

This guide provides step-by-step instructions for taking your application from your local machine to the live internet. We will use a standard, modern, cloud-native stack:
1.  **Database**: Supabase (PostgreSQL)
2.  **Backend API**: Render (Spring Boot / Java)
3.  **Frontend Website**: Vercel (Next.js)

---

## Phase 1: The Database (Supabase)
Your backend cannot start without a database to connect to. We will create one first.

### 1. Create the Database
1.  Go to [Supabase](https://supabase.com/) and create a free account.
2.  Click **New Project**.
3.  Name it `westfield-academy-db` (or similar).
4.  Generate a strong **Database Password** and **SAVE THIS PASSWORD SOMEWHERE SAFE** (you will need it in Phase 2).
5.  Wait a few minutes for the database to finish provisioning.

### 2. Prepare the Database Schema
*Important Note on your SQL Scripts:* The scripts in your `/scripts` folder were originally written for an **Oracle** database (using `VARCHAR2`, `NUMBER(19)`, and manual `SEQUENCES` with Triggers). Spring Boot and Supabase are configured for **PostgreSQL**.

Because your Spring Boot application has `spring.jpa.hibernate.ddl-auto=update` in its `application.properties`, **you do not need to run script 01, 02, 03, or 04**. Spring Boot will automatically create all the perfect PostgreSQL tables the very first time it connects!

We only need to insert the initial admin user.

### 3. Insert the Initial Admin Data
1.  In your Supabase Dashboard, click on **SQL Editor** on the left menu.
2.  Click **New Query**.
3.  We need to adapt your sample data script to fit PostgreSQL auto-generated IDs. Paste the following clean SQL into the editor and hit **Run**:

```sql
-- Insert the essential Admin Role (Assuming your Role table is configured this way)
INSERT INTO role (id, name) VALUES (1, 'ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO role (id, name) VALUES (2, 'TEACHER') ON CONFLICT DO NOTHING;
INSERT INTO role (id, name) VALUES (3, 'STUDENT') ON CONFLICT DO NOTHING;
INSERT INTO role (id, name) VALUES (4, 'PARENT') ON CONFLICT DO NOTHING;

-- Insert the default System Administrator
-- Password is 'password' (bcrypt hashed)
INSERT INTO users (id, username, password, email, first_name, last_name, role, active) 
VALUES (
    1, 
    'admin', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5gp18FuVDkn9FWy', 
    'admin@westfieldacademy.edu', 
    'System', 
    'Administrator', 
    'ADMIN',
    1
) ON CONFLICT DO NOTHING;
```

### 4. Get Your Connection Details
1.  In Supabase, go to **Project Settings** (gear icon) -> **Database**.
2.  Scroll down to **Connection string** and select the **JDBC** tab.
3.  It will look something like this:
    `jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres`
4.  **Save this URL.** You now have your DB URL, your DB Username (usually `postgres`), and the DB Password you saved in step 1.

---

## Phase 2: The Backend (Render)
Now we deploy the Spring Boot Java API so it can talk to the database.

### 1. Connect to Render
1.  Ensure all your code is pushed to your GitHub repository.
2.  Go to [Render](https://render.com/) and create a free account.
3.  Click **New** -> **Web Service**.
4.  Connect your GitHub account and select your `WESTFIELD-ACADEMY-` repository.

### 2. Configure the Build
*   **Name**: `westfield-api` (or similar)
*   **Language**: `Java` (Render should auto-detect this)
*   **Build Command**: `./mvnw clean package -DskipTests`
*   **Start Command**: `java -jar target/school-mgmt-app-0.0.1-SNAPSHOT.jar`
*   **Instance Type**: Free Plan (Note: Spring Boot can take 1-2 minutes to spin up on the free tier if it goes to sleep).

### 3. Set Environment Variables MUST DO THIS BEFORE SAVING!
Scroll down to the **Environment Variables** section. Add the following keys exactly as written, and fill in your Supabase values:

| Key | Value | Example |
| :--- | :--- | :--- |
| `DB_URL` | Your Supabase JDBC URL | `jdbc:postgresql://aws-....supabase.com:6543/postgres` |
| `DB_USERNAME` | Your DB username | `postgres` |
| `DB_PASSWORD` | Your DB password | `super_secret_db_pass_123` |
| `JWT_SECRET` | Create a random, long string | `wa_super_secret_jwt_signature_key_2026_xyz` |
| `FRONTEND_URL` | Temporarily use `*` | `*` |

4.  Click **Create Web Service**.
5.  Render will now download Maven, compile your Java code, and start the server. Watch the logs. When you see `Started SchoolMgmtApp in XX seconds`, your API is live!
6.  Copy your live API URL from the top left (e.g., `https://westfield-api.onrender.com`).

---

## Phase 3: The Frontend (Vercel)
Finally, we host the Next.js website and point it at the live API.

### 1. Connect to Vercel
1.  Go to [Vercel](https://vercel.com/) and create a free account using your GitHub.
2.  Click **Add New** -> **Project**.
3.  Import your `WESTFIELD-ACADEMY-` repository.

### 2. Configure the Build
1.  **Framework Preset**: Vercel will automatically detect `Next.js`. Leave everything as default.
2.  Open the **Environment Variables** dropdown.
3.  Add one critical variable telling the frontend where the backend is:
    *   **Name**: `NEXT_PUBLIC_API_URL`
    *   **Value**: Your Render URL from Phase 2 (e.g., `https://westfield-api.onrender.com`) - *Do not add a trailing slash.*
4.  Click **Deploy**.
5.  Vercel will build the frontend. Once complete, it will give you a live production URL (e.g., `https://westfield-academy.vercel.app`).

---

## Phase 4: Securing the Loop (CORS)
Right now, your backend allows `*` (any website) to talk to it. Let's lock it down to only your Vercel frontend.

1.  Go back to your **Backend on Render**.
2.  Go to the **Environment** tab.
3.  Edit the `FRONTEND_URL` variable.
4.  Change the value from `*` to your new Vercel URL (e.g., `https://westfield-academy.vercel.app`).
5.  Save changes. Render will briefly restart the backend.

### You are Live!
You can now go to your Vercel URL, log in with `admin` / `password`, and begin using the live system. Data will be permanently saved in Supabase.
