# Employee Leave Management System

A full-stack web application for managing employee leave requests. Employees can apply for leave, and employers can approve or reject those requests.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Vue.js 3, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens), bcryptjs |

## Features
- **Role-Based Access Control** — Two distinct roles: `Employee` and `Employer`
- **Employee Portal** — Apply for leave (Sick, Casual, Annual, Unpaid), view leave history and status
- **Employer Dashboard** — View all leave applications with stats, filter by status, approve or reject
- **JWT Authentication** — Secure token-based authentication
- **Input Validation** — Required fields, date range validation (start ≤ end)
- **Error Handling** — Meaningful error messages on both client and server

## Folder Structure
```
leave-management-system/
├── backend/
│   ├── models/
│   │   ├── User.js            # User schema (name, email, password, role)
│   │   └── LeaveRequest.js    # Leave request schema (type, dates, reason, status)
│   ├── routes/
│   │   ├── auth.js            # POST /signup, POST /login
│   │   └── leaves.js          # POST /, GET /my, GET /, PUT /:id/status
│   ├── middleware/
│   │   └── auth.js            # JWT verification + role-based guard
│   ├── server.js              # Express app entry point
│   ├── .env                   # Environment variables (not committed)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.vue     # Navigation bar with auth state
│   │   ├── views/
│   │   │   ├── Home.vue       # Landing page
│   │   │   ├── Login.vue      # Login form
│   │   │   ├── Signup.vue     # Registration form with role selection
│   │   │   ├── EmployeeDashboard.vue   # Leave application + history
│   │   │   └── EmployerDashboard.vue   # All requests + approve/reject
│   │   ├── App.vue            # Root layout
│   │   ├── router.js          # Vue Router config with guards
│   │   ├── axios.js           # Axios instance with JWT interceptor
│   │   └── main.js            # App bootstrap
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and receive JWT | Public |
| `POST` | `/api/leaves` | Submit a new leave application | Authenticated |
| `GET` | `/api/leaves/my` | View current user's leave applications | Authenticated |
| `GET` | `/api/leaves` | View all leave applications | Employer only |
| `PUT` | `/api/leaves/:id/status` | Approve or reject a leave | Employer only |

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB Atlas account (free tier)

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd leave-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/leave_management?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```
Start the backend:
```bash
npm run dev
```
The API server runs on `http://localhost:5001`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The Vue app runs on `http://localhost:5173`.

## Deployment Guide

### Deploy Backend to Render (Free)
1. Push this repo to GitHub.
2. Go to [render.com](https://render.com), sign in with GitHub.
3. Create a **New Web Service**, connect the repo.
4. Set Root Directory to `backend`.
5. Build Command: `npm install` · Start Command: `npm start`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`.
7. Deploy. Copy the live URL (e.g. `https://your-app.onrender.com`).

### Deploy Frontend to Vercel (Free)
1. Go to [vercel.com](https://vercel.com), sign in.
2. Import the GitHub repository.
3. Set Root Directory to `frontend`.
4. Add environment variable:
   - `VITE_API_URL` = `https://your-app.onrender.com/api`
5. Deploy. Vercel provides the public URL.

## Deployment Topology
```
[Browser] → [Vercel CDN (Vue SPA)] → [Render (Express API)] → [MongoDB Atlas]
```
