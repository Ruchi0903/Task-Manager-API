🧠 Task Manager API – Backend (Phase 1)
Status: ✅ Completed Phase 1 as of 6th June 2025, 11:45 PM IST
Docker ✅ | Tests ✅ | Insomnia ✅ | Git-ready ✅

🏗️ Project Overview
A fully functional Task Manager REST API built using Node.js, Express, and MongoDB with:

JWT-based authentication

User-task authorization

Robust validation & error handling

Dockerized deployment

Unit & integration testing using Jest + Supertest

📁 Project Setup
Initialized with git and npm

Installed core dependencies: express, mongoose, bcryptjs, jsonwebtoken, dotenv, joi, etc.

Created clean project structure under /src

Configured environment variables via .env

MongoDB connection setup using connectDB()

Base Express server running on desired port

👥 User Model
Fields: username, email, password

Password hashing using bcryptjs

Includes matchPassword() for login validation

✅ Task Model
Fields: title, description, completed, user

user is a reference to User (via mongoose.Schema.Types.ObjectId)

🔐 Authentication & Authorization
🔑 Auth Routes:
POST /api/auth/register – Register new user

POST /api/auth/login – Authenticate user & return JWT

GET /api/auth/me – Get current user’s profile

DELETE /api/auth/delete – Delete user & all tasks

🛡️ JWT Auth Middleware
Parses and verifies token

Attaches req.user to protected routes

Protects all /api/tasks endpoints

📝 Task Management (CRUD)
All routes are protected and user-specific.

POST /api/tasks/createTask – Create task

GET /api/tasks/getTasks – Fetch all tasks

PUT /api/tasks/:id – Update a task

DELETE /api/tasks/:id – Delete a task

📏 Input Validation (Joi)
Used across all critical routes:

Endpoint	Validates
POST /api/auth/register	username, email, password
POST /api/auth/login	email, password
POST /api/tasks/createTask	title (required), description, completed
PUT /api/tasks/:id	Optional fields if present

All validation schemas are defined in /src/validators/ and applied in controllers.

🧼 Error Handling
Centralized error handler middleware ensures:

Catch-all for next(err) in controllers

Consistent JSON error responses

Hides stack traces in production

Logic lives in /src/middleware/errorMiddleware.js

🐳 Docker Support
Wrote production-ready Dockerfile

.dockerignore to reduce build context size

docker-compose.yml to spin up API with MongoDB easily

🧪 Testing
Unit + integration tests written using Jest & Supertest

Tests cover:

Auth flows (register/login/me/delete)

Task CRUD operations

Run via npm test

All tests are passing ✅