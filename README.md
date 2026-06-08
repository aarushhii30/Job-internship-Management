# Job & Internship Management System

Full-stack MERN application with role-based access (Admin / Applicant).

## Structure
- `backend/` — Node.js + Express + MongoDB (Mongoose) + JWT
- `frontend/` — React (Vite) + React Router + Axios + Tailwind + Context API

## Quick start

### Backend
```bash
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173, backend on http://localhost:5000.

## Default admin
Sign up normally, then in MongoDB change a user's `role` field to `"admin"`.
Or POST to `/api/auth/signup` with `"role":"admin"` (allowed for bootstrap).
