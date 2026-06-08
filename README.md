# Job & Internship Management System

A full-stack MERN application that streamlines the job and internship application process with role-based access for administrators and applicants. The platform enables administrators to manage listings and applications while allowing applicants to explore opportunities and apply seamlessly.
 [![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://job-internship-management.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Render-blue)](https://job-internship-management.onrender.com/)
## 🚀 Features

### Applicant Features

* User Registration & Login (JWT Authentication)
* Browse Jobs & Internships
* Search and Filter Opportunities
* Apply to Jobs
* View Application Status
* Responsive User Interface

### Admin Features

* Secure Admin Dashboard
* Create Job & Internship Listings
* Manage Listings
* View Applications
* Role-Based Access Control
* Track Applicant Information

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

```bash
job-internship-management-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication and role-based authorization.

Roles:

* Applicant
* Admin

Protected routes ensure only authorized users can access sensitive resources.

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES=7d
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Local Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/job-internship-management-system.git
cd job-internship-management-system
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Application will be available at:

```text
Frontend: http://localhost:5173
Backend: http://localhost:5000
```

---

## 🌐 Deployment

### MongoDB Atlas

* Create Cluster
* Create Database User
* Configure Network Access
* Copy Connection String

### Render (Backend)

* Connect GitHub Repository
* Add Environment Variables
* Deploy Node.js Application

### Vercel (Frontend)

* Import GitHub Repository
* Add Environment Variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

* Deploy

---

## 📸 Screenshots

### Home Page

(Add Screenshot Here)

### Job Listings

(Add Screenshot Here)

### Admin Dashboard

(Add Screenshot Here)

### Application Management

(Add Screenshot Here)

---

## 🎯 Key Highlights

* Full-Stack MERN Architecture
* JWT Authentication & Authorization
* Role-Based Access Control
* RESTful API Design
* Responsive UI
* MongoDB Atlas Integration
* Cloud Deployment Ready

---

## 🔮 Future Enhancements

* Resume Upload Feature
* Email Notifications
* Admin Analytics Dashboard
* Company Profiles
* Saved Jobs
* Advanced Search Filters
* Interview Scheduling
* Application Tracking System

---
## 📚 Learning Outcomes

Through the development of this project, I gained hands-on experience in:

### Full-Stack Development
- Building a complete MERN stack application from scratch
- Structuring frontend and backend in a scalable manner
- Managing API communication between React and Express

### Authentication & Authorization
- Implementing JWT-based authentication
- Creating protected routes
- Managing role-based access control (Admin & Applicant)

### Database Management
- Designing MongoDB schemas using Mongoose
- Performing CRUD operations
- Managing relationships between users, jobs, and applications

### Frontend Development
- Building responsive user interfaces with React
- Managing application state using Context API
- Implementing client-side routing with React Router

### Backend Development
- Developing RESTful APIs using Express.js
- Creating middleware for authentication and authorization
- Handling errors and request validation

### Deployment & DevOps
- Deploying frontend applications on Vercel
- Deploying backend services on Render
- Configuring MongoDB Atlas for cloud database hosting
- Managing environment variables securely

### Software Engineering Practices
- Git and GitHub version control
- Project documentation and repository management
- Debugging real-world deployment and integration issues
- Organizing code using industry-standard project structure

## 🎯 Skills Demonstrated

- MERN Stack Development
- REST API Design
- JWT Authentication
- MongoDB Atlas
- React.js
- Node.js
- Express.js
- Git & GitHub
- Cloud Deployment
- Full-Stack Application Architecture
## 👨‍💻 Author

Aarushi Sharma

AI/ML Engineer | Full Stack Developer

GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourprofile

---

## 📄 License

This project is licensed under the MIT License.
