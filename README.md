# Ethara Team Task Manager

A full-stack Team Task Management web application built as part of the Ethara.ai Full-Stack Coding Assignment.

The application allows teams to create projects, assign tasks, manage members, and track task progress with role-based access control.

## Live Application

Frontend URL:

```bash
https://ethara-team-task-manager-production-5c49.up.railway.app
```

Backend URL:

```bash
https://ethara-team-task-manager-production-f32f.up.railway.app
```

## GitHub Repository

```bash
https://github.com/gudireddy-0110/ethara-team-task-manager
```

---

# Features

## Authentication

* User Signup
* User Login
* JWT-based Authentication
* Protected Routes

## Project Management

* Create Projects
* Add Team Members
* Remove Team Members
* Role-Based Access Control
* Admin and Member Roles

## Task Management

* Create Tasks
* Assign Tasks to Team Members
* Update Task Status
* Track Task Priority
* Due Date Tracking

## Dashboard

* Total Tasks
* Tasks by Status
* Overdue Tasks
* Task Overview

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS
* Vite

## Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication
* bcryptjs

## Database

* PostgreSQL (Neon)

## Deployment

* Railway

---

# Database Models

## User

* id
* name
* email
* password

## Project

* id
* name
* description
* createdAt

## ProjectMember

* id
* role
* userId
* projectId

## Task

* id
* title
* description
* dueDate
* priority
* status
* assignedToId
* createdById
* projectId

---

# Role-Based Access Control

## Admin

* Create Projects
* Add/Remove Members
* Create Tasks
* Assign Tasks
* Update Any Task Status

## Member

* View Assigned Projects
* View Tasks
* Update Assigned Tasks

---

# API Endpoints

## Authentication

```bash
POST /api/auth/signup
POST /api/auth/login
```

## Projects

```bash
GET /api/projects
POST /api/projects
POST /api/projects/:projectId/members
DELETE /api/projects/:projectId/members/:userId
```

## Tasks

```bash
GET /api/tasks/:projectId
POST /api/tasks/:projectId
PATCH /api/tasks/status/:taskId
```

## Dashboard

```bash
GET /api/dashboard
```

---

# Local Setup Instructions

## Clone Repository

```bash
git clone https://github.com/gudireddy-0110/ethara-team-task-manager.git
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

Run Prisma Migration:

```bash
npx prisma migrate dev --name init
```

Start Backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend:

```bash
npm run dev
```

---

# Deployment

The application is deployed using Railway.

## Backend Deployment

* Root Directory: backend
* Start Command: npm start
* Environment Variables configured

## Frontend Deployment

* Root Directory: frontend
* Build Command: npm run build
* Start Command:

```bash
npm run preview -- --host 0.0.0.0 --port $PORT
```

---

# Demo Credentials

```bash
Email: admin@test.com
Password: password123
```

---

# Future Improvements

* File Attachments
* Real-time Notifications
* Drag-and-Drop Task Boards
* Team Chat Integration
* Activity Logs
* Email Notifications

---

# Author

Indhu Reddy Gudi
