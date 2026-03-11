# Employee Leave Management System

A full-stack application for managing employee leave requests. Designed with Node.js, Express, MongoDB, Vue 3, and Tailwind CSS.

## Features
- **Role-Based Access Control**: Two distinct roles - `employee` and `employer`.
- **Employee Portal**: Apply for leaves, view leave history and status.
- **Employer Portal**: View all pending leave applications, approve, or reject them.
- **Authentication**: JWT-based secure authentication.
- **Modern UI**: Clean and functional user interface built with Tailwind CSS.

---

## Tech Stack
- **Frontend**: Vue.js 3, Tailwind CSS, Vite, Axios, Vue Router
- **Backend**: Node.js, Express.js, JWT, bcryptjs
- **Database**: MongoDB (via Mongoose)

---

## Local Development Setup

### 1. Database Setup
Make sure you have MongoDB installed and running locally, or use a MongoDB Atlas cluster.
If using a local database, it usually runs on `mongodb://127.0.0.1:27017/leave_management`.

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory (one is provided by default):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/leave_management
JWT_SECRET=supersecretkeyofleavingmanagement
```
Run the backend server:
```bash
npm run dev
```
*(The server will run on http://localhost:5000)*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Run the development server:
```bash
npm run dev
```
*(The UI will run on http://localhost:5173)*

---

## API Endpoints Overview

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/signup` | Register a new user (`role`: 'employee'/'employer') | Public |
| `POST` | `/api/auth/login` | Login and receive JWT | Public |
| `POST` | `/api/leaves` | Submit a new leave application | Employee/Employer |
| `GET`  | `/api/leaves/my` | View current user's leaves | Employee/Employer |
| `GET`  | `/api/leaves` | View all leave applications from everyone | Employer |
| `PUT`  | `/api/leaves/:id/status` | Update a leave's status to 'Approved'/'Rejected' | Employer |

---

## Cloud Deployment Guide

The application can be easily deployed to **free cloud hosting** services like Vercel (for frontend) and Render (for backend).

### Step 1: Set up MongoDB Atlas (Free Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up/login.
2. Create a Free Cluster (M0).
3. Under "Database Access", create a Database User with a password.
4. Under "Network Access", add `0.0.0.0/0` to allow connections from anywhere (needed for cloud platforms).
5. Go to "Database", click "Connect" -> "Drivers" -> Node.js, and copy your connection string (replace `<password>` with the password you created).

### Step 2: Deploy Backend to Render (Free Tier)
1. Push this entire codebase to a GitHub repository.
2. Go to [Render](https://render.com/) and sign in with GitHub.
3. Create a **New Web Service**.
4. Connect the GitHub repository.
5. In the form:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Expand **Advanced** and add Environment Variables:
   - `MONGO_URI`: (Paste your MongoDB Atlas connection string here)
   - `JWT_SECRET`: (Any secure random string)
7. Click **Create Web Service**. Wait a few minutes for the API to go live.
8. Copy the Render URL (e.g. `https://my-leave-backend.onrender.com`).

### Step 3: Deploy Frontend to Vercel (Free Tier)
1. Go to [Vercel](https://vercel.com/) and sign in.
2. Click **Add New** -> **Project**.
3. Import the GitHub repository.
4. Framework Preset should auto-detect "Vite".
5. Change the **Root Directory** to `frontend`.
6. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://my-leave-backend.onrender.com/api` *(replace with your actual Render URL)*
7. Click **Deploy**. Vercel will build your frontend and provide a live URL!

**You now have a fully deployed cloud application!**
